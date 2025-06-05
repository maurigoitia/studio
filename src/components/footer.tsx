export default function Footer() {
  return (
    <footer className="border-t bg-gray-100">
      <div className="container py-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} PetSync. Todos los derechos reservados.</p>
        <p className="mt-1">Simplificando el cuidado de tu mascota, con amor y tecnología.</p>
      </div>
    </footer>
  );
}
