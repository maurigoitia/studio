import Link from 'next/link';
import Image from 'next/image';
import { BarChart, Briefcase, CalendarClock, FileText, Heart, MessageSquareShare, NotebookText, ShieldCheck, Users, Zap } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* SECCIÓN HERO */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white min-h-screen flex items-center justify-center p-6 md:p-12">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="paw-icon">🐾</span>PetSync: El cuidado de tu mascota, simple y conectado.
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-blue-100">
              Conectamos tutores y veterinarias para una gestión de salud integral. Agendá turnos, accedé a historiales médicos y más, todo en un solo lugar.
            </p>
            <Link href="#waitlist" legacyBehavior>
              <a className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition duration-300 inline-block">
                Sumate a la Waitlist
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
                  <span className="text-sm text-gray-600">Próxima Vacuna</span>
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

      {/* CARACTERÍSTICAS DESTACADAS */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Todo lo que necesitas para el bienestar de tu mascota</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            PetSync te ofrece herramientas intuitivas para una gestión de salud animal sin complicaciones.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="benefit-card bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="icon-placeholder bg-blue-100 text-blue-600 mx-auto">
                <NotebookText size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Historial Centralizado</h3>
              <p className="text-gray-600">Vacunas, consultas, estudios y tratamientos, todo en un solo perfil digital.</p>
            </div>
            <div className="benefit-card bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="icon-placeholder bg-green-100 text-green-600 mx-auto">
                <CalendarClock size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Recordatorios Inteligentes</h3>
              <p className="text-gray-600">Notificaciones para citas, medicaciones y todo lo importante.</p>
            </div>
            <div className="benefit-card bg-gray-50 p-8 rounded-xl shadow-lg">
              <div className="icon-placeholder bg-purple-100 text-purple-600 mx-auto">
                <MessageSquareShare size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Comunicación Fluida</h3>
              <p className="text-gray-600">Conecta fácilmente con tu veterinario y comparte información vital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS DETALLADOS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Para Tutores */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">Para Tutores de Mascotas</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-white p-8 rounded-xl shadow-lg benefit-card">
                <div className="flex items-center text-blue-600 mb-4">
                  <Zap size={36} className="mr-3" />
                  <h3 className="text-2xl font-semibold">Información Siempre Accesible</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Centraliza el historial médico de tu mascota: vacunas, diagnósticos, tratamientos, estudios y medicaciones. Accede a todo desde cualquier dispositivo, en cualquier momento. Olvídate de papeles perdidos o información desactualizada.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg benefit-card">
                <div className="flex items-center text-blue-600 mb-4">
                  <Heart size={36} className="mr-3" />
                  <h3 className="text-2xl font-semibold">Agenda Inteligente, Cero Estrés</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Organiza todas las citas veterinarias, programaciones de vacunas y recordatorios de medicación en un calendario inteligente. Recibe notificaciones para no olvidar nada importante y asegura el seguimiento continuo de la salud de tu mascota.
                </p>
              </div>
            </div>
          </div>

          {/* Para Veterinarias */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-12">Para Profesionales Veterinarios</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="benefit-card shadow-lg">
                <CardHeader>
                  <div className="icon-placeholder bg-green-100 text-green-600">
                     <BarChart size={32} />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Agenda Optimizada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gestiona turnos eficientemente y reduce ausencias con recordatorios automáticos. Visualiza tu día y dedica más tiempo a tus pacientes.
                  </p>
                </CardContent>
              </Card>
              <Card className="benefit-card shadow-lg">
                <CardHeader>
                  <div className="icon-placeholder bg-green-100 text-green-600">
                    <FileText size={32} />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Historiales Centralizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Accede al historial completo y actualizado de cada paciente con un clic. Facilita diagnósticos precisos y seguimientos efectivos.
                  </p>
                </CardContent>
              </Card>
              <Card className="benefit-card shadow-lg">
                <CardHeader>
                  <div className="icon-placeholder bg-green-100 text-green-600">
                    <Users size={32} />
                  </div>
                  <CardTitle className="text-xl text-gray-800">Comunicación Fluida con Tutores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Comparte indicaciones y resultados de forma segura. Fortalece la relación con tus clientes y mejora la adherencia a tratamientos.
                  </p>
                </CardContent>
              </Card>
            </div>
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
                    src="https://placehold.co/300x530/1F2937/FFFFFF.png?text=PetSync+Móvil" 
                    alt="PetSync en Smartphone" 
                    width={300} 
                    height={530} 
                    className="rounded-xl mx-auto"
                    data-ai-hint="app interface"
                />
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
                <Image 
                    src="https://placehold.co/500x375/1F2937/FFFFFF.png?text=PetSync+Tablet" 
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

      {/* ÚNETE A LA LISTA DE ESPERA */}
      <section id="waitlist" className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="mb-6">
            <ShieldCheck className="h-16 w-16 text-blue-600 mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¡Sé el primero en probar PetSync!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Estamos afinando los últimos detalles. Regístrate y te avisaremos en cuanto lancemos la plataforma.
          </p>
          <Card className="bg-white shadow-xl p-6 sm:p-8 text-left">
            <WaitlistForm />
          </Card>
        </div>
      </section>

    </div>
  );
}
