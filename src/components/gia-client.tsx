
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
import type { GenericQueryFormValues, WaitlistSubscriptionValues } from "@/lib/schemas"; // Changed to WaitlistSubscriptionValues

interface Message {
  id: string;
  text: string;
  sender: "user" | "gia";
  options?: Array<{ label: string, value: string }>;
}

type ConversationStage =
  | 'GREETING' // Initial GIA greeting
  | 'AWAITING_USER_NAME' // GIA asks for user's name
  | 'AWAITING_PET_NAME' // GIA asks for pet's name
  | 'AWAITING_PET_SPECIES' // GIA asks for pet's species
  | 'AWAITING_MAIN_QUESTION' // GIA asks for the main question
  | 'PROCESSING_AI' // Waiting for AI response to the main question
  | 'AI_RESPONSE_DISPLAYED' // AI has responded, GIA will now offer waitlist
  | 'AWAITING_WAITLIST_DECISION' // GIA asks if user wants to join waitlist
  | 'AWAITING_WAITLIST_EMAIL' // GIA asks for email for waitlist
  | 'PROCESSING_WAITLIST_SUB' // Submitting email to waitlist
  | 'WAITLIST_CONFIRMED' // Waitlist subscription confirmed
  | 'CONVO_ENDED_NO_WAITLIST' // User declined waitlist
  | 'CONVO_ENDED'; // Conversation explicitly ended

