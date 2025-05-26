
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Briefcase, Building, DollarSign, ExternalLink, Loader2, LogIn, AlertTriangle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormSchema, SignUpFormSchema, type SignInFormValues, type SignUpFormValues } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from '@/hooks/useAuth';
import { useState, useTransition } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const GoogleIcon = () => (
  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const AppleIcon = () => (
  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.53 12.44a6.09 6.09 0 00-2.4-3.17c-.9-.73-2.03-1.1-3.33-1.11-.95 0-2.08.3-3.11.9-.82.48-1.61 1.22-2.28 2.12-.63.85-1.03 1.89-1.16 3-.05.56.02 1.13.21 1.67.18.51.48.98.87 1.38.39.4.87.72 1.39.93.52.22 1.08.33 1.65.33.78 0 1.5-.17 2.12-.49a3.34 3.34 0 001.9-1.71c.1-.24.07-.52-.08-.72s-.4-.3-.66-.24c-.26.05-.42.31-.32.55.02.04.03.07.03.1-.38.92-1.16 1.47-2.02 1.55-.32.03-.64-.02-.94-.13-.3-.11-.58-.29-.8-.51-.23-.22-.4-.48-.51-.77-.12-.29-.17-.61-.15-.92.02-.3.09-.6.21-.88.3-.72.85-1.31 1.56-1.72.97-.56 2.1-.84 3.26-.84.47 0 .92.07 1.35.2s.83.35 1.18.6c.36.25.66.55.9.9.24.35.41.75.5 1.17.03.1.04.19.04.29 0 .27-.22.5-.5.5s-.5-.22-.5-.5c0-.07-.01-.13-.02-.19-.07-.32-.2-.62-.39-.88-.2-.26-.45-.48-.74-.66a3.68 3.68 0 00-2.92-.3c-.58.17-1.08.5-1.46.94-.38.44-.63.99-.72 1.58-.07.49 0 .98.17 1.44.17.45.46.85.84 1.16.38.31.83.52 1.32.62.49.1.99.09 1.47-.02.9-.21 1.64-.79 2.02-1.65.09-.2.3-.32.51-.32.28 0 .5.22.5.5 0 .07-.01.13-.02.19a4.12 4.12 0 01-2.96 2.69c-.6.21-1.24.32-1.89.32-.5 0-.99-.08-1.45-.24a3.6 3.6 0 01-2.4-2.34c-.09-.29-.14-.6-.13-.91.01-1 .3-1.93.82-2.7.6-.9 1.38-1.61 2.26-2.08.97-.52 2.08-.78 3.21-.78.96 0 1.88.21 2.69.6.48.23.9.53 1.26.88.36.35.65.76.86 1.2a4.3 4.3 0 01.32 2.85z"/>
  </svg>
);

export default function PortalVeterinariasAccessPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const { signIn, signUp } = useAuth();
  const [isSignInPending, startSignInTransition] = useTransition();
  const [isSignUpPending, startSignUpTransition] = useTransition();
  const { toast } = useToast();


  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSignInSubmit = (data: SignInFormValues) => {
    startSignInTransition(async () => {
      await signIn(data);
    });
  };

  const onSignUpSubmit = (data: SignUpFormValues) => {
    startSignUpTransition(async () => {
      await signUp(data);
    });
  };

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Briefcase className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold">Portal Veterinarias PetSync</CardTitle>
          <CardDescription className="text-md md:text-lg mt-2">
            Accede a tu cuenta o regístrate para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="default" className="bg-accent/10 border-accent/50">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <AlertTitle className="text-accent font-semibold">Funcionalidad de Autenticación</AlertTitle>
            <AlertDescription className="text-accent/90">
              La autenticación con Email/Contraseña está habilitada. Los inicios de sesión sociales (Google, etc.) son visuales y estarán disponibles próximamente.
              Necesitarás configurar tu proyecto Firebase en <code>src/lib/firebase/config.ts</code> y habilitar la autenticación por Email/Contraseña en la consola de Firebase.
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-6 pt-6">
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@correo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSignInPending}>
                    {isSignInPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                    Iniciar Sesión
                  </Button>
                </form>
              </Form>
              <div className="text-center text-sm">
                <Link href="#" className="text-primary hover:underline" onClick={(e) => {e.preventDefault(); toast({title: "Funcionalidad no implementada", description: "La recuperación de contraseña estará disponible pronto."})}}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="signup" className="space-y-6 pt-6">
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@correo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Mínimo 6 caracteres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Repite tu contraseña" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSignUpPending}>
                    {isSignUpPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Registrarse
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full" onClick={() => toast({title: "Próximamente", description: "Inicio de sesión con Google estará disponible pronto."})} disabled>
              <GoogleIcon />
              Iniciar sesión con Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => toast({title: "Próximamente", description: "Inicio de sesión con Outlook estará disponible pronto."})} disabled>
              <Mail className="mr-2 h-5 w-5" />
              Iniciar sesión con Outlook
            </Button>
            <Button variant="outline" className="w-full" onClick={() => toast({title: "Próximamente", description: "Inicio de sesión con Apple estará disponible pronto."})} disabled>
              <AppleIcon />
              Iniciar sesión con Apple
            </Button>
          </div>
          
          <Separator className="my-8" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">¿Representas a una clínica y quieres unirte?</p>
            <Button variant="outline" asChild className="w-full border-primary text-primary hover:bg-primary/10">
              <Link href="/#waitlist">Registrar mi Clínica (Unirse a Waitlist)</Link>
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
