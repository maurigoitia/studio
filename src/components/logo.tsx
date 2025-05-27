
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  // INSTRUCCIONES PARA EL USUARIO:
  // 1. Asegúrate de que tu archivo 'petsync-logo.png' esté en la carpeta `public/`.
  // 2. Ajusta 'logoWidth' y 'logoHeight' si es necesario para las dimensiones de tu logo.
  // Si no tienes un logo gráfico aún, este componente mostrará solo el texto "PetSync".

  const logoPath = '/petsync-logo.png'; 
  const logoWidth = 120; // Ejemplo, ajusta según tu logo
  const logoHeight = 30; // Ejemplo, ajusta según tu logo
  const showImageLogo = false; // Cambia a true cuando tengas tu petsync-logo.png en /public

  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      {showImageLogo && (
        <Image
          src={logoPath}
          alt="PetSync Logo"
          width={logoWidth}
          height={logoHeight}
          className="h-8 object-contain" // Ajusta la altura visual si es necesario
          priority
        />
      )}
      {!showImageLogo && (
        <span className="text-xl sm:text-2xl font-bold">PetSync</span>
      )}
    </Link>
  );
}