interface CollectedData {
  userName?: string;
  email?: string; // Will be collected only for waitlist
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
        setTimeout(() => {
          viewport.scrollTop = viewport.scrollHeight;
        }, 0);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0 && conversationStage === "GREETING") {
      addMessage("¡Hola! Soy GIA, tu asistente IA de PetSync. Para comenzar, ¿me podrías decir tu nombre?", "gia");
      setConversationStage("AWAITING_USER_NAME");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const stagesRequiringTextInput: ConversationStage[] = [
      'AWAITING_USER_NAME',
      'AWAITING_PET_NAME',
      'AWAITING_PET_SPECIES',
      'AWAITING_MAIN_QUESTION',
      'AWAITING_WAITLIST_EMAIL'
    ];
    const shouldFocus = stagesRequiringTextInput.includes(conversationStage) && !isInputCurrentlyDisabled();

    if (shouldFocus) {
      inputRef.current?.focus();
    }
  }, [conversationStage, messages, isPending]);


  const handleOptionClick = (value: string, label: string) => {
    addMessage(label, 'user');
    sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    setCurrentInput(""); // Clear input after option click

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
            // Reset question and related pet info, keep userName and email (if provided for waitlist)
            setCollectedData(prev => ({ userName: prev.userName, email: prev.email, petName: undefined, species: undefined, question: undefined }));
            addMessage("Claro, ¿cuál es tu nueva pregunta? Si es sobre una mascota diferente, dímelo primero.", "gia");
            setConversationStage('AWAITING_MAIN_QUESTION'); // Or a stage to re-confirm pet if needed
        } else if (value === 'end_convo') {
            addMessage("¡Gracias por chatear conmigo! Que tengas un buen día. 🐾", "gia");
            setConversationStage('CONVO_ENDED');
        }
    }
  };

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const userInput = currentInput.trim();

    if (!userInput && !['AI_RESPONSE_DISPLAYED', 'AWAITING_WAITLIST_DECISION', 'WAITLIST_CONFIRMED', 'CONVO_ENDED_NO_WAITLIST'].includes(conversationStage)) {
      return; // Don't send empty messages unless it's a stage where GIA expects an action (like clicking a button handled by handleOptionClick)
    }
    
    if (userInput) {
      addMessage(userInput, "user");
      sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    }
    setCurrentInput("");

    let nextStage: ConversationStage = conversationStage;
    let giaMessage = "";
    let giaOptions: Array<{ label: string, value: string }> | undefined = undefined;

    switch (conversationStage) {
      case 'AWAITING_USER_NAME':
        setCollectedData(prev => ({ ...prev, userName: userInput || undefined }));
        giaMessage = `¡Un gusto, ${userInput || 'usuario'}! Ahora, cuéntame sobre tu mascota. ¿Cuál es su nombre?`;
        nextStage = 'AWAITING_PET_NAME';
        break;
      case 'AWAITING_PET_NAME':
        setCollectedData(prev => ({ ...prev, petName: userInput || undefined }));
        giaMessage = `¡Lindo nombre${userInput ? ` para ${userInput}` : ''}! ¿Cuál es su especie? (Ej: Perro, Gato)`;
        nextStage = 'AWAITING_PET_SPECIES';
        break;
      case 'AWAITING_PET_SPECIES':
        if (!userInput) {
            giaMessage = "Por favor, indícame la especie de tu mascota (Ej: Perro, Gato).";
            // nextStage remains AWAITING_PET_SPECIES
            break;
        }
        setCollectedData(prev => ({ ...prev, species: userInput }));
        giaMessage = `Muy bien, ${collectedData.userName || 'dime'}. ¿En qué puedo ayudarte hoy con ${collectedData.petName || 'tu mascota'} (${userInput})?`;
        nextStage = 'AWAITING_MAIN_QUESTION';
        break;
      case 'AWAITING_MAIN_QUESTION':
        if (!userInput) {
            giaMessage = "Por favor, escribe tu pregunta.";
            // nextStage remains AWAITING_MAIN_QUESTION
            break;
        }
        setCollectedData(prev => ({ ...prev, question: userInput }));
        nextStage = 'PROCESSING_AI';
        startTransition(async () => {
          const payload: GenericQueryFormValues = {
            userName: collectedData.userName,
            // email is not sent to AI initially
            petName: collectedData.petName,
            species: collectedData.species as string, 
            question: userInput,
          };
          const response = await askGenericQuestionAction(payload);
          if (response.success && response.data?.answer) {
            addMessage(response.data.answer, "gia");
            receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
          } else {
            addMessage(response.message || "GIA no pudo generar una respuesta en este momento.", "gia");
            toast({
              title: "Error de GIA",
              description: response.message || "No se pudo obtener una respuesta.",
              variant: "destructive",
            });
          }
          setConversationStage('AI_RESPONSE_DISPLAYED'); // Intermediate stage
          // Now trigger the waitlist offer
          addMessage("Espero que esta información te haya sido útil. PetSync está en desarrollo y pronto lanzaremos nuestra app completa. ¿Te gustaría unirte a nuestra waitlist para ser de los primeros en saber cuándo puedes descargarla y recibir novedades?", "gia", [{label: "Sí, ¡unirme a la waitlist!", value: "yes_waitlist"}, {label: "No, gracias por ahora", value: "no_waitlist"}]);
          setConversationStage('AWAITING_WAITLIST_DECISION');
        });
        return; // Return early as state transitions are handled within startTransition
        
      case 'AWAITING_WAITLIST_EMAIL':
         if (!userInput || !userInput.includes('@') || !userInput.includes('.')) {
            giaMessage = "Parece que ese no es un correo válido. Por favor, inténtalo de nuevo.";
            // nextStage remains AWAITING_WAITLIST_EMAIL
            break;
        }
        setCollectedData(prev => ({ ...prev, email: userInput }));
        nextStage = 'PROCESSING_WAITLIST_SUB';
        startTransition(async () => {
            const waitlistPayload: WaitlistSubscriptionValues = { email: userInput, userType: 'tutor' }; 
            const wlResponse = await subscribeToWaitlistAction(waitlistPayload);
            if (wlResponse.success) {
                addMessage(`¡Perfecto, ${userInput} ha sido añadido a nuestra waitlist! Te avisaremos en cuanto PetSync esté listo para despegar. ¿Hay algo más en lo que pueda ayudarte hoy?`, "gia", [{label: "Tengo otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
                receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
                setConversationStage('WAITLIST_CONFIRMED');
            } else {
                addMessage(`Hubo un problema al suscribirte: ${wlResponse.message || 'Intenta de nuevo más tarde.'} ¿Puedo ayudarte con algo más o finalizamos aquí?`, "gia", [{label: "Tengo otra pregunta", value: "new_question"}, {label: "Finalizar", value: "end_convo"}]);
                setConversationStage('AI_RESPONSE_DISPLAYED'); // Go back to a stage allowing further interaction or end
            }
        });
        return; // Return early

      // Handle cases where user types instead of clicking buttons after options are presented
      case 'AI_RESPONSE_DISPLAYED': // This stage is now very brief, immediately followed by AWAITING_WAITLIST_DECISION
      case 'AWAITING_WAITLIST_DECISION':
      case 'WAITLIST_CONFIRMED':
      case 'CONVO_ENDED_NO_WAITLIST':
        if (userInput) { // If user types something instead of clicking an option
            setCollectedData(prev => ({ ...prev, question: userInput })); // New question
            nextStage = 'PROCESSING_AI';
            startTransition(async () => {
              const payload: GenericQueryFormValues = {
                userName: collectedData.userName,
                petName: collectedData.petName,
                species: collectedData.species as string,
                question: userInput,
              };
              const response = await askGenericQuestionAction(payload);
              if (response.success && response.data?.answer) {
                addMessage(response.data.answer, "gia");
                receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
              } else {
                addMessage(response.message || "GIA no pudo generar una respuesta en este momento.", "gia");
              }
              setConversationStage('AI_RESPONSE_DISPLAYED');
              addMessage("Espero que esta información te haya sido útil. ¿Te gustaría unirte a nuestra waitlist para novedades de PetSync?", "gia", [{label: "Sí, ¡unirme!", value: "yes_waitlist"}, {label: "No, gracias", value: "no_waitlist"}]);
              setConversationStage('AWAITING_WAITLIST_DECISION');
            });
            return;
        }
        break; // If no user input, do nothing in these stages (wait for button click)

      default:
        giaMessage = "Algo no salió como esperaba. ¿Podemos intentarlo de nuevo?";
        nextStage = 'GREETING'; // Reset
        setMessages([]);
        setCollectedData({});
        // The GREETING useEffect will re-trigger the initial message
        break;
    }

    if (giaMessage) {
      addMessage(giaMessage, "gia", giaOptions);
      receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
    }
    if (nextStage !== conversationStage) {
      setConversationStage(nextStage);
    }
  };

  const isInputCurrentlyDisabled = (): boolean => {
    if (
      conversationStage === 'GREETING' ||
      conversationStage === 'PROCESSING_AI' ||
      conversationStage === 'PROCESSING_WAITLIST_SUB' ||
      conversationStage === 'CONVO_ENDED'
    ) {
      return true;
    }
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'gia' && lastMessage?.options && lastMessage.options.length > 0) {
      return true;
    }
    // Enable input for these stages if GIA isn't presenting options
    if (
      conversationStage === 'AWAITING_USER_NAME' ||
      conversationStage === 'AWAITING_PET_NAME' ||
      conversationStage === 'AWAITING_PET_SPECIES' ||
      conversationStage === 'AWAITING_MAIN_QUESTION' ||
      conversationStage === 'AWAITING_WAITLIST_EMAIL'
    ) {
      return false; // Explicitly enable if no GIA options are pending
    }
    return true; // Default to disabled for other states or if conditions not met
  };

  const getPlaceholderText = (): string => {
    if (isInputCurrentlyDisabled()) {
      if (conversationStage === 'PROCESSING_AI') return "GIA está pensando...";
      if (conversationStage === 'PROCESSING_WAITLIST_SUB') return "Procesando suscripción...";
      if (conversationStage === 'CONVO_ENDED') return "Conversación finalizada.";
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.sender === 'gia' && lastMessage?.options && lastMessage.options.length > 0) { 
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
                      disabled={isPending}
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
          disabled={isInputCurrentlyDisabled()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isInputCurrentlyDisabled()) {
                handleSendMessage(e as any);
            }
          }}
        />
        <Button
            type="submit"
            size="sm"
            className="text-xs"
            disabled={isInputCurrentlyDisabled() || (!currentInput.trim() && !['AI_RESPONSE_DISPLAYED', 'AWAITING_WAITLIST_DECISION', 'WAITLIST_CONFIRMED', 'CONVO_ENDED_NO_WAITLIST'].includes(conversationStage) && !(messages[messages.length - 1]?.sender === 'gia' && messages[messages.length - 1]?.options))}
        >
          {(isPending && (conversationStage === 'PROCESSING_AI' || conversationStage === 'PROCESSING_WAITLIST_SUB')) ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}

