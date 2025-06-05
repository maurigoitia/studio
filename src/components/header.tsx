import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/#waitlist">
              Sumate a la Waitlist
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
