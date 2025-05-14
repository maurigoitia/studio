import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, Stethoscope, Users, Heart, Activity, HelpCircle, Mail, Lightbulb } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';

const faqDataTutors = [
  {
    question: "¿Cómo me ayuda PetSync a gestionar la salud de mi mascota?",
    answer: "PetSync te ofrece herramientas para centralizar el historial médico de tu mascota, acceder a un asistente IA para consultas básicas y conectar fácilmente con veterinarios."
  },
  {
    question: "¿Es seguro el asistente IA para consultas médicas?",
    answer: "El asistente IA está diseñado para proporcionar información general basada en el historial médico. No reemplaza la consulta con un veterinario profesional. Siempre consulta a tu veterinario para diagnósticos y tratamientos."
  },
  {
    question: "¿Mis datos personales y los de mi mascota están seguros?",
    answer: "La seguridad de tus datos es nuestra máxima prioridad. Utilizamos medidas de seguridad avanzadas para proteger toda la información almacenada en PetSync."
  }
];

const faqDataVeterinarians = [
  {
    question: "¿Qué beneficios ofrece PetSync para mi práctica veterinaria?",
    answer: "PetSync te permitirá acceder de forma organizada al historial médico de tus pacientes (con el consentimiento del tutor), optimizar la comunicación y, próximamente, gestionar citas y teleconsultas."
  },
  {
    question: "¿Cómo puedo unirme a la red de veterinarios de PetSync?",
    answer: "Actualmente estamos en fase de lista de espera. Regístrate y te informaremos sobre los próximos pasos para unirte a nuestra plataforma y los criterios de selección."
  },
  {
    question: "¿PetSync se integra con mi software de gestión actual?",
    answer: "Estamos trabajando en futuras integraciones con los principales software de gestión veterinaria. Te mantendremos informado sobre estas novedades."
  }
];


export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto text-center px-4">
          <div className="flex justify-center mb-6">
            <PawPrint className="h-24 w-24 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            PetSync: Conectando el Bienestar Animal
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Simplificamos la gestión de la salud de tu mascota, uniendo a tutores y veterinarios en una plataforma inteligente y amigable.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform" asChild>
              <a href="#waitlist">Únete a la Lista de Espera</a>
            </Button>
            <Button size="lg" variant="outline" className="shadow-lg transform hover:scale-105 transition-transform" asChild>
               <a href="/asistente-medico">Prueba el Asistente IA</a>
            </Button>
          </div>
        </div>
      </section>

      {/* For Pet Owners Section */}
      <section id="tutores" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Users className="h-5 w-5 mr-2" />
                Para Tutores de Mascotas
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Cuidado Inteligente al Alcance de tu Mano</h2>
              <p className="text-muted-foreground mb-4 text-lg">
                Gestiona la salud de tu compañero peludo de forma sencilla y eficiente. Accede a su historial, recibe recordatorios importantes y consulta a nuestro asistente IA para dudas cotidianas.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <Heart className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <span><strong>Historial Médico Centralizado:</strong> Toda la información de salud de tu mascota en un solo lugar, accesible en cualquier momento.</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <span><strong>Asistente IA de Confianza:</strong> Resuelve dudas básicas sobre el historial médico de tu mascota con nuestra IA entrenada.</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <span><strong>Comunicación Fluida:</strong> Conecta fácilmente con veterinarios y comparte información relevante (próximamente).</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Image 
                src="https://placehold.co/500x500.png" 
                alt="Tutor con mascota feliz" 
                width={500} 
                height={500} 
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="owner pet" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Veterinarians Section */}
      <section id="veterinarios" className="w-full py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center md:order-2">
              <Image 
                src="https://placehold.co/500x500.png" 
                alt="Veterinario atendiendo mascota" 
                width={500} 
                height={500} 
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="veterinarian pet"
              />
            </div>
            <div className="md:order-1">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Stethoscope className="h-5 w-5 mr-2" />
                Para Veterinarios
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Optimiza tu Práctica, Mejora la Atención</h2>
              <p className="text-muted-foreground mb-4 text-lg">
                Accede a historiales médicos completos con el consentimiento del tutor, agiliza la comunicación y enfócate en lo que más importa: la salud de tus pacientes.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <Activity className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <span><strong>Acceso Eficiente a Historiales:</strong> Visualiza la información médica de tus pacientes de forma organizada y rápida.</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <span><strong>Colaboración Mejorada:</strong> Facilita la coordinación con otros especialistas y la comunicación con los tutores.</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                  <span><strong>Herramientas Inteligentes:</strong> Próximamente, gestión de citas, teleconsultas y más para modernizar tu clínica.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Waitlist Section */}
      <section id="waitlist" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sé el Primero en Saberlo</h2>
          <p className="text-muted-foreground mb-8">
            Únete a nuestra lista de espera y recibe actualizaciones exclusivas sobre el lanzamiento de PetSync, nuevas funcionalidades y cómo transformaremos el cuidado de las mascotas.
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
            <p className="text-muted-foreground mt-2">Encuentra respuestas a las dudas más comunes sobre PetSync.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Para Tutores</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqDataTutors.map((faq, index) => (
                  <AccordionItem value={`tutor-item-${index}`} key={`tutor-faq-${index}`} className="bg-background rounded-lg shadow mb-2">
                    <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Para Veterinarios</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqDataVeterinarians.map((faq, index) => (
                  <AccordionItem value={`vet-item-${index}`} key={`vet-faq-${index}`} className="bg-background rounded-lg shadow mb-2">
                    <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
