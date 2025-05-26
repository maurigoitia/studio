
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { CalendarDays, Users, Mail, Settings, LogOut, BellRing, PlusCircle, UserPlus, ListChecks, Clock, AlertTriangle, UsersRound, Send, BarChart3, FolderKanban, MailCheck, Plug, Syringe, Stethoscope, Edit3, MoreHorizontal, Trash2, FileText, UserCheck, Video, LogIn, Briefcase, Building, DollarSign, ExternalLink, ChevronDown, UserCog, ClipboardEdit, LifeBuoy, CreditCard, FileSpreadsheet, DownloadCloud, Check, ChevronsUpDown, Dog, Cat, Bird, Rabbit, Microscope, Pill, FileHeart, Image as ImageIcon, ShieldAlert, Search, Power, MapPin, Eye, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth"; // Assuming useAuth hook exists
import { useRouter } from "next/navigation";

// Sample Data (replace with actual data fetching in a real app)
const upcomingAppointments = [
  { id: "1", time: "09:00 AM", patient: "Max (Perro)", owner: "Ana Pérez", service: "Vacunación Anual", icon: <Syringe className="h-5 w-5 text-blue-500" />, assignedTo: "Dr. Vet Ejemplo" },
  { id: "2", time: "10:30 AM", patient: "Luna (Gata)", owner: "Carlos Gómez", service: "Consulta General", icon: <Stethoscope className="h-5 w-5 text-green-500" />, assignedTo: "Dr. Vet Ejemplo" },
  { id: "3", time: "02:00 PM", patient: "Rocky (Perro)", owner: "Laura Méndez", service: "Control Post-Operatorio", icon: <FileHeart className="h-5 w-5 text-purple-500" />, assignedTo: "Dra. Vet Auxiliar" },
];

const waitingRoomPatients = [
  { id: "w1", name: "Simba", owner: "Juan Rodríguez", triage: "Naranja (Urgente)", eta: "15 min", status: "En espera", assignedTo: "Pendiente Asignación" },
  { id: "w2", name: "Milo", owner: "Sofía López", triage: "Amarillo (Estándar)", eta: "30 min", status: "Triado", assignedTo: "Dr. Vet Ejemplo" },
  { id: "w3", name: "Coco", owner: "Luis Fernández", triage: "Rojo (Crítico)", eta: "Inmediato", status: "En consulta", assignedTo: "Dra. Vet Principal" },
  { id: "w4", name: "Bella", owner: "Elena Torres", triage: "Azul (Consulta Rápida)", eta: "5 min", status: "En espera", assignedTo: "Asistente Recepción" },
];

const recentPatients = [
  { id: "p1", name: "Max", species: "Perro", owner: "Ana Pérez", lastVisit: "2024-07-15", status: "Activo" },
  { id: "p2", name: "Luna", species: "Gato", owner: "Carlos Gómez", lastVisit: "2024-07-10", status: "Activo" },
  { id: "p3", name: "Rocky", species: "Perro", owner: "Laura Méndez", lastVisit: "2024-07-01", status: "Seguimiento" },
  { id: "p4", name: "Kiwi", species: "Pájaro", owner: "Pedro Marín", lastVisit: "2024-06-20", status: "Activo" },
];

const samplePatientDetail = {
  name: "Max",
  species: "Perro",
  breed: "Golden Retriever",
  dob: "2020-05-10",
  sex: "Macho",
  chipId: "987000123456789",
  sterilized: "Sí",
  photoUrl: "https://placehold.co/150x150.png",
  owner: {
    name: "Ana Pérez",
    email: "ana.perez@example.com",
    phone: "+54 9 11 1234-5678",
  },
  consultations: [
    { date: "2024-07-15", reason: "Vacunación Anual", vet: "Dr. Vet Ejemplo", notes: "Vacunas aplicadas: Múltiple Canina y Antirrábica. Buen estado general." },
    { date: "2023-12-01", reason: "Control Dermatológico", vet: "Dr. Vet Ejemplo", notes: "Se observó leve irritación. Se recetó crema tópica." },
  ],
  vaccines: [
    { date: "2024-07-15", type: "Múltiple Canina", nextDue: "2025-07-15" },
    { date: "2024-07-15", type: "Antirrábica", nextDue: "2025-07-15" },
  ],
  treatments: [
    { name: "Crema Tópica (Dermatitis)", startDate: "2023-12-01", endDate: "2023-12-15", status: "Completado" },
  ],
  allergies: "Ninguna conocida.",
  chronicConditions: "Ninguna.",
  documents: [
    { name: "Radiografía Tórax 2023.jpg", type: "Imagen", date: "2023-10-05" },
    { name: "Análisis Sangre 2024.pdf", type: "PDF", date: "2024-02-12" },
  ]
};


export default function VetPortalDashboardPage() {
  const [activeTab, setActiveTab] = useState("agenda");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [showNewAppointmentDialog, setShowNewAppointmentDialog] = useState(false);
  const [showNewPatientDialog, setShowNewPatientDialog] = useState(false);
  const [showPatientDetailDialog, setShowPatientDetailDialog] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<typeof samplePatientDetail | null>(null);
  
  // Authentication check (conceptual)
  const { user, loading, logOut } = useAuth() || {}; 
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // router.push('/portal-veterinarias/acceso'); // Redirect if not logged in
      // For now, we'll just log a message as the auth is a mock-up
      console.log("Usuario no autenticado, debería redirigir (simulación).");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Cargando portal...</p></div>;
  }

  // For now, we bypass the auth check to always show the dashboard for demo purposes
  // if (!user) {
  //   return null; // Or a redirect component
  // }


  const handleViewPatientDetails = (patientId: string) => {
    // In a real app, fetch patient details by ID
    setCurrentPatient(samplePatientDetail); // Use sample data for now
    setShowPatientDetailDialog(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-3xl font-bold">Portal de Gestión PetSync</CardTitle>
            <CardDescription>Bienvenido, Dr. Vet Ejemplo (Clínica Veterinaria Central)</CardDescription>
          </div>
          <Button variant="outline" onClick={logOut || (() => router.push('/portal-veterinarias/acceso'))}>
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
              <TabsTrigger value="agenda"><CalendarDays className="mr-2 h-4 w-4" />Agenda y Turnos</TabsTrigger>
              <TabsTrigger value="sala-espera"><Clock className="mr-2 h-4 w-4" />Sala de Espera</TabsTrigger>
              <TabsTrigger value="pacientes"><Users className="mr-2 h-4 w-4" />Pacientes</TabsTrigger>
              <TabsTrigger value="comunicaciones"><Mail className="mr-2 h-4 w-4" />Comunicaciones</TabsTrigger>
              <TabsTrigger value="configuracion"><Settings className="mr-2 h-4 w-4" />Configuración</TabsTrigger>
            </TabsList>

            {/* Agenda y Turnos Tab */}
            <TabsContent value="agenda" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-primary" />Próximos Turnos del Día</CardTitle>
                    <div className="flex items-center space-x-2 pt-2">
                       <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-[200px] justify-start text-left font-normal"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {selectedDate ? selectedDate.toLocaleDateString('es-AR') : <span>Seleccionar fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Button variant="outline" size="sm">Ver Agenda Completa</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingAppointments.map(appt => (
                      <Card key={appt.id} className="p-3 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          {appt.icon}
                          <div>
                            <p className="font-semibold text-sm">{appt.time} - {appt.patient}</p>
                            <p className="text-xs text-muted-foreground">{appt.service} (Dueño: {appt.owner})</p>
                             <p className="text-xs text-muted-foreground">Asignado a: {appt.assignedTo}</p>
                          </div>
                        </div>
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewPatientDetails(appt.id)}>
                              <FileText className="mr-2 h-4 w-4" /> Ver Ficha Paciente
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ClipboardEdit className="mr-2 h-4 w-4" /> Registrar Visita
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <CalendarDays className="mr-2 h-4 w-4" /> Reprogramar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Cancelar Turno
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Card>
                    ))}
                     <Dialog open={showNewAppointmentDialog} onOpenChange={setShowNewAppointmentDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4" onClick={() => setShowNewAppointmentDialog(true)}>
                          <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Turno Programado
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[480px]">
                        <DialogHeader>
                          <DialogTitle>Nuevo Turno Programado</DialogTitle>
                          <DialogDescription>Completa los datos para agendar una nueva cita.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {/* Form fields for new appointment */}
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patientNameAppt" className="text-right">Paciente</Label>
                            <Input id="patientNameAppt" placeholder="Nombre de la mascota" className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ownerNameAppt" className="text-right">Tutor</Label>
                            <Input id="ownerNameAppt" placeholder="Nombre del tutor" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="serviceAppt" className="text-right">Servicio</Label>
                             <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Seleccionar servicio" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="consulta">Consulta General</SelectItem>
                                  <SelectItem value="vacunacion">Vacunación</SelectItem>
                                  <SelectItem value="cirugia">Cirugía Menor</SelectItem>
                                  <SelectItem value="peluqueria">Peluquería</SelectItem>
                                </SelectContent>
                              </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dateAppt" className="text-right">Fecha y Hora</Label>
                            {/* Ideally use a DateTimePicker component */}
                            <Input id="dateAppt" type="datetime-local" className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notesAppt" className="text-right">Notas</Label>
                            <Textarea id="notesAppt" placeholder="Notas adicionales para el turno..." className="col-span-3 min-h-[80px]" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button type="submit">Agendar Turno</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary" />Gestión de Sala de Espera y Triage</CardTitle>
                     <CardDescription>Resumen de la actividad en sala de espera.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex space-x-2 flex-wrap">
                        <Badge variant="destructive" className="bg-red-500 text-white">Rojo (Crítico)</Badge>
                        <Badge className="bg-orange-400 text-white">Naranja (Urgente)</Badge>
                        <Badge className="bg-yellow-400 text-black">Amarillo (Estándar)</Badge>
                        <Badge className="bg-blue-500 text-white">Azul (Rápido)</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Actualmente hay <span className="font-bold text-primary">{waitingRoomPatients.length}</span> pacientes en la sala de espera.
                    </p>
                    <Button className="w-full" onClick={() => setActiveTab("sala-espera")}>
                        <UsersRound className="mr-2 h-5 w-5" /> Gestionar Sala de Espera Completa
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><ExternalLink className="mr-2 h-5 w-5 text-primary"/>Habilitar/Configurar Agenda Online</CardTitle>
                    <CardDescription>Permite que los tutores reserven online.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="online-booking-switch">Permitir Reservas Online</Label>
                      <Switch id="online-booking-switch" defaultChecked />
                    </div>
                    <p><span className="font-semibold">Servicios para reserva:</span> Vacunación, Consulta General.</p>
                    <p><span className="font-semibold">Horarios:</span> Lunes a Viernes 9 AM - 5 PM.</p>
                    <p><span className="font-semibold">Duración por turno:</span> 30 minutos.</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">Configurar Disponibilidad Online</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sala de Espera Tab */}
            <TabsContent value="sala-espera" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Clock className="mr-2 h-6 w-6 text-primary" />Gestión Detallada de Sala de Espera</CardTitle>
                  <CardDescription>Maneja el flujo de pacientes sin turno previo y prioriza urgencias.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Pacientes en Espera ({waitingRoomPatients.length})</h3>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button><PlusCircle className="mr-2 h-5 w-5"/>Añadir Paciente Espontáneo</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Añadir Paciente Espontáneo a Sala de Espera</DialogTitle>
                                </DialogHeader>
                                {/* Form fields for spontaneous patient */}
                                <div className="grid gap-4 py-4">
                                     <Input placeholder="Nombre Mascota" />
                                     <Input placeholder="Nombre Tutor" />
                                     <Select>
                                        <SelectTrigger><SelectValue placeholder="Seleccionar Nivel de Triage" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="rojo">Rojo (Crítico)</SelectItem>
                                            <SelectItem value="naranja">Naranja (Urgente)</SelectItem>
                                            <SelectItem value="amarillo">Amarillo (Estándar)</SelectItem>
                                            <SelectItem value="azul">Azul (Consulta Rápida)</SelectItem>
                                        </SelectContent>
                                     </Select>
                                     <Textarea placeholder="Motivo de la visita / Síntomas iniciales" />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                                    <Button>Añadir a Espera</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex space-x-2 mb-4 flex-wrap">
                        <Badge variant="destructive" className="bg-red-500 text-white">Rojo (Crítico)</Badge>
                        <Badge className="bg-orange-400 text-white">Naranja (Urgente)</Badge>
                        <Badge className="bg-yellow-400 text-black">Amarillo (Estándar)</Badge>
                        <Badge className="bg-blue-500 text-white">Azul (Rápido)</Badge>
                    </div>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Paciente</TableHead>
                            <TableHead>Tutor</TableHead>
                            <TableHead>Triage</TableHead>
                            <TableHead>ETA</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Asignado a</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {waitingRoomPatients.map((patient) => (
                            <TableRow key={patient.id} className={
                                patient.triage.startsWith("Rojo") ? "bg-red-100 dark:bg-red-900/30" :
                                patient.triage.startsWith("Naranja") ? "bg-orange-100 dark:bg-orange-900/30" : ""
                            }>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.owner}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    patient.triage.startsWith("Rojo") ? "destructive" :
                                    patient.triage.startsWith("Naranja") ? "default" :
                                    patient.triage.startsWith("Amarillo") ? "default" :
                                    "secondary"
                                } className={
                                    patient.triage.startsWith("Rojo") ? "bg-red-500 text-white" :
                                    patient.triage.startsWith("Naranja") ? "bg-orange-400 text-white" :
                                    patient.triage.startsWith("Amarillo") ? "bg-yellow-400 text-black" :
                                    "bg-blue-500 text-white"
                                }>{patient.triage}</Badge>
                            </TableCell>
                            <TableCell>{patient.eta}</TableCell>
                            <TableCell>{patient.status}</TableCell>
                            <TableCell>{patient.assignedTo}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {patient.triage.startsWith("Rojo") && <DropdownMenuItem className="text-red-600 font-semibold"><AlertTriangle className="mr-2 h-4 w-4"/>¡ATENDER URGENCIA AHORA!</DropdownMenuItem>}
                                    <DropdownMenuItem><UserCheck className="mr-2 h-4 w-4" /> Asignar Veterinario</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleViewPatientDetails(patient.id)}><FileText className="mr-2 h-4 w-4" /> Ver/Crear Ficha</DropdownMenuItem>
                                    <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Modificar Triage</DropdownMenuItem>
                                    <DropdownMenuItem><Send className="mr-2 h-4 w-4" /> Notificar Tutor (App/SMS)</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Quitar de Sala</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pacientes Tab */}
            <TabsContent value="pacientes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Users className="mr-2 h-6 w-6 text-primary"/>Gestión de Pacientes Animales</CardTitle>
                  <CardDescription>Busca, visualiza y gestiona los historiales clínicos de tus pacientes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Input placeholder="Buscar paciente por nombre, tutor, chip..." className="w-auto md:w-[300px]"/>
                        <Button variant="outline" size="icon"><Search className="h-4 w-4"/></Button>
                    </div>
                    <Dialog open={showNewPatientDialog} onOpenChange={setShowNewPatientDialog}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setShowNewPatientDialog(true)}><UserPlus className="mr-2 h-5 w-5" />Registrar Nuevo Paciente / Crear Ficha</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Registrar Nuevo Paciente / Crear Ficha</DialogTitle>
                                <DialogDescription>Completa los datos del nuevo paciente y su tutor.</DialogDescription>
                            </DialogHeader>
                            <div className="grid md:grid-cols-2 gap-6 py-4 max-h-[70vh] overflow-y-auto p-2">
                                <Card className="col-span-2 md:col-span-1">
                                    <CardHeader><CardTitle className="text-lg">Datos de la Mascota</CardTitle></CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="petName">Nombre Mascota</Label>
                                            <Input id="petName" placeholder="Ej: Max, Luna" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="petSpecies">Especie</Label>
                                            <Select>
                                                <SelectTrigger id="petSpecies"><SelectValue placeholder="Seleccionar especie" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="perro"><Dog className="inline mr-2 h-4 w-4"/>Perro</SelectItem>
                                                    <SelectItem value="gato"><Cat className="inline mr-2 h-4 w-4"/>Gato</SelectItem>
                                                    <SelectItem value="ave"><Bird className="inline mr-2 h-4 w-4"/>Ave</SelectItem>
                                                    <SelectItem value="conejo"><Rabbit className="inline mr-2 h-4 w-4"/>Conejo</SelectItem>
                                                    <SelectItem value="otro">Otro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="petBreed">Raza (Opcional)</Label>
                                            <Input id="petBreed" placeholder="Ej: Golden Retriever, Siamés" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="petDOB">Fecha Nac. (Opcional)</Label>
                                            <Input id="petDOB" type="date" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="petSex">Sexo</Label>
                                            <Select>
                                                <SelectTrigger id="petSex"><SelectValue placeholder="Seleccionar sexo" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="macho">Macho</SelectItem>
                                                    <SelectItem value="hembra">Hembra</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                         <div className="space-y-1">
                                            <Label htmlFor="petChip">Nº Chip (Opcional)</Label>
                                            <Input id="petChip" placeholder="Número de microchip" />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="petSterilized" />
                                            <Label htmlFor="petSterilized">Esterilizado/a</Label>
                                        </div>
                                    </CardContent>
                                </Card>
                                 <Card className="col-span-2 md:col-span-1">
                                    <CardHeader><CardTitle className="text-lg">Datos del Tutor</CardTitle></CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="ownerName">Nombre Tutor</Label>
                                            <Input id="ownerName" placeholder="Ej: Ana Pérez" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="ownerEmail">Email Tutor</Label>
                                            <Input id="ownerEmail" type="email" placeholder="ejemplo@correo.com" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="ownerPhone">Teléfono Tutor</Label>
                                            <Input id="ownerPhone" type="tel" placeholder="+54 9 11 XXXX-XXXX" />
                                        </div>
                                         <div className="space-y-1">
                                            <Label htmlFor="ownerAddress">Dirección (Opcional)</Label>
                                            <Input id="ownerAddress" placeholder="Calle Falsa 123, Ciudad" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                                <Button type="submit">Guardar Paciente</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre Mascota</TableHead>
                        <TableHead>Especie</TableHead>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Última Visita</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-mono text-xs">{patient.id}</TableCell>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.species}</TableCell>
                          <TableCell>{patient.owner}</TableCell>
                          <TableCell>{patient.lastVisit}</TableCell>
                          <TableCell><Badge variant={patient.status === "Activo" ? "default" : "secondary"}>{patient.status}</Badge></TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewPatientDetails(patient.id)}>
                                        <FileText className="mr-2 h-4 w-4"/> Ver Historial Completo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem><PlusCircle className="mr-2 h-4 w-4"/> Iniciar Nueva Consulta</DropdownMenuItem>
                                    <DropdownMenuItem><CalendarDays className="mr-2 h-4 w-4"/> Agendar Próximo Turno</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4"/> Editar Datos del Paciente</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/> Eliminar Paciente</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

             {/* Comunicaciones Tab */}
            <TabsContent value="comunicaciones" className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><MailCheck className="mr-2 h-5 w-5 text-primary"/>Integración de Email y Campañas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Configura plantillas de correo para recordatorios de citas, seguimientos post-consulta o noticias de tu clínica. 
                                PetSync te ayudará a automatizar el envío a tus clientes registrados, utilizando la información de contacto de tu base de datos de pacientes.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Los usuarios con rol de marketing podrán diseñar y enviar campañas segmentadas a grupos de tutores (basado en los datos y etiquetas de tu base de pacientes) para promociones, anuncios importantes o campañas de salud preventiva.
                            </p>
                            <Button variant="outline" className="w-full mt-2" ><Send className="mr-2 h-4 w-4"/>Diseñar Nueva Campaña de Email</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><BellRing className="mr-2 h-5 w-5 text-primary"/>Recordatorios Automatizados a Clientes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Envía recordatorios automáticos de citas y vacunas pendientes a los tutores a través de la app PetSync y/o por email, disparados por los datos de salud y citas almacenados en la ficha de cada paciente.
                            </p>
                            <p className="text-sm text-muted-foreground">Ejemplo: "¡Hola Ana Pérez! Es hora de la próxima vacuna de Max (programada automáticamente basada en su última visita el 15/07/2024)."</p>
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch id="auto-reminders-switch" defaultChecked />
                                <Label htmlFor="auto-reminders-switch">Activar Recordatorios Globales</Label>
                            </div>
                             <p className="text-xs text-muted-foreground mt-1">Nota: La programación inteligente de recordatorios futuros (ej: revacunación anual) se configurará según los protocolos veterinarios.</p>
                        </CardContent>
                    </Card>
                 </div>
            </TabsContent>

            {/* Configuración Tab */}
            <TabsContent value="configuracion" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Building className="mr-2 h-5 w-5 text-primary"/>Datos de la Clínica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="clinicName">Nombre de la Clínica</Label>
                                <Input id="clinicName" defaultValue="Clínica Veterinaria Central" />
                            </div>
                            <div>
                                <Label htmlFor="clinicAddress">Dirección</Label>
                                <Input id="clinicAddress" defaultValue="Av. Corrientes 1234, CABA" />
                            </div>
                            <div>
                                <Label htmlFor="clinicPhone">Teléfono</Label>
                                <Input id="clinicPhone" defaultValue="+54 11 4567-8901" />
                            </div>
                             <div>
                                <Label htmlFor="clinicEmail">Email de Contacto</Label>
                                <Input id="clinicEmail" type="email" defaultValue="contacto@clinicacentral.com" />
                            </div>
                            <Button className="w-full">Guardar Cambios</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><UserCog className="mr-2 h-5 w-5 text-primary"/>Preferencias del Portal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="enableOnlineBooking" className="flex-grow">Habilitar Portal de Tutores (Reservas Online)</Label>
                                <Switch id="enableOnlineBooking" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="autoEmailReminders" className="flex-grow">Enviar Recordatorios Automáticos por Email</Label>
                                <Switch id="autoEmailReminders" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="autoAppReminders" className="flex-grow">Enviar Recordatorios Automáticos por App PetSync</Label>
                                <Switch id="autoAppReminders" />
                            </div>
                            <Button variant="outline" className="w-full">Guardar Preferencias</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Plug className="mr-2 h-5 w-5 text-primary"/>Conexiones e Integraciones (Futuro)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Estamos trabajando para que PetSync se integre con tus herramientas favoritas. Próximamente: Conexión con [Software de Gestión Clínica Ejemplo], [Plataforma de Email Marketing Ejemplo], pasarelas de pago y más. La información de tu clínica y pacientes se gestionará de forma segura para facilitar estas integraciones.
                            </p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary" />Gestión de Plan y Soporte</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm">Plan Actual: <Badge>PRO (5 Usuarios)</Badge></p>
                            <p className="text-sm">Usuarios Activos: 3 de 5</p>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                <Button variant="outline" className="flex-1">Ver Detalles del Plan / Actualizar</Button>
                                <Button variant="outline" className="flex-1">Gestionar Usuarios</Button>
                            </div>
                            <Button variant="secondary" className="w-full mt-2"><LifeBuoy className="mr-2 h-4 w-4"/>Contactar Soporte</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><DownloadCloud className="mr-2 h-5 w-5 text-primary" />Exportar Información de tu Clínica</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                                Sabemos lo importante que es tu información. PetSync te ofrecerá opciones para exportar los datos de tus pacientes y tu actividad en la plataforma.
                            </p>
                             <p className="text-sm text-muted-foreground mb-3">
                                Actualmente, para exportar tus datos (ej. en formato XLS, CSV), por favor, comunícate con nuestro equipo de soporte. Estaremos encantados de asistirte en el proceso y asegurar una transición de datos fluida si lo necesitas.
                            </p>
                            <Button variant="secondary" className="w-full"><FileSpreadsheet className="mr-2 h-4 w-4"/>Contactar Soporte para Exportación</Button>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog for Patient Details */}
      <Dialog open={showPatientDetailDialog} onOpenChange={setShowPatientDetailDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center">
                {currentPatient?.species === "Perro" ? <Dog className="mr-3 h-7 w-7 text-primary"/> : currentPatient?.species === "Gato" ? <Cat className="mr-3 h-7 w-7 text-primary"/> : <Briefcase className="mr-3 h-7 w-7 text-primary"/>}
                Ficha de Paciente: {currentPatient?.name || "N/A"}
            </DialogTitle>
            <DialogDescription>
              Información completa y acciones para {currentPatient?.name || "el paciente"}.
            </DialogDescription>
          </DialogHeader>
          
          {currentPatient && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 max-h-[calc(90vh-10rem)] overflow-y-auto p-1">
                <div className="md:col-span-1 space-y-4">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-3">
                                <img src={currentPatient.photoUrl} alt={currentPatient.name} className="w-full h-full object-cover rounded-full" data-ai-hint="pet portrait" />
                            </div>
                            <Button variant="outline" size="sm"><UploadCloud className="mr-2 h-4 w-4" /> Cambiar Foto</Button>
                            <div className="text-center mt-3">
                                <p className="font-semibold text-lg">{currentPatient.name}</p>
                                <p className="text-sm text-muted-foreground">{currentPatient.species} - {currentPatient.breed}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Datos Básicos</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-1">
                            <p><strong>Fecha Nac.:</strong> {currentPatient.dob}</p>
                            <p><strong>Sexo:</strong> {currentPatient.sex}</p>
                            <p><strong>Nº Chip:</strong> {currentPatient.chipId}</p>
                            <p><strong>Esterilizado/a:</strong> {currentPatient.sterilized}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Tutor</CardTitle></CardHeader>
                        <CardContent className="text-sm space-y-1">
                            <p><strong>Nombre:</strong> {currentPatient.owner.name}</p>
                            <p><strong>Email:</strong> {currentPatient.owner.email}</p>
                            <p><strong>Teléfono:</strong> {currentPatient.owner.phone}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Tabs defaultValue="historial" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-2">
                            <TabsTrigger value="historial">Historial</TabsTrigger>
                            <TabsTrigger value="vacunas">Vacunas</TabsTrigger>
                            <TabsTrigger value="tratamientos">Tratamientos</TabsTrigger>
                            <TabsTrigger value="alergias">Alergias</TabsTrigger>
                            <TabsTrigger value="documentos">Docs/Estudios</TabsTrigger>
                        </TabsList>
                        <TabsContent value="historial" className="mt-0">
                            <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center"><FileHeart className="mr-2 h-5 w-5 text-primary"/>Historial de Consultas</CardTitle></CardHeader>
                                <CardContent className="max-h-[400px] overflow-y-auto space-y-3">
                                    {currentPatient.consultations.map((c, i) => (
                                        <div key={i} className="p-3 border rounded-md bg-secondary/30">
                                            <p className="font-semibold">{c.date} - {c.reason} (Vet: {c.vet})</p>
                                            <p className="text-xs text-muted-foreground mt-1">{c.notes}</p>
                                        </div>
                                    ))}
                                    {currentPatient.consultations.length === 0 && <p className="text-sm text-muted-foreground">No hay consultas registradas.</p>}
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="vacunas" className="mt-0">
                            <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center"><Syringe className="mr-2 h-5 w-5 text-primary"/>Vacunas y Desparasitaciones</CardTitle></CardHeader>
                                <CardContent className="max-h-[400px] overflow-y-auto">
                                    <Table>
                                        <TableHeader><TableRow><TableHead>Fecha</TableHead><TableHead>Tipo</TableHead><TableHead>Próxima Dosis</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {currentPatient.vaccines.map((v,i) => <TableRow key={i}><TableCell>{v.date}</TableCell><TableCell>{v.type}</TableCell><TableCell>{v.nextDue}</TableCell></TableRow>)}
                                            {currentPatient.vaccines.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-sm text-muted-foreground">No hay vacunas registradas.</TableCell></TableRow>}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="tratamientos" className="mt-0">
                            <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center"><Pill className="mr-2 h-5 w-5 text-primary"/>Tratamientos</CardTitle></CardHeader>
                                <CardContent className="max-h-[400px] overflow-y-auto">
                                     <Table>
                                        <TableHeader><TableRow><TableHead>Tratamiento</TableHead><TableHead>Inicio</TableHead><TableHead>Fin</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader>
                                        <TableBody>
                                            {currentPatient.treatments.map((t,i) => <TableRow key={i}><TableCell>{t.name}</TableCell><TableCell>{t.startDate}</TableCell><TableCell>{t.endDate}</TableCell><TableCell>{t.status}</TableCell></TableRow>)}
                                            {currentPatient.treatments.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-sm text-muted-foreground">No hay tratamientos registrados.</TableCell></TableRow>}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="alergias" className="mt-0">
                            <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-primary"/>Alergias y Condiciones Crónicas</CardTitle></CardHeader>
                                <CardContent className="max-h-[400px] overflow-y-auto text-sm">
                                    <p><strong>Alergias:</strong> {currentPatient.allergies || "No registradas."}</p>
                                    <p className="mt-2"><strong>Condiciones Crónicas:</strong> {currentPatient.chronicConditions || "No registradas."}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="documentos" className="mt-0">
                            <Card>
                                <CardHeader><CardTitle className="text-lg flex items-center"><ImageIcon className="mr-2 h-5 w-5 text-primary"/>Documentos y Estudios</CardTitle></CardHeader>
                                <CardContent className="max-h-[400px] overflow-y-auto">
                                     <ul className="space-y-2 text-sm">
                                        {currentPatient.documents.map((doc, i) => (
                                            <li key={i} className="flex items-center justify-between p-2 border rounded-md hover:bg-secondary/50">
                                                <div className="flex items-center">
                                                    {doc.type === "PDF" ? <FileText className="mr-2 h-4 w-4 text-red-500"/> : <ImageIcon className="mr-2 h-4 w-4 text-blue-500"/>}
                                                    <span>{doc.name} ({doc.date})</span>
                                                </div>
                                                <Button variant="ghost" size="sm"><DownloadCloud className="h-4 w-4"/></Button>
                                            </li>
                                        ))}
                                        {currentPatient.documents.length === 0 && <p className="text-sm text-muted-foreground">No hay documentos adjuntos.</p>}
                                     </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowPatientDetailDialog(false)}>Cerrar</Button>
            <Button><Edit3 className="mr-2 h-4 w-4"/>Editar Ficha</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}


