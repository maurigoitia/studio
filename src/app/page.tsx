// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Badge ya no es necesario
import {
  CalendarClock,
  Users,
  Smartphone,
  UserCog,
  ClipboardList,
  BellRing,
  Cloud,
  FolderKanban,
  MailCheck,
  BarChart3,
  MessagesSquare,
  ShieldCheck,
  DownloadCloud,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
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
    <div className="flex flex-col items-center bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-28 lg:py-36 bg-slate-50 dark:bg-slate-900 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
              PetSync: el cuidado veterinario, sin el desorden de siempre.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300 sm:text-xl md:mt-8">
              Turnos, historiales y seguimientos organizados.
            </p>
            <p className="mt-2 text-md leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              Una plataforma para clínicas. Una app para tutores.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transform hover:scale-105 transition-transform px-10 py-3 text-base font-semibold rounded-lg sm:text-lg"
                asChild
              >
                <Link href="#features">DESCUBRIR MÁS</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section - Ahora con 2 tarjetas */}
      <section id="features" className="w-full py-16 md:py-24 bg-background dark:bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 md:mb-16">Simplifica el Cuidado de tu Mascota con PetSync</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"> {/* Ajustado para 2 columnas */}
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card p-6 rounded-xl">
              <CardHeader className="items-center text-center p-0 mb-4 md:items-start md:text-left">
                <Users className="h-10 w-10 text-primary mb-3 mx-auto md:mx-0" />
                <CardTitle className="text-xl sm:text-2xl text-foreground">Para Tutores de Mascotas</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-0 md:text-left">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  <li>Historial médico centralizado y siempre accesible.</li>
                  <li>Agenda inteligente para turnos y recordatorios.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card p-6 rounded-xl">
              <CardHeader className="items-center text-center p-0 mb-4 md:items-start md:text-left">
                <UserCog className="h-10 w-10 text-primary mb-3 mx-auto md:mx-0" />
                <CardTitle className="text-xl sm:text-2xl text-foreground">Para Clínicas Veterinarias</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-0 md:text-left">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  <li>Optimización de agenda y reducción de carga administrativa.</li>
                  <li>Historiales digitales compartidos y seguros.</li>
                  <li>Comunicación directa y eficaz con tutores.</li>
                </ul>
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, Stethoscope, Users, Heart, Activity, HelpCircle, Mail, Lightbulb, NotebookText, CalendarClock, FileText, MessageSquareShare, CalendarCheck } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';


const faqData = [
  {
    id: "faq-1",
    question: "¿Cómo me ayuda PetSync a gestionar la salud de mi mascota?",
    answer: "PetSync te ofrece herramientas para centralizar el historial médico de tu mascota, organizar citas y recordatorios, y facilitar la comunicación con tu veterinario."
  },
  {
    id: "faq-2",
    question: "¿PetSync reemplaza la necesidad de visitar al veterinario?",
    answer: "No, PetSync es una herramienta para ayudarte a gestionar la información y la comunicación, pero no reemplaza el diagnóstico ni el tratamiento profesional veterinario."
  },
  {
    id: "faq-3",
    question: "¿Mis datos personales y los de mi mascota están seguros?",
    answer: "La seguridad de tus datos es nuestra máxima prioridad. Utilizamos medidas de seguridad avanzadas para proteger toda la información almacenada en PetSync."
  },
  {
    id: "faq-4",
    question: "¿Qué beneficios ofrece PetSync para mi práctica veterinaria?",
    answer: "PetSync te permitirá acceder de forma organizada al historial médico de tus pacientes (con el consentimiento del tutor), optimizar la comunicación y, próximamente, gestionar citas de forma más eficiente."
  },
  {
    id: "faq-5",
    question: "¿Cómo puedo unirme a la red de veterinarios de PetSync?",
    answer: "Regístrate en nuestra lista de espera y te informaremos sobre los próximos pasos para unirte a nuestra plataforma y los criterios de selección."
  }
];


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-secondary/50">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
            PetSync: el cuidado veterinario, <span className="block md:inline">sin el desorden de siempre.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Turnos, historiales y seguimientos organizados. Tu app esencial para el cuidado de mascotas. Simplificamos la gestión de la salud de tu compañero peludo.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform text-lg px-8 py-6" asChild>
              <a href="#waitlist">Únete a la Lista de Espera</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Beneficios para Tutores */}
      <section id="tutores" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">Beneficios Pensados para Ti y Tu Mascota</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo PetSync facilita el día a día del cuidado de tu mascota.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <NotebookText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Información de tu Mascota, Siempre Accesible</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Centraliza el historial médico de tu mascota: vacunas, diagnósticos, tratamientos, estudios y medicaciones. Accede a todo desde cualquier dispositivo, en cualquier momento. Olvídate de papeles perdidos o información desactualizada.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CalendarClock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Agenda Inteligente, Cero Estrés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Organiza todas las citas veterinarias, programaciones de vacunas y recordatorios de medicación en un calendario inteligente. Recibe notificaciones para no olvidar nada importante y asegura el seguimiento continuo de la salud de tu mascota.
                </CardDescription>
