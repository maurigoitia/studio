
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PawPrint, Smartphone, BrainCircuit, CalendarClock, BarChartBig, Users, Network, HelpCircle, ListChecks, UsersRound, Mail } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';

const faqData = [
  {
    question: "¿Qué es PetSync y cómo puede ayudarme?",
    answer: "PetSync es una plataforma que conecta a tutores de mascotas y veterinarias para simplificar la gestión de la salud animal. Te ayuda a agendar turnos, acceder a historiales médicos, recibir recordatorios y mucho más, todo en un solo lugar."
  },
  {
    question: "¿Cómo me registro en PetSync?",
    answer: "Actualmente estamos en versión beta. Dejanos tu contacto en nuestra waitlist y te avisaremos tan pronto como puedas registrarte para ser de los primeros en probar PetSync."
  },
  {
    question: "¿PetSync tiene costo para los tutores de mascotas?",
    answer: "Estamos definiendo los detalles finales del plan de precios. Nuestro objetivo es ofrecer un gran valor. La información sobre costos estará disponible cerca del lanzamiento. ¡Regístrate en la waitlist para ser el primero en saberlo!"
  },
  {
    question: "¿Para quiénes está pensado PetSync?",
    answer: "PetSync está diseñado tanto para tutores de mascotas que buscan una forma más fácil y organizada de gestionar la salud de sus compañeros, como para veterinarios y clínicas que desean optimizar su práctica y mejorar la comunicación con sus clientes."
  },
  {
    question: "¿Soy veterinario independiente, ¿PetSync me sirve?",
    answer: "¡Absolutamente! PetSync ofrece herramientas valiosas tanto para veterinarios independientes como para clínicas más grandes, ayudando a gestionar la agenda, acceder a historiales (con permiso del tutor) y optimizar la comunicación."
  },
  {
    question: "¿Soy una clínica grande, ¿cómo se integra PetSync con lo que ya tengo?",
    answer: "PetSync está diseñado para ser flexible. Estamos trabajando en opciones de integración con software de gestión veterinaria. Contáctanos o regístrate en la waitlist para discutir tus necesidades específicas."
  },
  {
    question: "¿Cómo puedo contactar a PetSync si tengo más preguntas?",
    answer: "Puedes encontrar un enlace de 'Contacto' en el pie de página de nuestro sitio o buscarnos en nuestras redes sociales. ¡Estamos aquí para ayudarte!"
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto text-center px-4">
          <div className="flex justify-center mb-6">
            <PawPrint className="h-24 w-24 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            PetSync: El cuidado de tu mascota, simple y conectado.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Conectamos tutores y veterinarias para una gestión de salud integral. Agendá turnos, accedé a historiales médicos y más, todo en un solo lugar.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform" asChild>
              <a href="#waitlist">Sumate a la Waitlist</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits for Tutors Section */}
      <section id="tutores" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Beneficios para Tutores</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Tutor usando PetSync en su celular con su mascota" 
                width={600} 
                height={400} 
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="owner pet phone" 
              />
            </div>
            <div className="space-y-8">
              <div className="flex items-start">
                <Smartphone className="h-10 w-10 text-accent mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Tu Mascota, Siempre Contigo</h3>
                  <p className="text-muted-foreground">Accedé y gestioná el historial médico completo de tu mascota desde cualquier lugar. Escaneá recetas y documentos para tener toda la información centralizada y al alcance de tu mano.</p>
                </div>
              </div>
              <div className="flex items-start">
                <BrainCircuit className="h-10 w-10 text-accent mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Inteligencia Artificial a tu Servicio <span className="text-sm text-primary">(Próximamente)</span></h3>
                  <p className="text-muted-foreground">Consultá dudas sobre tratamientos pasados o próximos cuidados. Preguntale a PetSync: "¿Cuándo fue la última vacuna de Thor?" o "¿Qué medicación le dimos para su otitis?".</p>
                </div>
              </div>
              <div className="flex items-start">
                <CalendarClock className="h-10 w-10 text-accent mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Agenda Inteligente, Cero Estrés</h3>
                  <p className="text-muted-foreground">Organizá turnos, vacunas y desparasitaciones sin esfuerzo. Recibí recordatorios inteligentes para que nunca más olvides una cita importante.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Veterinarians Section */}
      <section id="veterinarios" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Beneficios para Veterinarias</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 md:order-2">
              <div className="flex items-start">
                <BarChartBig className="h-10 w-10 text-accent mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Optimizá tu Tiempo, Maximizá tu Impacto</h3>
                  <p className="text-muted-foreground">Gestioná tu agenda de forma eficiente, reducí la carga administrativa y dedicá más tiempo a lo que realmente importa: el cuidado de tus pacientes.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-10 w-10 text-accent mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Conexión Directa, Pacientes Felices</h3>
                  <p className="text-muted-foreground">Fortalecé la relación con tus clientes centralizando la información y facilitando una comunicación fluida y proactiva. Un servicio que fideliza.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Network className="h-10 w-10 text-accent mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ampliá tu Comunidad y Servicios</h3>
                  <p className="text-muted-foreground">Unite a una red creciente de tutores y profesionales. PetSync es el punto de encuentro para veterinarias, pet shops y proveedores que buscan conectar y ofrecer lo mejor.</p>
                </div>
              </div>
            </div>
            <div className="md:order-1 flex justify-center">
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Veterinaria usando PetSync en una tablet en su clínica" 
                width={600} 
                height={400} 
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="veterinarian tablet clinic"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <ListChecks className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">¿Cómo funciona?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Para Tutores: El Cuidado de tu Mascota, Simplificado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>1. Descargá la app PetSync.</p>
                <p>2. Creá un perfil detallado para tu mascota.</p>
                <p>3. Conectate fácilmente con tu veterinaria de confianza.</p>
                <p>4. Gestioná citas y recibí recordatorios importantes.</p>
                <p className="font-semibold text-foreground">¡Así de fácil!</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Para Veterinarias: Potenciá tu Clínica, Conectá con Pacientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>1. Registrate en PetSync.</p>
                <p>2. Creá un perfil completo para tu clínica.</p>
                <p>3. Invitá a tus pacientes a unirse a la comunidad PetSync.</p>
                <p>4. Gestioná turnos y enviá comunicados importantes a tus clientes.</p>
                <p className="font-semibold text-foreground">¡Así de fácil!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="quienes-somos" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <UsersRound className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Quiénes somos</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">
              En PetSync, desarrollamos una plataforma móvil pensada para tutores y clínicas veterinarias, convencidos de que el cuidado de las mascotas puede ser más simple y eficiente para todos. Organizamos turnos, centralizamos historiales clínicos y facilitamos el acceso a productos esenciales, todo desde tu celular. Conectamos ambos lados del mostrador, una patita a la vez.
            </p>
            <Image 
                src="https://placehold.co/700x400.png" 
                alt="Equipo de PetSync trabajando" 
                width={700} 
                height={400} 
                className="rounded-xl shadow-xl object-cover mt-8 mx-auto"
                data-ai-hint="team diversity collaboration"
              />
          </div>
        </div>
      </section>
      
      {/* Waitlist Section */}
      <section id="waitlist" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¡Estamos en versión beta!</h2>
          <p className="text-muted-foreground mb-8">
            Sumate a la waitlist para ser de los primeros en probarla y ayudarnos a construir la mejor herramienta para el cuidado de nuestras mascotas.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Preguntas Frecuentes</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={`faq-${index}`} className="bg-background rounded-lg shadow mb-2">
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

    