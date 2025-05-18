
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, BrainCircuit, CalendarClock, Users, Network, HelpCircle, ListChecks, UsersRound, Mail, DownloadCloud, ShieldCheck, HeartPulse, MapPin, ShoppingBag, ClipboardList, Bot, Search, MessagesSquare } from 'lucide-react';
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
              <a href="#waitlist">DESCUBRIR MÁS</a>
            </Button>
          </div>
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">Firu AI a tu Servicio <span className="text-xs bg-primary/20 text-primary font-semibold px-2 py-0.5 rounded-full ml-1">Próximamente</span></h3>
                  <p className="text-muted-foreground">Consultá dudas sobre tratamientos pasados o próximos cuidados. Preguntale a Firu AI: "¿Cuándo fue la última vacuna de Thor?" o "¿Qué medicación le dimos para su otitis?". Recuerda que esto es una guía y siempre debes consultar a tu veterinario.</p>
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">🗓️ Agenda inteligente, menos fricción</h3>
                  <p className="text-muted-foreground">Gestioná turnos en tiempo real con disponibilidad clara, sin llamados ni idas y vueltas. Menos tareas administrativas, más foco en tus pacientes.</p>
                </div>
              </div>
              <div className="flex items-start">
                <ClipboardList className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">📁 Historiales médicos centralizados y siempre accesibles</h3>
                  <p className="text-muted-foreground">Cada mascota tiene su ficha clínica completa, organizada y actualizada. Vos cargás la info, el tutor accede. Información compartida, sin errores ni duplicados.</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessagesSquare className="h-10 w-10 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">💬 Comunicación directa con cada tutor</h3>
                  <p className="text-muted-foreground">Mensajes, recordatorios automáticos y seguimientos en un solo canal. Nada se pierde, todo queda registrado. Sin depender de WhatsApp ni llamados de último momento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* GIA Section */}
      <section id="gia-ai" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">✨ Te Presentamos a GIA: Tu Sabia Inteligencia Amiga en PetSync ✨</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              ¿Buscas respuestas claras para el cuidado de tu mascota? ¡GIA está aquí para ayudarte! Como tu copiloto inteligente en PetSync (actualmente en beta), GIA está aprendiendo a ser la mejor asistente para ti y tu compañero peludo.
            </p>
             <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              GIA no es solo un buscador; es una conversación. Ella entiende tus preguntas y te ofrece información útil y personalizada al instante, haciendo el día a día con tu mascota un poco más fácil.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground text-center mb-10">Descubre cómo GIA, tu copiloto en beta, puede asistirte:</h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex items-start space-x-4">
                <HeartPulse className="h-8 w-8 text-accent mt-1 shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-1">🩺 GIA, Tu Asesora de Salud (Beta):</h4>
                  <p className="text-muted-foreground text-sm">¿Dudas sobre síntomas, dietas o cuidados preventivos? Pregúntale a GIA. Te brindará información general y consejos basados en conocimiento veterinario. (Recuerda: GIA es una ayuda, no reemplaza a tu veterinario). (Ej: "GIA, mi perro no quiere comer, ¿qué podría ser?")</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-8 w-8 text-accent mt-1 shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-1">🗺️ GIA te Ayuda a Encontrar Servicios:</h4>
                  <p className="text-muted-foreground text-sm">¿Necesitas una veterinaria o una peluquería? Dile a GIA qué buscas y dónde. Te ayudará a identificar opciones cercanas. (La reserva directa vendrá más adelante). (Ej: "GIA, veterinarias en Palermo con buenas reseñas")</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <ShoppingBag className="h-8 w-8 text-accent mt-1 shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-1">🛍️ GIA te Orienta sobre Productos:</h4>
                  <p className="text-muted-foreground text-sm">¿El mejor alimento? ¿Accesorios útiles? Consulta con GIA. Te ofrecerá información para que tomes mejores decisiones de compra. (Ej: "GIA, ¿qué tipo de arena sanitaria es mejor para gatos?")</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <ClipboardList className="h-8 w-8 text-accent mt-1 shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-1">📜 GIA y el Historial de tu Mascota (Próximamente en la App):</h4>
                  <p className="text-muted-foreground text-sm">Imagina acceder al historial médico de tu mascota con una simple pregunta. GIA se está preparando para esto y será una función clave en la app móvil de PetSync. (Ej: "GIA, ¿cuándo es la próxima vacuna de Luna?")</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Bot className="h-8 w-8 text-accent mt-1 shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-1">💬 Conversa con GIA:</h4>
                  <p className="text-muted-foreground text-sm">Chatea con GIA en un lenguaje natural. Aunque está en beta, se esfuerza por entenderte y darte la mejor asistencia posible.</p>
                </div>
              </div>
            </div>
            <p className="mt-12 text-center text-md text-muted-foreground">
             Importante: GIA es una IA en desarrollo. La información que proporciona es para fines orientativos y educativos, y nunca debe sustituir el consejo de un veterinario profesional.
            </p>
            <p className="mt-4 text-center text-md text-muted-foreground">
              ¡Regístrate en nuestra <a href="#waitlist" className="text-primary hover:underline">waitlist</a> y sé el primero en experimentar el poder de la IA en PetSync!
            </p>
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
                    <p>1. Descargá la app PetSync, disponible para iOS y Android.</p>
                </div>
                <p>2. Creá un perfil detallado para tu mascota.</p>
                <p>3. Conectate आसानी से con tu veterinaria de confianza.</p>
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
                <p>3. Invitá a tus pacientes a unirse a la comunidad PetSync.</p>
                <p>4. Gestioná turnos y enviá comunicados importantes a tus clientes.</p>
                <p className="font-semibold text-foreground">¡Así de fácil!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="quienes-somos" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <UsersRound className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Quiénes somos</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">
              En PetSync, desarrollamos una plataforma móvil pensada para tutores y clínicas veterinarias, convencidos de que el cuidado de las mascotas puede ser más simple y eficiente para todos. Organizamos turnos, centralizamos historiales clínicos y facilitamos el acceso a productos esenciales, todo desde tu celular. Conectamos ambos lados del mostrador, una patita a la vez.
            </p>
            <p className="mt-4 text-md font-semibold text-foreground">
              Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.
            </p>
          </div>
        </div>
      </section>
      
      {/* Waitlist Section */}
      <section id="waitlist" className="w-full py-16 md:py-24 bg-secondary/50">
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
      <section id="faq" className="w-full py-16 md:py-24">
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
    </div>
  );
}
