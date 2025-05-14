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
import { MedicalAssistantFormSchema, type MedicalAssistantFormValues } from "@/lib/schemas";
import { getMedicalAdviceAction } from "@/app/actions";
import { useState, useTransition } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MedicalAssistantClient() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const form = useForm<MedicalAssistantFormValues>({
    resolver: zodResolver(MedicalAssistantFormSchema),
    defaultValues: {
      medicalHistory: "",
      question: "",
    },
  });

  async function onSubmit(data: MedicalAssistantFormValues) {
    setAiResponse(null); // Clear previous response
    startTransition(async () => {
      const response = await getMedicalAdviceAction(data);
      if (response.success && response.data) {
        setAiResponse(response.data.answer);
        toast({
          title: "Respuesta del Asistente IA",
          description: "Se ha generado una respuesta a tu consulta.",
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
          <FormField
            control={form.control}
            name="medicalHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Historial Médico de tu Mascota</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe aquí el historial médico relevante de tu mascota: diagnósticos previos, tratamientos, medicaciones, alergias, etc."
                    className="min-h-[150px] bg-background"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Proporciona la mayor cantidad de detalles posible para una mejor respuesta.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Tu Pregunta</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe aquí tu pregunta específica sobre el historial médico."
                    className="min-h-[100px] bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            Obtener Consejo IA
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="text-center py-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">Procesando tu consulta...</p>
        </div>
      )}

      {aiResponse && !isPending && (
        <Card className="mt-8 bg-secondary/30 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <Sparkles className="mr-2 h-6 w-6" />
              Respuesta del Asistente IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-wrap">{aiResponse}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