>>>>>>> 175e358 (saca lo del asistnbte de ia usa la parte el desorden de siempre , aca la)
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
<<<<<<< HEAD
      {/* Benefits for Tutors Section - Sin mención a GIA */}
      <section id="tutores" className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 md:mb-16">Beneficios para tutores</h2>
          <Card className="p-6 sm:p-8 shadow-xl bg-card rounded-xl">
            <CardContent className="p-0">
              <div className="space-y-8 md:space-y-10">
                <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left md:gap-6">
                  <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Información de tu Mascota, Siempre Accesible</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Mantén el historial médico completo de tu mascota en un solo lugar seguro en la nube: vacunas, tratamientos, cirugías, alergias y enfermedades crónicas. Accede desde cualquier dispositivo y comparte fácilmente la información con tu veterinario o cuidadores.</p>
                  </div>
                </div>
                {/* Beneficio de GIA eliminado */}
                <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left md:gap-6">
                  <CalendarClock className="h-10 w-10 sm:h-12 sm:w-12 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Agenda Inteligente, Cero Estrés</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Organiza citas, vacunas y desparasitaciones sin esfuerzo. Programa y recibe recordatorios para medicamentos, y recibe alertas de salud sobre citas próximas o chequeos necesarios para que nunca olvides nada importante.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits for Veterinarians Section (sin cambios aquí, ya no mencionaba IA) */}
      <section id="veterinarios" className="w-full py-16 md:py-24 bg-background dark:bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 md:mb-16">Beneficios para veterinarias</h2>
          <Card className="p-6 sm:p-8 shadow-xl bg-card rounded-xl">
            <CardContent className="p-0">
              <div className="space-y-8 md:space-y-10"> 
                <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left md:gap-6">
                  <CalendarClock className="h-10 w-10 sm:h-12 sm:w-12 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Agenda inteligente, menos fricción</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Gestioná turnos en tiempo real con disponibilidad clara, sin llamados ni idas y vueltas. Menos tareas administrativas, más foco en tus pacientes.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left md:gap-6">
                  <ClipboardList className="h-10 w-10 sm:h-12 sm:w-12 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Historiales médicos centralizados y siempre accesibles</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Cada mascota tiene su ficha clínica completa, organizada y actualizada. Vos cargás la info, el tutor accede. Información compartida, sin errores ni duplicados.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-4 md:flex-row md:items-start md:text-left md:gap-6">
                  <MessagesSquare className="h-10 w-10 sm:h-12 sm:w-12 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Comunicación directa con cada tutor</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Mensajes, recordatorios automáticos y seguimientos en un solo canal. Nada se pierde, todo queda registrado. Sin depender de WhatsApp ni llamados de último momento.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* How it Works Section (sin cambios aquí, ya no mencionaba IA) */}
      <section id="como-funciona" className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">¿Cómo funciona PetSync?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Card className="shadow-lg border p-6 sm:p-8 bg-card rounded-lg">
              <CardHeader className="p-0 mb-3 sm:mb-4">
                <CardTitle className="text-xl sm:text-2xl text-foreground">Para Tutores</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4 text-muted-foreground text-sm sm:text-base">
                <div className="flex items-start gap-3">
                    <DownloadCloud className="h-5 w-5 text-primary shrink-0 mt-1"/>
                    <p>Cuando la app PetSync esté lista, descárgala para iOS y Android. Accede fácilmente a la información de tu mascota desde cualquier dispositivo.</p>
                </div>
                <div className="flex items-start gap-3">
                    <ClipboardList className="h-5 w-5 text-primary shrink-0 mt-1"/>
                    <p>Centraliza el historial de salud de tu mascota: vacunas, tratamientos, alergias y más, todo en un solo lugar.</p>
                </div>
                <div className="flex items-start gap-3">
                    <BellRing className="h-5 w-5 text-primary shrink-0 mt-1"/>
                    <p>Recibe recordatorios personalizados sobre medicación, controles de salud y fechas importantes.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border p-6 sm:p-8 bg-card rounded-lg">
              <CardHeader className="p-0 mb-3 sm:mb-4">
                <CardTitle className="text-xl sm:text-2xl text-foreground">Para Clínicas Veterinarias</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4 text-muted-foreground text-sm sm:text-base">
                 <div className="flex items-start gap-3">
                    <FolderKanban className="h-5 w-5 text-primary shrink-0 mt-1"/>
                    <p>Gestiona historias clínicas electrónicas de tus pacientes de manera eficiente y segura.</p>
                </div>
                <div className="flex items-start gap-3">
                    <MailCheck className="h-5 w-5 text-primary shrink-0 mt-1"/>
                    <p>Automatiza comunicaciones con los tutores: envía recordatorios y notificaciones relevantes.</p>
                </div>
                <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-primary shrink-0 mt-1"/>
                    <p>Accede a métricas clave para analizar la evolución de tus pacientes y optimizar tus servicios.</p>
                </div>
              </CardContent>
            </Card>
