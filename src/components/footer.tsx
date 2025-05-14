export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PetSync. Todos los derechos reservados.</p>
        <p className="mt-1">Conectando el cuidado de tu mascota, con amor y tecnología.</p>
      </div>
    </footer>
  );
}
