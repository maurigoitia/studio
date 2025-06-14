
"use client";

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Brain, LayoutDashboard, Menu, Lightbulb, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import * as React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:gap-2 lg:gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/#tutores">Para Tutores</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#veterinarios">Para Veterinarios</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#faq">Preguntas Frecuentes</Link>
          </Button>
          {/* GIA Chat button removed from here */}
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/portal-veterinarias">
              <LogIn className="mr-2 h-5 w-5" />
              Portal Veterinarias
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] pt-10">
              <nav className="flex flex-col gap-4">
                <SheetClose asChild>
                  <Link href="/#tutores" className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2">Para Tutores</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#veterinarios" className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2">Para Veterinarios</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#faq" className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2">Preguntas Frecuentes</Link>
                </SheetClose>
                {/* GIA Chat link removed from mobile menu */}
                <SheetClose asChild>
                  <Link href="/portal-veterinarias" className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center py-2">
                     <LogIn className="mr-2 h-5 w-5" /> Portal Veterinarias
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
    
    
