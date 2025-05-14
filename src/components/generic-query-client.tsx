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
import { GenericQueryFormSchema, type GenericQueryFormValues } from "@/lib/schemas";
import { askGenericQuestionAction } from "@/app/actions";
import { useState, useTransition } from "react";
import { Loader2, Sparkles, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GenericQueryClient() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const form = useForm<GenericQueryFormValues>({
    resolver: zodResolver(GenericQueryFormSchema),
    defaultValues: {
      question: "",
    },
  });

  async function onSubmit(data: GenericQueryFormValues) {
    setAiResponse(null); // Clear previous response
    startTransition(async () => {
      const response = await askGenericQuestionAction(data);
      if (response.success && response.data) {
        setAiResponse(response.data.answer);
        toast({
          title: "Respuesta del Asistente IA",
          description: "Se ha generado una respuesta a tu pregunta.",
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
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Tu Pregunta</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe aquí tu pregunta, por ejemplo: 'Explain how AI works'"
                    className="min-h-[100px] bg-background"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Puedes preguntar sobre una variedad de temas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <HelpCircle className="mr-2 h-5 w-5" />
            )}
            Preguntar al IA
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="text-center py-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">Procesando tu pregunta...</p>
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
