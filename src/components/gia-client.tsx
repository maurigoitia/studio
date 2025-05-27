
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { askGenericQuestionAction } from "@/app/actions";
import { useState, useTransition, useRef, useEffect, FormEvent } from "react";
import { Loader2, Send, Bot, UserCircle, ChevronDown } from "lucide-react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const sentAudioRef = useRef<HTMLAudioElement | null>(null);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio files
    sentAudioRef.current = new Audio('/sounds/message-sent.mp3');
    receivedAudioRef.current = new Audio('/sounds/message-received.mp3');
  }, []);

  const addMessage = (text: string, sender: 'user' | 'gia', options?: Array<{label: string, value: string}>) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(36).substring(7), text, sender, options }]);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        setTimeout(() => { // Delay scroll to ensure DOM update
          viewport.scrollTop = viewport.scrollHeight;
        }, 0);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (conversationStage === 'GREETING') {
      addMessage("¡Hola! Soy GIA, tu asistente IA de PetSync. Para comenzar, ¿me podrías decir tu nombre?", "gia");
      setConversationStage('AWAITING_USER_NAME');
    }
  }, [conversationStage]); // Removed addMessage from dependency array to avoid re-triggering

  useEffect(() => {
    const stagesRequiringTextInput = [
      'AWAITING_USER_NAME',
      'AWAITING_EMAIL_INPUT',
      'AWAITING_PET_NAME',
      'AWAITING_PET_SPECIES',
      'AWAITING_MAIN_QUESTION',
    ];
    const shouldFocus =
        stagesRequiringTextInput.includes(conversationStage) ||
        (conversationStage === 'AI_RESPONSE_DISPLAYED' && !messages[messages.length - 1]?.options);

    if (shouldFocus && !isInputDisabled()) {
      inputRef.current?.focus();
    }
  }, [conversationStage, messages]);


  const handleOptionClick = (value: string, label: string) => {
    addMessage(label, 'user');
    sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    setCurrentInput("");

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
            addMessage("¡Gracias por chatear conmigo! Que tengas un buen día. 🐾", "gia");
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
      sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    }
    setCurrentInput("");

    switch (conversationStage) {
      case 'AWAITING_USER_NAME':
        setCollectedData(prev => ({ ...prev, userName: userInput || "Usuario" }));
        addMessage(`¡Un gusto, ${userInput || 'usuario'}! ¿Te gustaría compartir tu correo electrónico conmigo? Esto es opcional.`, "gia", [{label: "Sí, compartir email", value: "yes_email"}, {label: "No, gracias", value: "no_email"}]);
        setConversationStage('AWAITING_EMAIL_PERMISSION');
        break;
      case 'AWAITING_EMAIL_INPUT':
        if (userInput && (!userInput.includes('@') || !userInput.includes('.'))) {
            addMessage("Parece que ese no es un correo válido. Por favor, inténtalo de nuevo o puedes presionar 'No, gracias' si prefieres omitirlo.", "gia");
        } else {
            setCollectedData(prev => ({ ...prev, email: userInput }));
            addMessage("¡Gracias! Ahora, cuéntame sobre tu mascota. ¿Cuál es su nombre?", "gia");
            setConversationStage('AWAITING_PET_NAME');
        }
        break;
      case 'AWAITING_PET_NAME':
        setCollectedData(prev => ({ ...prev, petName: userInput || "mi mascota" }));
        addMessage(`¡Lindo nombre, ${userInput || 'tu mascota'}! ¿Y cuál es su especie? (Ej: Perro, Gato, Ave)`, "gia");
        setConversationStage('AWAITING_PET_SPECIES');
        break;
      case 'AWAITING_PET_SPECIES':
        if (!userInput) {
            addMessage("Por favor, indícame la especie de tu mascota (Ej: Perro, Gato).", "gia");
            break;
        }
        setCollectedData(prev => ({ ...prev, species: userInput }));
        addMessage(`Entendido, un/a ${userInput}. Ahora sí, ${collectedData.userName || 'dime'}, ¿en qué te puedo ayudar con ${collectedData.petName || 'tu mascota'}?`, "gia");
        setConversationStage('AWAITING_MAIN_QUESTION');
        break;
      case 'AWAITING_MAIN_QUESTION':
        if (!userInput) {
            addMessage("Por favor, escribe tu pregunta.", "gia");
            break;
        }
        setCollectedData(prev => ({ ...prev, question: userInput }));
        setConversationStage('PROCESSING_AI');
        addMessage("Entendido. Estoy procesando tu pregunta...", "gia"); // Typing indicator message
        startTransition(async () => {
          const payload: GenericQueryFormValues = {
            userName: collectedData.userName,
            email: collectedData.email,
            petName: collectedData.petName,
            species: collectedData.species as string, 
            question: userInput,
          };
          const response = await askGenericQuestionAction(payload);
          
          setMessages(prev => prev.slice(0, -1));

          if (response.success && response.data?.answer) {
            addMessage(response.data.answer, "gia");
            receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
          } else {
            addMessage(response.message || "GIA no pudo generar una respuesta en este momento. Por favor, intenta reformular tu pregunta o inténtalo más tarde.", "gia");
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
        if (userInput) {
            setCollectedData(prev => ({ ...prev, question: userInput }));
            setConversationStage('PROCESSING_AI');
            addMessage("Entendido. Estoy procesando tu nueva pregunta...", "gia");
            startTransition(async () => {
              const payload: GenericQueryFormValues = {
                userName: collectedData.userName,
                email: collectedData.email,
                petName: collectedData.petName,
                species: collectedData.species as string,
                question: userInput,
              };
              const response = await askGenericQuestionAction(payload);
              setMessages(prev => prev.slice(0, -1)); 
              if (response.success && response.data?.answer) {
                addMessage(response.data.answer, "gia");
                receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
              } else {
                addMessage(response.message || "GIA no pudo generar una respuesta en este momento.", "gia");
              }
              setConversationStage('AI_RESPONSE_DISPLAYED');
              addMessage("¿Tienes alguna otra pregunta o podemos finalizar aquí?", "gia", [{label: "Hacer otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
            });
        }
        break;
      default:
        addMessage("Algo no salió como esperaba. ¿Podemos intentarlo de nuevo?", "gia");
        setConversationStage('GREETING'); 
        setCollectedData({});
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

  const getPlaceholderText = (): string => {
    if (isInputDisabled()) return "Esperando respuesta...";
    switch(conversationStage) {
        case 'AWAITING_USER_NAME': return "Escribe tu nombre...";
        case 'AWAITING_EMAIL_INPUT': return "Escribe tu correo electrónico...";
        case 'AWAITING_PET_NAME': return "Nombre de tu mascota...";
        case 'AWAITING_PET_SPECIES': return "Especie (Ej: Perro, Gato)...";
        case 'AWAITING_MAIN_QUESTION': return "Escribe tu pregunta para GIA...";
        case 'AI_RESPONSE_DISPLAYED': return "Escribe tu siguiente pregunta o elige una opción...";
        default: return "Escribe tu mensaje...";
    }
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-b-lg">
      <ScrollArea className="flex-grow p-2 sm:p-3 space-y-3" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end space-x-2 max-w-[85%] mb-2 text-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out",
              msg.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
            )}
          >
            {msg.sender === 'gia' && (
              <Avatar className="h-6 w-6 self-start">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "p-2.5 rounded-lg shadow-sm",
                msg.sender === 'user'
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-card border text-card-foreground rounded-bl-none"
              )}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.sender === 'gia' && msg.options && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {msg.options.map(option => (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleOptionClick(option.value, option.label)}
                      className="text-xs h-auto py-1 px-2"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
             {msg.sender === 'user' && (
              <Avatar className="h-6 w-6 self-start">
                 <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <UserCircle className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isPending && conversationStage === 'PROCESSING_AI' && (
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3 animate-in fade-in-0 duration-300">
             <Avatar className="h-6 w-6 self-start">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
            <div className="bg-card border text-card-foreground p-2.5 rounded-lg shadow-sm rounded-bl-none">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>GIA está pensando...</span>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-2 sm:p-3 border-t bg-background flex items-center space-x-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder={getPlaceholderText()}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-grow bg-input text-xs" 
          disabled={isInputDisabled()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled()) {
              if (currentInput.trim() || (messages[messages.length - 1]?.options && (conversationStage === 'AWAITING_EMAIL_PERMISSION' || conversationStage === 'AI_RESPONSE_DISPLAYED'))) {
                if (conversationStage === 'AWAITING_EMAIL_PERMISSION' || (conversationStage === 'AI_RESPONSE_DISPLAYED' && messages[messages.length-1]?.options)) {
                    if (currentInput.trim()) {
                        handleSendMessage(e as any);
                    } else {
                        e.preventDefault(); 
                    }
                } else {
                    handleSendMessage(e as any);
                }
              } else if (!currentInput.trim()) {
                e.preventDefault();
              }
            }
          }}
        />
        <Button
            type="submit"
            size="sm" 
            className="text-xs" 
            disabled={isInputDisabled() || (!currentInput.trim() && !(conversationStage === 'AWAITING_EMAIL_PERMISSION' && messages[messages.length -1]?.options) && !(conversationStage === 'AI_RESPONSE_DISPLAYED' && messages[messages.length -1]?.options))}
        >
          {isPending && conversationStage === 'PROCESSING_AI' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
