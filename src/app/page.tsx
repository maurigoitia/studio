
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, CalendarClock, Users, HelpCircle, ListChecks, Smartphone, BotMessageSquare, UserCog, ClipboardList, TriangleAlert, CheckCircle, BellRing, Cloud, FolderKanban, MailCheck, BarChart3, MessagesSquare, ShieldCheck, MapPin, ShoppingBag, DownloadCloud, LogIn, PawPrint, HandCoins, Stethoscope, Syringe, Microscope, Pill, FileHeart, Image as ImageIcon, Eye, MessageCircle, UserPlus, Clock, AlertTriangle, Send, Bot, HeartPulse, Search, Info } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


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
    <div className="flex flex-col items-center bg-background">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background text-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl"> {/* Ajustado max-w para mejor encaje de textos largos */}
            {/* <PawPrint className="mx-auto h-16 w-16 text-primary mb-6" /> */}
            <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              PetSync: el cuidado veterinario, sin el desorden de siempre.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
              Turnos, historiales y seguimientos organizados.
            </p>
            <p className="mt-2 text-md leading-7 text-muted-foreground md:text-lg"> {/* Ajustado margen y leading */}
              Una plataforma para clínicas. Una app para tutores.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform px-10 py-3 text-lg font-semibold rounded-lg"
                asChild
              >
                <Link href="#features">DESCUBRIR MÁS</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="w-full py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-10 sm:mb-12">Simplifica el Cuidado de tu Mascota con PetSync</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
              <CardHeader className="items-center text-center md:items-start md:text-left">
                <Users className="h-10 w-10 text-primary mb-3 mx-auto md:mx-0" />
                <CardTitle className="text-xl">Para Tutores de Mascotas</CardTitle>
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  <li>Historial médico centralizado y siempre accesible.</li>
                  <li>GIA: Tu copiloto IA para dudas y orientación (beta).</li>
                  <li>Agenda inteligente para turnos y recordatorios.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
              <CardHeader className="items-center text-center md:items-start md:text-left">
                <UserCog className="h-10 w-10 text-primary mb-3 mx-auto md:mx-0" />
                <CardTitle className="text-xl">Para Clínicas Veterinarias</CardTitle>
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  <li>Optimización de agenda y reducción de carga administrativa.</li>
                  <li>Historiales digitales compartidos y seguros.</li>
                  <li>Comunicación directa y eficaz con tutores.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card md:col-span-2 lg:col-span-1">
              <CardHeader className="items-center text-center md:items-start md:text-left">
                <BotMessageSquare className="h-10 w-10 text-primary mb-3 mx-auto md:mx-0" />
                <CardTitle className="text-xl">Conoce a GIA (Demo IA)</CardTitle>
              </CardHeader>
              <CardContent className="text-center md:text-left">
                <p className="text-muted-foreground mb-3 text-sm sm:text-base">
                  Prueba nuestro asistente IA para obtener respuestas generales sobre el cuidado de mascotas. ¡GIA aprende y mejora cada día!
                </p>
                 <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent mt-2" asChild>
                    <Link href="/gia">Chatear con GIA</Link>
                 </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Benefits for Tutors Section */}
      <section id="tutores" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-10 sm:mb-12">Beneficios para tutores</h2>
          <Card className="p-4 sm:p-6 md:p-8 shadow-xl bg-card">
            <CardContent className="p-0">
              <div className="space-y-8">
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                  <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 text-primary mr-0 md:mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Información de tu Mascota, Siempre Accesible</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Mantén el historial médico completo de tu mascota en un solo lugar seguro en la nube: vacunas, tratamientos, cirugías, alergias y enfermedades crónicas. Accede desde cualquier dispositivo y comparte fácilmente la información con tu veterinario o cuidadores.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                  <BrainCircuit className="h-8 w-8 sm:h-10 sm:w-10 text-primary mr-0 md:mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">GIA: Tu Copiloto Inteligente (Versión Beta)</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Experimenta cómo GIA puede ayudarte con dudas generales sobre tu mascota y, próximamente en la app, accederá a su historial médico de forma inteligente. Recuerda: GIA es una guía en desarrollo y no sustituye la consulta profesional.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                  <CalendarClock className="h-8 w-8 sm:h-10 sm:w-10 text-primary mr-0 md:mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Agenda Inteligente, Cero Estrés</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Organiza citas, vacunas y desparasitaciones sin esfuerzo. Programa y recibe recordatorios para medicamentos, y recibe alertas de salud sobre citas próximas o chequeos necesarios para que nunca olvides nada importante.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits for Veterinarians Section */}
      <section id="veterinarios" className="w-full py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-center mb-10 sm:mb-12">Beneficios para veterinarias</h2>
          <Card className="p-4 sm:p-6 md:p-8 shadow-xl bg-card">
            <CardContent className="p-0">
              <div className="space-y-8"> 
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                  <CalendarClock className="h-8 w-8 sm:h-10 sm:w-10 text-primary mr-0 md:mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Agenda inteligente, menos fricción</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Gestioná turnos en tiempo real con disponibilidad clara, sin llamados ni idas y vueltas. Menos tareas administrativas, más foco en tus pacientes.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                  <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-primary mr-0 md:mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Historiales médicos centralizados y siempre accesibles</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Cada mascota tiene su ficha clínica completa, organizada y actualizada. Vos cargás la info, el tutor accede. Información compartida, sin errores ni duplicados.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                  <MessagesSquare className="h-8 w-8 sm:h-10 sm:w-10 text-primary mr-0 md:mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Comunicación directa con cada tutor</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Mensajes, recordatorios automáticos y seguimientos en un solo canal. Nada se pierde, todo queda registrado. Sin depender de WhatsApp ni llamados de último momento.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section id="como-funciona" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">¿Cómo funciona PetSync?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Card className="shadow-lg border p-4 sm:p-6 bg-card">
              <CardHeader className="p-0 mb-3 sm:mb-4">
                <CardTitle className="text-xl sm:text-2xl">Para Tutores: Organiza y Accede a la Información de tu Mascota</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3 text-muted-foreground text-sm sm:text-base">
                <div className="flex items-start">
                    <DownloadCloud className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Cuando la app PetSync esté lista, descárgala para iOS y Android. Accedé fácilmente a la información de tu mascota desde cualquier dispositivo, en cualquier momento.</p>
                </div>
                <div className="flex items-start">
                    <ClipboardList className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Centralizá el historial de salud de tu mascota: vacunas, tratamientos, alergias y más, todo en un solo lugar.</p>
                </div>
                <div className="flex items-start">
                    <BellRing className="h-5 w-5 mr-3 text-primary shrink-0 mt-1"/>
                    <p>Recibí recordatorios personalizados sobre medicación, controles de salud y fechas importantes.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border p-4 sm:p-6 bg-card">
              <CardHeader className="p-0 mb-3 sm:mb-4">
                <CardTitle className="text-xl sm:text-2xl">Para Clínicas Veterinarias: Digitalizá y Potenciá tu Práctica</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3 text-muted-foreground text-sm sm:text-base">
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
      <section id="quienes-somos" className="w-full py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Quiénes Somos</h2>
          </div>
          <Card className="p-4 sm:p-6 md:p-8 shadow-xl bg-card">
            <CardContent className="p-0 text-left text-sm sm:text-base">
              <div className="space-y-4 sm:space-y-6 text-muted-foreground">
                <p>En PetSync, somos tutores y desarrolladores apasionados por los animales. Conocemos de primera mano el "vaivén" de la información dispersa, los papeles perdidos y la dificultad para coordinar el cuidado veterinario.</p>
                <p>Por eso creamos PetSync: para transformar ese caos en calma.</p>
                <p>Nuestra misión es simple: conectar a tutores y veterinarias con una plataforma intuitiva que organiza historiales, simplifica la gestión y optimiza el tiempo, para que todos podamos dedicarnos a lo que realmente importa: el bienestar de nuestras mascotas.</p>
                <p>Estamos construyendo PetSync con herramientas inteligentes como GIA, nuestra IA en desarrollo, porque creemos que la tecnología puede ser una gran aliada en el cuidado animal.</p>
                <p className="mt-4 sm:mt-6 text-base sm:text-md font-semibold text-foreground">
                  Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Preguntas Frecuentes</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={`faq-${index}`} className="bg-card rounded-lg shadow-md mb-2 border">
                <AccordionTrigger className="px-3 sm:px-4 py-2 sm:py-3 text-left hover:no-underline flex items-center text-foreground text-sm sm:text-base">
                  {faq.question === "¿Está segura la información de mi mascota en PetSync?" && <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary shrink-0" /> }
                  <span className="flex-1">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-3 sm:px-4 pb-2 sm:pb-3 text-muted-foreground text-xs sm:text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="w-full py-12 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">¡Estamos en versión beta!</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Sumate a la waitlist para ser de los primeros en probar PetSync y ayudarnos a construir la mejor herramienta para el cuidado de nuestras mascotas.
          </p>
          <WaitlistForm />
          <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">PetSync y GIA están en desarrollo. ¡Estamos construyendo la app que revolucionará el cuidado de tu mascota!</p>
        </div>
      </section>
    </div>
  );
}
    
    
