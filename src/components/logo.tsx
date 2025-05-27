
import Image from 'next/image';
import Link from 'next/link';
import { Smile } from 'lucide-react';

export function Logo() {
  // INSTRUCCIONES PARA EL USUARIO (si decide añadir una imagen en el futuro):
  // 1. Coloca tu archivo de logo (ej. 'petsync-logo.png') en la carpeta `public/`.
  // 2. Descomenta el componente <Image /> abajo.
  // 3. Ajusta 'logoPath', 'logoWidth' y 'logoHeight' para que coincidan con tu imagen.
  //    Las clases 'h-8 w-8' de Tailwind controlan el tamaño visual en la página.

  // const logoPath = '/petsync-logo.png'; 
  // const logoWidth = 32; 
  // const logoHeight = 32; 

  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      {/*
      <Image
        src={logoPath}
        alt="PetSyncPro Logo"
        width={logoWidth}
        height={logoHeight}
        className="h-8 w-8 object-contain" 
        priority
      />
      */}
      <span className="text-xl sm:text-2xl font-bold">PetSyncPro</span>
    </Link>
  );
}
