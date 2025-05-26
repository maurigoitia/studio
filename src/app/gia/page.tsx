
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, TriangleAlert, MessageSquare } from "lucide-react"; 
import GIAClient from "@/components/gia-client"; 

export default function GIAPage() { 
  return (
    <div className="container mx-auto py-6 sm:py-12 px-2 sm:px-4"> {/* Adjusted padding for mobile */}
      <div className="max-w-lg mx-auto"> {/* Reduced max-width */}
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-3 sm:pb-4"> {/* Reduced padding */}
            <div className="flex justify-center mb-2 sm:mb-4">
              <Brain className="h-10 w-10 sm:h-16 sm:w-16 text-primary" />
            </div>
            <CardTitle className="text-xl sm:text-3xl md:text-4xl font-bold">Chatea con GIA</CardTitle>
            <CardDescription className="text-xs sm:text-base mt-1 sm:mt-2 space-y-1">
              <p>Soy GIA, tu asistente IA de PetSync. Cuéntame sobre tu mascota y hazme una pregunta.</p>
              <p className="text-xs sm:text-sm mt-1">(Versión Demo)</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6 pb-3 sm:pb-6"> {/* Adjusted padding */}
            <Alert variant="destructive" className="mb-3 sm:mb-6 shadow-md text-xs sm:text-sm">
              <TriangleAlert className="h-4 w-4 sm:h-5 sm:w-5" />
              <AlertTitle className="font-semibold text-sm sm:text-base">¡Importante!</AlertTitle>
              <AlertDescription>
                Soy una IA en desarrollo. Mis respuestas son informativas y <strong>nunca reemplazan</strong> el consejo de un veterinario. Consulta siempre a tu veterinario para temas de salud.
              </AlertDescription>
            </Alert>
            
            <GIAClient /> 
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
    