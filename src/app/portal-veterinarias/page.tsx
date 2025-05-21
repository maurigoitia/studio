
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Users, Mail, Settings, LogOut, BellRing, PlusCircle, UserPlus, ListChecks, Clock, AlertTriangle, UsersRound, Send } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Dummy data for placeholders
const upcomingAppointments = [
  { time: "09:00 AM", patient: "Firulais (Perro)", owner: "Ana Pérez", service: "Vacunación Anual" },
  { time: "10:30 AM", patient: "Mishi (Gato)", owner: "Carlos López", service: "Control General" },
  { time: "02:00 PM", patient: "Coco (Perro)", owner: "Laura Gómez", service: "Consulta Dermatológica" },
];

const recentPatients = [
  { id: "P001", name: "Max (Perro)", owner: "Juan Rodriguez", lastVisit: "2024-05-10" },
  { id: "P002", name: "Luna (Gato)", owner: "Maria Fernández", lastVisit: "2024-05-12" },
  { id: "P003", name: "Rocky (Perro)", owner: "Pedro Martinez", lastVisit: "2024-05-15" },
];

const waitingRoomPatients = [
  { name: "Manchas (Perro)", owner: "Elena Soler", triage: "Amarillo", eta: "15 min" },
  { name: "Nube (Gato)", owner: "Roberto Diaz", triage: "Rojo", eta: "Urgente" },
  { name: "Pipo (Perro)", owner: "Sofia Luna", triage: "Azul", eta: "30 min" },
];

