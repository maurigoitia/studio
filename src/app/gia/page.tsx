
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, TriangleAlert } from "lucide-react"; 
import GIAClient from "@/components/gia-client"; // Renamed component import

export default function GIAPage() { // Renamed page function
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Chatea con GIA: Tu Asistente IA para Mascotas</CardTitle>
            <CardDescription className="text-lg mt-4 space-y-2">
              <p>¡Hola! Soy GIA, tu futura asistente IA de PetSync, especializada en ayudarte con la salud y el bienestar de tu mascota.</p>
              <p>Para esta demostración, cuéntame un poco sobre tu compañero/a y hazme una pregunta. ¡Estoy aprendiendo y esta es solo una probadita de lo que podré hacer en la app!</p>
              <p className="text-sm mt-1">(Versión Demo)</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-6 shadow-md">
              <TriangleAlert className="h-5 w-5" />
              <AlertTitle className="font-semibold">¡Importante!</AlertTitle>
              <AlertDescription>
                Soy una IA en desarrollo y esta es una demo. Mis respuestas son solo informativas y <strong>nunca reemplazan</strong> el consejo de un veterinario profesional. Consulta siempre a tu veterinario para cualquier tema de salud.
              </AlertDescription>
            </Alert>
            
            <GIAClient /> 
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
