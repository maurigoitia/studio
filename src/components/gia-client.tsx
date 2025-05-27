
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { askGenericQuestionAction } from "@/app/actions";
import { useState, useTransition, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { Loader2, Send, Bot, UserCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { GenericQueryFormValues } from "@/lib/schemas";

interface Message {
  id: string;
  text: string;
  sender: "user" | "gia";
}

export default function GIAClient() {
  const { toast } = useToast();
  const [isProcessingAI, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [initialGreetingSent, setInitialGreetingSent] = useState(false); // Nuevo estado

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentAudioRef = useRef<HTMLAudioElement | null>(null);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Efectos ---
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTop = viewport.scrollHeight;
        }, 50); // Ajustado el delay
      }
    }
  }, [messages.length]); // Dependencia ajustada

  useEffect(() => {
    sentAudioRef.current = new Audio('/sounds/message-sent.mp3');
    receivedAudioRef.current = new Audio('/sounds/message-received.mp3');
  }, []);

  useEffect(() => {
    // Saludo inicial de GIA
    if (!initialGreetingSent && messages.length === 0) {
      addMessage("¡Hola! Soy GIA.", "gia");
      setInitialGreetingSent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Se ejecuta solo una vez al montar

  useEffect(() => {
    if (!isProcessingAI) {
      inputRef.current?.focus();
    }
  }, [isProcessingAI, messages]);


  // --- Manejo de Mensajes ---
  const addMessage = (text: string, sender: "user" | "gia") => {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), text, sender }]);
    if (sender === "user") {
      sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    } else { // Simplificado para el saludo y respuesta de GIA
      receivedAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de recepción:", e));
    }
  };

  // --- Lógica de la Conversación ---
  const handleSendMessage = async (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
    if (e && 'preventDefault' in e) e.preventDefault();

    const userInput = currentInput.trim();
    if (!userInput || isProcessingAI) {
      return;
    }

    addUserMessage(userInput); // Muestra el mensaje del usuario
    const questionToSubmit = userInput;
    setCurrentInput(""); // Limpia el input

    // GIA acusa recibo
    addMessage("Ok, leyendo... ya te ayudo 🐾", "gia");

    startTransition(async () => {
      try {
        const payload: GenericQueryFormValues = { question: questionToSubmit };
        const response = await askGenericQuestionAction(payload);

        // Elimina el mensaje "Ok, leyendo..." antes de añadir la respuesta real
        setMessages(prev => prev.filter(msg => !(msg.sender === 'gia' && msg.text.startsWith("Ok, leyendo..."))));
        
        if (response.success && response.data?.answer) {
          addMessage(response.data.answer, "gia");
        } else {
          addMessage(response.message || "GIA no pudo generar una respuesta. Inténtalo de nuevo.", "gia");
          toast({
            title: "Error de GIA",
            description: response.message || "No se pudo obtener respuesta de GIA.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setMessages(prev => prev.filter(msg => !(msg.sender === 'gia' && msg.text.startsWith("Ok, leyendo..."))));
        console.error("Error en askGenericQuestionAction:", error);
        addMessage("Hubo un problema técnico al contactar a GIA. Por favor, intenta más tarde.", "gia");
        toast({
          title: "Error de Conexión",
          description: "No se pudo conectar con el asistente de IA.",
          variant: "destructive",
        });
      }
    });
  };
  
  const isInputDisabled = (): boolean => {
    return isProcessingAI;
  };

  const getPlaceholderText = (): string => {
    if (isProcessingAI) return "GIA está pensando...";
    if (!initialGreetingSent) return "Cargando...";
    return "¿En qué puedo ayudarte hoy?";
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
        {isProcessingAI && (
          <div className="flex items-center space-x-2 mr-auto justify-start mb-3 animate-in fade-in-0 duration-300">
             <Avatar className="h-7 w-7 self-start shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            <div className="bg-card border text-card-foreground p-2.5 rounded-lg shadow-sm rounded-bl-none">
              <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>GIA está pensando...</span>
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
            disabled={isInputDisabled()}
        >
          {isProcessingAI ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
