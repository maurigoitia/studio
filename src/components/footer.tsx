
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4 text-center">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PetSync. Todos los derechos reservados.</p>
        <div className="mt-4 flex justify-center space-x-4 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Contacto
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Términos y condiciones
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Síguenos:</p>
        {/* Placeholder for social media icons - can be added later */}
        {/* Example:
        <div className="flex justify-center space-x-3 mt-2">
          <Link href="#" passHref>
            <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </Link>
          <Link href="#" passHref>
            <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </Link>
          <Link href="#" passHref>
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </Link>
        </div>
        */}
      </div>
    </footer>
  );
}

    