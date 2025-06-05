import Link from 'next/link';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WaitlistForm from '@/components/waitlist-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NotebookText,
  CalendarClock,
  Users,
  Briefcase,
  FileTextIcon,
  MessageSquareShare,
  Smartphone,
  Tablet,
  HeartPulse,
  ShieldCheck,
  Lightbulb,
  Info
} from 'lucide-react';

const faqData = [
  {
    value: "item-1",
    question: "¿Qué es PetSync y cómo puede ayudarme?",
    answer: "PetSync es una plataforma digital diseñada para simplificar la gestión del cuidado de la salud de tu mascota. Te ayuda a centralizar el historial médico, agendar citas, recibir recordatorios y comunicarte eficientemente con tu veterinario."
  },
  {
    value: "item-2",
    question: "¿Cómo me registro en PetSync?",
    answer: "Actualmente estamos en desarrollo. Puedes unirte a nuestra lista de espera (waitlist) y te notificaremos tan pronto como la plataforma esté disponible para registrarte."
  },
  {
    value: "item-3",
    question: "¿PetSync tiene costo para los tutores de mascotas?",
    answer: "Estamos definiendo los modelos de suscripción. Nuestro objetivo es ofrecer un plan básico gratuito o de muy bajo costo para tutores, con opciones premium para funcionalidades avanzadas. Los detalles se anunciarán cerca del lanzamiento."
  },
  {
    value: "item-4",
    question: "¿Para quiénes está pensado PetSync?",
    answer: "PetSync está pensado tanto para tutores de mascotas que quieren una forma más organizada y sencilla de gestionar la salud de sus animales, como para veterinarios y clínicas que buscan optimizar su trabajo y la comunicación con sus clientes."
  },
  {
    value: "item-5",
    question: "Soy veterinario independiente, ¿PetSync me sirve?",
    answer: "¡Absolutamente! PetSync está diseñado para ser útil tanto para veterinarios independientes como para clínicas, ofreciendo herramientas para optimizar la agenda, la comunicación y el acceso a la información del paciente (con permiso del tutor)."
  },
  {
    value: "item-6",
    question: "Soy una clínica grande, ¿cómo se integra PetSync con lo que ya tengo?",
    answer: "Estamos explorando opciones de integración con software de gestión veterinaria existentes. Nuestro objetivo es que PetSync complemente tus herramientas actuales y facilite el flujo de información, no que lo complique. Contáctanos para discutir tus necesidades específicas."
  },
  {
    value: "item-7",
    question: "¿Está segura la información de mi mascota en PetSync?",
    answer: "La seguridad de los datos es nuestra máxima prioridad. Utilizamos encriptación y seguimos las mejores prácticas de seguridad para proteger toda la información almacenada en PetSync. Solo tú y las personas a las que autorices (como tu veterinario) tendrán acceso a los datos de tu mascota."
  },
  {
    value: "item-8",
    question: "¿Cómo puedo contactar a PetSync si tengo más preguntas?",
    answer: "Puedes enviarnos un correo a contacto@petsync.com (este es un email de ejemplo) o seguirnos en nuestras redes sociales (próximamente) para estar al tanto de las novedades y canales de contacto."
  }
];

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* SECCIÓN HERO */}
      <section className="hero-bg text-white min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 md:p-12 -mt-16 pt-16"> {/* Ajuste para header sticky */}
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="paw-icon">🐾</span>PetSync: el cuidado veterinario, sin el desorden de siempre.
            </h1>
            <p className="text-lg sm:text-xl mb-4 text-blue-100">
              Turnos, historiales y seguimientos organizados.
            </p>
            <p className="text-md sm:text-lg mb-8 font-semibold text-blue-200">
              Una plataforma para clínicas. Una app para tutores.
            </p>
            <Link href="/#features" legacyBehavior>
              <a className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition duration-300 inline-block">
                DESCUBRIR MÁS
              </a>
            </Link>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="bg-white p-3 sm:p-6 rounded-xl mockup-card w-full max-w-md transform md:scale-105 lg:rotate-3">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700">PetSync App</h3>
              </div>
              <div className="bg-gray-100 p-3 sm:p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Próxima Vacuna: Rabia</span>
                  <span className="text-sm font-medium text-blue-600">15/08</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Historial al día
                </div>
              </div>
               <div className="mt-3 sm:mt-4 bg-gray-100 p-3 sm:p-4 rounded-lg space-y-2">
                <p className="text-sm text-gray-600">"¡La mejor app para Fido!" - Tutor Contento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLIFICA EL CUIDADO */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Simplifica el Cuidado de tu Mascota con PetSync</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="benefit-card">
              <CardHeader>
                <div className="icon-placeholder bg-blue-100 text-blue-600 mx-auto">
                  <Users size={28} />
                </div>
                <CardTitle className="text-2xl text-gray-800">Para Tutores de Mascotas</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-2 text-gray-600">
                <p className="flex items-start"><HeartPulse className="w-5 h-5 mr-2 mt-1 text-blue-500 shrink-0" /> Historial médico centralizado y siempre accesible.</p>
                <p className="flex items-start"><CalendarClock className="w-5 h-5 mr-2 mt-1 text-blue-500 shrink-0" /> Agenda inteligente para turnos y recordatorios.</p>
              </CardContent>
            </Card>
            <Card className="benefit-card">
              <CardHeader>
                <div className="icon-placeholder bg-green-100 text-green-600 mx-auto">
                  <Briefcase size={28} />
                </div>
                <CardTitle className="text-2xl text-gray-800">Para Clínicas Veterinarias</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-2 text-gray-600">
                <p className="flex items-start"><Lightbulb className="w-5 h-5 mr-2 mt-1 text-green-500 shrink-0" /> Optimización de agenda y reducción de carga administrativa.</p>
                <p className="flex items-start"><ShieldCheck className="w-5 h-5 mr-2 mt-1 text-green-500 shrink-0" /> Historiales digitales compartidos y seguros.</p>
                <p className="flex items-start"><MessageSquareShare className="w-5 h-5 mr-2 mt-1 text-green-500 shrink-0" /> Comunicación directa y eficaz con tutores.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BENEFICIOS PARA TUTORES */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">Beneficios para tutores</h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-white p-8 rounded-xl shadow-lg benefit-card">
              <div className="flex items-center text-blue-600 mb-4">
                <NotebookText size={36} className="mr-3" />
                <h3 className="text-2xl font-semibold">Información de tu Mascota, Siempre Accesible</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Mantén el historial médico completo de tu mascota en un solo lugar seguro en la nube: vacunas, tratamientos, cirugías, alergias y enfermedades crónicas. Accede desde cualquier dispositivo y comparte fácilmente la información con tu veterinario o cuidadores.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg benefit-card">
              <div className="flex items-center text-blue-600 mb-4">
                <CalendarClock size={36} className="mr-3" />
                <h3 className="text-2xl font-semibold">Agenda Inteligente, Cero Estrés</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Organiza citas, vacunas y desparasitaciones sin esfuerzo. Programa y recibe recordatorios para medicamentos, y recibe alertas de salud sobre citas próximas o chequeos necesarios para que nunca olvides nada importante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS PARA VETERINARIAS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-12">Beneficios para veterinarias</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="benefit-card shadow-lg">
              <CardHeader>
                <div className="icon-placeholder bg-green-100 text-green-600 mx-auto">
                   <CalendarClock size={28} />
                </div>
                <CardTitle className="text-xl text-gray-800">Agenda inteligente, menos fricción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gestioná turnos en tiempo real con disponibilidad clara, sin llamados ni idas y vueltas. Menos tareas administrativas, más foco en tus pacientes.
                </p>
              </CardContent>
            </Card>
            <Card className="benefit-card shadow-lg">
              <CardHeader>
                <div className="icon-placeholder bg-green-100 text-green-600 mx-auto">
                  <FileTextIcon size={28} />
                </div>
                <CardTitle className="text-xl text-gray-800">Historiales médicos centralizados y siempre accesibles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cada mascota tiene su ficha clínica completa, organizada y actualizada. Vos cargás la info, el tutor accede. Información compartida, sin errores ni duplicados.
                </p>
              </CardContent>
            </Card>
            <Card className="benefit-card shadow-lg">
              <CardHeader>
                <div className="icon-placeholder bg-green-100 text-green-600 mx-auto">
                  <MessageSquareShare size={28} />
                </div>
                <CardTitle className="text-xl text-gray-800">Comunicación directa con cada tutor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mensajes, recordatorios automáticos y seguimientos en un solo canal. Nada se pierde, todo queda registrado. Sin depender de WhatsApp ni llamados de último momento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">¿Cómo funciona PetSync?</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="benefit-card">
              <CardHeader>
                  <div className="icon-placeholder bg-blue-100 text-blue-600 mx-auto">
                    <Users size={28} />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">Para Tutores</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-3">
                <p>Cuando la app PetSync esté lista, descárgala para iOS y Android. Accede fácilmente a la información de tu mascota desde cualquier dispositivo.</p>
                <p>Centraliza el historial de salud de tu mascota: vacunas, tratamientos, alergias y más, todo en un solo lugar.</p>
                <p>Recibe recordatorios personalizados sobre medicación, controles de salud y fechas importantes.</p>
              </CardContent>
            </Card>
            <Card className="benefit-card">
              <CardHeader>
                  <div className="icon-placeholder bg-green-100 text-green-600 mx-auto">
                    <Briefcase size={28} />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">Para Clínicas Veterinarias</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-3">
                <p>Gestiona historias clínicas electrónicas de tus pacientes de manera eficiente y segura.</p>
                <p>Automatiza comunicaciones con los tutores: envía recordatorios y notificaciones relevantes.</p>
                <p>Accede a métricas clave para analizar la evolución de tus pacientes y optimizar tus servicios.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* QUIENES SOMOS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Quiénes Somos</h2>
          <div className="prose lg:prose-lg mx-auto text-gray-600">
            <p>En PetSync, somos tutores y desarrolladores apasionados por los animales. Conocemos de primera mano el "vaivén" de la información dispersa, los papeles perdidos y la dificultad para coordinar el cuidado veterinario.</p>
            <p>Por eso creamos PetSync: para transformar ese caos en calma.</p>
            <p className="font-semibold text-lg text-blue-600 my-4">Nuestra misión es simple: conectar a tutores y veterinarias con una plataforma intuitiva que organiza historiales, simplifica la gestión y optimiza el tiempo, para que todos podamos dedicarnos a lo que realmente importa: el bienestar de nuestras mascotas.</p>
            <p>Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.</p>
          </div>
        </div>
      </section>
      
      {/* VISUALIZA PETSYNC EN ACCIÓN */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">PetSync en tus Dispositivos</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
                <Image 
                    src="https://placehold.co/300x530.png"
                    alt="PetSync en Smartphone" 
                    width={300} 
                    height={530} 
                    className="rounded-xl mx-auto"
                    data-ai-hint="app interface"
                />
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
                <Image 
                    src="https://placehold.co/500x375.png"
                    alt="PetSync en Tablet" 
                    width={500} 
                    height={375} 
                    className="rounded-xl mx-auto"
                    data-ai-hint="dashboard tablet"
                />
            </div>
          </div>
           <p className="mt-8 text-blue-100 text-lg">Accede desde donde estés, cuando lo necesites.</p>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section id="faq" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item) => (
              <AccordionItem value={item.value} key={item.value} className="bg-white rounded-lg shadow-md">
                <AccordionTrigger className="px-6 py-4 text-lg text-left hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ÚNETE A LA LISTA DE ESPERA */}
      <section id="waitlist" className="py-16 md:py-24 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="mb-6">
            <HeartPulse className="h-16 w-16 text-white mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¡Estamos en versión beta!</h2>
          <p className="text-lg text-blue-100 mb-8">
            Sumate a la waitlist para ser de los primeros en probar PetSync y ayudarnos a construir la mejor herramienta para el cuidado de nuestras mascotas.
          </p>
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl p-6 sm:p-8 text-left">
            <WaitlistForm />
          </Card>
          <p className="mt-8 text-sm text-blue-200">PetSync está en desarrollo. ¡Estamos construyendo la app que revolucionará el cuidado de tu mascota!</p>
        </div>
      </section>

    </div>
  );
}
