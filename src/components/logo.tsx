
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  // INSTRUCCIONES PARA EL USUARIO:
  // 1. Asegúrate de que tu archivo 'petsync-logo.png' esté en la carpeta `public/`.
  // 2. Si tu logo tiene dimensiones diferentes a 32x32, ajusta los valores de 'logoWidth' y 'logoHeight'
  //    en este archivo para que coincidan con las dimensiones originales de tu imagen.
  //    Las clases 'h-8 w-8' de Tailwind controlan el tamaño visual en la página.

  const logoPath = '/petsync-logo.png'; 
  const logoWidth = 32; // Ancho original de tu imagen de logo
  const logoHeight = 32; // Alto original de tu imagen de logo

  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Image
        src={logoPath}
        alt="PetSync Logo"
        width={logoWidth}
        height={logoHeight}
        className="h-8 w-8 object-contain" 
        priority // Sugerencia: Añadir priority si el logo es crítico para el LCP
      />
      <span className="text-2xl font-bold">PetSync</span>
    </Link>
  );
}
