import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import MedicalAssistantClient from "@/components/asistente-medico-client";

export default function MedicalAssistantPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lightbulb className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Asistente de Historial Médico IA</CardTitle>
            <CardDescription className="text-lg mt-2">
              Haz preguntas sobre el historial médico de tu mascota y obtén respuestas basadas en la información proporcionada.
              <br />
              <strong className="text-destructive-foreground bg-destructive/80 px-1 rounded">Importante:</strong> Esta herramienta es solo para fines informativos y no reemplaza el consejo veterinario profesional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MedicalAssistantClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
