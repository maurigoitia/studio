
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { askGenericQuestionAction } from "@/app/actions";
import type { GenericQueryFormValues } from "@/lib/schemas";
import { useState, useTransition, useRef, useEffect, FormEvent } from "react";
import { Loader2, Send, Bot, UserCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "gia";
}

export default function GIAClient() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentAudioRef = useRef<HTMLAudioElement | null>(null);
  const receivedAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    sentAudioRef.current = new Audio('/sounds/message-sent.mp3');
    receivedAudioRef.current = new Audio('/sounds/message-received.mp3');
  }, []);

  const addMessage = (text: string, sender: 'user' | 'gia') => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(36).substring(7), text, sender }]);
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
    // GIA's initial greeting message
    if (messages.length === 0) {
        addMessage("¡Hola! Soy GIA. ¿En qué puedo ayudarte hoy sobre el cuidado de tu mascota?", "gia");
    }
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const userInput = currentInput.trim();

    if (!userInput || isPending) {
      return;
    }
    
    addMessage(userInput, "user");
    sentAudioRef.current?.play().catch(e => console.warn("Error al reproducir sonido de envío:", e));
    setCurrentInput("");

    startTransition(async () => {
      // For basic chat, only send the question.
      // Optional fields (userName, email, petName, species) can be added if collected elsewhere.
      const payload: GenericQueryFormValues = {
        question: userInput,
        // userName, email, petName, species would be undefined here if not collected
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
    });
  };

  const isInputDisabled = (): boolean => {
    return isPending;
  };

  const getPlaceholderText = (): string => {
    if (isPending) return "GIA está pensando...";
    return "Escribe tu pregunta para GIA...";
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
        {isPending && (
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
                handleSendMessage(e as any); // Cast to any to avoid type issues with preventDefault
            }
          }}
        />
        <Button
            type="submit"
            size="sm"
            className="text-xs"
            disabled={isInputDisabled() || !currentInput.trim()}
        >
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          <span className="sr-only sm:not-sr-only ml-0 sm:ml-1.5">Enviar</span>
        </Button>
      </form>
    </div>
  );
}
