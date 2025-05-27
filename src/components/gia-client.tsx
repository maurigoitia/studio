
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { askGenericQuestionAction, subscribeToWaitlistAction } from "@/app/actions";
import { useState, useTransition, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { Loader2, Send, Bot, UserCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { GenericQueryFormValues, WaitlistSubscriptionValues } from "@/lib/schemas";

interface MessageOption { label: string; value: string; }
interface Message { id: string; text: string; sender: "user" | "gia"; options?: MessageOption[]; }

type ConversationStage =
  | "INIT"
  | "AWAITING_USER_NAME"
  | "AWAITING_PET_NAME"
  | "AWAITING_PET_SPECIES"
  | "AWAITING_MAIN_QUESTION"
  | "PROCESSING_AI_QUESTION"
  | "AI_RESPONSE_RECEIVED" // Corrected from AI_YoutubeED
  | "AWAITING_WAITLIST_DECISION"
  | "AWAITING_WAITLIST_EMAIL"
  | "PROCESSING_WAITLIST_EMAIL"
  | "WAITLIST_EMAIL_CONFIRMED" // Renamed from WAITLIST_CONFIRMED for clarity
  | "AWAITING_FURTHER_ACTION"
  | "CONVO_ENDED";

interface CollectedData {
  userName?: string;
  petName?: string;
  species?: string;
  question?: string;
  emailForWaitlist?: string;
}

export default function GIAClient() {
  const { toast } = useToast();
  const [isLoadingResponse, setIsLoadingResponse] = useState(false); // For AI question processing
  const [isProcessingWaitlist, setIsProcessingWaitlist] = useState(false); // For waitlist email processing
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [conversationStage, setConversationStage] = useState<ConversationStage>("INIT");
  const [collectedData, setCollectedData] = useState<CollectedData>({});
  const [isGiaTyping, setIsGiaTyping] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentAudioRef = useRef<HTMLAudioElement | null>(null);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) setTimeout(() => { viewport.scrollTop = viewport.scrollHeight; }, 50); // Adjusted delay
    }
  }, [messages.length, isGiaTyping, isLoadingResponse]); // Depend on messages.length to ensure scroll on new message

  useEffect(() => {
    sentAudioRef.current = new Audio('/sounds/message-sent.mp3');
    receivedAudioRef.current = new Audio('/sounds/message-received.mp3');
  }, []);

  useEffect(() => {
    if (conversationStage === "INIT" && messages.length === 0) {
      simulateGiaTypingAndRespond(
        "¡Hola! Soy GIA, tu asistente IA de PetSync. Para comenzar, ¿me podrías decir tu nombre? (Opcional, puedes presionar Enter para omitir)",
        "AWAITING_USER_NAME"
      );
    }
  }, [conversationStage, messages.length]);

  const isInputDisabled = (): boolean => {
    if (isLoadingResponse || isProcessingWaitlist || isGiaTyping || conversationStage === 'CONVO_ENDED' || conversationStage === 'INIT') {
      return true;
    }
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'gia' && lastMessage?.options && lastMessage.options.length > 0) {
      return true;
    }
    const allowedInputStages: ConversationStage[] = [
      'AWAITING_USER_NAME',
      'AWAITING_PET_NAME',
      'AWAITING_PET_SPECIES',
      'AWAITING_MAIN_QUESTION',
      'AWAITING_WAITLIST_EMAIL'
    ];
    return !allowedInputStages.includes(conversationStage);
  };
  
  useEffect(() => {
    if (!isInputDisabled()) {
      inputRef.current?.focus();
    }
  }, [conversationStage, messages, isLoadingResponse, isProcessingWaitlist, isGiaTyping]);


  const addGiaMessage = (text: string, options?: MessageOption[]) => {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), text, sender: "gia", options }]);
    if(!isGiaTyping) receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), text, sender: "user" }]);
    sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
  };
  
  const simulateGiaTypingAndRespond = (text: string, nextStage: ConversationStage, options?: MessageOption[], delay = 700) => {
    setIsGiaTyping(true);
    setTimeout(() => {
      setIsGiaTyping(false);
      addGiaMessage(text, options);
      setConversationStage(nextStage);
    }, delay);
  };

  const processUserInput = (userInput: string) => {
    let newCollectedData = { ...collectedData };
    switch (conversationStage) {
      case "AWAITING_USER_NAME":
        newCollectedData.userName = userInput.trim() || undefined;
        setCollectedData(newCollectedData);
        simulateGiaTypingAndRespond(`¡Hola ${newCollectedData.userName || 'por allí'}! Ahora, sobre tu mascota. ¿Cuál es su nombre? (Opcional)`, "AWAITING_PET_NAME");
        break;
      case "AWAITING_PET_NAME":
        newCollectedData.petName = userInput.trim() || undefined;
        setCollectedData(newCollectedData);
        simulateGiaTypingAndRespond(`Entendido. ¿Y cuál es la especie de ${newCollectedData.petName || 'tu mascota'}? (Ej: Perro, Gato) *Requerido*`, "AWAITING_PET_SPECIES");
        break;
      case "AWAITING_PET_SPECIES":
        if (!userInput.trim()) {
          simulateGiaTypingAndRespond("Por favor, indícame la especie de tu mascota para continuar.", "AWAITING_PET_SPECIES");
          return;
        }
        newCollectedData.species = userInput.trim();
        setCollectedData(newCollectedData);
        const petNameDisplay = newCollectedData.petName || "tu mascota";
        const userNameDisplay = newCollectedData.userName || "dime";
        simulateGiaTypingAndRespond(`Perfecto, un/a ${newCollectedData.species}. Ahora sí, ${userNameDisplay}, ¿en qué puedo ayudarte hoy con ${petNameDisplay}?`, "AWAITING_MAIN_QUESTION");
        break;
      case "AWAITING_MAIN_QUESTION":
        if (!userInput.trim()) {
          simulateGiaTypingAndRespond("Por favor, escribe tu consulta para GIA.", "AWAITING_MAIN_QUESTION");
          return;
        }
        newCollectedData.question = userInput.trim();
        setCollectedData(newCollectedData);
        setIsLoadingResponse(true);
        setConversationStage("PROCESSING_AI_QUESTION"); 
        
        startTransition(async () => {
          const payload: GenericQueryFormValues = {
            userName: newCollectedData.userName,
            petName: newCollectedData.petName,
            species: newCollectedData.species!,
            question: newCollectedData.question!,
          };
          const response = await askGenericQuestionAction(payload);
          setIsLoadingResponse(false);
          if (response.success && response.data?.answer) {
            addGiaMessage(response.data.answer);
            setConversationStage("AI_RESPONSE_RECEIVED");
          } else {
            addGiaMessage(response.message || "GIA no pudo generar una respuesta en este momento. Inténtalo de nuevo más tarde.");
            setConversationStage("AWAITING_FURTHER_ACTION");
          }
        });
        break;
      case "AWAITING_WAITLIST_EMAIL":
        if (!userInput.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput.trim())) {
          simulateGiaTypingAndRespond("Por favor, introduce un correo electrónico válido.", "AWAITING_WAITLIST_EMAIL");
          return;
        }
        newCollectedData.emailForWaitlist = userInput.trim();
        setCollectedData(newCollectedData);
        setIsProcessingWaitlist(true);
        setConversationStage("PROCESSING_WAITLIST_EMAIL");
        startTransition(async () => {
          const payload: WaitlistSubscriptionValues = { email: newCollectedData.emailForWaitlist! };
          const response = await subscribeToWaitlistAction(payload);
          setIsProcessingWaitlist(false);
          addGiaMessage(response.message || (response.success ? `¡Perfecto, ${newCollectedData.emailForWaitlist} añadido a la waitlist!` : "Hubo un problema."));
          if (response.success) {
            setConversationStage("WAITLIST_EMAIL_CONFIRMED");
          } else {
            setConversationStage("AWAITING_FURTHER_ACTION"); // Or a specific error stage
          }
        });
        break;
      default:
        console.warn("processUserInput called in unhandled stage:", conversationStage);
        break;
    }
  };

  const handleOptionClick = async (optionValue: string) => {
    const selectedOption = messages[messages.length - 1]?.options?.find(opt => opt.value === optionValue);
    if(selectedOption) addUserMessage(selectedOption.label);

    switch (conversationStage) {
      case "AWAITING_WAITLIST_DECISION":
        if (optionValue === "join_waitlist_yes") {
          simulateGiaTypingAndRespond("¡Genial! Para sumarte, por favor, déjame tu correo electrónico.", "AWAITING_WAITLIST_EMAIL");
        } else if (optionValue === "join_waitlist_no") {
          simulateGiaTypingAndRespond("Entendido. ¡Gracias por chatear conmigo! Si cambias de opinión, siempre puedes encontrar el enlace a nuestra waitlist en la página principal.", "AWAITING_FURTHER_ACTION");
        }
        break;
      case "AWAITING_FURTHER_ACTION":
        if (optionValue === "ask_another_question") {
          setCollectedData(prev => ({ ...prev, question: undefined }));
          const petNameDisplay = collectedData.petName || "tu mascota";
          const userNameDisplay = collectedData.userName || "dime";
          simulateGiaTypingAndRespond(`Claro, ${userNameDisplay}. ¿Qué más quieres preguntar sobre ${petNameDisplay}?`, "AWAITING_MAIN_QUESTION");
        } else if (optionValue === "end_conversation") {
          simulateGiaTypingAndRespond("¡Gracias por usar PetSync! Que tengas un buen día. 🐾", "CONVO_ENDED");
        }
        break;
      default:
        console.warn("handleOptionClick called in unhandled stage:", conversationStage, "with option:", optionValue);
        break;
    }
  };
  
  useEffect(() => {
    if (conversationStage === "AI_RESPONSE_RECEIVED") {
      setIsGiaTyping(true); 
      const waitlistOfferTimeout = setTimeout(() => {
        setIsGiaTyping(false);
        addGiaMessage(
          "Espero que esta información te haya sido útil. PetSync está en desarrollo y pronto lanzaremos nuestra app completa. ¿Te gustaría unirte a nuestra waitlist para ser de los primeros en saber cuándo puedes descargarla y recibir novedades?",
          [{ label: "Sí, ¡unirme a la waitlist!", value: "join_waitlist_yes" }, { label: "No, gracias por ahora", value: "join_waitlist_no" }]
        );
        setConversationStage("AWAITING_WAITLIST_DECISION");
      }, 1200); // Adjusted delay 
      return () => clearTimeout(waitlistOfferTimeout);
    }
  }, [conversationStage]);

  useEffect(() => {
    if (conversationStage === "WAITLIST_EMAIL_CONFIRMED" || conversationStage === "AWAITING_FURTHER_ACTION") {
       // If just confirmed email, next immediate step is AWAITING_FURTHER_ACTION
      if (conversationStage === "WAITLIST_EMAIL_CONFIRMED") {
        setConversationStage("AWAITING_FURTHER_ACTION"); // Transition immediately
        return; // Prevent duplicate further action prompt
      }
      simulateGiaTypingAndRespond(
        "¿Hay algo más en lo que pueda ayudarte hoy?",
        "AWAITING_FURTHER_ACTION",
        [{ label: "Hacer otra pregunta", value: "ask_another_question" }, { label: "Finalizar conversación", value: "end_conversation" }]
      );
    }
  }, [conversationStage]);


  const handleSendMessage = async (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    if (e && 'preventDefault' in e) e.preventDefault();
    
    const userInput = currentInput.trim();

    if (isInputDisabled()) return;

    const optionalSkipStages: ConversationStage[] = ['AWAITING_USER_NAME', 'AWAITING_PET_NAME'];
    if (!userInput && optionalSkipStages.includes(conversationStage)) {
        addUserMessage("(Omitido)");
        setCurrentInput("");
        processUserInput("");
        return;
    }
    
    if (!userInput) { // For required fields or general empty submission
        // Re-prompt logic is handled within processUserInput for specific stages
        // Or we can add a generic "Por favor, escribe algo" if desired for stages like AWAITING_MAIN_QUESTION
        if (conversationStage === 'AWAITING_PET_SPECIES' || conversationStage === 'AWAITING_MAIN_QUESTION' || conversationStage === 'AWAITING_WAITLIST_EMAIL') {
            // Let processUserInput handle re-prompting
        } else {
            return; // Do nothing for other stages if input is empty
        }
    }
    
    addUserMessage(userInput);
    setCurrentInput("");
    processUserInput(userInput);
  };

  const getPlaceholderText = (): string => {
    if (isGiaTyping) return "GIA está escribiendo...";
    if (isLoadingResponse) return "Procesando tu solicitud...";
    if (isProcessingWaitlist) return "Procesando suscripción...";

    switch (conversationStage) {
      case "INIT": return "Cargando...";
      case "AWAITING_USER_NAME": return "Escribe tu nombre o presiona Enter...";
      case "AWAITING_PET_NAME": return "Nombre de tu mascota o Enter...";
      case "AWAITING_PET_SPECIES": return "Especie (Ej: Perro, Gato)...";
      case "AWAITING_MAIN_QUESTION": return "¿En qué te puedo ayudar hoy?";
      case "AWAITING_WAITLIST_EMAIL": return "Tu correo electrónico...";
      case "AWAITING_WAITLIST_DECISION": return "Selecciona una opción...";
      case "AWAITING_FURTHER_ACTION": return "Selecciona una opción...";
      case "WAITLIST_EMAIL_CONFIRMED": return "Selecciona una opción...";
      case "CONVO_ENDED": return "Conversación finalizada.";
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
              "flex items-start space-x-2 max-w-[85%] mb-3 text-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out",
              msg.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
            )}
          >
            {msg.sender === 'gia' && (
              <Avatar className="h-7 w-7 self-start shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <div
                className={cn(
                  "p-2.5 rounded-lg shadow-sm break-words",
                  msg.sender === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card border text-card-foreground rounded-bl-none"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'gia' && msg.options && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.options.map(option => (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleOptionClick(option.value)}
                      className="text-xs bg-card hover:bg-secondary"
                      disabled={isGiaTyping || isLoadingResponse || isProcessingWaitlist}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
             {msg.sender === 'user' && (
              <Avatar className="h-7 w-7 self-start shrink-0">
                 <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <UserCircle className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {(isGiaTyping || isLoadingResponse || isProcessingWaitlist) && (
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3 animate-in fade-in-0 duration-300">
             <Avatar className="h-7 w-7 self-start shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            <div className="bg-card border text-card-foreground p-2.5 rounded-lg shadow-sm rounded-bl-none">
              <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>
                  {isLoadingResponse ? "Procesando tu solicitud..." : 
                  (isProcessingWaitlist ? "Procesando suscripción..." : 
                  (isGiaTyping ? "GIA está escribiendo..." : ""))}
                </span>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>

      <form 
        onSubmit={handleSendMessage} 
        className="p-2 sm:p-3 border-t bg-background flex items-center space-x-2"
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder={getPlaceholderText()}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-grow bg-input text-sm"
          disabled={isInputDisabled()}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled()) {
                handleSendMessage(e);
            }
          }}
        />
        <Button
            type="submit"
            size="default" 
            className="text-sm px-3 sm:px-4" 
            disabled={isInputDisabled() || isLoadingResponse || isProcessingWaitlist}
        >
          {isLoadingResponse || isProcessingWaitlist ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}

    