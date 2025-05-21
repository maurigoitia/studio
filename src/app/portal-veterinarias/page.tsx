
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ListChecks, CalendarDays, Users } from "lucide-react";
import Link from "next/link";

export default function PortalVeterinariasPage() {
  return (
    <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">Portal para Veterinarias</CardTitle>
          <CardDescription className="text-lg mt-2 text-muted-foreground">
            Accede a tu panel de PetSync para gestionar tu clínica y pacientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div>
              <Label htmlFor="email-vet" className="text-foreground">Correo Electrónico</Label>
              <Input type="email" id="email-vet" placeholder="tu@clinica.com" className="bg-background mt-1" />
            </div>
            <div>
              <Label htmlFor="password-vet" className="text-foreground">Contraseña</Label>
              <Input type="password" id="password-vet" placeholder="••••••••" className="bg-background mt-1" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
              Ingresar
            </Button>
          </form>
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            <p>¿Aún no tienes cuenta en PetSync para tu clínica?</p>
            <Button variant="link" className="text-primary px-0" asChild>
                <Link href="/#waitlist">Contáctanos para registrarte</Link>
            </Button>
          </div>
          <Separator />
           <div className="space-y-3 pt-2">
            <h3 className="text-md font-semibold text-center text-foreground mb-3">Funcionalidades Principales:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-3 text-primary shrink-0" />
                Gestión de agenda y turnos online.
              </li>
              <li className="flex items-center">
                <ListChecks className="h-5 w-5 mr-3 text-primary shrink-0" />
                Acceso a historiales médicos compartidos por tutores.
              </li>
              <li className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary shrink-0" />
                Comunicación simplificada con los tutores de tus pacientes.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
