import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, TriangleAlert } from "lucide-react";
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
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-6 shadow-md">
              <TriangleAlert className="h-5 w-5" />
              <AlertTitle className="font-semibold">Aviso Importante</AlertTitle>
              <AlertDescription>
                Esta herramienta de IA es solo para fines informativos y de orientación básica. <strong>No reemplaza el diagnóstico ni el consejo de un veterinario profesional.</strong> Para cualquier problema de salud de tu mascota, consulta siempre a tu veterinario de confianza.
              </AlertDescription>
            </Alert>
            <MedicalAssistantClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