=======
      {/* App Preview Section */}
      <section className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Así se verá tu tranquilidad</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Una interfaz intuitiva diseñada para simplificar cada aspecto del cuidado de tu mascota.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
            {/* Smartphone Mockup */}
            <div className="bg-slate-800 p-4 rounded-3xl shadow-2xl w-full max-w-xs transform transition-all hover:scale-105">
              <div className="bg-slate-700 h-[480px] rounded-2xl overflow-hidden">
                <Image 
                  src="https://placehold.co/300x600/242933/FFFFFF.png?text=PetSync+App" 
                  alt="App en Smartphone" 
                  width={300} 
                  height={600} 
                  className="object-cover w-full h-full"
                  data-ai-hint="app interface"
                />
              </div>
            </div>
            {/* Tablet Mockup */}
            <div className="bg-slate-800 p-4 rounded-3xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
              <div className="bg-slate-700 h-[320px] rounded-2xl overflow-hidden">
                <Image 
                  src="https://placehold.co/600x400/242933/FFFFFF.png?text=PetSync+Dashboard" 
                  alt="App en Tablet" 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-full"
                  data-ai-hint="dashboard tablet"
                />
              </div>
            </div>
          </div>
          <p className="text-center mt-8 text-muted-foreground">Disponible en todos tus dispositivos.</p>
        </div>
      </section>

      {/* Beneficios para Veterinarios */}
      <section id="veterinarios" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">PetSync para Profesionales Veterinarios</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas diseñadas para optimizar tu clínica y mejorar la atención al paciente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CalendarCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Agenda inteligente, menos fricción</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Optimiza la gestión de turnos y reduce las ausencias con recordatorios automáticos. Visualiza tu día de forma clara y dedica más tiempo a tus pacientes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Historiales médicos centralizados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Accede al historial completo y actualizado de cada paciente con un clic. Facilita diagnósticos precisos y seguimientos efectivos, todo en una plataforma segura.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquareShare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Comunicación directa con cada tutor</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Comparte indicaciones, resultados y recordatorios de forma segura y eficiente. Fortalece la relación con tus clientes y mejora la adherencia a los tratamientos.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Preguntas Frecuentes</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id} className="bg-card rounded-lg shadow-lg border border-border">
                <AccordionTrigger className="px-6 py-4 text-lg text-left hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Waitlist Section */}
      <section id="waitlist" className="w-full py-16 md:py-24 bg-gradient-to-tr from-primary via-primary/80 to-accent">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white/10 p-5 rounded-full inline-block mb-6 backdrop-blur-sm">
             <Mail className="h-12 w-12 text-white" />
