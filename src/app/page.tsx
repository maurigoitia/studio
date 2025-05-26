
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, CalendarClock, Users, HelpCircle, ListChecks, UsersRound, Mail, DownloadCloud, ShieldCheck, Smartphone, Bot, Search, HeartPulse, MessagesSquare, CheckCircle, UserCheck, BellRing, Cloud, FolderKanban, MailCheck, BarChart3, TriangleAlert, BotMessageSquare, UserCog, ActivitySquare, Lightbulb } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';

const faqData = [
  {
    question: "¿Qué es PetSync y cómo puede ayudarme?",
    answer: "PetSync es una plataforma que conecta a tutores de mascotas y veterinarias para simplificar la gestión de la salud animal. Te ayuda a agendar turnos, acceder a historiales médicos, recibir recordatorios y mucho más, todo en un solo lugar."
  },
  {
    question: "¿Cómo me registro en PetSync?",
    answer: "Actualmente estamos en versión beta. Déjanos tu contacto en nuestra waitlist y te avisaremos tan pronto como puedas registrarte para ser de los primeros en probar PetSync."
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
      <section className="w-full py-16 md:py-28 bg-gradient-to-br from-primary/10 to-background">
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
              <Link href="#waitlist">ÚNETE A LA WAITLIST</Link>
            </Button>
             <Button size="lg" variant="outline" className="ml-4 shadow-lg transform hover:scale-105 transition-transform" asChild>
              <Link href="#gia-intro">Conoce a GIA</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="w-full py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Simplifica el Cuidado de tu Mascota con PetSync</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl">Para Tutores de Mascotas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Historial médico centralizado y siempre accesible.</li>
                  <li>GIA: Tu copiloto IA para dudas y orientación (beta).</li>
                  <li>Agenda inteligente para turnos y recordatorios.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <UserCog className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl">Para Clínicas Veterinarias</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Optimización de agenda y reducción de carga administrativa.</li>
                  <li>Historiales digitales compartidos y seguros.</li>
                  <li>Comunicación directa y eficaz con tutores.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <BotMessageSquare className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl">Conexión Inteligente con GIA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestra IA, GIA, está diseñada para asistirte, ofreciendo respuestas personalizadas y facilitando la gestión del cuidado de tu mascota.
                </p>
                 <Button variant="link" className="p-0 h-auto mt-2 text-primary" asChild>
                    <Link href="/gia">Prueba la Demo de GIA</Link>
                  </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* GIA Intro Section */}
      <section id="gia-intro" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Bot className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">✨ Conoce a GIA: La Inteligencia Artificial que Acompaña a tu Mascota ✨</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              En PetSync, estamos desarrollando a GIA, una asistente virtual diseñada para ofrecerte respuestas inteligentes y personalizadas sobre el cuidado de tu mascota. Accede a información, resuelve dudas comunes y obtén orientación al instante.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground text-center mb-8">¿Qué puedes hacer con GIA en esta Demo Beta?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <Card className="p-6 shadow-lg">
                <CardHeader className="p-0 mb-3 items-center">
                  <Search className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">Consultas Rápidas de Cuidado</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-sm">Pregúntale a GIA sobre alimentación, comportamiento, o cuidados generales. (Ej: "GIA, ¿cuántas veces al día debe comer mi cachorro?")</p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardHeader className="p-0 mb-3 items-center">
                  <HeartPulse className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">Orientación General de Salud</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-sm">Describe un síntoma o una duda de salud y GIA te ofrecerá información general y posibles pasos a seguir. (Ej: "GIA, mi gato estornuda mucho últimamente, ¿qué podría indicar?")</p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardHeader className="p-0 mb-3 items-center">
                   <ActivitySquare className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-xl">Entiende Mejor a tu Mascota</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-sm">GIA te ayuda a descifrar comportamientos y necesidades de tu compañero peludo.</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-10">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md" asChild>
                <Link href="/gia">Preguntar a GIA</Link>
              </Button>
            </div>
          </div>
          <Alert variant="destructive" className="max-w-2xl mx-auto mt-12 text-left shadow-md">
            <TriangleAlert className="h-5 w-5" />
            <AlertTitle className="font-semibold">⚠️ GIA es tu copiloto, no tu veterinario.</AlertTitle>
            <AlertDescription>
            La información proporcionada por GIA en esta demo es para fines orientativos y educativos. NUNCA debe reemplazar el diagnóstico, consejo o tratamiento de un veterinario profesional. Para la salud de tu mascota, consulta siempre a tu veterinario de confianza.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Benefits for Tutors Section */}
      <section id="tutores" className="w-full py-12 md:py-20 bg-secondary/50">
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
                      <p className="text-muted-foreground">Mantén el historial médico completo de tu mascota en un solo lugar seguro en la nube: vacunas, tratamientos, cirugías, alergias y enfermedades crónicas. Accede desde cualquier dispositivo y comparte fácilmente la información con tu veterinario o cuidadores.</p>
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
                      <p className="text-muted-foreground">Organiza citas, vacunas y desparasitaciones sin esfuerzo. Programa y recibe recordatorios para medicamentos, y recibe alertas de salud sobre citas próximas o chequeos necesarios para que nunca olvides nada importante.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits for Veterinarians Section */}
      <section id="veterinarios" className="w-full py-12 md:py-20 bg-background">
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
                    <ListChecks className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
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
      <section id="como-funciona" className="w-full py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">¿Cómo funciona PetSync?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <Card className="shadow-lg border p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl">Para Tutores: Organiza y Accede a la Información de tu Mascota</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3 text-muted-foreground">
                <div className="flex items-start">
                    <ListChecks className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Centralizá el historial de salud de tu mascota: vacunas, tratamientos, alergias y más, todo en un solo lugar.</p>
                </div>
                <div className="flex items-start">
                    <BellRing className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Recibí recordatorios personalizados sobre medicación, controles de salud y fechas importantes.</p>
                </div>
                <div className="flex items-start">
                    <DownloadCloud className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Cuando la app PetSync esté lista, descárgala para iOS y Android. Accedé fácilmente a la información de tu mascota desde cualquier dispositivo, en cualquier momento.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl">Para Clínicas Veterinarias: Digitalizá y Potenciá tu Práctica</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3 text-muted-foreground">
                 <div className="flex items-start">
                    <FolderKanban className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Gestioná historias clínicas electrónicas de tus pacientes de manera eficiente y segura.</p>
                </div>
                <div className="flex items-start">
                    <MailCheck className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Automatizá comunicaciones con los tutores: enviá recordatorios y notificaciones relevantes.</p>
                </div>
                <div className="flex items-start">
                    <BarChart3 className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Accedé a métricas clave para analizar la evolución de tus pacientes y optimizar tus servicios.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section id="quienes-somos" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Quiénes Somos</h2>
          </div>
          <Card className="p-6 md:p-8 shadow-xl bg-card">
            <CardContent className="p-0 text-left">
              <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
                <p>En PetSync, somos tutores y desarrolladores apasionados por los animales. Conocemos de primera mano el "vaivén" de la información dispersa, los papeles perdidos y la dificultad para coordinar el cuidado veterinario.</p>
                <p>Por eso creamos PetSync: para transformar ese caos en calma.</p>
                <p>Nuestra misión es simple: conectar a tutores y veterinarias con una plataforma intuitiva que organiza historiales, simplifica la gestión y optimiza el tiempo, para que todos podamos dedicarnos a lo que realmente importa: el bienestar de nuestras mascotas.</p>
                <p>Estamos construyendo PetSync con herramientas inteligentes como GIA, nuestra IA en desarrollo, porque creemos que la tecnología puede ser una gran aliada en el cuidado animal.</p>
                <p className="mt-6 text-md font-semibold text-foreground">
                  Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
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

      {/* Waitlist Section */}
      <section id="waitlist" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¡Estamos en versión beta!</h2>
          <p className="text-muted-foreground mb-8">
            Sumate a la waitlist para ser de los primeros en probarla y ayudarnos a construir la mejor herramienta para el cuidado de nuestras mascotas.
          </p>
          <WaitlistForm />
          <p className="mt-8 text-sm text-muted-foreground">PetSync y GIA están en desarrollo. ¡Estamos construyendo la app que revolucionará el cuidado de tu mascota!</p>
        </div>
      </section>
    </div>
  );
}

    