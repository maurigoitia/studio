
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { askGenericQuestionAction } from "@/app/actions"; 
import { useState, useTransition, useRef, useEffect, FormEvent } from "react";
import { Loader2, Send, Bot, UserCircle } from "lucide-react"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { GenericQueryFormValues } from "@/lib/schemas";

interface Message {
  id: string;
  text: string;
  sender: "user" | "gia";
  options?: Array<{ label: string, value: string }>;
}

type ConversationStage = 
  | 'GREETING'
  | 'AWAITING_USER_NAME'
  | 'AWAITING_EMAIL_PERMISSION'
  | 'AWAITING_EMAIL_INPUT'
  | 'AWAITING_PET_NAME'
  | 'AWAITING_PET_SPECIES'
  | 'AWAITING_MAIN_QUESTION'
  | 'PROCESSING_AI'
  | 'AI_RESPONSE_DISPLAYED'
  | 'CONVO_ENDED';

interface CollectedData {
  userName?: string;
  email?: string;
  petName?: string;
  species?: string;
  question?: string;
}

export default function GIAClient() { 
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [conversationStage, setConversationStage] = useState<ConversationStage>('GREETING');
  const [collectedData, setCollectedData] = useState<CollectedData>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // --- Sound Effect Logic ---
  const playSound = (soundPath: string) => {
    try {
      const audio = new Audio(soundPath);
      audio.play().catch(error => console.warn("Error playing sound:", error)); // Catch play promise rejection
    } catch (error) {
      console.warn("Could not play sound effect:", error);
    }
  };
  // --- End Sound Effect Logic ---

  const addMessage = (text: string, sender: 'user' | 'gia', options?: Array<{label: string, value: string}>) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(36).substring(7), text, sender, options }]);
    if (sender === 'gia' && !isPending) {
      playSound('/sounds/message-received.mp3'); // User: Place message-received.mp3 in public/sounds/
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (conversationStage === 'GREETING') {
      addMessage("¡Hola! Soy GIA, tu asistente IA de PetSync. Para comenzar, ¿me podrías decir tu nombre?", "gia");
      setConversationStage('AWAITING_USER_NAME');
    }
  }, [conversationStage]); // Ensure this runs only once or when stage explicitly resets to GREETING

  const handleOptionClick = (value: string, label: string) => {
    addMessage(label, 'user');
    playSound('/sounds/message-sent.mp3'); // User: Place message-sent.mp3 in public/sounds/
    
    if (conversationStage === 'AWAITING_EMAIL_PERMISSION') {
      if (value === 'yes_email') {
        addMessage("¡Genial! Por favor, escribe tu correo electrónico.", "gia");
        setConversationStage('AWAITING_EMAIL_INPUT');
      } else {
        setCollectedData(prev => ({ ...prev, email: undefined }));
        addMessage("Entendido. Ahora, cuéntame sobre tu mascota. ¿Cuál es su nombre?", "gia");
        setConversationStage('AWAITING_PET_NAME');
      }
    } else if (conversationStage === 'AI_RESPONSE_DISPLAYED') {
        if (value === 'new_question') {
            setCollectedData(prev => ({ ...prev, question: undefined }));
            addMessage("Claro, ¿cuál es tu nueva pregunta?", "gia");
            setConversationStage('AWAITING_MAIN_QUESTION');
        } else if (value === 'end_convo') {
            addMessage("¡Gracias por chatear conmigo! Que tengas un buen día.", "gia");
            setConversationStage('CONVO_ENDED');
        }
    }
  };

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const userInput = currentInput.trim();
    if (!userInput && conversationStage !== 'AWAITING_EMAIL_PERMISSION' && !(conversationStage === 'AI_RESPONSE_DISPLAYED' && messages[messages.length-1]?.options)) return; 

    if (userInput) {
      addMessage(userInput, "user");
      playSound('/sounds/message-sent.mp3'); // User: Place message-sent.mp3 in public/sounds/
    }
    setCurrentInput("");

    switch (conversationStage) {
      case 'AWAITING_USER_NAME':
        setCollectedData(prev => ({ ...prev, userName: userInput }));
        addMessage(`¡Un gusto, ${userInput || 'usuario'}! ¿Te gustaría compartir tu correo electrónico conmigo?`, "gia", [{label: "Sí, compartir email", value: "yes_email"}, {label: "No, gracias", value: "no_email"}]);
        setConversationStage('AWAITING_EMAIL_PERMISSION');
        break;
      case 'AWAITING_EMAIL_INPUT':
        // Basic email validation (optional, as Zod will catch it later, but good for UX)
        if (!userInput.includes('@') || !userInput.includes('.')) {
            addMessage("Parece que ese no es un correo válido. Por favor, inténtalo de nuevo o puedes omitirlo.", "gia", [{label: "Omitir email", value: "no_email_retry"}]);
            // Option to retry or skip. If skipping, we'd need to handle 'no_email_retry' in handleOptionClick or here.
            // For simplicity, current flow proceeds, Zod will catch it if they don't correct or skip via an option.
            // Re-prompting requires more complex state.
        }
        setCollectedData(prev => ({ ...prev, email: userInput }));
        addMessage("¡Gracias! Ahora, cuéntame sobre tu mascota. ¿Cuál es su nombre?", "gia");
        setConversationStage('AWAITING_PET_NAME');
        break;
      case 'AWAITING_PET_NAME':
        setCollectedData(prev => ({ ...prev, petName: userInput }));
        addMessage(`¡Lindo nombre, ${userInput || 'tu mascota'}! ¿Y cuál es su especie? (Ej: Perro, Gato, Ave)`, "gia");
        setConversationStage('AWAITING_PET_SPECIES');
        break;
      case 'AWAITING_PET_SPECIES':
        setCollectedData(prev => ({ ...prev, species: userInput }));
        addMessage(`Entendido, un/a ${userInput}. Ahora sí, ${collectedData.userName || 'dime'}, ¿en qué te puedo ayudar con ${collectedData.petName || 'tu mascota'}?`, "gia");
        setConversationStage('AWAITING_MAIN_QUESTION');
        break;
      case 'AWAITING_MAIN_QUESTION':
        setCollectedData(prev => ({ ...prev, question: userInput }));
        setConversationStage('PROCESSING_AI');
        addMessage("Entendido. Estoy procesando tu pregunta...", "gia");
        startTransition(async () => {
          const payload: GenericQueryFormValues = {
            userName: collectedData.userName,
            email: collectedData.email,
            petName: collectedData.petName,
            species: collectedData.species, // species is required by schema
            question: userInput, // question is required by schema
          };
          const response = await askGenericQuestionAction(payload);
          if (response.success && response.data) {
            addMessage(response.data.answer, "gia");
          } else {
            addMessage(response.message || "Hubo un error al obtener una respuesta de GIA. Por favor, revisa los datos o inténtalo más tarde.", "gia");
            toast({
              title: "Error de GIA",
              description: response.message || "No se pudo obtener una respuesta.",
              variant: "destructive",
            });
          }
          setConversationStage('AI_RESPONSE_DISPLAYED');
          addMessage("¿Tienes alguna otra pregunta o podemos finalizar aquí?", "gia", [{label: "Hacer otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
        });
        break;
      case 'AI_RESPONSE_DISPLAYED':
         // This case is now primarily handled by handleOptionClick for buttons
         // If user types instead of clicking a button:
        if (userInput) { // If user typed something
            setCollectedData(prev => ({ ...prev, question: userInput }));
            setConversationStage('PROCESSING_AI');
            addMessage("Entendido. Estoy procesando tu nueva pregunta...", "gia");
            startTransition(async () => {
              const payload: GenericQueryFormValues = { // Reconstruct payload
                userName: collectedData.userName,
                email: collectedData.email,
                petName: collectedData.petName,
                species: collectedData.species,
                question: userInput,
              };
              const response = await askGenericQuestionAction(payload);
              if (response.success && response.data) {
                addMessage(response.data.answer, "gia");
              } else {
                addMessage(response.message || "Hubo un error al obtener una respuesta de GIA.", "gia");
              }
              setConversationStage('AI_RESPONSE_DISPLAYED');
              addMessage("¿Tienes alguna otra pregunta o podemos finalizar aquí?", "gia", [{label: "Hacer otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
            });
        }
        break;
      default:
        break;
    }
  };
  
  const isInputDisabled = (): boolean => {
    return conversationStage === 'PROCESSING_AI' || 
           conversationStage === 'CONVO_ENDED' || 
           conversationStage === 'GREETING' ||
           (conversationStage === 'AWAITING_EMAIL_PERMISSION' && messages[messages.length -1]?.options !== undefined) ||
           (conversationStage === 'AI_RESPONSE_DISPLAYED' && messages[messages.length -1]?.options !== undefined) ;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] sm:h-[600px] max-h-[70vh] sm:max-h-[650px] bg-background rounded-lg shadow-inner border">
      <ScrollArea className="flex-grow p-2 sm:p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end space-x-2 max-w-[85%] mb-3 text-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out",
              msg.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
            )}
          >
            {msg.sender === 'gia' && (
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 self-start">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "p-2 sm:p-3 rounded-lg shadow",
                msg.sender === 'user' 
                  ? "bg-primary text-primary-foreground rounded-br-none" 
                  : "bg-card border text-card-foreground rounded-bl-none"
              )}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.sender === 'gia' && msg.options && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.options.map(option => (
                    <Button 
                      key={option.value} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleOptionClick(option.value, option.label)}
                      className="text-xs"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
             {msg.sender === 'user' && (
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 self-start">
                 <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <UserCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isPending && conversationStage === 'PROCESSING_AI' && (
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3 animate-in fade-in-0 duration-300">
             <Avatar className="h-6 w-6 sm:h-8 sm:w-8 self-start">
                <AvatarFallback className="bg-accent text-accent-foreground">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                </AvatarFallback>
              </Avatar>
            <div className="bg-card border text-card-foreground p-2 sm:p-3 rounded-lg shadow rounded-bl-none">
              <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                <span>GIA está pensando...</span>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-2 sm:p-4 border-t bg-background flex items-center space-x-2">
        <Input
          type="text"
          placeholder={
            isInputDisabled() ? "Esperando respuesta..." : 
            "Escribe tu mensaje..."
          }
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-grow bg-input text-xs sm:text-sm"
          disabled={isInputDisabled()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled() && currentInput.trim()) {
              handleSendMessage(e as any); 
            }
          }}
        />
        <Button 
            type="submit" 
            className="text-sm sm:text-base" 
            disabled={isInputDisabled() || (!currentInput.trim() && conversationStage !== 'AWAITING_EMAIL_PERMISSION' && !(conversationStage === 'AI_RESPONSE_DISPLAYED' && messages[messages.length-1]?.options))}
        >
          {isPending && conversationStage === 'PROCESSING_AI' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-2">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
    
