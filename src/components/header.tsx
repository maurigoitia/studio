
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

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
          <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/gia">
              <Brain className="mr-2 h-5 w-5" />
              Chatea con GIA
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
