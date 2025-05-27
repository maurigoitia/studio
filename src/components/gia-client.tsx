
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
  | "POST_AI_RESPONSE_AWAIT_WAITLIST_DECISION" // Renamed from AI_YoutubeED
  | "AWAITING_WAITLIST_DECISION"
  | "AWAITING_WAITLIST_EMAIL"
  | "PROCESSING_WAITLIST_EMAIL"
  // | "WAITLIST_EMAIL_CONFIRMED" // Stage can be skipped, directly go to AWAITING_FURTHER_ACTION_CHOICE
  | "AWAITING_FURTHER_ACTION_CHOICE" // Renamed from AWAITING_FURTHER_ACTION
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
  const [isProcessing, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [conversationStage, setConversationStage] = useState<ConversationStage>("INIT");
  const [collectedData, setCollectedData] = useState<CollectedData>({});
  const [isGiaTyping, setIsGiaTyping] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentAudioRef = useRef<HTMLAudioElement | null>(null);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Effects ---
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) setTimeout(() => { viewport.scrollTop = viewport.scrollHeight; }, 100);
    }
  }, [messages, isGiaTyping, isProcessing]);

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
    if (
      conversationStage === 'INIT' ||
      conversationStage === 'PROCESSING_AI_QUESTION' ||
      conversationStage === 'PROCESSING_WAITLIST_EMAIL' ||
      conversationStage === 'CONVO_ENDED' ||
      isGiaTyping
    ) {
      return true;
    }
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'gia' && lastMessage?.options && lastMessage.options.length > 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const canFocusInput =
      !isInputDisabled() &&
      (conversationStage === 'AWAITING_USER_NAME' ||
       conversationStage === 'AWAITING_PET_NAME' ||
       conversationStage === 'AWAITING_PET_SPECIES' ||
       conversationStage === 'AWAITING_MAIN_QUESTION' ||
       conversationStage === 'AWAITING_WAITLIST_EMAIL');

    if (canFocusInput) {
      inputRef.current?.focus();
    }
  }, [conversationStage, messages, isProcessing, isGiaTyping]);


  // --- Message Handling ---
  const addGiaMessage = (text: string, options?: MessageOption[]) => {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), text, sender: "gia", options }]);
    if(!isGiaTyping) receivedAudioRef.current?.play().catch(e => console.warn("Error playing received sound:", e));
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), text, sender: "user" }]);
    sentAudioRef.current?.play().catch(e => console.warn("Error playing sent sound:", e));
  };
  
  const simulateGiaTypingAndRespond = (text: string, nextStage: ConversationStage, options?: MessageOption[], delay = 700) => {
    setIsGiaTyping(true);
    // setConversationStage(nextStage); // Set stage after typing for some cases, or before for others
    setTimeout(() => {
      setIsGiaTyping(false);
      addGiaMessage(text, options);
      setConversationStage(nextStage); // Set stage after message is added and GIA stops typing
      receivedAudioRef.current?.play().catch(e => console.warn("Error playing received sound:", e));
    }, delay);
  };

  // --- Conversation Logic ---
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
        setConversationStage("PROCESSING_AI_QUESTION");
        startTransition(async () => {
          const payload: GenericQueryFormValues = {
            userName: newCollectedData.userName,
            petName: newCollectedData.petName,
            species: newCollectedData.species!,
            question: newCollectedData.question!,
          };
          const response = await askGenericQuestionAction(payload);
          if (response.success && response.data?.answer) {
            addGiaMessage(response.data.answer);
          } else {
            addGiaMessage(response.message || "GIA no pudo generar una respuesta en este momento. Inténtalo de nuevo más tarde.");
          }
          setConversationStage("POST_AI_RESPONSE_AWAIT_WAITLIST_DECISION");
        });
        break;
      case "AWAITING_WAITLIST_EMAIL":
        if (!userInput.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput.trim())) {
          simulateGiaTypingAndRespond("Por favor, introduce un correo electrónico válido.", "AWAITING_WAITLIST_EMAIL");
          return;
        }
        newCollectedData.emailForWaitlist = userInput.trim();
        setCollectedData(newCollectedData);
        setConversationStage("PROCESSING_WAITLIST_EMAIL");
        startTransition(async () => {
          const payload: WaitlistSubscriptionValues = { email: newCollectedData.emailForWaitlist! };
          const response = await subscribeToWaitlistAction(payload);
          if (response.success) {
            addGiaMessage(`¡Perfecto, ${newCollectedData.emailForWaitlist} ha sido añadido a nuestra waitlist! Te avisaremos en cuanto PetSync esté listo para despegar.`);
          } else {
            addGiaMessage(response.message || "Hubo un problema al registrar tu correo. Inténtalo más tarde o usa el formulario principal.");
          }
          setConversationStage("AWAITING_FURTHER_ACTION_CHOICE");
        });
        break;
      default:
        // Should not happen if logic is correct
        console.warn("processUserInput called in unhandled stage:", conversationStage);
        break;
    }
  };

  const handleOptionClick = async (optionValue: string) => {
    const selectedOption = messages[messages.length - 1]?.options?.find(opt => opt.value === optionValue);
    if(selectedOption) {
        addUserMessage(selectedOption.label);
    }

    switch (conversationStage) {
      case "AWAITING_WAITLIST_DECISION":
        if (optionValue === "join_waitlist_yes") {
          simulateGiaTypingAndRespond("¡Genial! Para sumarte, por favor, déjame tu correo electrónico.", "AWAITING_WAITLIST_EMAIL");
        } else if (optionValue === "join_waitlist_no") {
          addGiaMessage("Entendido. ¡Gracias por chatear conmigo! Si cambias de opinión, siempre puedes encontrar el enlace a nuestra waitlist en la página principal.");
          setConversationStage("AWAITING_FURTHER_ACTION_CHOICE");
        }
        break;
      case "AWAITING_FURTHER_ACTION_CHOICE":
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
         // Should not happen if logic is correct
        console.warn("handleOptionClick called in unhandled stage:", conversationStage);
        break;
    }
  };
  
  useEffect(() => {
    if (conversationStage === "POST_AI_RESPONSE_AWAIT_WAITLIST_DECISION") {
      simulateGiaTypingAndRespond(
        "Espero que esta información te haya sido útil. PetSync está en desarrollo y pronto lanzaremos nuestra app completa. ¿Te gustaría unirte a nuestra waitlist para ser de los primeros en saber cuándo puedes descargarla y recibir novedades?",
        "AWAITING_WAITLIST_DECISION",
        [{ label: "Sí, ¡unirme!", value: "join_waitlist_yes" }, { label: "No, gracias", value: "join_waitlist_no" }]
      );
    }
  }, [conversationStage]);

  useEffect(() => {
    if (conversationStage === "AWAITING_FURTHER_ACTION_CHOICE") {
      simulateGiaTypingAndRespond(
        "¿Hay algo más en lo que pueda ayudarte hoy?",
        "AWAITING_FURTHER_ACTION_CHOICE", // Stage remains here until option is clicked
        [{ label: "Hacer otra pregunta", value: "ask_another_question" }, { label: "Finalizar conversación", value: "end_conversation" }]
      );
    }
  }, [conversationStage]);


  const handleSendMessage = async (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    if (e && 'preventDefault' in e) e.preventDefault();
    
    const userInput = currentInput.trim();

    // Allow empty input for optional fields (user name, pet name) by just pressing Enter
    if (!userInput && !(conversationStage === 'AWAITING_USER_NAME' || conversationStage === 'AWAITING_PET_NAME')) {
      // For required fields, if input is empty, don't proceed unless it's an optional skip
      if (conversationStage === 'AWAITING_PET_SPECIES' || conversationStage === 'AWAITING_MAIN_QUESTION' || conversationStage === 'AWAITING_WAITLIST_EMAIL'){
         // Optionally prompt again or simply do nothing / return
         // For now, let processUserInput handle re-prompting if necessary
      } else {
        // If not a required field and not explicitly skippable by empty string, do nothing
        return;
      }
    }
    
    if (isInputDisabled()) return;

    addUserMessage(userInput || "(Omitido)");
    setCurrentInput("");
    processUserInput(userInput);
  };

  const getPlaceholderText = (): string => {
    if (isGiaTyping) return "GIA está escribiendo...";
    if (isProcessing) return "Procesando..."; // For AI or Waitlist backend calls
    switch (conversationStage) {
      case "AWAITING_USER_NAME": return "Escribe tu nombre o presiona Enter...";
      case "AWAITING_PET_NAME": return "Nombre de tu mascota o Enter...";
      case "AWAITING_PET_SPECIES": return "Especie (Ej: Perro, Gato)...";
      case "AWAITING_MAIN_QUESTION": return "¿En qué te puedo ayudar hoy?";
      case "AWAITING_WAITLIST_EMAIL": return "Tu correo electrónico...";
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
              <Avatar className="h-7 w-7 self-start">
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
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
             {msg.sender === 'user' && (
              <Avatar className="h-7 w-7 self-start">
                 <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <UserCircle className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {(isGiaTyping || isProcessing) && (
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3 animate-in fade-in-0 duration-300">
             <Avatar className="h-7 w-7 self-start">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            <div className="bg-card border text-card-foreground p-2.5 rounded-lg shadow-sm rounded-bl-none">
              <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>{isGiaTyping ? "GIA está escribiendo..." : "Procesando..."}</span>
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
            size="default" // Changed from sm to default for better tap target
            className="text-sm px-3 sm:px-4" // Adjusted padding
            disabled={isInputDisabled()}
        >
          {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}

    