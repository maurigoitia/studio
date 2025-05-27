
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
  | "INIT" // Estado inicial antes de cualquier mensaje
  | "AWAITING_USER_NAME"
  | "AWAITING_PET_NAME"
  | "AWAITING_PET_SPECIES"
  | "AWAITING_MAIN_QUESTION"
  | "PROCESSING_AI_QUESTION"
  | "POST_AI_RESPONSE_AWAIT_WAITLIST_DECISION" 
  | "AWAITING_WAITLIST_DECISION"
  | "AWAITING_WAITLIST_EMAIL"
  | "PROCESSING_WAITLIST_EMAIL"
  | "AWAITING_FURTHER_ACTION_CHOICE" 
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
  const [isProcessing, startTransition] = useTransition(); // Para llamadas al backend (AI o Waitlist)
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [conversationStage, setConversationStage] = useState<ConversationStage>("INIT");
  const [collectedData, setCollectedData] = useState<CollectedData>({});
  const [isGiaTyping, setIsGiaTyping] = useState(false); // Para simular que GIA "escribe" mensajes predefinidos

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentAudioRef = useRef<HTMLAudioElement | null>(null);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Efectos ---
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
    // Saludo inicial de GIA: Se ejecuta solo una vez cuando el componente se monta.
    if (messages.length === 0 && conversationStage === "INIT") {
      simulateGiaTypingAndRespond(
        "¡Hola! Soy GIA, tu asistente IA de PetSync. Para comenzar, ¿me podrías decir tu nombre? (Opcional, puedes presionar Enter para omitir)",
        "AWAITING_USER_NAME"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array de dependencias VACÍO para que se ejecute SOLO UNA VEZ.


  const isInputCurrentlyDisabled = (): boolean => {
    // Etapas donde el input DEBE estar SIEMPRE deshabilitado:
    if (
      conversationStage === 'INIT' || 
      conversationStage === 'PROCESSING_AI_QUESTION' || 
      conversationStage === 'PROCESSING_WAITLIST_EMAIL' ||
      conversationStage === 'CONVO_ENDED' ||
      isGiaTyping // Siempre deshabilitado si GIA está "escribiendo"
    ) {
      return true;
    }
  
    // Si la última acción de GIA fue presentar botones, el input debe estar deshabilitado
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'gia' && lastMessage?.options && lastMessage.options.length > 0) {
      return true;
    }
    
    // Habilitado en etapas específicas de espera de input del usuario,
    // siempre y cuando GIA no esté escribiendo ni haya presentado opciones.
    const awaitingUserInputStages: ConversationStage[] = [
      'AWAITING_USER_NAME',
      'AWAITING_PET_NAME',
      'AWAITING_PET_SPECIES',
      'AWAITING_MAIN_QUESTION',
      'AWAITING_WAITLIST_EMAIL'
    ];

    if (awaitingUserInputStages.includes(conversationStage)) {
      return false; // Habilitado si estamos en una de estas etapas y las condiciones anteriores no se cumplieron
    }
  
    // Por defecto, si no es una etapa clara de input del usuario, deshabilitar.
    return true;
  };

  useEffect(() => {
    const canFocusInput = !isInputCurrentlyDisabled();
    if (canFocusInput) {
      inputRef.current?.focus();
    }
  }, [conversationStage, messages, isGiaTyping, isProcessing]); // Re-evaluar foco cuando cambian estos estados


  // --- Manejo de Mensajes ---
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
    // setConversationStage(nextStage); // No cambiar etapa aquí para evitar re-renders que afecten el input
    setTimeout(() => {
      setIsGiaTyping(false);
      addGiaMessage(text, options);
      setConversationStage(nextStage); // Cambiar etapa DESPUÉS de que GIA "terminó de escribir"
      // Sonido ya se reproduce en addGiaMessage
    }, delay);
  };

  // --- Lógica de la Conversación ---
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
            email: newCollectedData.emailForWaitlist, // El email se recoge después si se une a waitlist
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
          // Transición a la etapa de decisión de waitlist
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
          // Usar el schema WaitlistSubscriptionValues para la acción de suscripción
          const payload: WaitlistSubscriptionValues = { email: newCollectedData.emailForWaitlist! };
          const response = await subscribeToWaitlistAction(payload); // Usar la acción de suscripción
          if (response.success) {
            addGiaMessage(`¡Perfecto, ${newCollectedData.emailForWaitlist} ha sido añadido a nuestra waitlist! Te avisaremos en cuanto PetSync esté listo para despegar.`);
          } else {
            addGiaMessage(response.message || "Hubo un problema al registrar tu correo. Inténtalo más tarde o usa el formulario principal.");
          }
          setConversationStage("AWAITING_FURTHER_ACTION_CHOICE");
        });
        break;
      default:
        console.warn("processUserInput called in unhandled stage:", conversationStage);
        break;
    }
  };

  const handleOptionClick = async (optionValue: string) => {
    const selectedOption = messages[messages.length - 1]?.options?.find(opt => opt.value === optionValue);
    if(selectedOption) {
        addUserMessage(selectedOption.label); // Muestra la opción seleccionada como mensaje del usuario
    } else {
        // Si no hay opción (ej. un "Enter" en un campo opcional que no debería llegar aquí)
        // o si el usuario escribe cuando debería presionar un botón.
        // La lógica de isInputCurrentlyDisabled debería prevenir esto.
        return;
    }

    switch (conversationStage) {
      case "AWAITING_WAITLIST_DECISION":
        if (optionValue === "join_waitlist_yes") {
          simulateGiaTypingAndRespond("¡Genial! Para sumarte, por favor, déjame tu correo electrónico.", "AWAITING_WAITLIST_EMAIL");
        } else if (optionValue === "join_waitlist_no") {
          simulateGiaTypingAndRespond("Entendido. ¡Gracias por chatear conmigo! Si cambias de opinión, siempre puedes encontrar el enlace a nuestra waitlist en la página principal.", "AWAITING_FURTHER_ACTION_CHOICE");
        }
        break;
      case "AWAITING_FURTHER_ACTION_CHOICE":
        if (optionValue === "ask_another_question") {
          setCollectedData(prev => ({ ...prev, question: undefined })); // Limpiar pregunta anterior
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
  
  // Efecto para manejar la lógica después de que la IA responde
  useEffect(() => {
    if (conversationStage === "POST_AI_RESPONSE_AWAIT_WAITLIST_DECISION") {
      simulateGiaTypingAndRespond(
        "Espero que esta información te haya sido útil. PetSync está en desarrollo y pronto lanzaremos nuestra app completa. ¿Te gustaría unirte a nuestra waitlist para ser de los primeros en saber cuándo puedes descargarla y recibir novedades?",
        "AWAITING_WAITLIST_DECISION",
        [{ label: "Sí, ¡unirme!", value: "join_waitlist_yes" }, { label: "No, gracias", value: "join_waitlist_no" }]
      );
    }
  }, [conversationStage]);

  // Efecto para manejar la lógica de "acciones adicionales"
  useEffect(() => {
    if (conversationStage === "AWAITING_FURTHER_ACTION_CHOICE") {
      simulateGiaTypingAndRespond(
        "¿Hay algo más en lo que pueda ayudarte hoy?",
        "AWAITING_FURTHER_ACTION_CHOICE", // La etapa se mantiene aquí hasta que se haga clic
        [{ label: "Hacer otra pregunta", value: "ask_another_question" }, { label: "Finalizar conversación", value: "end_conversation" }]
      );
    }
  }, [conversationStage]);


  const handleSendMessage = async (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    if (e && 'preventDefault' in e) e.preventDefault();
    
    const userInput = currentInput.trim();

    if (isInputCurrentlyDisabled()) return; // Usa la función renombrada

    // Permitir Enter para omitir campos opcionales (userName, petName)
    const optionalSkipStages: ConversationStage[] = ['AWAITING_USER_NAME', 'AWAITING_PET_NAME'];
    if (!userInput && optionalSkipStages.includes(conversationStage)) {
        addUserMessage("(Omitido)");
        setCurrentInput("");
        processUserInput(""); // Pasar string vacío para que la lógica lo maneje como opcional
        return;
    }
    
    // Para otros campos, si el input está vacío, no hacer nada (la lógica de processUserInput re-promptará)
    if (!userInput) return;
    
    addUserMessage(userInput);
    setCurrentInput("");
    processUserInput(userInput);
  };

  const getPlaceholderText = (): string => {
    if (isGiaTyping) return "GIA está escribiendo...";
    if (isProcessing) return "Procesando..."; 
    switch (conversationStage) {
      case "INIT": return "Cargando..."; // Cambiado de "GREETING"
      case "AWAITING_USER_NAME": return "Escribe tu nombre o presiona Enter...";
      case "AWAITING_PET_NAME": return "Nombre de tu mascota o Enter...";
      case "AWAITING_PET_SPECIES": return "Especie (Ej: Perro, Gato)...";
      case "AWAITING_MAIN_QUESTION": return "¿En qué te puedo ayudar hoy?";
      case "AWAITING_WAITLIST_EMAIL": return "Tu correo electrónico...";
      case "AWAITING_WAITLIST_DECISION": return "Selecciona una opción...";
      case "AWAITING_FURTHER_ACTION_CHOICE": return "Selecciona una opción...";
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
                      disabled={isGiaTyping || isProcessing} // Deshabilitar botones mientras GIA piensa o procesa
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
                <span>{isGiaTyping ? "GIA está escribiendo..." : (isProcessing ? "Procesando..." : "")}</span>
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
          disabled={isInputCurrentlyDisabled()}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && !e.shiftKey && !isInputCurrentlyDisabled()) {
                handleSendMessage(e);
            }
          }}
        />
        <Button
            type="submit"
            size="default" 
            className="text-sm px-3 sm:px-4" 
            disabled={isInputCurrentlyDisabled() || isProcessing} // También deshabilitar si isProcessing es true
        >
          {(isProcessing && conversationStage === 'PROCESSING_AI_QUESTION') || (isProcessing && conversationStage === 'PROCESSING_WAITLIST_EMAIL') ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}


    