
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export default function PortalVeterinariasAccessPage() {
  return (
    <div className="container mx-auto py-12 md:py-20 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <LogIn className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">Acceso al Portal de Veterinarias</CardTitle>
          <CardDescription className="text-md md:text-lg mt-2">
            Gestiona tu clínica, pacientes y agenda de forma eficiente con PetSync.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
            <Link href="/portal-veterinarias/dashboard">
              Acceder al Portal
            </Link>
          </Button>
           <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">¿Aún no tienes acceso para tu clínica?</p>
            <Button variant="link" asChild className="text-primary">
              <Link href="/#waitlist">Únete a la lista de espera</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
