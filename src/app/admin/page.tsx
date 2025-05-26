
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, FileText, BarChart2, Settings } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Panel de Administración PetSync</CardTitle>
            <CardDescription className="text-lg mt-2">
              (Conceptual - Funcionalidades a desarrollar)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-center">
              Este sería el panel central para que los administradores de PetSync gestionen la plataforma.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Users className="mr-3 h-6 w-6 text-primary" />
                    Gestión de Usuarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Ver y administrar cuentas de clínicas veterinarias.</li>
                    <li>Gestionar perfiles de tutores (con foco en privacidad).</li>
                    <li>Manejar roles y permisos de acceso.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="mr-3 h-6 w-6 text-primary" />
                    Gestión de Contenido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Administrar FAQs de la plataforma.</li>
                    <li>Gestionar plantillas de comunicación.</li>
                    <li>Curar o subir contenido para la base de conocimiento de GIA.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart2 className="mr-3 h-6 w-6 text-primary" />
                    Analíticas de Uso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Visualizar estadísticas de registros.</li>
                    <li>Monitorear la actividad en la plataforma.</li>
                    <li>Generar reportes de uso de funcionalidades.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Settings className="mr-3 h-6 w-6 text-primary" />
                    Configuración General
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Ajustar parámetros globales de PetSync.</li>
                    <li>Gestionar integraciones con servicios de terceros.</li>
                    <li>Configuraciones de seguridad de la plataforma.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center p-4 bg-secondary/50 rounded-md">
              <p className="text-sm text-foreground">
                <strong>Nota Importante:</strong> Este panel es una representación conceptual. La implementación de estas funcionalidades requiere un desarrollo de backend significativo, bases de datos, y sistemas de autenticación y autorización específicos para administradores.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    