"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

import { CalendarDays, Users, Mail, Settings, LogOut, BellRing, PlusCircle, UserPlus, ListChecks, Clock, AlertTriangle, UsersRound, Send, BarChart3, FolderKanban, MailCheck, Plug, Syringe, Stethoscope, Edit3, MoreHorizontal, Trash2, FileText, UserCheck, Video, LogIn, Briefcase, Building, DollarSign, ExternalLink, ChevronDown, UserCog, ClipboardEdit, LifeBuoy, CreditCard, FileSpreadsheet, DownloadCloud, Check, ChevronsUpDown, Dog, Cat, Bird, Rabbit, Microscope, Pill, FileHeart, Image as ImageIcon, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";


// Dummy data for placeholders
const upcomingAppointments = [
  { id: "A001", time: "09:00 AM", patient: "Firulais (Perro)", owner: "Ana Pérez", service: "Vacunación Anual", serviceType: "vaccination" },
  { id: "A002", time: "10:30 AM", patient: "Mishi (Gato)", owner: "Carlos López", service: "Control General", serviceType: "consultation" },
  { id: "A003", time: "02:00 PM", patient: "Coco (Perro)", owner: "Laura Gómez", service: "Consulta Dermatológica", serviceType: "consultation" },
];

const recentPatients = [
  { id: "P001", name: "Max", species: "Perro", breed: "Labrador Retriever", age: "5 años", sex: "Macho", microchip: "981000001234567", sterilized: "Sí", owner: "Juan Rodriguez", ownerEmail: "juan.r@example.com", ownerPhone: "11-2345-6789", lastVisit: "2024-05-10", photoUrl: "https://placehold.co/100x100.png", photoHint:"dog labrador" },
  { id: "P002", name: "Luna", species: "Gato", breed: "Siamés", age: "3 años", sex: "Hembra", microchip: "981000007654321", sterilized: "Sí", owner: "Maria Fernández", ownerEmail: "maria.f@example.com", ownerPhone: "11-3456-7890", lastVisit: "2024-05-12", photoUrl: "https://placehold.co/100x100.png", photoHint: "cat siamese"},
  { id: "P003", name: "Rocky", species: "Perro", breed: "Bulldog Francés", age: "2 años", sex: "Macho", microchip: "981000001122334", sterilized: "No", owner: "Pedro Martinez", ownerEmail: "pedro.m@example.com", ownerPhone: "11-4567-8901", lastVisit: "2024-05-15", photoUrl: "https://placehold.co/100x100.png", photoHint: "dog bulldog" },
];

type Patient = typeof recentPatients[0];

const waitingRoomPatients = [
  { id: "W001", name: "Manchas (Perro)", owner: "Elena Soler", triage: "Amarillo", eta: "15 min", status: "En espera", assignedTo: "Dr. Vet Ejemplo" },
  { id: "W002", name: "Nube (Gato)", owner: "Roberto Diaz", triage: "Rojo", eta: "Urgente", status: "En consulta", assignedTo: "Dra. Salas (Urgencias)" },
  { id: "W003", name: "Pipo (Perro)", owner: "Sofia Luna", triage: "Azul", eta: "30 min", status: "Triado", assignedTo: "Asist. Recepción" },
  { id: "W004", name: "Kira (Perro)", owner: "Luis Paz", triage: "Amarillo", eta: "20 min", status: "Esperando resultados", assignedTo: "Laboratorio" },
  { id: "W005", name: "Thor (Gato)", owner: "Marta Gómez", triage: "Naranja", eta: "5 min", status: "En espera", assignedTo: "Pendiente Asignación" },
];

const commonDogBreeds = [
  { value: "labrador retriever", label: "Labrador Retriever" }, { value: "bulldog francés", label: "Bulldog Francés" },
  { value: "pastor alemán", label: "Pastor Alemán" }, { value: "golden retriever", label: "Golden Retriever" },
  { value: "caniche", label: "Caniche (Poodle)" }, { value: "bulldog inglés", label: "Bulldog Inglés" },
  { value: "beagle", label: "Beagle" }, { value: "rottweiler", label: "Rottweiler" }, { value: "siberian husky", label: "Siberian Husky" },
  { value: "mestizo perro", label: "Mestizo / Cruza (Perro)" }, { value: "otro perro", label: "Otra Raza (Perro)" },
];
const commonCatBreeds = [
  { value: "siamés", label: "Siamés" }, { value: "persa", label: "Persa" }, { value: "maine coon", label: "Maine Coon" },
  { value: "ragdoll", label: "Ragdoll" }, { value: "bengalí", label: "Bengalí" }, { value: "british shorthair", label: "British Shorthair" },
  { value: "sphynx", label: "Sphynx (Gato sin pelo)" }, { value: "mestizo gato", label: "Mestizo / Común Europeo (Gato)" },
  { value: "otro gato", label: "Otra Raza (Gato)" },
];
const allBreeds = [...commonDogBreeds, ...commonCatBreeds];


const getServiceIcon = (serviceType?: string) => {
  if (serviceType === "vaccination") return <Syringe className="h-5 w-5 text-blue-500 mr-2" />;
  if (serviceType === "consultation") return <Stethoscope className="h-5 w-5 text-green-500 mr-2" />;
  return <ListChecks className="h-5 w-5 text-gray-500 mr-2" />;
};

const getTriageBadgeColor = (triageLevel: string) => {
  switch (triageLevel.toLowerCase()) {
    case "rojo": return "bg-red-500 text-white hover:bg-red-600";
    case "naranja": return "bg-orange-400 text-white hover:bg-orange-500";
    case "amarillo": return "bg-yellow-400 text-black hover:bg-yellow-500";
    case "azul": return "bg-blue-500 text-white hover:bg-blue-600";
    default: return "bg-gray-400 text-white hover:bg-gray-500";
  }
};

const mockPatientMedicalHistory = {
  consultations: [
    { date: "2024-05-10", reason: "Control anual y vacunación", vet: "Dr. Vet Ejemplo", notes: "Paciente saludable, vacunas al día. Leve sarro dental." },
    { date: "2023-11-15", reason: "Otitis externa", vet: "Dr. Vet Ejemplo", notes: "Se recetó tratamiento antibiótico y antiinflamatorio por 7 días. Limpieza de oídos." },
    { date: "2023-03-01", reason: "Vacunación cachorro", vet: "Dr. Vet Ejemplo", notes: "Primera dosis de vacuna quintuple." },
  ],
  vaccines: [
    { date: "2024-05-10", vaccine: "Quintuple Canina (Refuerzo)", nextDueDate: "2025-05-10" },
    { date: "2024-05-10", vaccine: "Antirrábica", nextDueDate: "2025-05-10" },
    { date: "2023-03-01", vaccine: "Quintuple Canina (1ra Dosis)", nextDueDate: "N/A" },
  ],
  deworming: [
    { date: "2024-04-01", product: "Total Full CG", internal: true, external: true },
    { date: "2024-01-05", product: "Pipeta Advantix", internal: false, external: true },
  ],
  currentTreatments: [
    { drug: "Condroprotector (preventivo)", dosage: "1 comp/día", duration: "Continuo", startDate: "2024-01-01" },
  ],
  allergies: "Alergia leve a picadura de pulgas, controlada con antiparasitario mensual.",
  chronicConditions: "Ninguna condición crónica diagnosticada.",
  documents: [
    { name: "Analisis_Sangre_2023.pdf", type: "Análisis de Laboratorio", date: "2023-10-20" },
    { name: "Radiografia_Torax_2022.jpg", type: "Radiografía", date: "2022-07-05" },
  ]
};


export default function PortalVeterinariasDashboardPage() {
  const [activeTab, setActiveTab] = useState("agenda");
  const [openBreedCombobox, setOpenBreedCombobox] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isPatientDetailOpen, setIsPatientDetailOpen] = useState(false);
  const [selectedPatientForDetail, setSelectedPatientForDetail] = useState<Patient | null>(null);


  const handleViewPatientDetail = (patient: Patient) => {
    setSelectedPatientForDetail(patient);
    setIsPatientDetailOpen(true);
  };
  

  return (
    <TooltipProvider>
    <div className="container mx-auto py-8 px-4 min-h-[calc(100vh-8rem)]">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Bienvenido al Portal PetSync</h1>
          <p className="text-muted-foreground text-lg">Gestiona tu clínica y cada paciente de forma eficiente.</p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Vet" data-ai-hint="doctor veterinarian" />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">Dr. Vet Ejemplo</p>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6">
          <TabsTrigger value="agenda" className="text-sm sm:text-base py-2.5">
            <CalendarDays className="mr-2 h-5 w-5" /> Agenda y Turnos
          </TabsTrigger>
          <TabsTrigger value="sala-espera" className="text-sm sm:text-base py-2.5">
            <Clock className="mr-2 h-5 w-5" /> Sala de Espera
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Gestión de Agenda</CardTitle>
                  <CardDescription>Visualiza y administra los turnos programados para cada animal, **sincronizados en tiempo real con la base de datos central de PetSync.**</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                          <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Turno Programado
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Agendar Nuevo Turno</DialogTitle>
                          <DialogDescription>
                            Completa los detalles para crear un nuevo turno.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patientName" className="text-right">Paciente</Label>
                            <Input id="patientName" placeholder="Nombre de la mascota" className="col-span-3 bg-background" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ownerName" className="text-right">Tutor</Label>
                            <Input id="ownerName" placeholder="Nombre del tutor" className="col-span-3 bg-background" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="service" className="text-right">Servicio</Label>
                            <Select>
                                <SelectTrigger className="col-span-3 bg-background">
                                    <SelectValue placeholder="Seleccionar servicio" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="consulta">Consulta General</SelectItem>
                                    <SelectItem value="vacunacion">Vacunación</SelectItem>
                                    <SelectItem value="desparasitacion">Desparasitación</SelectItem>
                                    <SelectItem value="cirugia">Cirugía</SelectItem>
                                    <SelectItem value="peluqueria">Peluquería y Baño</SelectItem>
                                    <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Fecha</Label>
                            <Input id="date" type="date" className="col-span-3 bg-background" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">Hora</Label>
                            <Input id="time" type="time" className="col-span-3 bg-background" />
                          </div>
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="notes" className="text-right pt-2">Notas</Label>
                            <Textarea id="notes" placeholder="Notas adicionales sobre el turno..." className="col-span-3 bg-background" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Agendar Turno</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full sm:w-auto bg-background" />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Próximos Turnos del Día</h3>
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appt) => (
                          <Card key={appt.id} className="bg-card p-4 shadow-md hover:shadow-lg transition-shadow border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center mb-1">
                                        {getServiceIcon(appt.serviceType)}
                                        <p className="font-semibold text-primary text-lg">{appt.time} - {appt.patient}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-7">Tutor: {appt.owner}</p>
                                    <p className="text-sm text-muted-foreground ml-7">Servicio: {appt.service}</p>
                                </div>
                                <div className="flex gap-2 mt-1">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> Ver Ficha Paciente</DropdownMenuItem>
                                            <DropdownMenuItem><UserCheck className="mr-2 h-4 w-4" /> Registrar Visita/Consulta</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Reprogramar Turno</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive hover:!bg-destructive/10 focus:!bg-destructive/10 focus:!text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" /> Cancelar Turno
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No hay turnos programados para hoy.</p>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline">Ver Agenda Completa (Calendario)</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1 space-y-6">
                <Card className="shadow-lg">
                  <CardHeader className="p-4">
                      <CardTitle className="text-lg text-primary flex items-center">
                          <ListChecks className="mr-2 h-5 w-5"/>
                          Habilitar/Configurar Agenda Online
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                      <p className="text-sm text-muted-foreground">
                          Permite que los tutores soliciten turnos directamente desde la app PetSync. Define tus horarios disponibles, servicios y duraciones. **Las solicitudes se reflejan automáticamente en tu agenda y base de datos.**
                      </p>
                      <div>
                        <Label className="text-xs text-muted-foreground">Servicios para reserva online (ejemplo):</Label>
                        <p className="text-sm p-2 bg-muted/50 rounded-md">Vacunación, Consulta General, Control</p>
                      </div>
                       <div>
                        <Label className="text-xs text-muted-foreground">Horarios online (ejemplo):</Label>
                        <p className="text-sm p-2 bg-muted/50 rounded-md">Lunes a Viernes: 09:00-12:00, 14:00-18:00</p>
                      </div>
                       <div>
                        <Label className="text-xs text-muted-foreground">Duración de turnos online (ejemplo):</Label>
                        <p className="text-sm p-2 bg-muted/50 rounded-md">30 minutos</p>
                      </div>
                      <Button variant="secondary" className="w-full">Configurar Disponibilidad Online</Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader  className="p-4">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" /> Gestión de Sala de Espera y Triage
                    </CardTitle>
                    <CardDescription className="text-xs">Maneja el flujo de pacientes sin turno previo y prioriza urgencias. (Urgencias y Espontáneos)</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Niveles de Triage (Ejemplo):</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={`${getTriageBadgeColor("Rojo")} text-xs`}>Rojo (Crítico)</Badge>
                        <Badge className={`${getTriageBadgeColor("Naranja")} text-xs`}>Naranja (Urgente)</Badge>
                        <Badge className={`${getTriageBadgeColor("Amarillo")} text-xs`}>Amarillo (Estándar)</Badge>
                        <Badge className={`${getTriageBadgeColor("Azul")} text-xs`}>Azul (Consulta Rápida)</Badge>
                      </div>
                    </div>
                     <p className="text-sm text-muted-foreground">Actualmente hay {waitingRoomPatients.length} pacientes en la sala de espera.</p>
                    <Separator />
                    <div className="mt-3 text-center">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs" onClick={() => setActiveTab("sala-espera")}>
                                    Gestionar Sala de Espera Completa
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Llevaría a la vista detallada de la sala de espera.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sala-espera">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Clock className="mr-3 h-7 w-7 text-primary" />
                Gestión Detallada de Sala de Espera
              </CardTitle>
              <CardDescription>Visualiza y maneja todos los pacientes en espera, su estado y asignación.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-end">
                 <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          <UserPlus className="mr-2 h-5 w-5" /> Añadir Paciente Espontáneo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Registrar Paciente Espontáneo</DialogTitle>
                          <DialogDescription>
                            Completa los datos del paciente que llega sin turno.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="spontaneousPatientName" className="text-right">Mascota</Label>
                            <Input id="spontaneousPatientName" placeholder="Nombre de la mascota" className="col-span-3 bg-background" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="spontaneousOwnerName" className="text-right">Tutor</Label>
                            <Input id="spontaneousOwnerName" placeholder="Nombre del tutor" className="col-span-3 bg-background" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="spontaneousTriage" className="text-right">Triage Inicial</Label>
                            <Select>
                                <SelectTrigger className="col-span-3 bg-background">
                                    <SelectValue placeholder="Seleccionar nivel de triage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rojo">Rojo (Crítico)</SelectItem>
                                    <SelectItem value="naranja">Naranja (Urgente)</SelectItem>
                                    <SelectItem value="amarillo">Amarillo (Estándar)</SelectItem>
                                    <SelectItem value="azul">Azul (Consulta Rápida)</SelectItem>
                                </SelectContent>
                            </Select>
                          </div>
                           <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="spontaneousReason" className="text-right pt-2">Motivo Visita</Label>
                            <Textarea id="spontaneousReason" placeholder="Breve descripción del motivo..." className="col-span-3 bg-background" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Añadir a Sala de Espera</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.owner}</TableCell>
                      <TableCell><Badge className={`${getTriageBadgeColor(patient.triage)} text-xs`}>{patient.triage}</Badge></TableCell>
                      <TableCell>{patient.eta}</TableCell>
                      <TableCell>{patient.status}</TableCell>
                      <TableCell>{patient.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                                const p = recentPatients.find(rp => rp.name.startsWith(patient.name.split(" ")[0]));
                                if(p) handleViewPatientDetail(p);
                            }}><FileText className="mr-2 h-4 w-4" /> Ver Ficha</DropdownMenuItem>
                            <DropdownMenuItem><UserCheck className="mr-2 h-4 w-4" /> Iniciar Consulta</DropdownMenuItem>
                            <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Actualizar Triage/Estado</DropdownMenuItem>
                            <DropdownMenuItem><UserCog className="mr-2 h-4 w-4" /> Asignar a Veterinario</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive hover:!bg-destructive/10 focus:!bg-destructive/10 focus:!text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Quitar de Lista
                            </DropdownMenuItem>
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

        <TabsContent value="pacientes">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Gestión de Pacientes Animales</CardTitle>
              <CardDescription>Accede y administra los historiales médicos individuales de tus pacientes, **almacenados de forma segura y centralizada en la base de datos en la nube de PetSync.**</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                 <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                          <UserPlus className="mr-2 h-5 w-5" /> Registrar Nuevo Paciente / Crear Ficha
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Registrar Nuevo Paciente / Crear Ficha</DialogTitle>
                          <DialogDescription>
                            Completa los datos del nuevo paciente animal y su tutor.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newPatientName" className="text-right">Nombre Mascota</Label>
                            <Input id="newPatientName" placeholder="Ej: Firulais" className="col-span-3 bg-background" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newPatientSpecies" className="text-right">Especie</Label>
                            <Input id="newPatientSpecies" placeholder="Ej: Perro, Gato" className="col-span-3 bg-background" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newPatientBreed" className="text-right">Raza (Opcional)</Label>
                             <Popover open={openBreedCombobox} onOpenChange={setOpenBreedCombobox}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openBreedCombobox}
                                  className="col-span-3 justify-between bg-background font-normal"
                                >
                                  {selectedBreed
                                    ? allBreeds.find((breed) => breed.value === selectedBreed)?.label
                                    : "Seleccionar raza..."}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[375px] p-0">
                                <Command>
                                  <CommandInput placeholder="Buscar raza..." />
                                  <CommandList>
                                    <CommandEmpty>No se encontró la raza.</CommandEmpty>
                                    <CommandGroup>
                                      {allBreeds.map((breed) => (
                                        <CommandItem
                                          key={breed.value}
                                          value={breed.value}
                                          onSelect={(currentValue) => {
                                            setSelectedBreed(currentValue === selectedBreed ? "" : currentValue);
                                            setOpenBreedCombobox(false);
                                          }}
                                        >
                                          <Check
                                            className={`mr-2 h-4 w-4 ${selectedBreed === breed.value ? "opacity-100" : "opacity-0"}`}
                                          />
                                          {breed.label}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newPatientBirthdate" className="text-right">Fecha Nac. (Opc.)</Label>
                            <Input id="newPatientBirthdate" type="date" className="col-span-3 bg-background" />
                          </div>
                          <Separator className="my-2 col-span-4"/>
                          <p className="text-sm font-medium text-muted-foreground col-span-4">Datos del Tutor</p>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newOwnerName" className="text-right">Nombre Tutor</Label>
                            <Input id="newOwnerName" placeholder="Ej: Ana Pérez" className="col-span-3 bg-background" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newOwnerEmail" className="text-right">Email Tutor</Label>
                            <Input id="newOwnerEmail" type="email" placeholder="Ej: ana.perez@mail.com" className="col-span-3 bg-background" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newOwnerPhone" className="text-right">Teléfono Tutor</Label>
                            <Input id="newOwnerPhone" type="tel" placeholder="Ej: 1122334455" className="col-span-3 bg-background" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Guardar Paciente</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
                        <TableCell>{patient.name} ({patient.species})</TableCell>
                        <TableCell>{patient.owner}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        Acciones <ChevronDown className="ml-2 h-4 w-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewPatientDetail(patient)}>
                                        <FileText className="mr-2 h-4 w-4" /> Ver Historial Completo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem><Video className="mr-2 h-4 w-4" /> Iniciar Nueva Consulta</DropdownMenuItem>
                                    <DropdownMenuItem><CalendarDays className="mr-2 h-4 w-4" /> Agendar Próximo Turno</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Editar Datos del Paciente</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive hover:!bg-destructive/10 focus:!bg-destructive/10 focus:!text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar Paciente (Demo)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 <div className="mt-6 text-center">
                    <Button variant="outline">Ver Todos los Pacientes</Button>
                </div>
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
                        <MailCheck className="mr-2 h-5 w-5" />
                        Integración de Email y Campañas
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground mb-3">
                        Configura plantillas de correo para recordatorios de citas, seguimientos post-consulta o noticias de tu clínica. PetSync te ayudará a automatizar el envío a tus clientes registrados, **utilizando la información de contacto de tu base de datos de pacientes.**
                    </p>
                     <p className="text-sm text-muted-foreground mb-3">
                        <BarChart3 className="inline h-4 w-4 mr-1 text-primary"/>
                        Los usuarios con rol de marketing podrán diseñar y enviar campañas segmentadas a grupos de tutores (ej. recordatorios de vacunación antirrábica, promociones de alimentos) **(basado en los datos y etiquetas de tu base de pacientes, con conexión a tus listas de contactos existentes).**
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <Button variant="secondary">Configurar Plantillas</Button>
                        <Button variant="secondary">Gestionar Campañas</Button>
                        <Button variant="secondary">Ver Historial de Envíos</Button>
                        <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <PlusCircle className="mr-2 h-4 w-4"/> Diseñar Nueva Campaña de Email
                        </Button>
                    </div>
                </CardContent>
              </Card>

              <Card className="p-4 bg-secondary/50">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-lg text-foreground flex items-center">
                    <BellRing className="mr-2 h-5 w-5 text-primary" />
                    Recordatorios Automatizados a Clientes (App y Email)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground mb-2">
                    Envía recordatorios automáticos de citas y vacunas pendientes a los tutores a través de la app PetSync y/o por email, **disparados por los datos de salud y citas almacenados en la ficha de cada paciente.**
                  </p>
                   <p className="text-sm text-muted-foreground mb-3">
                        <ListChecks className="inline h-4 w-4 mr-1 text-primary"/>
                        Ejemplo: Si Thor fue vacunado hoy, el sistema puede programar automáticamente un recordatorio para su próxima vacuna en un año y notificar al tutor, **basándose en los datos almacenados de cada paciente y los protocolos de tu clínica.**
                    </p>
                  <form className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Switch id="global-reminders" defaultChecked />
                        <Label htmlFor="global-reminders" className="text-sm">Activar Recordatorios Globales (Demo)</Label>
                    </div>
                    <div>
                      <Label htmlFor="notificationType">Tipo de Notificación de Ejemplo</Label>
                      <Input id="notificationType" value="Recordatorio de Próxima Vacuna Anual para [Mascota]" readOnly className="bg-background" />
                    </div>
                    <div>
                      <Label htmlFor="notificationMessage">Mensaje de Ejemplo</Label>
                      <Input id="notificationMessage" value="¡Hola [Dueño]! Es hora de la próxima vacuna anual de [Mascota] el [Fecha]." readOnly className="bg-background" />
                    </div>
                    <Button disabled>Enviar Notificación de Prueba (Deshabilitado en Demo)</Button>
                  </form>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion">
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Configuración del Portal</CardTitle>
              <CardDescription>Administra los datos de tu clínica y preferencias del portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
              <div className="space-y-3 pt-4">
                <Label className="text-base font-medium">Preferencias Generales (Ejemplos):</Label>
                <div className="flex items-center space-x-3">
                    <Switch id="enable-portal" defaultChecked />
                    <Label htmlFor="enable-portal">Habilitar Portal de Tutores (Reservas Online)</Label>
                </div>
                 <div className="flex items-center space-x-3">
                    <Switch id="auto-email-reminders" defaultChecked />
                    <Label htmlFor="auto-email-reminders">Enviar Recordatorios Automáticos por Email</Label>
                </div>
                 <div className="flex items-center space-x-3">
                    <Switch id="auto-app-reminders" />
                    <Label htmlFor="auto-app-reminders">Enviar Recordatorios por App (Próximamente)</Label>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">Guardar Cambios (Demo)</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Plug className="mr-2 h-5 w-5 text-primary" />
                Conexiones e Integraciones (Futuro)
              </CardTitle>
              <CardDescription>Conecta PetSync con tus herramientas y plataformas existentes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Estamos trabajando para que PetSync se integre con tus herramientas favoritas. Próximamente: Conexión con [Software de Gestión Clínica Ejemplo], [Plataforma de Email Marketing Ejemplo], pasarelas de pago y más. **La información de tu clínica y pacientes se gestionará de forma segura para facilitar estas integraciones.**
              </p>
            </CardContent>
          </Card>
          
           <Card className="shadow-lg mb-6">
            <CardHeader>
                <CardTitle className="flex items-center"><LifeBuoy className="mr-3 h-6 w-6 text-primary"/> Gestión de Plan y Soporte</CardTitle>
                <CardDescription>
                Revisa el estado de tu plan actual, gestiona usuarios adicionales o contacta a nuestro equipo de soporte si necesitas ayuda.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-md">
                    <p className="text-sm text-foreground">Tu plan actual: <Badge variant="secondary">Plan PRO (Demo)</Badge></p>
                    <p className="text-sm text-muted-foreground mt-1">Usuarios activos: 3 de 5</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="w-full sm:w-auto">
                        <CreditCard className="mr-2 h-4 w-4"/> Ver Detalles del Plan / Actualizar
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <UserCog className="mr-2 h-4 w-4"/> Gestionar Usuarios
                    </Button>
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                        <Link href="#"> <Mail className="mr-2 h-4 w-4"/>Contactar Soporte</Link>
                    </Button>
                </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center text-primary"><DownloadCloud className="mr-3 h-6 w-6"/>Exportar Información de tu Clínica</CardTitle>
                <CardDescription>
                    Sabemos lo importante que es tu información. PetSync te ofrecerá opciones para exportar los datos de tus pacientes y tu actividad en la plataforma.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    Actualmente, para exportar tus datos (ej. en formato XLS, CSV), por favor, comunícate con nuestro equipo de soporte. Estaremos encantados de asistirte en el proceso y asegurar una transición de datos fluida si lo necesitas.
                </p>
                <Button variant="outline" className="w-full sm:w-auto text-primary border-primary hover:bg-primary/10">
                    <Mail className="mr-2 h-4 w-4"/>Contactar Soporte para Exportación
                </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedPatientForDetail && (
        <Dialog open={isPatientDetailOpen} onOpenChange={setIsPatientDetailOpen}>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[900px] h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center">
                {selectedPatientForDetail.species === "Perro" ? <Dog className="mr-2 h-7 w-7 text-primary" /> : selectedPatientForDetail.species === "Gato" ? <Cat className="mr-2 h-7 w-7 text-primary" /> : <Bird className="mr-2 h-7 w-7 text-primary" />}
                Ficha de Paciente: {selectedPatientForDetail.name}
              </DialogTitle>
              <DialogDescription>
                Historial médico completo y datos de {selectedPatientForDetail.name} ({selectedPatientForDetail.species} - {selectedPatientForDetail.breed}).
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-grow overflow-y-auto pr-2 space-y-6 py-4">
              <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Datos del Paciente</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="md:col-span-1 flex flex-col items-center">
                        <Avatar className="h-32 w-32 mb-2">
                            <AvatarImage src={selectedPatientForDetail.photoUrl} alt={selectedPatientForDetail.name} data-ai-hint={selectedPatientForDetail.photoHint} />
                            <AvatarFallback>{selectedPatientForDetail.name.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mt-1 text-xs"><ImageIcon className="mr-1 h-3 w-3"/> Cambiar Foto</Button>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div><strong>Especie:</strong> {selectedPatientForDetail.species}</div>
                        <div><strong>Raza:</strong> {selectedPatientForDetail.breed}</div>
                        <div><strong>Edad:</strong> {selectedPatientForDetail.age}</div>
                        <div><strong>Sexo:</strong> {selectedPatientForDetail.sex}</div>
                        <div><strong>Nº Chip:</strong> {selectedPatientForDetail.microchip || "No registrado"}</div>
                        <div><strong>Esterilizado/a:</strong> {selectedPatientForDetail.sterilized}</div>
                    </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Datos del Tutor</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Nombre:</strong> {selectedPatientForDetail.owner}</div>
                    <div><strong>Email:</strong> {selectedPatientForDetail.ownerEmail}</div>
                    <div><strong>Teléfono:</strong> {selectedPatientForDetail.ownerPhone}</div>
                </CardContent>
              </Card>

              <Tabs defaultValue="historial" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-4">
                  <TabsTrigger value="historial"><FileHeart className="mr-1 h-4 w-4"/> Historial Consultas</TabsTrigger>
                  <TabsTrigger value="vacunas"><Syringe className="mr-1 h-4 w-4"/>Vacunas/Desparasitación</TabsTrigger>
                  <TabsTrigger value="tratamientos"><Pill className="mr-1 h-4 w-4"/>Tratamientos</TabsTrigger>
                  <TabsTrigger value="condiciones"><ShieldAlert className="mr-1 h-4 w-4"/>Alergias/Crónicas</TabsTrigger>
                  <TabsTrigger value="documentos"><FileText className="mr-1 h-4 w-4"/>Documentos/Estudios</TabsTrigger>
                </TabsList>
                <TabsContent value="historial">
                  <Card>
                    <CardHeader><CardTitle className="text-md">Consultas Anteriores</CardTitle></CardHeader>
                    <CardContent>
                      {mockPatientMedicalHistory.consultations.length > 0 ? (
                        <Table>
                          <TableHeader><TableRow><TableHead>Fecha</TableHead><TableHead>Motivo</TableHead><TableHead>Veterinario</TableHead><TableHead>Notas</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {mockPatientMedicalHistory.consultations.map((c,i) => <TableRow key={i}><TableCell>{c.date}</TableCell><TableCell>{c.reason}</TableCell><TableCell>{c.vet}</TableCell><TableCell className="text-xs">{c.notes}</TableCell></TableRow>)}
                          </TableBody>
                        </Table>
                      ) : <p className="text-sm text-muted-foreground">No hay consultas registradas.</p>}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="vacunas">
                   <Card className="mb-4">
                    <CardHeader><CardTitle className="text-md">Vacunación</CardTitle></CardHeader>
                    <CardContent>
                      {mockPatientMedicalHistory.vaccines.length > 0 ? (
                        <Table>
                          <TableHeader><TableRow><TableHead>Fecha</TableHead><TableHead>Vacuna</TableHead><TableHead>Próxima Dosis</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {mockPatientMedicalHistory.vaccines.map((v,i) => <TableRow key={i}><TableCell>{v.date}</TableCell><TableCell>{v.vaccine}</TableCell><TableCell>{v.nextDueDate}</TableCell></TableRow>)}
                          </TableBody>
                        </Table>
                      ) : <p className="text-sm text-muted-foreground">No hay vacunas registradas.</p>}
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader><CardTitle className="text-md">Desparasitación</CardTitle></CardHeader>
                    <CardContent>
                      {mockPatientMedicalHistory.deworming.length > 0 ? (
                        <Table>
                          <TableHeader><TableRow><TableHead>Fecha</TableHead><TableHead>Producto</TableHead><TableHead>Interna</TableHead><TableHead>Externa</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {mockPatientMedicalHistory.deworming.map((d,i) => <TableRow key={i}><TableCell>{d.date}</TableCell><TableCell>{d.product}</TableCell><TableCell>{d.internal ? "Sí" : "No"}</TableCell><TableCell>{d.external ? "Sí" : "No"}</TableCell></TableRow>)}
                          </TableBody>
                        </Table>
                      ) : <p className="text-sm text-muted-foreground">No hay desparasitaciones registradas.</p>}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tratamientos">
                  <Card>
                    <CardHeader><CardTitle className="text-md">Tratamientos Actuales/Recientes</CardTitle></CardHeader>
                    <CardContent>
                       {mockPatientMedicalHistory.currentTreatments.length > 0 ? (
                        <Table>
                          <TableHeader><TableRow><TableHead>Medicamento</TableHead><TableHead>Dosis</TableHead><TableHead>Duración</TableHead><TableHead>Inicio</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {mockPatientMedicalHistory.currentTreatments.map((t,i) => <TableRow key={i}><TableCell>{t.drug}</TableCell><TableCell>{t.dosage}</TableCell><TableCell>{t.duration}</TableCell><TableCell>{t.startDate}</TableCell></TableRow>)}
                          </TableBody>
                        </Table>
                      ) : <p className="text-sm text-muted-foreground">No hay tratamientos activos registrados.</p>}
                    </CardContent>
                  </Card>
                </TabsContent>
                 <TabsContent value="condiciones">
                   <Card className="mb-4">
                    <CardHeader><CardTitle className="text-md">Alergias Conocidas</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm">{mockPatientMedicalHistory.allergies || "No hay alergias registradas."}</p>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader><CardTitle className="text-md">Condiciones Crónicas</CardTitle></CardHeader>
                    <CardContent>
                         <p className="text-sm">{mockPatientMedicalHistory.chronicConditions || "No hay condiciones crónicas registradas."}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="documentos">
                  <Card>
                    <CardHeader><CardTitle className="text-md">Estudios y Documentos Adjuntos</CardTitle></CardHeader>
                    <CardContent>
                      {mockPatientMedicalHistory.documents.length > 0 ? (
                        <ul className="space-y-2">
                        {mockPatientMedicalHistory.documents.map((doc,i) =>(
                            <li key={i} className="text-sm flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                                <span><FileText className="inline mr-2 h-4 w-4"/> {doc.name} ({doc.type}) - {doc.date}</span>
                                <Button variant="outline" size="sm" className="text-xs">Ver/Descargar</Button>
                            </li>
                        ))}
                        </ul>
                      ) : <p className="text-sm text-muted-foreground">No hay documentos adjuntos.</p>}
                      <Button variant="secondary" className="mt-4"><PlusCircle className="mr-2 h-4 w-4"/>Cargar Nuevo Documento</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="mt-auto pt-4 border-t">
              <Button variant="outline" onClick={() => setIsPatientDetailOpen(false)}>Cerrar Ficha</Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground"><Edit3 className="mr-2 h-4 w-4"/> Editar Ficha (Demo)</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
    </TooltipProvider>
  );
}
