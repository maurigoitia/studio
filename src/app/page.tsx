
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, CalendarClock, Users, Network, HelpCircle, ListChecks, UsersRound, Mail, DownloadCloud, ShieldCheck, HeartPulse, MapPin, ShoppingBag, ClipboardList, Bot, Lightbulb, Search, MessagesSquare, Smartphone, TriangleAlert } from 'lucide-react';
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
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform" asChild>
              <Link href="#gia-chat-demo">DESCUBRIR MÁS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Chatea con GIA - Introduction to Demo on Landing Page */}
      <section id="gia-chat-demo" className="w-full py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">✨ Conoce a GIA: La Inteligencia Artificial que Acompaña a tu Mascota ✨</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            En PetSync, estamos desarrollando a GIA, una asistente virtual diseñada para ofrecerte respuestas inteligentes y personalizadas sobre el cuidado de tu mascota. Accede a información, resuelve dudas comunes y obtén orientación al instante.
          </p>
          
          <h3 className="text-2xl font-semibold text-foreground mb-6 mt-10">¿Qué puedes hacer con GIA en esta Demo Beta?</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-10">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Search className="h-6 w-6 mr-2 text-primary" />
                  Consultas Rápidas de Cuidado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Pregúntale a GIA sobre alimentación, comportamiento, o cuidados generales. <br/>(Ej: "GIA, ¿cuántas veces al día debe comer mi cachorro?")</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Lightbulb className="h-6 w-6 mr-2 text-primary" />
                  Orientación General de Salud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Describe un síntoma o una duda de salud y GIA te ofrecerá información general y posibles pasos a seguir. <br/>(Ej: "GIA, mi gato estornuda mucho últimamente, ¿qué podría indicar?")</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <HeartPulse className="h-6 w-6 mr-2 text-primary" />
                  Entiende Mejor a tu Mascota
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">GIA te ayuda a descifrar comportamientos y necesidades de tu compañero peludo.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Interactúa con GIA (Demo): Prueba cómo GIA puede asistirte.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transform hover:scale-105 transition-transform mb-10" asChild>
            <Link href="/gia">Preguntar a GIA</Link>
          </Button>

          <Alert variant="destructive" className="max-w-2xl mx-auto mb-8 text-left shadow-md">
            <TriangleAlert className="h-5 w-5" />
            <AlertTitle className="font-semibold">⚠️ GIA es tu copiloto, no tu veterinario.</AlertTitle>
            <AlertDescription>
              La información proporcionada por GIA en esta demo es para fines orientativos y educativos. NUNCA debe reemplazar el diagnóstico, consejo o tratamiento de un veterinario profesional. Para la salud de tu mascota, consulta siempre a tu veterinario de confianza.
            </AlertDescription>
          </Alert>

          <p className="text-md text-muted-foreground">PetSync y GIA están en desarrollo. ¡Estamos construyendo la app que revolucionará el cuidado de tu mascota!</p>
          {/* The waitlist button that was here has been removed to avoid redundancy */}
        </div>
      </section>

      {/* Benefits for Tutors Section */}
      <section id="tutores" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Beneficios para tutores</h2>
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
        </div>
      </section>

      {/* Benefits for Veterinarians Section */}
      <section id="veterinarios" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Beneficios para veterinarias</h2>
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
        </div>
      </section>
      
      {/* How it Works Section */}
      <section id="como-funciona" className="w-full py-16 md:py-24 bg-secondary/50">
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

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Preguntas Frecuentes</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={`faq-${index}`} className="bg-card rounded-lg shadow mb-2 border">
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

      {/* About Us Section */}
      <section id="quienes-somos" className="w-full py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <UsersRound className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">PetSync: Nacido de la Pasión y la Necesidad</h2>
          </div>
          <div className="max-w-3xl mx-auto text-left md:text-center space-y-6 text-muted-foreground">
            <p>En PetSync, no solo desarrollamos software; vivimos el mundo del cuidado animal día a día. Somos un equipo de desarrolladores apasionados por las mascotas y tutores que hemos vivido el caos de la información dispersa.</p>
            <h3 className="text-xl font-semibold text-foreground pt-4">El Origen de PetSync: Del Desorden a la Claridad</h3>
            <p>Conocemos de primera mano ese "vaivén": la frustración de las planillas interminables, los historiales médicos en papeles que se pierden, la información vital de nuestros pacientes o nuestras propias mascotas distribuida en mil plataformas diferentes, las llamadas que no terminan más para coordinar un turno... ¡Un verdadero dolor de cabeza que nos quitaba tiempo valioso que preferíamos dedicar al cuidado animal o a disfrutar de nuestros compañeros!</p>
            <p>Nos preguntamos: ¿Y si pudiéramos simplificar todo esto? ¿Y si existiera una forma de conectar a tutores y veterinarias de manera fluida, con toda la información organizada y accesible en un solo lugar?</p>
            <p>Así nació PetSync.</p>
            <p>Nuestra misión es transformar ese caos en calma, esa fricción en conexión. Desarrollamos una plataforma pensada para que los tutores tengan la tranquilidad de un cuidado coordinado y para que las clínicas veterinarias puedan optimizar su gestión, dedicando más tiempo a lo que realmente importa: la salud y el bienestar animal.</p>
            <p>Estamos convencidos de que la tecnología puede ser una gran aliada. Por eso, estamos construyendo PetSync con herramientas como la inteligencia artificial de GIA, nuestro copiloto en beta, para ofrecerte una experiencia cada vez más inteligente y personalizada.</p>
            <p>Conectamos ambos lados del mostrador, una patita a la vez, porque entendemos tus necesidades y compartimos tu amor por los animales.</p>
            <p className="mt-6 text-center text-md font-semibold text-foreground">
              Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
