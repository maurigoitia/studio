
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
import { Loader2, Sparkles, MapPin, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LocationStatus } from "@/app/asistente-medico/page";
import GoogleMapDisplay from "./google-map-display"; // Import the map component

interface MedicalAssistantClientProps {
  locationStatus: LocationStatus;
  location: { latitude: number; longitude: number } | null; // Add location prop
}

export default function MedicalAssistantClient({ locationStatus, location }: MedicalAssistantClientProps) {
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
    setAiResponse(null); 
    startTransition(async () => {
      const response = await getMedicalAdviceAction(data);
      if (response.success && response.data) {
        setAiResponse(response.data.answer);
        toast({
          title: "Respuesta de Firu AI",
          description: "Firu AI ha generado información basada en tu consulta.",
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
                  Proporciona la mayor cantidad de detalles posible para una mejor respuesta informativa.
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
                <FormLabel className="text-lg">Tu Pregunta para Firu AI</FormLabel>
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
              <Lightbulb className="mr-2 h-5 w-5" />
            )}
            Consultar a Firu AI
          </Button>
        </form>
      </Form>

      {isPending && (
        <div className="text-center py-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">Firu AI está pensando...</p>
        </div>
      )}

      {aiResponse && !isPending && (
        <Card className="mt-8 bg-secondary/30 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-primary">
              <Lightbulb className="mr-2 h-6 w-6" />
              Respuesta de Firu AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-wrap">{aiResponse}</p>
          </CardContent>
        </Card>
      )}

      {/* Display map if location is granted and AI response is available */}
      {aiResponse && !isPending && locationStatus === 'granted' && location && (
        <>
          <GoogleMapDisplay latitude={location.latitude} longitude={location.longitude} />
          
          <Card className="mt-4 bg-accent/10 border-accent/50"> {/* Reduced top margin for this card */}
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-accent-foreground">
                <MapPin className="mr-2 h-6 w-6 text-accent" />
                <span className="text-primary">Posibles Veterinarios Cercanos (Ejemplo Ilustrativo)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Arriba puedes ver tu ubicación actual en el mapa. En el futuro, PetSync podrá usar esta información para ayudarte a encontrar veterinarios cercanos.
                Por ahora, aquí hay algunos ejemplos de centros veterinarios que podrías considerar (estos son solo ilustrativos). 
                Recuerda siempre verificar sus servicios, horarios y contactarlos directamente.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-foreground">
                <li>Clínica Veterinaria "Amigos Peludos" - Calle Falsa 123, Palermo</li>
                <li>Hospital Veterinario "Salud Animal Integral" - Av. Corrientes 4500, Almagro</li>
                <li>Consultorio Dr. Gato Feliz - Gurruchaga 789, Villa Crespo</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground font-semibold">
                Importante: La lista de veterinarios es un ejemplo. La integración real con listados de veterinarios y búsqueda avanzada estará disponible próximamente en PetSync.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
