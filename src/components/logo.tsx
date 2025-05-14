import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  // INSTRUCCIONES PARA EL USUARIO:
  // 1. Coloca tu archivo de logo (ej. 'my-logo.png', 'my-logo.svg') 
  //    en la carpeta `public/` de tu proyecto.
  // 2. Actualiza 'logoPath' abajo para que apunte a tu archivo de logo 
  //    (ej. '/my-logo.png').
  // 3. Ajusta 'logoWidth' y 'logoHeight' a las dimensiones de tu logo.
  // 4. Si tu logo ya incluye el texto "PetSync", puedes eliminar el <span>.

  const logoPath = '/petsync-logo.png'; // Ejemplo: Reemplaza con '/tu-logo.png'
  const logoWidth = 32; // Ajusta al ancho de tu logo
  const logoHeight = 32; // Ajusta al alto de tu logo

  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Image
        src={logoPath}
        alt="PetSync Logo"
        width={logoWidth}
        height={logoHeight}
        // La clase 'h-8 w-8' intenta forzar un tamaño, puedes ajustarla o quitarla
        // si las dimensiones de 'width' y 'height' son suficientes para tu diseño.
        // Si usas un SVG, podrías no necesitar 'width' y 'height' aquí y controlar 
        // el tamaño con CSS/Tailwind.
        className="h-8 w-8 object-contain" 
      />
      <span className="text-2xl font-bold">PetSync</span>
    </Link>
  );
}
