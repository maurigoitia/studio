import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import GenericQueryClient from "@/components/generic-query-client";

export default function GenericAiQueryPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Consulta Genérica al IA</CardTitle>
            <CardDescription className="text-lg mt-2">
              Haz cualquier pregunta y obtén una respuesta de nuestro asistente IA.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenericQueryClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
