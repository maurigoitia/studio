
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, Lock, LogIn } from 'lucide-react';
import Image from 'next/image'; // For potential social login icons

// Simple SVG for Apple logo as lucide-react might not have it directly
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.288 1.03C6.932.31 5.385 0 4.251 0 2.953 0 1.235.785.062 2.356a6.7 6.7 0 0 0-.529 6.501 6.74 6.74 0 0 0 1.674 3.265 7.4 7.4 0 0 0 3.229 2.156c.855.34 1.725.506 2.592.506.94 0 1.95-.178 2.882-.533a7.37 7.37 0 0 0 2.582-1.946c.925-.967 1.513-2.223 1.513-3.607 0-.328-.024-.65-.072-.966a4.1 4.1 0 0 0-.703-1.288 4.2 4.2 0 0 0-1.235-.939 3.63 3.63 0 0 0-1.532-.426c-.67-.012-1.341.187-1.945.566-.69.434-1.254 1.058-1.65 1.808a4.23 4.23 0 0 1-.38 2.096c.69.193 1.425.297 2.193.297.962 0 1.857-.17 2.651-.506.117-.05.23-.104.338-.162a3.7 3.7 0 0 0 1.773-2.028c.193-.495.297-1.02.297-1.56C13.725 2.93 12.17.35 10.53 0c-.399.48-.726 1.085-.958 1.773-.06.193-.115.38-.171.565-.162.507-.29 1.018-.381 1.506-.036.193-.06.38-.073.566a3.67 3.67 0 0 1-.83 2.181c-.473.647-1.108 1.123-1.843 1.389-.007.003-.015.004-.022.007-.022.007-.044.014-.066.02a3.07 3.07 0 0 1-.479.108 3.37 3.37 0 0 1-.612.065c-.612 0-1.2-.134-1.71-.39a3.73 3.73 0 0 1-1.312-1.2c-.01-.014-.02-.029-.028-.043a4.04 4.04 0 0 1-.624-2.384c.012-.668.187-1.323.506-1.895.305-.543.737-1 .128-1.566-.588-.544-1.24-1.008-1.918-1.366Z"/>
    <path d="M9.068.003c.572.036 1.06.297 1.457.76a3.01 3.01 0 0 1 .752 2.228c0 .24-.024.48-.072.707a.52.52 0 0 1-.015.066c-.036.134-.084.269-.144.399-.06.134-.132.256-.21.374a1.9 1.9 0 0 1-.806.83c-.39.193-.818.297-1.258.297-.452 0-.892-.104-1.294-.297a1.67 1.67 0 0 1-.751-.807c-.105-.18-.187-.374-.24-.578a3.08 3.08 0 0 1-.072-.72C6.45 2.117 7.356.368 8.74.048a1.25 1.25 0 0 1 .327-.045Z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);


export default function PortalAccesoPage() {
  return (
    <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold">Portal Veterinarias PetSync</CardTitle>
          <CardDescription className="text-md mt-2">
            Accede a tu cuenta o regístrate para comenzar a gestionar tu clínica.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="w-full" disabled>
                    <GoogleIcon />
                    <span className="ml-2">Iniciar sesión con Google</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Próximamente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="w-full" disabled>
                    <Mail className="h-5 w-5" />
                    <span className="ml-2">Iniciar sesión con Outlook</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Próximamente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="w-full" disabled>
                    <AppleIcon />
                    <span className="ml-2">Iniciar sesión con Apple</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Próximamente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O inicia sesión con tu correo
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="email-portal">Correo Electrónico</Label>
              <Input id="email-portal" type="email" placeholder="tu@correo.com" className="mt-1" disabled />
            </div>
            <div>
              <Label htmlFor="password-portal">Contraseña</Label>
              <Input id="password-portal" type="password" placeholder="********" className="mt-1" disabled />
            </div>
            <Button type="button" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/portal-veterinarias/dashboard">
                <LogIn className="mr-2 h-5 w-5" />
                Iniciar Sesión
              </Link>
            </Button>
            <div className="text-sm text-center">
              <Link href="#" className="font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Separator />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">¿Aún no tienes cuenta en PetSync para tu clínica?</p>
            <Button variant="link" className="text-primary" asChild>
              <Link href="/info-portal-veterinarias">
                Registra tu Clínica aquí
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
