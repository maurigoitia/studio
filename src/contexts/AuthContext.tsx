
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  type User 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import type { SignUpFormValues, SignInFormValues } from '@/lib/schemas';
import { useToast } from "@/hooks/use-toast";


interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (data: SignUpFormValues) => Promise<void>;
  signIn: (data: SignInFormValues) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (data: SignUpFormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Registro Exitoso", description: "¡Bienvenido! Serás redirigido al panel."});
      router.push('/portal-veterinarias/dashboard'); // This route doesn't exist in current setup, might need adjustment later
    } catch (error: any) {
      console.error("Error en registro:", error);
      toast({ title: "Error en Registro", description: error.message || "No se pudo completar el registro.", variant: "destructive" });
    }
  };

  const signIn = async (data: SignInFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Inicio de Sesión Exitoso", description: "¡Bienvenido de nuevo! Serás redirigido al panel."});
      router.push('/portal-veterinarias/dashboard'); // This route doesn't exist in current setup, might need adjustment later
    } catch (error: any) {
      console.error("Error en inicio de sesión:", error);
       toast({ title: "Error al Iniciar Sesión", description: error.message || "Credenciales incorrectas.", variant: "destructive" });
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Sesión Cerrada", description: "Has cerrado sesión exitosamente."});
      router.push('/portal-veterinarias'); // This route is informational, not a login page
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      toast({ title: "Error", description: "No se pudo cerrar la sesión.", variant: "destructive" });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
