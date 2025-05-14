import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react'; // Changed from Stethoscope

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/#tutores">Para Tutores</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#veterinarios">Para Veterinarios</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#faq">Preguntas Frecuentes</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/asistente-medico">
              Firu AI
              <Lightbulb className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
