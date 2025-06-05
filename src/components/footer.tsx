import Link from 'next/link';
import { Logo } from './logo'; // Asumiendo que el logo no tiene PawPrint por defecto ahora

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <Logo />
            <p className="text-sm text-gray-500 mt-2">
              Tu mascota, sus cosas, todo en orden.
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-2">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/terminos-y-condiciones" legacyBehavior>
                  <a className="hover:text-blue-600">Términos y condiciones</a>
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad" legacyBehavior>
                  <a className="hover:text-blue-600">Política de Privacidad</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm text-gray-600 md:text-right">
            <h3 className="font-semibold text-gray-700 mb-2">Contacto</h3>
            <p>
              <a href="mailto:contacto@petsync.com" className="hover:text-blue-600">
                contacto@petsync.com
              </a>
            </p>
            <div className="mt-2">
                <p className="font-semibold text-gray-700">Síguenos:</p>
                {/* Placeholder para iconos de redes sociales */}
                <div className="flex justify-center md:justify-end space-x-3 mt-1">
                    <a href="#" className="text-gray-500 hover:text-blue-600">FB</a>
                    <a href="#" className="text-gray-500 hover:text-blue-600">IG</a>
                    <a href="#" className="text-gray-500 hover:text-blue-600">TW</a>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} PetSync. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
