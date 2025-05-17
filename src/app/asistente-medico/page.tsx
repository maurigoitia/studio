
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, TriangleAlert } from "lucide-react";
import MedicalAssistantClient from "@/components/asistente-medico-client";

export default function MedicalAssistantPage() {

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Demo de Inteligencia Artificial</CardTitle>
            <CardDescription className="text-lg mt-2">
              Para esta demostración, por favor proporciona tu correo y algunos detalles de tu mascota.
              Esto nos ayuda a simular una experiencia más completa.
              La función 'Firu AI' especializada en el historial médico de tu mascota estará disponible próximamente en nuestra app móvil.
              Recuerda que esta es una guía y <strong>no reemplaza</strong> la consulta veterinaria profesional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-6 shadow-md">
              <TriangleAlert className="h-5 w-5" />
              <AlertTitle className="font-semibold">Aviso Importante y Descargo de Responsabilidad</AlertTitle>
              <AlertDescription>
                Esta herramienta de IA te ofrece <strong>sugerencias e información general</strong> y está diseñada 
                únicamente para fines informativos. <strong>NO reemplaza el diagnóstico, tratamiento, 
                ni el consejo de un veterinario profesional calificado.</strong>
                <br /><br />
                La información proporcionada aquí no debe ser utilizada para diagnosticar o tratar problemas de salud
                o enfermedades. <strong>Para cualquier problema de salud o preocupación, 
                consulta siempre y sin demora a tu veterinario de confianza.</strong>
                <br /><br />
                El uso de esta herramienta es bajo tu propia responsabilidad. PetSync no se hace responsable
                de ninguna decisión tomada basada en la información aquí presentada.
              </AlertDescription>
            </Alert>

            <MedicalAssistantClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
