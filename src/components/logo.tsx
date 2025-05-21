import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  // INSTRUCCIONES PARA EL USUARIO:
  // 1. Asegúrate de que tu archivo 'petsync-logo.png' esté en la carpeta `public/`.
  // 2. Ajusta 'logoWidth' y 'logoHeight' si es necesario para las dimensiones de tu logo.

  const logoPath = '/petsync-logo.png'; 
  const logoWidth = 32; // Ajusta al ancho de tu logo si es diferente
  const logoHeight = 32; // Ajusta al alto de tu logo si es diferente

  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Image
        src={logoPath}
        alt="PetSync Logo"
        width={logoWidth}
        height={logoHeight}
        className="h-8 w-8 object-contain" 
      />
      <span className="text-2xl font-bold">PetSync</span>
    </Link>
  );
}
