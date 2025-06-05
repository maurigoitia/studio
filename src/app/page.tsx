import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
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
    </div>
  );
}
