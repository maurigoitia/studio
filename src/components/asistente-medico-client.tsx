
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
// Changed schema import to GenericQueryFormSchema and its type
import { GenericQueryFormSchema, type GenericQueryFormValues } from "@/lib/schemas"; 
// Changed action import to askGenericQuestionAction
import { askGenericQuestionAction } from "@/app/actions"; 
import { useState, useTransition } from "react";
import { Loader2, Sparkles, Lightbulb } from "lucide-react"; // Removed MapPin
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Removed LocationStatus type import and GoogleMapDisplay import

// Removed MedicalAssistantClientProps interface as location props are no longer needed

export default function MedicalAssistantClient() { // Removed props
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Updated form to use GenericQueryFormValues and GenericQueryFormSchema
  const form = useForm<GenericQueryFormValues>({
    resolver: zodResolver(GenericQueryFormSchema),
    defaultValues: {
      question: "", // Only question field now
    },
  });

  // Updated onSubmit to use GenericQueryFormValues and askGenericQuestionAction
  async function onSubmit(data: GenericQueryFormValues) {
    setAiResponse(null); 
    startTransition(async () => {
      const response = await askGenericQuestionAction(data); // Call generic action
      if (response.success && response.data) {
        setAiResponse(response.data.answer);
        toast({
          title: "Respuesta del Asistente IA",
          description: "El Asistente IA ha generado información basada en tu consulta.",
        });
      } else {
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
          {/* Removed medicalHistory FormField */}
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Tu Pregunta para el Asistente IA</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe aquí tu pregunta general. Por ejemplo: '¿Cómo funciona la inteligencia artificial?' o 'Ideas para nombres de perros'."
                    className="min-h-[100px] bg-background"
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  Esta es una IA de propósito general para demostración.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-5 w-5" />
            )}
            Consultar al Asistente IA
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="text-center py-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">El Asistente IA está pensando...</p>
        </div>
      )}

      {aiResponse && !isPending && (
        <Card className="mt-8 bg-secondary/30 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <Sparkles className="mr-2 h-6 w-6" /> {/* Changed icon to Sparkles */}
              Respuesta del Asistente IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-wrap">{aiResponse}</p>
          </CardContent>
        </Card>
      )}

      {/* Removed GoogleMapDisplay and the veterinarian examples card */}
    </div>
  );
}
