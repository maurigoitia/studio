<<<<<<< HEAD

import Image from 'next/image';
=======
>>>>>>> 175e358 (saca lo del asistnbte de ia usa la parte el desorden de siempre , aca la)
import Link from 'next/link';

export function Logo() {
  // INSTRUCCIONES PARA EL USUARIO:
  // 1. Asegúrate de que tu archivo de logo (idealmente llamado 'petsync-logo.png') 
  //    esté en la carpeta `public/` en la raíz de tu proyecto.
  // 2. Ajusta 'logoWidth' y 'logoHeight' a continuación si las dimensiones de tu logo son diferentes a 32x32.
  //    Estas son las dimensiones intrínsecas de la imagen para optimización.
  //    El tamaño visual en la página se controla con las clases de Tailwind (className).

  const logoPath = '/petsync-logo.png'; // Ruta al logo en la carpeta public
  const logoIntrinsicWidth = 32; // Ancho intrínseco de tu imagen de logo
  const logoIntrinsicHeight = 32; // Alto intrínseco de tu imagen de logo

  return (
<<<<<<< HEAD
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src={logoPath}
        alt="PetSync Logo"
        width={logoIntrinsicWidth}
        height={logoIntrinsicHeight}
        className="h-8 w-8 object-contain group-hover:opacity-80 transition-opacity" // Controla el tamaño visual
        priority // Cargar el logo con prioridad
      />
      <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
        PetSync
      </span>
=======
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <span className="text-2xl font-bold">PetSync</span>
>>>>>>> 

