
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { askGenericQuestionAction, subscribeToWaitlistAction } from "@/app/actions";
import { useState, useTransition, useRef, useEffect, FormEvent } from "react";
import { Loader2, Send, Bot, UserCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { GenericQueryFormValues, WaitlistFormValues } from "@/lib/schemas";

interface Message {
  id: string;
  text: string;
  sender: "user" | "gia";
  options?: Array<{ label: string, value: string }>;
}

type ConversationStage =
  | 'GREETING'
  | 'AWAITING_USER_NAME'
  | 'AWAITING_PET_NAME'
  | 'AWAITING_PET_SPECIES'
  | 'AWAITING_MAIN_QUESTION'
  | 'PROCESSING_AI'
  | 'AI_RESPONSE_DISPLAYED'
  | 'AWAITING_WAITLIST_DECISION'
  | 'AWAITING_WAITLIST_EMAIL'
  | 'PROCESSING_WAITLIST_SUB'
  | 'WAITLIST_CONFIRMED'
  | 'CONVO_ENDED_NO_WAITLIST'
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

  // useEffect para el saludo inicial de GIA
  useEffect(() => {
    // Esta función se ejecutará solo una vez cuando el componente se monte.
    // Verificamos si ya hay mensajes para evitar duplicados si el componente se remontara.
    if (messages.length === 0) {
      // Si no hay mensajes, y estamos en la etapa inicial de GREETING,
      // entonces GIA envía su saludo y pasamos a la siguiente etapa.
      if (conversationStage === "GREETING") {
        addMessage(
          "¡Hola! Soy GIA, tu asistente IA de PetSync. Para comenzar, ¿me podrías decir tu nombre?",
          "gia"
        );
        setConversationStage("AWAITING_USER_NAME");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El array de dependencias vacío [] asegura que esto se ejecute SOLO UNA VEZ.


  useEffect(() => {
    const stagesRequiringTextInput: ConversationStage[] = [
      'AWAITING_USER_NAME',
      'AWAITING_PET_NAME',
      'AWAITING_PET_SPECIES',
      'AWAITING_MAIN_QUESTION',
      'AWAITING_WAITLIST_EMAIL'
    ];
    const shouldFocus =
        stagesRequiringTextInput.includes(conversationStage) ||
        (conversationStage === 'AI_RESPONSE_DISPLAYED' && !messages[messages.length - 1]?.options && conversationStage !== 'AWAITING_WAITLIST_DECISION');

    if (shouldFocus && !isInputDisabled()) {
      inputRef.current?.focus();
    }
  }, [conversationStage, messages]);


  const handleOptionClick = (value: string, label: string) => {
    addMessage(label, 'user');
    sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    setCurrentInput("");

    if (conversationStage === 'AWAITING_WAITLIST_DECISION') {
      if (value === 'yes_waitlist') {
        addMessage("¡Genial! Para sumarte, por favor, déjame tu correo electrónico.", "gia");
        setConversationStage('AWAITING_WAITLIST_EMAIL');
      } else { // no_waitlist
        addMessage("Entendido. ¡Gracias por chatear conmigo! Si cambias de opinión, siempre puedes encontrar el enlace a nuestra waitlist en la página principal. ¿Puedo ayudarte con algo más o finalizamos aquí?", "gia", [{label: "Tengo otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
        setConversationStage('CONVO_ENDED_NO_WAITLIST');
      }
    } else if (conversationStage === 'WAITLIST_CONFIRMED' || conversationStage === 'CONVO_ENDED_NO_WAITLIST') {
        if (value === 'new_question') {
            setCollectedData(prev => ({ ...prev, question: undefined, email: prev.email })); // Reset question, keep email if provided for waitlist
            addMessage("Claro, ¿cuál es tu nueva pregunta sobre tu mascota?", "gia");
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

    if (!userInput &&
        conversationStage !== 'AWAITING_WAITLIST_DECISION' &&
        conversationStage !== 'WAITLIST_CONFIRMED' &&
        conversationStage !== 'CONVO_ENDED_NO_WAITLIST'
    ) {
      return;
    }

    if (userInput) {
      addMessage(userInput, "user");
      sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    }
    setCurrentInput("");

    switch (conversationStage) {
      case 'AWAITING_USER_NAME':
        setCollectedData(prev => ({ ...prev, userName: userInput || undefined }));
        addMessage(`¡Un gusto, ${userInput || 'usuario'}! Ahora, cuéntame sobre tu mascota. ¿Cuál es su nombre?`, "gia");
        setConversationStage('AWAITING_PET_NAME');
        break;
      case 'AWAITING_PET_NAME':
        setCollectedData(prev => ({ ...prev, petName: userInput || undefined }));
        addMessage(`¡Lindo nombre, ${userInput || 'tu mascota'}! ¿Y cuál es su especie? (Ej: Perro, Gato, Ave)`, "gia");
        setConversationStage('AWAITING_PET_SPECIES');
        break;
      case 'AWAITING_PET_SPECIES':
        if (!userInput) {
            addMessage("Por favor, indícame la especie de tu mascota (Ej: Perro, Gato).", "gia");
            break;
        }
        setCollectedData(prev => ({ ...prev, species: userInput }));
        addMessage(`Muy bien, ${collectedData.userName || 'dime'}. ¿En qué puedo ayudarte hoy con ${collectedData.petName || 'tu mascota'} (el/la ${userInput})?`, "gia");
        setConversationStage('AWAITING_MAIN_QUESTION');
        break;
      case 'AWAITING_MAIN_QUESTION':
        if (!userInput) {
            addMessage("Por favor, escribe tu pregunta.", "gia");
            break;
        }
        setCollectedData(prev => ({ ...prev, question: userInput }));
        setConversationStage('PROCESSING_AI');
        addMessage("Entendido. Estoy procesando tu pregunta...", "gia");
        startTransition(async () => {
          const payload: GenericQueryFormValues = {
            userName: collectedData.userName,
            // email: collectedData.email, // Email is not sent with the main query anymore
            petName: collectedData.petName,
            species: collectedData.species as string, // species is required for the query
            question: userInput,
          };
          const response = await askGenericQuestionAction(payload);
          setMessages(prev => prev.slice(0, -1)); // Remove "Procesando..."

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
          addMessage("Espero que esta información te haya sido útil. PetSync está en desarrollo y pronto lanzaremos nuestra app completa. ¿Te gustaría unirte a nuestra waitlist para ser de los primeros en saber cuándo puedes descargarla y recibir novedades?", "gia", [{label: "Sí, ¡unirme a la waitlist!", value: "yes_waitlist"}, {label: "No, gracias por ahora", value: "no_waitlist"}]);
          setConversationStage('AWAITING_WAITLIST_DECISION');
        });
        break;
      case 'AWAITING_WAITLIST_EMAIL':
        if (userInput && (!userInput.includes('@') || !userInput.includes('.'))) {
            addMessage("Parece que ese no es un correo válido. Por favor, inténtalo de nuevo.", "gia");
            break;
        }
        setCollectedData(prev => ({ ...prev, email: userInput }));
        setConversationStage('PROCESSING_WAITLIST_SUB');
        addMessage("Procesando tu suscripción...", "gia");
        startTransition(async () => {
            const waitlistPayload: WaitlistFormValues = { email: userInput, userType: 'tutor' }; 
            const wlResponse = await subscribeToWaitlistAction(waitlistPayload);
            setMessages(prev => prev.slice(0, -1)); 

            if (wlResponse.success) {
                addMessage(`¡Perfecto, ${userInput} ha sido añadido a nuestra waitlist! Te avisaremos en cuanto PetSync esté listo para despegar. ¿Hay algo más en lo que pueda ayudarte hoy?`, "gia", [{label: "Tengo otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
                receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
                setConversationStage('WAITLIST_CONFIRMED');
            } else {
                addMessage(`Hubo un problema al suscribirte: ${wlResponse.message || 'Intenta de nuevo más tarde.'} ¿Puedo ayudarte con algo más o finalizamos aquí?`, "gia", [{label: "Tengo otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
                setConversationStage('AI_RESPONSE_DISPLAYED'); 
            }
        });
        break;
      case 'AI_RESPONSE_DISPLAYED': 
      case 'WAITLIST_CONFIRMED':
      case 'CONVO_ENDED_NO_WAITLIST':
        if (userInput) {
            setCollectedData(prev => ({ ...prev, question: userInput, email: prev.email }));
            setConversationStage('PROCESSING_AI');
            addMessage("Entendido. Estoy procesando tu nueva pregunta...", "gia");
            startTransition(async () => {
              const payload: GenericQueryFormValues = {
                userName: collectedData.userName,
                petName: collectedData.petName,
                species: collectedData.species as string,
                question: userInput,
                // email: collectedData.email, // Not sent for main query
              };
              const response = await askGenericQuestionAction(payload);
              setMessages(prev => prev.slice(0, -1));
              if (response.success && response.data?.answer) {
                addMessage(response.data.answer, "gia");
                receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
              } else {
                addMessage(response.message || "GIA no pudo generar una respuesta en este momento.", "gia");
              }
              // Offer waitlist again after a new question
              addMessage("Espero que esta información te haya sido útil. ¿Te gustaría unirte a nuestra waitlist para novedades de PetSync?", "gia", [{label: "Sí, ¡unirme!", value: "yes_waitlist"}, {label: "No, gracias", value: "no_waitlist"}]);
              setConversationStage('AWAITING_WAITLIST_DECISION');
            });
        }
        break;
      default:
        addMessage("Algo no salió como esperaba. ¿Podemos intentarlo de nuevo?", "gia");
        setConversationStage('GREETING');
        setMessages([]); // Clear messages
        setCollectedData({});
        // GREETING will be re-triggered by the useEffect on next render if messages are empty
        break;
    }
  };

  const isInputDisabled = (): boolean => {
    // Deshabilitar si GIA está procesando o la conversación terminó
    if (conversationStage === 'PROCESSING_AI' || conversationStage === 'CONVO_ENDED' || conversationStage === 'GREETING' || conversationStage === 'PROCESSING_WAITLIST_SUB') {
      return true;
    }
    // Deshabilitar si el último mensaje de GIA tiene botones de opciones
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'gia' && lastMessage?.options && lastMessage.options.length > 0) {
      return true;
    }
    return false;
  };

  const getPlaceholderText = (): string => {
    if (isInputDisabled()) {
      if (conversationStage === 'PROCESSING_AI') return "GIA está pensando...";
      if (conversationStage === 'PROCESSING_WAITLIST_SUB') return "Procesando suscripción...";
      if (conversationStage === 'CONVO_ENDED') return "Conversación finalizada.";
      if (messages[messages.length -1]?.options) { 
        return "Elige una opción...";
      }
      return "Esperando respuesta...";
    }
    switch(conversationStage) {
        case 'AWAITING_USER_NAME': return "Escribe tu nombre...";
        case 'AWAITING_PET_NAME': return "Nombre de tu mascota...";
        case 'AWAITING_PET_SPECIES': return "Especie (Ej: Perro, Gato)...";
        case 'AWAITING_MAIN_QUESTION': return "Escribe tu pregunta para GIA...";
        case 'AWAITING_WAITLIST_EMAIL': return "Escribe tu correo electrónico...";
        case 'AI_RESPONSE_DISPLAYED':
        case 'WAITLIST_CONFIRMED':
        case 'CONVO_ENDED_NO_WAITLIST':
             return "Escribe tu siguiente pregunta o elige una opción...";
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
        {(isPending && (conversationStage === 'PROCESSING_AI' || conversationStage === 'PROCESSING_WAITLIST_SUB')) && (
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3 animate-in fade-in-0 duration-300">
             <Avatar className="h-6 w-6 self-start">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
            <div className="bg-card border text-card-foreground p-2.5 rounded-lg shadow-sm rounded-bl-none">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>{conversationStage === 'PROCESSING_AI' ? 'GIA está pensando...' : 'Procesando...'}</span>
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
                handleSendMessage(e as any);
            }
          }}
        />
        <Button
            type="submit"
            size="sm"
            className="text-xs"
            disabled={isInputDisabled() || (!currentInput.trim() && !(messages[messages.length - 1]?.sender === 'gia' && messages[messages.length - 1]?.options))}
        >
          {(isPending && (conversationStage === 'PROCESSING_AI' || conversationStage === 'PROCESSING_WAITLIST_SUB')) ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
