
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GenericQueryFormSchema, type GenericQueryFormValues } from "@/lib/schemas"; 
import { askGenericQuestionAction } from "@/app/actions"; 
import { useState, useTransition, useRef, useEffect, FormEvent } from "react";
import { Loader2, Send, Bot, UserCircle } from "lucide-react"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


interface Message {
  id: string;
  text: string;
  sender: "user" | "gia";
}

type ConversationStage = 
  | 'AWAITING_USER_INIT' 
  | 'PROCESSING_QUERY' 
  | 'DISPLAYING_RESPONSE';

export default function GIAClient() { 
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [conversationStage, setConversationStage] = useState<ConversationStage>('AWAITING_USER_INIT');

  const form = useForm<GenericQueryFormValues>({
    resolver: zodResolver(GenericQueryFormSchema),
    defaultValues: {
      email: "",
      petName: "",
      species: "",
      petAge: undefined,
      question: "",
    },
  });

  const addMessage = (text: string, sender: 'user' | 'gia') => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, sender }]);
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  async function onSubmit(data: GenericQueryFormValues) {
    addMessage(data.question, "user");
    setConversationStage('PROCESSING_QUERY');
    
    startTransition(async () => {
      const response = await askGenericQuestionAction(data);
      if (response.success && response.data) {
        addMessage(response.data.answer, "gia");
      } else {
        addMessage(response.message || "Hubo un error al obtener una respuesta de GIA. Por favor, inténtalo de nuevo.", "gia");
        toast({
          title: "Error",
          description: response.message || "No se pudo obtener una respuesta.",
          variant: "destructive",
        });
      }
      setConversationStage('DISPLAYING_RESPONSE');
      // form.resetField("question"); // Optionally reset only the question field
    });
  }

  return (
    <div className="flex flex-col h-[500px] sm:h-[600px] max-h-[70vh] sm:max-h-[600px] bg-background rounded-lg shadow-inner border">
      <ScrollArea className="flex-grow p-2 sm:p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end space-x-2 max-w-[85%] mb-3",
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
              <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.text}</p>
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
        {conversationStage === 'PROCESSING_QUERY' && (
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
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 sm:p-4 border-t bg-background space-y-2 sm:space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Tu Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@correo.com" className="bg-input text-xs sm:text-sm" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="petName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Nombre Mascota (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Firulais" className="bg-input text-xs sm:text-sm" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Especie</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Perro, Gato" className="bg-input text-xs sm:text-sm" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="petAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Edad (años, Opcional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ej: 3" className="bg-input text-xs sm:text-sm" {...field} onChange={event => field.onChange(event.target.value === '' ? undefined : +event.target.value)} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Tu Pregunta para GIA</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe aquí tu pregunta general..."
                    className="min-h-[50px] sm:min-h-[60px] bg-input text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Ej: ¿Cada cuánto debo desparasitar a mi cachorro?
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-sm sm:text-base" disabled={isPending || conversationStage === 'PROCESSING_QUERY'}>
            {isPending || conversationStage === 'PROCESSING_QUERY' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Preguntar a GIA
          </Button>
        </form>
      </Form>
    </div>
  );
}
    