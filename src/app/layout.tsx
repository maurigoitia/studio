
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// import Header from '@/components/header'; // Header was removed
import Footer from '@/components/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import GIAChatWidget from '@/components/gia-chat-widget'; // Reverted to alias path

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PetSync - Conectando Tutores y Veterinarios',
  description: 'Simplificando el cuidado de tu mascota.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          {/* <Header /> */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <GIAChatWidget />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
