
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GenericQueryFormSchema, type GenericQueryFormValues } from "@/lib/schemas"; 
import { askGenericQuestionAction } from "@/app/actions"; 
import { useState, useTransition } from "react";
import { Loader2, Brain, Bot, UserCircle } from "lucide-react"; 

export default function GIAClient() { // Renamed component
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [userQuestionForDisplay, setUserQuestionForDisplay] = useState<string | null>(null);


  const form = useForm<GenericQueryFormValues>({
    resolver: zodResolver(GenericQueryFormSchema),
    defaultValues: {
      email: "",
      petName: "",
      petAge: undefined, 
      question: "",
    },
  });

  async function onSubmit(data: GenericQueryFormValues) {
    setAiResponse(null); 
    setUserQuestionForDisplay(data.question); 
    startTransition(async () => {
      const response = await askGenericQuestionAction(data);
      if (response.success && response.data) {
        setAiResponse(response.data.answer);
      } else {
        setAiResponse(response.message || "Hubo un error al obtener una respuesta de GIA. Por favor, inténtalo de nuevo.");
        toast({
          title: "Error",
          description: response.message || "No se pudo obtener una respuesta.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Tu Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@correo.com" className="bg-background" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Nombre de tu Mascota</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Firulais, Mishi" className="bg-background" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Edad (años)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ej: 3" className="bg-background" {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Tu Pregunta para GIA</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe aquí tu pregunta general..."
                    className="min-h-[100px] bg-background"
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  Ej: ¿Cada cuánto debo desparasitar a mi cachorro?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isPending}>
            {isPending && aiResponse === null ? ( 
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Brain className="mr-2 h-5 w-5" />
            )}
            {isPending && aiResponse === null ? "GIA está pensando..." : "Pregunta a GIA"}
          </Button>
        </form>
      </Form>

      {userQuestionForDisplay && ( 
        <div className="mt-8 space-y-6 p-4 bg-secondary/30 rounded-lg shadow-inner">
            <div className="flex justify-end items-start space-x-2">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%] shadow">
                    <p className="font-semibold text-sm">Tú</p>
                    <p className="text-sm">{userQuestionForDisplay}</p>
                </div>
                 <span className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary text-primary-foreground shadow">
                    <UserCircle className="h-5 w-5" />
                </span>
            </div>

            {isPending && !aiResponse && (
                 <div className="flex items-start space-x-2">
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-accent text-accent-foreground shadow">
                        <Bot className="h-5 w-5" />
                    </span>
                    <div className="bg-card border p-3 rounded-lg max-w-[80%] shadow">
                        <p className="font-semibold text-sm text-accent">GIA</p>
                        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Pensando...</span>
                        </div>
                    </div>
                </div>
            )}
            {aiResponse && ( 
                 <div className="flex items-start space-x-2">
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-accent text-accent-foreground shadow">
                        <Bot className="h-5 w-5" />
                    </span>
                    <div className="bg-card border p-3 rounded-lg max-w-[80%] shadow">
                        <p className="font-semibold text-sm text-accent">GIA</p>
                        <p className="text-foreground text-sm whitespace-pre-wrap">{aiResponse}</p>
                    </div>
                </div>
            )}
        </div>
    )}
    </div>
  );
}
