
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalendarCog, ClipboardCheck, MessagesSquare, ActivitySquare, BrainCircuit, UserCog, BarChartBig, ShieldCheck, UsersRound, ExternalLink, Plug } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function VetPortalInfoPage() {
  const features = [
    {
      icon: <CalendarCog className="h-10 w-10 text-primary mb-4" />,
      title: "Agenda Inteligente y Gestión de Turnos",
      description: "Optimiza la programación de citas, reduce las ausencias con recordatorios automáticos y permite a tus clientes solicitar turnos online de forma sencilla, todo sincronizado en tiempo real con la base de datos central de PetSync."
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-primary mb-4" />,
      title: "Historiales Clínicos Digitales Centralizados",
      description: "Accede y gestiona fichas completas de tus pacientes, incluyendo vacunas, tratamientos y estudios. Información segura, individual para cada animal y siempre disponible, almacenada en la nube de PetSync."
    },
    {
      icon: <MessagesSquare className="h-10 w-10 text-primary mb-4" />,
      title: "Comunicación Directa y Eficaz con Tutores",
      description: "Envía recordatorios, resultados y comunicados importantes directamente a los tutores a través de la app PetSync o por email, utilizando la información de contacto de tu base de datos de pacientes. Todo queda registrado."
    },
    {
      icon: <ActivitySquare className="h-10 w-10 text-primary mb-4" />,
      title: "Gestión de Sala de Espera y Triage Avanzado",
      description: "Organiza el flujo de pacientes sin turno, prioriza urgencias con un sistema de triage visual y notifica al equipo. Los veterinarios accederán al historial completo y podrán enviar resúmenes, actualizando la base de datos."
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary mb-4" />,
      title: "Asistencia IA (GIA) para Veterinarios",
      description: "GIA, nuestra IA en desarrollo, asistirá en la generación de resúmenes clínicos, búsqueda rápida de información relevante en historiales y protocolos, optimizando tu tiempo."
    },
    {
      icon: <UserCog className="h-10 w-10 text-primary mb-4" />,
      title: "Gestión de Múltiples Usuarios y Roles",
      description: "Define perfiles para recepción, veterinarios y administradores, con accesos diferenciados para una gestión segura y eficiente de tu clínica, según el plan PetSync."
    },
    {
      icon: <BarChartBig className="h-10 w-10 text-primary mb-4" />,
      title: "Reportes y Analíticas (Próximamente)",
      description: "Obtén información valiosa sobre la actividad de tu clínica, rendimiento de servicios y seguimiento de pacientes para una mejor toma de decisiones."
    },
     {
      icon: <ShieldCheck className="h-10 w-10 text-primary mb-4" />,
      title: "Seguridad y Cumplimiento",
      description: "Tus datos y los de tus pacientes están protegidos con los más altos estándares de seguridad y en cumplimiento con las normativas de protección de datos."
    }
  ];

  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSe_placeholder_form_id_for_petsync_vets/viewform?usp=sf_link"; // Reemplaza con tu link real

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page-specific simple navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <div className="space-x-4">
            <Link href={googleFormLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Registrarse (Acceso Temprano)
            </Link>
            <Link href="#contacto-portal" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Contáctanos
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-background text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Portal PetSync para Veterinarias: Optimiza tu Práctica, Cuida Mejor.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre herramientas inteligentes diseñadas para la gestión eficiente de tu clínica, la conexión fluida con tutores y el seguimiento integral de la salud de cada paciente.
            </p>
          </div>
        </section>

        {/* Why Choose PetSync Section */}
        <section className="py-12 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Por Qué Elegir el Portal PetSync?</h2>
            <div className="my-6 flex justify-center"> <Logo /> </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              PetSync está diseñado para simplificar tu día a día, permitiéndote enfocarte en la atención al paciente mientras optimizas la gestión de tu clínica y fortaleces la relación con los tutores a través de una plataforma conectada e inteligente.
            </p>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Funcionalidades Destacadas del Portal</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12">
                <Card className="inline-block p-6 bg-primary/10 border-primary/30">
                    <CardHeader className="p-0 items-center">
                        <Plug className="h-10 w-10 text-primary mb-3" />
                        <CardTitle className="text-xl">Conexiones e Integraciones (Futuro)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-2">
                        <p className="text-muted-foreground text-sm">
                        Estamos trabajando para que PetSync se integre con tus herramientas favoritas. Próximamente: Conexión con software de gestión clínica, plataformas de email marketing, pasarelas de pago y más. La información de tu clínica y pacientes se gestionará de forma segura para facilitar estas integraciones.
                        </p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>
        
        {/* Connect with Tutors Section */}
        <section className="py-12 md:py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <UsersRound className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Fortalece el Vínculo con los Tutores
                </h2>
                <p className="text-lg text-muted-foreground">
                  La app PetSync para tutores asegura una comunicación transparente y eficiente. Ellos acceden a historiales médicos compartidos, reciben recordatorios automáticos y se mantienen al tanto del cuidado de sus mascotas, facilitando una atención coordinada y reduciendo tu carga administrativa.
                </p>
            </div>
          </div>
        </section>

        {/* Early Access CTA Section */}
        <section id="early-access-vet" className="py-12 md:py-20 bg-primary/10">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Transforma tu Clínica con PetSync: Solicita una Demostración o Únete al Programa de Acceso Anticipado
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Descubre cómo PetSync puede revolucionar la gestión de tu clínica y la conexión con tus clientes. Sé de los primeros en experimentar el poder de nuestra plataforma.
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform" asChild>
                    <Link href={googleFormLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Solicitar Demo / Más Información <ExternalLink className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Serás redirigido a un formulario de Google para completar tu solicitud.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>
        
        {/* Contact section placeholder */}
        <section id="contacto-portal" className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 max-w-xl text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">¿Preguntas? Contáctanos</h2>
                <p className="text-muted-foreground mb-6">
                    Si tienes alguna duda sobre el Portal PetSync para Veterinarias o el programa de acceso temprano, no dudes en escribirnos.
                </p>
                {/* Placeholder para un futuro formulario de contacto o email */}
                <Button variant="outline" asChild>
                    <Link href="mailto:soporte-vets@petsync.example.com">Enviar un Email</Link>
                </Button>
                 <p className="text-xs text-muted-foreground mt-4">(Email de ejemplo: soporte-vets@petsync.example.com)</p>
            </div>
        </section>

      </main>

      {/* Page-specific simple footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 px-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PetSync. Todos los derechos reservados.</p>
          <div className="mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Centro de ayuda (Próximamente)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
