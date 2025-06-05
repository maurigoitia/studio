import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Preguntas Frecuentes
          </Link>
          {/* <Link href="/portal-veterinarias" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Portal Veterinarias
          </Link> */}
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/#waitlist">
              Sumate a la Waitlist
            </Link>
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-6">
              <Logo />
              <Link href="/#faq" className="text-muted-foreground hover:text-foreground">
                Preguntas Frecuentes
              </Link>
              {/* <Link href="/portal-veterinarias" className="text-muted-foreground hover:text-foreground">
                Portal Veterinarias
              </Link> */}
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
                <Link href="/#waitlist">
                  Sumate a la Waitlist
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
