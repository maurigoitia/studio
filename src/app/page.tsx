
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, CalendarClock, Users, Network, HelpCircle, ListChecks, UsersRound, Mail, DownloadCloud, ShieldCheck, HeartPulse, MapPin, ShoppingBag, ClipboardList, Bot, Lightbulb, Search, Smartphone, TriangleAlert, Brain, MessagesSquare } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


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
    answer: "La versión básica de PetSync para tutores será gratuita. Ofreceremos funciones premium opcionales en el futuro. ¡Regístrate en la waitlist para conocer los detalles del lanzamiento!"
  },
  {
    question: "¿Para quiénes está pensado PetSync?",
    answer: "PetSync está diseñado principalmente para tutores de mascotas urbanos (25-40 años) y veterinarias en Buenos Aires que buscan optimizar la gestión de la salud de las mascotas y mejorar la conexión entre ellos."
  },
  {
    question: "Soy veterinario independiente, ¿PetSync me sirve?",
    answer: "¡Absolutamente! PetSync está diseñado para ser útil tanto para veterinarios independientes como para clínicas, ofreciendo herramientas para optimizar la agenda, la comunicación y el acceso a la información del paciente (con permiso del tutor)."
  },
  {
    question: "Soy una clínica grande, ¿cómo se integra PetSync con lo que ya tengo?",
    answer: "PetSync está diseñado con una interfaz amigable y buscamos facilitar su adopción. Evaluaremos opciones de integración con sistemas de gestión veterinaria existentes en el futuro. ¡Contáctanos para conversar sobre tus necesidades!"
  },
  {
    question: "¿Está segura la información de mi mascota en PetSync?",
    answer: "La seguridad y privacidad de tus datos y los de tu mascota son nuestra máxima prioridad. Utilizamos medidas de seguridad estándar de la industria para proteger tu información. Podés consultar más detalles en nuestra Política de Privacidad."
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            PetSync: el cuidado veterinario, sin el desorden de siempre.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Turnos, historiales y seguimientos organizados.
          </p>
          <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Una plataforma para clínicas. Una app para tutores.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform" asChild>
              <Link href="#tutores">DESCUBRIR MÁS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits for Tutors Section */}
      <section id="tutores" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Beneficios para tutores</h2>
          <Card className="p-6 md:p-8 shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-1 gap-8">
                <div className="space-y-8">
                  <div className="flex items-start">
                    <Smartphone className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Información de tu Mascota, Siempre Accesible</h3>
                      <p className="text-muted-foreground">Toda la información de tus mascotas en un único lugar, digital y siempre disponible. Registra vacunas, desparasitaciones, estudios, medicación, alergias y escaneá recetas o documentos importantes. Perfecto para tener todo a mano en cada visita al veterinario.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BrainCircuit className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">GIA: Tu Copiloto Inteligente (Versión Beta)</h3>
                      <p className="text-muted-foreground">Experimenta cómo GIA puede ayudarte con dudas generales sobre tu mascota y, próximamente en la app, accederá a su historial médico de forma inteligente. Recuerda: GIA es una guía en desarrollo y no sustituye la consulta profesional.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CalendarClock className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Agenda Inteligente, Cero Estrés</h3>
                      <p className="text-muted-foreground">Organizá turnos, vacunas y desparasitaciones sin esfuerzo. Recibí recordatorios inteligentes para que nunca más olvides una cita importante.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits for Veterinarians Section */}
      <section id="veterinarios" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Beneficios para veterinarias</h2>
          <Card className="p-6 md:p-8 shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-1 gap-8">
                <div className="space-y-8"> 
                  <div className="flex items-start">
                    <CalendarClock className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Agenda inteligente, menos fricción</h3>
                      <p className="text-muted-foreground">Gestioná turnos en tiempo real con disponibilidad clara, sin llamados ni idas y vueltas. Menos tareas administrativas, más foco en tus pacientes.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ClipboardList className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Historiales médicos centralizados y siempre accesibles</h3>
                      <p className="text-muted-foreground">Cada mascota tiene su ficha clínica completa, organizada y actualizada. Vos cargás la info, el tutor accede. Información compartida, sin errores ni duplicados.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessagesSquare className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Comunicación directa con cada tutor</h3>
                      <p className="text-muted-foreground">Mensajes, recordatorios automáticos y seguimientos en un solo canal. Nada se pierde, todo queda registrado. Sin depender de WhatsApp ni llamados de último momento.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section id="como-funciona" className="w-full py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <ListChecks className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">¿Cómo funciona?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <Card className="shadow-lg border">
              <CardHeader>
                <CardTitle className="text-2xl">Para Tutores: El Cuidado de tu Mascota, Simplificado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="flex items-center">
                    <DownloadCloud className="h-5 w-5 mr-2 text-primary shrink-0"/>
                    <p>1. Cuando la app PetSync esté lista, descárgala para iOS y Android.</p>
                </div>
                <p>2. Creá un perfil detallado para tu mascota.</p>
                <p>3. Conectate fácilmente con tu veterinaria de confianza.</p>
                <p>4. Gestioná citas y recibí recordatorios importantes.</p>
                <p className="font-semibold text-foreground">¡Así de fácil!</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border">
              <CardHeader>
                <CardTitle className="text-2xl">Para Veterinarias: Potenciá tu Clínica, Conectá con Pacientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>1. Registrate en la plataforma web de PetSync.</p>
                <p>2. Creá un perfil completo para tu clínica.</p>
                <p>3. Optimiza la comunicación con tus pacientes a través de la plataforma.</p>
                <p>4. Gestioná turnos y enviá comunicados importantes a tus clientes.</p>
                <p className="font-semibold text-foreground">¡Así de fácil!</p>
              </CardContent>
            </Card>
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
      
      {/* Quiénes Somos Section */}
      <section id="quienes-somos" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <UsersRound className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Quiénes Somos</h2>
          </div>
          <div className="max-w-3xl mx-auto text-left md:text-center space-y-6 text-muted-foreground">
            <p>En PetSync, somos tutores y desarrolladores apasionados por los animales. Conocemos de primera mano el "vaivén" de la información dispersa, los papeles perdidos y la dificultad para coordinar el cuidado veterinario.</p>
            <p>Por eso creamos PetSync: para transformar ese caos en calma.</p>
            <p>Nuestra misión es simple: conectar a tutores y veterinarias con una plataforma intuitiva que organiza historiales, simplifica la gestión y optimiza el tiempo, para que todos podamos dedicarnos a lo que realmente importa: el bienestar de nuestras mascotas.</p>
            <p>Estamos construyendo PetSync con herramientas inteligentes como GIA, nuestra IA en desarrollo, porque creemos que la tecnología puede ser una gran aliada en el cuidado animal.</p>
            <p className="mt-6 text-center text-md font-semibold text-foreground">
              Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Preguntas Frecuentes</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={`faq-${index}`} className="bg-background rounded-lg shadow mb-2 border">
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline flex items-center text-foreground">
                  {faq.question === "¿Está segura la información de mi mascota en PetSync?" && <ShieldCheck className="h-5 w-5 mr-2 text-primary shrink-0" /> }
                  <span className="flex-1">{faq.question}</span>
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

