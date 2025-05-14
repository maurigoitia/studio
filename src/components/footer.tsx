
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4 text-center">
        <p className="text-sm text-muted-foreground">&copy; 2025 PetSync. Todos los derechos reservados.</p>
        <div className="mt-4 flex justify-center space-x-4 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Contacto
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Términos y condiciones
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Política de Privacidad
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Síguenos:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="#" passHref aria-label="Instagram">
            <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </Link>
          <Link href="#" passHref aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
