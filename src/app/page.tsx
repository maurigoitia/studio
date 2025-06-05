
import Link from 'next/link';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WaitlistForm from '@/components/waitlist-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Info,
  DownloadCloud,
  BellRing,
  FolderKanban,
  MailCheck,
  BarChart3
} from 'lucide-react';

const faqData = [
  {
    value: "item-1",
    question: "¿Qué es PetSync y cómo puede ayudarme?",
    answer: "PetSync es una plataforma móvil que conecta a tutores de mascotas con clínicas veterinarias. Simplifica la gestión del cuidado de tu mascota permitiéndote agendar turnos, acceder a historiales médicos centralizados, recibir recordatorios y mucho más, todo desde tu celular. Para las veterinarias, optimiza la agenda, reduce la carga administrativa y mejora la comunicación con los clientes."
  },
  {
    value: "item-2",
    question: "¿Cómo me registro en PetSync?",
    answer: "Actualmente estamos en versión beta. Dejanos tu contacto en nuestra waitlist (un poco más arriba en esta página) y te avisaremos tan pronto como puedas registrarte para ser de los primeros en probar PetSync."
  },
  {
    value: "item-3",
    question: "¿PetSync tiene costo para los tutores de mascotas?",
    answer: "Estamos definiendo los detalles finales, pero nuestro objetivo es que la versión básica de PetSync para tutores sea gratuita, ofreciendo todas las funcionalidades esenciales para el cuidado de sus mascotas. Podrían existir funciones premium opcionales en el futuro."
  },
  {
    value: "item-4",
    question: "¿Para quiénes está pensado PetSync?",
    answer: "PetSync está pensado principalmente para tutores de mascotas urbanos, de entre 25 y 40 años, y para clínicas veterinarias y profesionales independientes en Buenos Aires que buscan optimizar su gestión y ofrecer un servicio más conectado y moderno a sus pacientes."
  },
  {
    value: "item-5",
    question: "Soy veterinario independiente, ¿PetSync me sirve?",
    answer: "¡Claro que sí! PetSync está diseñado para adaptarse tanto a clínicas veterinarias con varios profesionales como a veterinarios independientes. Te ayudará a organizar tu agenda, mantener historiales digitalizados y comunicarte eficientemente con los tutores de tus pacientes."
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
      <section className="hero-bg text-white min-h-screen flex items-center justify-center p-6 md:p-12"> {/* Eliminado -mt-16 pt-16 */}
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="paw-icon">🐾</span>PetSync: El cuidado de tu mascota, simple y conectado.
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-blue-100">
              Conectamos tutores y veterinarias para una gestión de salud integral. Agendá turnos, accedé a historiales médicos y más, todo en un solo lugar.
            </p>
            <a href="#waitlist" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition duration-300 inline-block">
              Sumate a la Waitlist
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="bg-white p-6 rounded-xl mockup-card w-full max-w-md transform md:scale-105 lg:rotate-3">
                <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Historial de "Rocky"</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="font-medium text-sm text-blue-600">Última Visita:</p>
                        <p className="text-base">Control Anual - 15/05/2025</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="font-medium text-sm text-orange-500">Próxima Vacuna:</p>
                        <p className="text-base">Antirrábica - Recordatorio 01/07</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="font-medium text-sm text-gray-600">Diagnóstico Reciente:</p>
                        <p className="text-base">Alergia leve. Dieta especial.</p>
                    </div>
                     <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 text-sm">
                        Ver historial completo
                    </button>
                </div>
            </div>
        </div>
        </div>
      </section>

      {/* SECCIÓN: BENEFICIOS PARA TUTORES */}
      <section id="beneficios-tutores" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
                Beneficios para <span className="text-blue-600">Tutores</span>
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12 md:mb-16 max-w-2xl mx-auto">
                Todo lo que necesitas para el cuidado de tu mascota, al alcance de tu mano y conectado con tu veterinaria.
            </p>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                <div className="benefit-card bg-gray-50 p-6 rounded-xl shadow-lg text-center border border-gray-200">
                    <div className="icon-placeholder bg-blue-100 text-blue-600 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zM9 7h6m-6 4h6m-6 4h4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Tu Mascota, Siempre Contigo</h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        Accedé y gestioná el historial médico completo de tu mascota desde cualquier lugar. Escaneá recetas y documentos para tener toda la información centralizada y al alcance de tu mano.
                    </p>
                </div>
                <div className="benefit-card bg-gray-50 p-6 rounded-xl shadow-lg text-center border border-gray-200">
                    <div className="icon-placeholder bg-green-100 text-green-600 mx-auto">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.742 0-3.223-.835-3.772-2M9 12H4m12 0h-5m-7 0H3.262M10.976 19h-2.952M15 19H9.25M9 12l2.25-3M15 12l-2.25-3M9 12l2.25 3M15 12l-2.25 3M6.31 16.975A6.965 6.965 0 005.5 15.25a6.999 6.999 0 005.25-10.5A6.999 6.999 0 0013.25 9M17.69 16.975A6.965 6.965 0 0118.5 15.25a6.999 6.999 0 01-5.25-10.5A6.999 6.999 0 0110.75 9" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Inteligencia Artificial a tu Servicio <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full align-middle ml-1">Próximamente</span></h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        Consultá dudas sobre tratamientos pasados o próximos cuidados. Preguntale a PetSync: "¿Cuándo fue la última vacuna de Thor?" o "¿Qué medicación le dimos para su otitis?".
                    </p>
                </div>
                <div className="benefit-card bg-gray-50 p-6 rounded-xl shadow-lg text-center border border-gray-200">
                    <div className="icon-placeholder bg-purple-100 text-purple-600 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM12 14l-3 3m0 0l-3-3m3 3V7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Agenda Inteligente, Cero Estrés</h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        Organizá turnos, vacunas y desparasitaciones sin esfuerzo. Recibí recordatorios inteligentes para que nunca más olvides una cita importante.
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    {/* SECCIÓN: BENEFICIOS PARA VETERINARIAS */}
    <section id="beneficios-veterinarias" className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
                Beneficios para <span className="text-green-600">Veterinarias</span>
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12 md:mb-16 max-w-2xl mx-auto text-justify">
                Optimizá la gestión de tu clínica, fortalecé la relación con tus pacientes y ampliá tu alcance profesional.
            </p>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                <div className="benefit-card bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
                    <div className="icon-placeholder bg-indigo-100 text-indigo-600 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimizá tu Tiempo, Maximizá tu Impacto</h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        Gestioná tu agenda de forma eficiente, reducí la carga administrativa y dedicá más tiempo a lo que realmente importa: el cuidado de tus pacientes.
                    </p>
                </div>
                <div className="benefit-card bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
                    <div className="icon-placeholder bg-pink-100 text-pink-600 mx-auto">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Conexión Directa, Pacientes Felices</h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        Fortalecé la relación con tus clientes centralizando la información y facilitando una comunicación fluida y proactiva. Un servicio que fideliza.
                    </p>
                </div>
                <div className="benefit-card bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
                    <div className="icon-placeholder bg-teal-100 text-teal-600 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Ampliá tu Comunidad y Servicios</h3>
                    <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        Unite a una red creciente de tutores y profesionales. PetSync es el punto de encuentro para veterinarias, pet shops y proveedores que buscan conectar y ofrecer lo mejor.
                    </p>
                </div>
            </div>
        </div>
    </section>

    {/* SECCIÓN: ¿CÓMO FUNCIONA? */}
    <section id="como-funciona" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12 md:mb-16">
                ¿Cómo Funciona <span className="text-blue-600">PetSync</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
                        Para <span className="text-blue-500">Tutores</span>: El Cuidado de tu Mascota, Simplificado
                    </h3>
                    <ul className="space-y-4 mb-6">
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify"><strong>Descargá la app</strong> PetSync.</span>
                        </li>
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify">Creá un <strong>perfil detallado</strong> para tu mascota.</span>
                        </li>
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify">Conectate fácilmente con tu <strong>veterinaria de confianza</strong>.</span>
                        </li>
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify">Gestioná <strong>citas y recibí recordatorios</strong> importantes.</span>
                        </li>
                    </ul>
                    <p className="text-center text-xl font-medium text-gray-800 mb-6">¡Así de fácil!</p>
                    <div className="mockup-placeholder rounded-lg p-4">
                        [Mockup de teléfono mostrando<br/>pasos en la app PetSync]
                    </div>
                </div>
                <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
                        Para <span className="text-green-500">Veterinarias</span>: Potenciá tu Clínica, Conectá con Pacientes
                    </h3>
                    <ul className="space-y-4 mb-6">
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify"><strong>Registrate</strong> en PetSync.</span>
                        </li>
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify">Creá un <strong>perfil completo</strong> para tu clínica.</span>
                        </li>
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify">Invitá a tus pacientes a <strong>unirse a la comunidad</strong> PetSync.</span>
                        </li>
                        <li className="flex items-start step-item">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-justify">Gestioná <strong>turnos y enviá comunicados</strong> importantes.</span>
                        </li>
                    </ul>
                     <p className="text-center text-xl font-medium text-gray-800 mb-6">¡Así de fácil!</p>
                    <div className="mockup-placeholder rounded-lg p-4">
                        [Mockup de tablet/desktop mostrando<br/>interfaz de veterinaria PetSync]
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* SECCIÓN: QUIÉNES SOMOS */}
    <section id="quienes-somos" className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
                Quiénes <span className="text-blue-600">Somos</span>
            </h2>
            
            <div className="logo-placeholder-about bg-blue-500 text-white mx-auto mb-8 p-3">
                <span className="paw-icon-about">🐾</span>
                <span className="text-2xl font-semibold">PetSync</span>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto text-justify">
                En PetSync, desarrollamos una plataforma móvil pensada para tutores y clínicas veterinarias, convencidos de que el cuidado de las mascotas puede ser más simple y eficiente para todos. Organizamos turnos, centralizamos historiales clínicos y facilitamos el acceso a productos esenciales, todo desde tu celular.
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-8">
                "Conectamos ambos lados del mostrador, <span className="text-blue-600">una patita a la vez</span>."
            </p>
            <p className="text-lg text-gray-600 italic max-w-2xl mx-auto text-justify">
                Tu mascota, sus cosas, todo en orden. Para vos y para la veterinaria.
            </p>
        </div>
    </section>

      {/* SECCIÓN: LLAMADA A LA ACCIÓN (BETA / WAITLIST) */}
      <section id="waitlist" className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">¡Estamos en versión beta!</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Sumate a la waitlist para ser de los primeros en probar PetSync y ayudarnos a construir la mejor herramienta para el cuidado de nuestras mascotas.
          </p>
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl p-6 sm:p-8 text-left text-gray-800">
            <WaitlistForm />
          </Card>
        </div>
      </section>

      {/* SECCIÓN: PREGUNTAS FRECUENTES (FAQ) */}
      <section id="faq" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Preguntas <span className="text-blue-600">Frecuentes</span>
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item) => (
              <AccordionItem value={item.value} key={item.value} className="bg-white rounded-lg shadow-md faq-item-custom">
                <AccordionTrigger className="px-6 py-4 text-lg text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 text-justify">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}

    