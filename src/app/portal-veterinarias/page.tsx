
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ListChecks, Users, CalendarClock, ClipboardList, MessagesSquare, Lightbulb, ShieldCheck, BarChart3, UserCog, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function PortalVeterinariasInfoPage() {
  const features = [
    {
      icon: <CalendarClock className="h-8 w-8 text-primary mb-2" />,
      title: "Agenda Inteligente y Gestión de Turnos",
      description: "Optimiza la programación de citas, reduce las ausencias con recordatorios automáticos y permite a tus clientes solicitar turnos online de forma sencilla."
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-primary mb-2" />,
      title: "Historiales Clínicos Digitales Centralizados",
      description: "Accede y gestiona fichas completas de tus pacientes, incluyendo vacunas, tratamientos, cirugías, alergias y estudios. Información segura y siempre disponible."
    },
    {
      icon: <MessagesSquare className="h-8 w-8 text-primary mb-2" />,
      title: "Comunicación Directa y Eficaz con Tutores",
      description: "Envía recordatorios, resultados, y comunicados importantes directamente a los tutores a través de la app PetSync o por email. Todo queda registrado."
    },
    {
      icon: <ListChecks className="h-8 w-8 text-primary mb-2" />,
      title: "Gestión de Sala de Espera y Triage Avanzado",
      description: "Organiza el flujo de pacientes sin turno, prioriza urgencias con un sistema de triage visual y notifica al equipo sobre el estado de la atención."
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary mb-2" />, // Changed from Lightbulb
      title: "Asistencia IA (GIA) para Veterinarios",
      description: "GIA, nuestra IA en desarrollo, asistirá en la generación de resúmenes clínicos, búsqueda rápida de información relevante en historiales y protocolos, optimizando tu tiempo."
    },
    {
      icon: <UserCog className="h-8 w-8 text-primary mb-2" />,
      title: "Gestión de Múltiples Usuarios y Roles",
      description: "Define perfiles para recepción, veterinarios y administradores, con accesos diferenciados para una gestión segura y eficiente de tu clínica."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary mb-2" />,
      title: "Reportes y Analíticas (Próximamente)",
      description: "Obtén información valiosa sobre la actividad de tu clínica, rendimiento de servicios y seguimiento de pacientes para una mejor toma de decisiones."
    },
     {
      icon: <ShieldCheck className="h-8 w-8 text-primary mb-2" />,
      title: "Seguridad y Cumplimiento",
      description: "Tus datos y los de tus pacientes están protegidos con los más altos estándares de seguridad y en cumplimiento con las normativas de protección de datos."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          PetSync para Clínicas Veterinarias: La Plataforma Inteligente para tu Práctica
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Transforma la gestión de tu práctica veterinaria con herramientas inteligentes diseñadas para optimizar tu tiempo, mejorar la atención al paciente y fortalecer la relación con tus clientes.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Funcionalidades Destacadas del Portal</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="early-access-vet" className="py-12 bg-secondary/50 rounded-lg shadow-xl">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Users className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Optimiza tu Clínica con PetSync: Solicita una Demostración o Únete al Programa de Acceso Anticipado
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Descubre cómo PetSync puede revolucionar la gestión de tu clínica y la conexión con tus clientes. Sé de los primeros en experimentar el poder de nuestra plataforma.
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform" asChild>
                  <Link href="https://docs.google.com/forms/d/e/1FAIpQLSe_placeholder_form_id_for_petsync_vets/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                    Solicitar Demo / Más Información
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
    </div>
  );
}