export default function PortalVeterinariasDashboardPage() {
  // This page now simulates a logged-in dashboard experience.
  // The actual login mechanism and data persistence are not implemented here.

  return (
    <div className="container mx-auto py-8 px-4 min-h-[calc(100vh-8rem)]">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Bienvenido al Portal PetSync</h1>
          <p className="text-muted-foreground text-lg">Gestiona tu clínica y pacientes de forma eficiente.</p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Vet" data-ai-hint="doctor veterinarian" />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">Dr. Ejemplo Vet</p>
            <p className="text-xs text-muted-foreground">Clínica Veterinaria Central</p>
          </div>
          <Button variant="outline" size="icon" asChild>
            <Link href="#">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar Sesión</span>
            </Link>
          </Button>
        </div>
      </header>

      <Tabs defaultValue="agenda" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="agenda" className="text-sm sm:text-base py-2.5">
            <CalendarDays className="mr-2 h-5 w-5" /> Agenda y Turnos
          </TabsTrigger>
          <TabsTrigger value="pacientes" className="text-sm sm:text-base py-2.5">
            <Users className="mr-2 h-5 w-5" /> Pacientes
          </TabsTrigger>
          <TabsTrigger value="comunicaciones" className="text-sm sm:text-base py-2.5">
            <Mail className="mr-2 h-5 w-5" /> Comunicaciones
          </TabsTrigger>
          <TabsTrigger value="configuracion" className="text-sm sm:text-base py-2.5">
            <Settings className="mr-2 h-5 w-5" /> Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agenda">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Gestión de Agenda</CardTitle>
                <CardDescription>Visualiza y administra los turnos programados.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Turno Programado
                  </Button>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full sm:w-auto bg-background" />
                </div>
                <Separator />
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Próximos Turnos del Día</h3>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingAppointments.map((appt, index) => (
                        <Card key={index} className="bg-secondary/50 p-4 shadow-sm">
                          <p className="font-semibold text-primary">{appt.time} - {appt.patient}</p>
                          <p className="text-sm text-muted-foreground">Dueño: {appt.owner} - Servicio: {appt.service}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No hay turnos programados para hoy.</p>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">Ver Agenda Completa</Button>
                </div>
                <Card className="mt-6 p-4 bg-muted/30 border-dashed border-primary/50">
                  <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-lg text-primary flex items-center">
                          <ListChecks className="mr-2 h-5 w-5"/>
                          Habilitar/Configurar Agenda Online
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                      <p className="text-sm text-muted-foreground mb-3">
                          Permite que los tutores soliciten turnos directamente desde la app PetSync. Define tus horarios disponibles, servicios y duraciones.
                      </p>
                      <Button variant="secondary">Configurar Disponibilidad Online</Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Clock className="mr-2 h-6 w-6 text-primary" /> Gestión de Sala de Espera y Triage
                </CardTitle>
                <CardDescription>Sistema de priorización para atenciones espontáneas y urgencias (Concepto).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold mb-2 text-foreground">Niveles de Triage:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-red-500 text-white hover:bg-red-600">Rojo (Crítico)</Badge>
                    <Badge className="bg-orange-400 text-white hover:bg-orange-500">Naranja (Urgente)</Badge>
                    <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">Amarillo (Estándar)</Badge>
                    <Badge className="bg-blue-500 text-white hover:bg-blue-600">Azul (Consulta Rápida)</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-md font-semibold mb-2 text-foreground">Pacientes en Espera (Ejemplo):</h4>
                  {waitingRoomPatients.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mascota</TableHead>
                          <TableHead>Tutor</TableHead>
                          <TableHead>Triage</TableHead>
                          <TableHead>ETA</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {waitingRoomPatients.map((patient, index) => (
                          <TableRow key={index}>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.owner}</TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  patient.triage === "Rojo" ? "bg-red-500 text-white" :
                                  patient.triage === "Naranja" ? "bg-orange-400 text-white" :
                                  patient.triage === "Amarillo" ? "bg-yellow-400 text-black" :
                                  "bg-blue-500 text-white"
                                }
                              >
                                {patient.triage}
                              </Badge>
                            </TableCell>
                            <TableCell>{patient.eta}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                     <p className="text-muted-foreground">No hay pacientes en la sala de espera.</p>
                  )}
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><AlertTriangle className="inline h-4 w-4 mr-1 text-primary"/> Los tutores con la app PetSync podrán visualizar el estado y tiempo estimado de espera de su mascota.</p>
                  <p><UsersRound className="inline h-4 w-4 mr-1 text-primary"/> El sistema permitirá múltiples perfiles de usuario para la clínica (recepción, veterinarios, administradores) con acceso diferenciado según el plan PetSync.</p>
                  <p><Send className="inline h-4 w-4 mr-1 text-primary"/> Los veterinarios accederán al historial completo y podrán enviar resúmenes de consulta, recetas y recomendaciones al perfil del tutor en la app PetSync o a su email.</p>
                  <p><ListChecks className="inline h-4 w-4 mr-1 text-primary"/> Herramientas para incorporar información de pacientes cuyos tutores no usen la app (ej. carga de documentos escaneados).</p>
                </div>
                <div className="mt-4 text-center">
                     <Button variant="outline">Gestionar Sala de Espera</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pacientes">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Gestión de Pacientes</CardTitle>
              <CardDescription>Accede y administra los historiales médicos de tus pacientes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  <UserPlus className="mr-2 h-5 w-5" /> Nuevo Paciente
                </Button>
                <Input type="search" placeholder="Buscar paciente por nombre, dueño o ID..." className="w-full sm:flex-grow bg-background" />
              </div>
               <Separator />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Pacientes Recientes</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre Mascota</TableHead>
                      <TableHead>Dueño</TableHead>
                      <TableHead>Última Visita</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.owner}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Ver Historial</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 <div className="mt-6 text-center">
                    <Button variant="outline">Ver Todos los Pacientes</Button>
                </div>
                 <Card className="mt-6 p-4 bg-muted/30 border-dashed border-primary/50">
                    <CardHeader className="p-0 mb-2">
                        <CardTitle className="text-lg text-primary flex items-center">
                            <ListChecks className="mr-2 h-5 w-5"/>
                            Almacenamiento de Datos y Fichas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-sm text-muted-foreground">
                            PetSync te permite mantener fichas clínicas digitales completas para cada paciente. Registra consultas, diagnósticos, tratamientos, estudios y más. La información se guarda de forma segura y es accesible para ti y (con permiso) para el tutor.
                        </p>
                    </CardContent>
                </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comunicaciones">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Comunicaciones y Notificaciones</CardTitle>
              <CardDescription>Gestiona la comunicación con tus clientes y configura recordatorios.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="p-4 bg-muted/30 border-dashed border-primary/50">
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg text-primary flex items-center">
                        <Mail className="mr-2 h-5 w-5" />
                        Integración de Email y Notificaciones
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground mb-3">
                        Configura plantillas de correo para recordatorios de citas, seguimientos post-consulta, campañas de vacunación o noticias de tu clínica. PetSync puede ayudarte a automatizar el envío a tus clientes registrados.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <Button variant="secondary">Configurar Plantillas</Button>
                        <Button variant="secondary">Ver Historial de Envíos</Button>
                    </div>
                </CardContent>
              </Card>
              
              <Card className="p-4 bg-secondary/50">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg text-foreground flex items-center">
                    <BellRing className="mr-2 h-5 w-5 text-primary" />
                    Notificaciones a Clientes (App y Email)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-2">
                    Envía recordatorios automáticos de citas y vacunas pendientes a los tutores a través de la app PetSync y/o por email.
                  </p>
                  <form className="space-y-3">
                    <div>
                      <Label htmlFor="notificationType">Tipo de Notificación de Ejemplo</Label>
                      <Input id="notificationType" value="Recordatorio de Vacuna Anual" readOnly className="bg-background" />
                    </div>
                    <div>
                      <Label htmlFor="notificationMessage">Mensaje de Ejemplo</Label>
                      <Input id="notificationMessage" value="¡Hola [Dueño]! Es hora de la vacuna anual de [Mascota]." readOnly className="bg-background" />
                    </div>
                    <Button disabled>Enviar Notificación de Prueba (Deshabilitado en Demo)</Button>
                  </form>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Configuración del Portal</CardTitle>
              <CardDescription>Administra los datos de tu clínica y preferencias del portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clinicName">Nombre de la Clínica</Label>
                <Input id="clinicName" defaultValue="Clínica Veterinaria Central" className="bg-background" />
              </div>
              <div>
                <Label htmlFor="clinicEmail">Email de Contacto</Label>
                <Input id="clinicEmail" type="email" defaultValue="contacto@clinicacentral.com" className="bg-background" />
              </div>
              <div>
                <Label htmlFor="clinicPhone">Teléfono</Label>
                <Input id="clinicPhone" type="tel" defaultValue="+54 11 1234-5678" className="bg-background" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Guardar Cambios (Deshabilitado en Demo)</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-12 shadow-lg border-primary/50">
        <CardHeader>
            <CardTitle>¿Aún no tienes tu portal PetSync?</CardTitle>
            <CardDescription>
            PetSync te ofrece las herramientas para optimizar la gestión de tu clínica, mejorar la comunicación con tus clientes y dedicar más tiempo al cuidado de tus pacientes.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="mb-4 text-muted-foreground">
                Si estás interesado en utilizar PetSync para tu práctica veterinaria, contáctanos para obtener más información y ser de los primeros en acceder cuando lancemos oficialmente.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/#waitlist">Solicitar Acceso para Veterinarias</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}

    
