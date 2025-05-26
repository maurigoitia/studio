
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { GenericQueryFormSchema, type GenericQueryFormValues } from "@/lib/schemas"; 
import { askGenericQuestionAction } from "@/app/actions"; 
import { useState, useTransition, useRef, useEffect, FormEvent } from "react";
import { Loader2, Send, Bot, UserCircle, MessageSquare } from "lucide-react"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "gia";
}

type ConversationStage = 
  | 'INIT' 
  | 'AWAITING_EMAIL' 
  | 'AWAITING_PET_NAME' 
  | 'AWAITING_SPECIES' 
  | 'AWAITING_PET_AGE' 
  | 'AWAITING_QUESTION' 
  | 'PROCESSING' 
  | 'CONVERSATION_ENDED';

interface CollectedInfo {
  email?: string;
  petName?: string;
  species?: string;
  petAge?: number;
  question?: string;
}

export default function GIAClient() { 
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [conversationStage, setConversationStage] = useState<ConversationStage>('INIT');
  const [collectedInfo, setCollectedInfo] = useState<Partial<CollectedInfo>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const addMessage = (text: string, sender: 'user' | 'gia') => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, sender }]);
  };

  useEffect(() => {
    if (conversationStage === 'INIT') {
      addMessage("¡Hola! Soy GIA, tu asistente IA para mascotas. Para comenzar, ¿podrías decirme tu correo electrónico?", "gia");
      setConversationStage('AWAITING_EMAIL');
    }
  }, [conversationStage]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = inputValue.trim();
    if (!userInput && conversationStage !== 'AWAITING_PET_NAME') return; // Allow empty pet name

    addMessage(userInput, "user");
    setInputValue("");
    let nextStage: ConversationStage = conversationStage;
    let nextPrompt: string | null = null;
    const newCollectedInfo = { ...collectedInfo };

    switch (conversationStage) {
      case 'AWAITING_EMAIL':
        const emailValidation = z.string().email().safeParse(userInput);
        if (!emailValidation.success) {
          addMessage("Por favor, introduce un correo electrónico válido.", "gia");
          return;
        }
        newCollectedInfo.email = userInput;
        nextPrompt = "¿Cuál es el nombre de tu mascota? (Puedes omitirlo presionando Enviar)";
        nextStage = 'AWAITING_PET_NAME';
        break;
      case 'AWAITING_PET_NAME':
        if (userInput) { // Pet name is optional
            const petNameValidation = z.string().min(2).max(50).safeParse(userInput);
            if (!petNameValidation.success) {
              addMessage("El nombre de la mascota debe tener entre 2 y 50 caracteres, o déjalo vacío.", "gia");
              return;
            }
            newCollectedInfo.petName = userInput;
        }
        nextPrompt = "¿Qué especie es tu mascota? (Ej: Perro, Gato)";
        nextStage = 'AWAITING_SPECIES';
        break;
      case 'AWAITING_SPECIES':
        const speciesValidation = z.string().min(3).max(50).safeParse(userInput);
        if(!speciesValidation.success){
          addMessage("La especie debe tener entre 3 y 50 caracteres.", "gia");
          return;
        }
        newCollectedInfo.species = userInput;
        nextPrompt = "¿Cuántos años tiene tu mascota? (Ingresa un número)";
        nextStage = 'AWAITING_PET_AGE';
        break;
      case 'AWAITING_PET_AGE':
        const age = parseInt(userInput, 10);
        const ageValidation = z.number().int().positive().safeParse(age);
         if (isNaN(age) || !ageValidation.success) {
          addMessage("Por favor, ingresa una edad válida en años (número entero y positivo).", "gia");
          return;
        }
        newCollectedInfo.petAge = age;
        nextPrompt = "¡Genial! Ahora, ¿cuál es tu pregunta para GIA?";
        nextStage = 'AWAITING_QUESTION';
        break;
      case 'AWAITING_QUESTION':
        const questionValidation = z.string().min(5).max(1000).safeParse(userInput);
        if(!questionValidation.success){
            addMessage("Tu pregunta debe tener entre 5 y 1000 caracteres.", "gia");
            return;
        }
        newCollectedInfo.question = userInput;
        setConversationStage('PROCESSING');
        
        startTransition(async () => {
          const validatedData = GenericQueryFormSchema.safeParse(newCollectedInfo);
          if (!validatedData.success) {
            addMessage(`Error de validación: ${validatedData.error.errors.map(e => e.message).join(', ')}`, "gia");
            setConversationStage('AWAITING_QUESTION'); // Or reset to an appropriate stage
            return;
          }
          const response = await askGenericQuestionAction(validatedData.data as GenericQueryFormValues);
          if (response.success && response.data) {
            addMessage(response.data.answer, "gia");
          } else {
            addMessage(response.message || "Hubo un error al obtener una respuesta de GIA. Por favor, inténtalo de nuevo.", "gia");
          }
          setConversationStage('CONVERSATION_ENDED');
          addMessage("¿Tienes alguna otra pregunta o deseas comenzar de nuevo? (Escribe 'nuevo' para reiniciar)", "gia");

        });
        break;
      case 'CONVERSATION_ENDED':
        if (userInput.toLowerCase() === 'nuevo') {
          setMessages([]);
          setCollectedInfo({});
          setConversationStage('INIT');
          // The useEffect for INIT will then trigger the welcome message.
          return; 
        } else {
          // Treat as a new question
          newCollectedInfo.question = userInput;
          setConversationStage('PROCESSING');
          startTransition(async () => {
            const validatedData = GenericQueryFormSchema.safeParse(newCollectedInfo);
             if (!validatedData.success) {
                addMessage(`Error de validación: ${validatedData.error.errors.map(e => e.message).join(', ')}`, "gia");
                setConversationStage('AWAITING_QUESTION'); 
                return;
            }
            const response = await askGenericQuestionAction(validatedData.data as GenericQueryFormValues);
            if (response.success && response.data) {
              addMessage(response.data.answer, "gia");
            } else {
              addMessage(response.message || "Hubo un error al obtener una respuesta de GIA.", "gia");
            }
            setConversationStage('CONVERSATION_ENDED');
            addMessage("¿Tienes alguna otra pregunta o deseas comenzar de nuevo? (Escribe 'nuevo' para reiniciar)", "gia");
          });
        }
        break;
    }
    setCollectedInfo(newCollectedInfo);

    if (nextPrompt && nextStage !== 'PROCESSING') {
      setTimeout(() => addMessage(nextPrompt, "gia"), 300); // Small delay for GIA's response
    }
    if (nextStage !== 'PROCESSING') {
      setConversationStage(nextStage);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[70vh] bg-background rounded-lg shadow-inner border">
      <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end space-x-2 max-w-[85%] mb-3",
              msg.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
            )}
          >
            {msg.sender === 'gia' && (
              <Avatar className="h-8 w-8 self-start">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "p-3 rounded-lg shadow",
                msg.sender === 'user' 
                  ? "bg-primary text-primary-foreground rounded-br-none" 
                  : "bg-card border text-card-foreground rounded-bl-none"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && (
              <Avatar className="h-8 w-8 self-start">
                 <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <UserCircle className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {conversationStage === 'PROCESSING' && (
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3">
             <Avatar className="h-8 w-8 self-start">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            <div className="bg-card border text-card-foreground p-3 rounded-lg shadow rounded-bl-none">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>GIA está pensando...</span>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-background flex items-center gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            conversationStage === 'AWAITING_EMAIL' ? "Tu correo electrónico..." :
            conversationStage === 'AWAITING_PET_NAME' ? "Nombre de tu mascota (opcional)..." :
            conversationStage === 'AWAITING_SPECIES' ? "Especie (Perro, Gato...)" :
            conversationStage === 'AWAITING_PET_AGE' ? "Edad en años..." :
            conversationStage === 'AWAITING_QUESTION' ? "Escribe tu pregunta para GIA..." :
            conversationStage === 'CONVERSATION_ENDED' ? "Escribe 'nuevo' para reiniciar o haz otra pregunta..." :
            "Escribe tu mensaje..."
          }
          className="flex-grow"
          disabled={conversationStage === 'PROCESSING' || conversationStage === 'INIT'}
        />
        <Button type="submit" disabled={conversationStage === 'PROCESSING' || conversationStage === 'INIT' || (!inputValue && conversationStage !== 'AWAITING_PET_NAME')} size="icon">
          {conversationStage === 'PROCESSING' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
