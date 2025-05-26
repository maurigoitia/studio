
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
  options?: Array<{ label: string, value: string }>; // For Sí/No buttons
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

  const addMessage = (text: string, sender: 'user' | 'gia', options?: Array<{label: string, value: string}>) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(36).substring(7), text, sender, options }]);
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
      addMessage("Hola, soy GIA. ¿Me podrías decir tu nombre?", "gia");
      setConversationStage('AWAITING_USER_NAME');
    }
  }, [conversationStage]);

  const handleOptionClick = (value: string) => {
    addMessage(value === 'yes_email' ? 'Sí' : 'No', 'user'); // Display user's choice
    
    if (conversationStage === 'AWAITING_EMAIL_PERMISSION') {
      if (value === 'yes_email') {
        addMessage("¡Genial! Por favor, escribe tu correo.", "gia");
        setConversationStage('AWAITING_EMAIL_INPUT');
      } else {
        addMessage("Entendido, no hay problema. Ahora, cuéntame sobre tu mascota. ¿Cuál es su nombre?", "gia");
        setConversationStage('AWAITING_PET_NAME');
      }
    }
  };

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const userInput = currentInput.trim();
    if (!userInput && conversationStage !== 'AWAITING_EMAIL_PERMISSION') return; // Allow empty submission for button clicks

    if (userInput) addMessage(userInput, "user");
    setCurrentInput("");

    switch (conversationStage) {
      case 'AWAITING_USER_NAME':
        setCollectedData(prev => ({ ...prev, userName: userInput }));
        addMessage(`Un gusto, ${userInput}! ¿Te gustaría compartir tu correo electrónico conmigo? (Sí/No)`, "gia", [{label: "Sí", value: "yes_email"}, {label: "No", value: "no_email"}]);
        setConversationStage('AWAITING_EMAIL_PERMISSION');
        break;
      case 'AWAITING_EMAIL_INPUT':
        setCollectedData(prev => ({ ...prev, email: userInput }));
        addMessage("¡Gracias! Ahora, cuéntame sobre tu mascota. ¿Cuál es su nombre?", "gia");
        setConversationStage('AWAITING_PET_NAME');
        break;
      case 'AWAITING_PET_NAME':
        setCollectedData(prev => ({ ...prev, petName: userInput }));
        addMessage(`¡Lindo nombre, ${userInput || 'tu mascota'}! ¿Y cuál es su especie? (Ej: Perro, Gato)`, "gia");
        setConversationStage('AWAITING_PET_SPECIES');
        break;
      case 'AWAITING_PET_SPECIES':
        setCollectedData(prev => ({ ...prev, species: userInput }));
        addMessage(`Muy bien. Ahora sí, dime ¿en qué te puedo ayudar con ${collectedData.petName || 'tu mascota'} (el/la ${userInput})?`, "gia");
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
            species: collectedData.species,
            question: userInput,
          };
          const response = await askGenericQuestionAction(payload);
          if (response.success && response.data) {
            addMessage(response.data.answer, "gia");
          } else {
            addMessage(response.message || "Hubo un error al obtener una respuesta de GIA.", "gia");
            toast({
              title: "Error",
              description: response.message || "No se pudo obtener una respuesta.",
              variant: "destructive",
            });
          }
          setConversationStage('AI_RESPONSE_DISPLAYED');
           addMessage("¿Tienes alguna otra pregunta o podemos finalizar aquí?", "gia", [{label: "Hacer otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
        });
        break;
      case 'AI_RESPONSE_DISPLAYED':
         if (userInput.toLowerCase() === 'hacer otra pregunta') {
            setCollectedData(prev => ({ ...prev, question: undefined })); // Clear previous question
            addMessage("Claro, ¿cuál es tu nueva pregunta?", "gia");
            setConversationStage('AWAITING_MAIN_QUESTION');
        } else if (userInput.toLowerCase() === 'finalizar') {
            addMessage("¡Gracias por chatear conmigo! Que tengas un buen día.", "gia");
            setConversationStage('CONVO_ENDED');
        } else {
            // If user types something else, assume it's a new question.
            setCollectedData(prev => ({ ...prev, question: userInput }));
            setConversationStage('PROCESSING_AI');
            addMessage("Entendido. Estoy procesando tu nueva pregunta...", "gia");
            startTransition(async () => {
              const payload: GenericQueryFormValues = {
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
           conversationStage === 'AWAITING_EMAIL_PERMISSION' ||
           (conversationStage === 'AI_RESPONSE_DISPLAYED' && messages[messages.length -1]?.options !== undefined) ;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] sm:h-[600px] max-h-[70vh] sm:max-h-[650px] bg-background rounded-lg shadow-inner border">
      <ScrollArea className="flex-grow p-2 sm:p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end space-x-2 max-w-[85%] mb-3 text-sm",
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
                <div className="mt-2 flex gap-2">
                  {msg.options.map(option => (
                    <Button 
                      key={option.value} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        if (option.value === 'new_question') {
                            addMessage(option.label, 'user');
                            addMessage("Claro, ¿cuál es tu nueva pregunta?", "gia");
                            setConversationStage('AWAITING_MAIN_QUESTION');
                        } else if (option.value === 'end_convo') {
                            addMessage(option.label, 'user');
                            addMessage("¡Gracias por chatear conmigo! Que tengas un buen día.", "gia");
                            setConversationStage('CONVO_ENDED');
                        } else {
                           handleOptionClick(option.value);
                        }
                      }}
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
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3">
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
            isInputDisabled() ? "Esperando respuesta de GIA..." : 
            conversationStage === 'AWAITING_EMAIL_PERMISSION' ? "Escribe 'Sí' o 'No'" :
            "Escribe tu mensaje..."
          }
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-grow bg-input text-xs sm:text-sm"
          disabled={isInputDisabled()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled()) {
              handleSendMessage(e as any); // Cast to any to satisfy FormEvent if needed
            }
          }}
        />
        <Button type="submit" className="text-sm sm:text-base" disabled={isInputDisabled() || (!currentInput && conversationStage !== 'AWAITING_EMAIL_PERMISSION')}>
          {isPending && conversationStage === 'PROCESSING_AI' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-2">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
    
