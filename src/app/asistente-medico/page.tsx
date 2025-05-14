
"use client"; // Required for useEffect and useState

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, TriangleAlert, Info, Loader2, TimerOff } from "lucide-react";
import MedicalAssistantClient from "@/components/asistente-medico-client";
import { useState, useEffect } from "react";

export type LocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported' | 'timeout';

export default function MedicalAssistantPage() {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      setLocationStatus('requesting');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus('granted');
        },
        (error) => {
          let newStatus: LocationStatus = 'denied';
          let logMessage = "Error getting location.";

          if (error && error.code) {
            logMessage += ` Code: ${error.code}`;
            switch (error.code) {
              case error.PERMISSION_DENIED: // 1
                logMessage += " (User denied the request for Geolocation.)";
                newStatus = 'denied';
                break;
              case error.POSITION_UNAVAILABLE: // 2
                logMessage += " (Location information is unavailable.)";
                newStatus = 'denied'; 
                break;
              case error.TIMEOUT: // 3
                logMessage += " (The request to get user location timed out.)";
                newStatus = 'timeout';
                break;
              default:
                logMessage += ` (Unknown error code: ${error.code})`;
                newStatus = 'denied';
                break;
            }
          }
          if (error && error.message) {
            logMessage += ` Message: ${error.message}`;
          }
          console.error(logMessage); 
          setLocationStatus(newStatus);
        },
        { timeout: 10000 } 
      );
    } else {
      setLocationStatus('unsupported');
    }
  }, []); 

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lightbulb className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Firu AI</CardTitle>
            <CardDescription className="text-lg mt-2">
              Consulta a Firu AI para obtener sugerencias e información general basada en IA sobre el historial médico de tu mascota.
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
                o enfermedades en tu mascota. <strong>Para cualquier problema de salud o preocupación sobre tu mascota, 
                consulta siempre y sin demora a tu veterinario de confianza.</strong>
                <br /><br />
                El uso de esta herramienta es bajo tu propia responsabilidad. PetSync no se hace responsable
                de ninguna decisión tomada basada en la información aquí presentada.
              </AlertDescription>
            </Alert>

            {locationStatus === 'requesting' && (
              <Alert className="mb-4 border-blue-500 text-blue-700 bg-blue-50">
                <Loader2 className="h-5 w-5 animate-spin" />
                <AlertTitle>Información de Ubicación</AlertTitle>
                <AlertDescription>
                  Solicitando acceso a tu ubicación para mejorar las recomendaciones...
                </AlertDescription>
              </Alert>
            )}
            {locationStatus === 'timeout' && (
              <Alert variant="destructive" className="mb-4">
                <TimerOff className="h-5 w-5" />
                <AlertTitle>Tiempo de Espera Agotado para Ubicación</AlertTitle>
                <AlertDescription>
                  No pudimos obtener tu ubicación a tiempo. Verifica tu conexión o GPS. El mapa y las sugerencias basadas en ubicación no estarán disponibles.
                </AlertDescription>
              </Alert>
            )}
            {locationStatus === 'denied' && (
              <Alert variant="destructive" className="mb-4">
                <Info className="h-5 w-5" />
                <AlertTitle>Acceso a Ubicación Denegado</AlertTitle>
                <AlertDescription>
                  No se pudo acceder a tu ubicación. El mapa y las recomendaciones de veterinarios cercanos no estarán disponibles. Puedes cambiar los permisos en la configuración de tu navegador.
                </AlertDescription>
              </Alert>
            )}
             {locationStatus === 'unsupported' && (
              <Alert variant="destructive" className="mb-4">
                <Info className="h-5 w-5" />
                <AlertTitle>Geolocalización no Soportada</AlertTitle>
                <AlertDescription>
                  Tu navegador no soporta la geolocalización. El mapa y las recomendaciones de veterinarios cercanos no estarán disponibles.
                </AlertDescription>
              </Alert>
            )}
            {locationStatus === 'granted' && location && (
              <Alert className="mb-4 border-green-500 text-green-700 bg-green-50">
                <Info className="h-5 w-5" />
                <AlertTitle>Acceso a Ubicación Concedido</AlertTitle>
                <AlertDescription>
                  Podremos mostrarte tu ubicación en un mapa y, en el futuro, sugerirte veterinarios cercanos.
                </AlertDescription>
              </Alert>
            )}

            <MedicalAssistantClient locationStatus={locationStatus} location={location} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