>>>>>>> 175e358 (saca lo del asistnbte de ia usa la parte el desorden de siempre , aca la)
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">¡Prepárate para PetSync!</h2>
          <p className="text-white/90 mb-8 text-lg md:text-xl">
            Estamos construyendo la herramienta definitiva para el cuidado de tu mascota. Déjanos tu correo y sé el primero en saber cuándo esté lista.
          </p>
          <Card className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md shadow-2xl p-6 sm:p-8 text-left">
            <WaitlistForm />
          </Card>
        </div>
      </section>

      {/* Quiénes Somos Section - Sin mención a GIA */}
      <section id="quienes-somos" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Quiénes Somos</h2>
          </div>
          <Card className="p-6 sm:p-8 shadow-xl bg-card rounded-xl">
            <CardContent className="p-0 text-left">
              <div className="space-y-4 sm:space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>En PetSync, somos tutores y desarrolladores apasionados por los animales. Conocemos de primera mano el "vaivén" de la información dispersa, los papeles perdidos y la dificultad para coordinar el cuidado veterinario.</p>
                <p>Por eso creamos PetSync: para transformar ese caos en calma.</p>
                <p>Nuestra misión es simple: conectar a tutores y veterinarias con una plataforma intuitiva que organiza historiales, simplifica la gestión y optimiza el tiempo, para que todos podamos dedicarnos a lo que realmente importa: el bienestar de nuestras mascotas.</p>
                {/* Frase sobre GIA eliminada */}
                <p className="mt-6 text-base sm:text-lg font-semibold text-foreground text-center">
                  Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section (sin cambios aquí, ya no mencionaba IA) */}
      <section id="faq" className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12 md:mb-16">
             <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Preguntas Frecuentes</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={`faq-${index}`} className="bg-card rounded-lg shadow-md mb-3 border">
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-left hover:no-underline flex items-center text-foreground text-base sm:text-lg">
                  {faq.question === "¿Está segura la información de mi mascota en PetSync?" && <ShieldCheck className="h-5 w-5 mr-2 text-primary shrink-0" /> }
                  <span className="flex-1">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Waitlist Section - Sin mención a GIA */}
      <section id="waitlist" className="w-full py-16 md:py-24 bg-primary/10 dark:bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">¡Estamos en versión beta!</h2>
          <p className="text-muted-foreground mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed">
            Sumate a la waitlist para ser de los primeros en probar PetSync y ayudarnos a construir la mejor herramienta para el cuidado de nuestras mascotas.
          </p>
          <WaitlistForm />
          <p className="mt-8 sm:mt-10 text-xs sm:text-sm text-muted-foreground">PetSync está en desarrollo. ¡Estamos construyendo la app que revolucionará el cuidado de tu mascota!</p>
        </div>
      </section>
    </div>
  );
}
