
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MessageSquare, X, Bot, TriangleAlert } from 'lucide-react';
import GIAClient from '@/components/gia-client'; 

export default function GIAChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-50"
        aria-label="Abrir chat de GIA"
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-24 w-[calc(100vw-3rem)] max-w-md h-[70vh] sm:h-[calc(100vh-5rem)] sm:max-h-[650px] z-40 shadow-2xl rounded-lg bg-card border flex flex-col overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
            <div className='flex items-center gap-2'>
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Chatea con GIA</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Cerrar chat">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-grow flex flex-col">
            <Alert variant="destructive" className="m-2 sm:m-3 text-xs rounded-md">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle className="font-semibold text-xs">¡Importante!</AlertTitle>
              <AlertDescription>
                GIA es una IA en desarrollo. Sus respuestas son informativas y <strong>nunca reemplazan</strong> el consejo de un veterinario.
              </AlertDescription>
            </Alert>
            <div className="flex-grow overflow-hidden"> 
              <GIAClient />
            </div>
          </CardContent>
        </div>
      )}
    </>
  );
}
