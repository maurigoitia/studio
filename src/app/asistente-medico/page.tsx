import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, TriangleAlert, MapPin } from "lucide-react";
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
            <CardTitle className="text-3xl md:text-4xl font-bold">Guía IA de PetIntel</CardTitle>
            <CardDescription className="text-lg mt-2">
              Obtén sugerencias e información general basada en IA sobre el historial médico de tu mascota.
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
            <MedicalAssistantClient />

            <Card className="mt-10 shadow-lg border-dashed border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-primary">
                  <MapPin className="mr-2 h-6 w-6" />
                  Próximamente: Veterinarios Cerca de Ti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estamos trabajando para ayudarte a encontrar centros veterinarios cercanos directamente desde PetSync. 
                  ¡Pronto podrás visualizar opciones en un mapa interactivo y obtener indicaciones!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Esta función requerirá acceso a tu ubicación para ofrecerte los resultados más relevantes.
                </p>
              </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
