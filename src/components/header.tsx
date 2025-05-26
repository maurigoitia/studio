
"use client";

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Brain, LayoutDashboard, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import * as React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 md:gap-2 md:flex">
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
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/portal-veterinarias">
              <LayoutDashboard className="mr-2 h-5 w-5" />
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
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <nav className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Link href="/#tutores" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Para Tutores</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#veterinarios" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Para Veterinarios</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/#faq" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Preguntas Frecuentes</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/gia" className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center">
                    <Brain className="mr-2 h-5 w-5" /> Chatea con GIA
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/portal-veterinarias" className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center">
                     <LayoutDashboard className="mr-2 h-5 w-5" /> Portal Veterinarias
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
