import { z } from 'zod';

export const WaitlistFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  userType: z.enum(["tutor", "veterinario"], { required_error: "Por favor, selecciona si eres tutor o veterinario." }),
});

export type WaitlistFormValues = z.infer<typeof WaitlistFormSchema>;

export const MedicalAssistantFormSchema = z.object({
  medicalHistory: z.string().min(50, { message: "El historial médico debe tener al menos 50 caracteres." }).max(5000, { message: "El historial médico no puede exceder los 5000 caracteres." }),
  question: z.string().min(10, { message: "La pregunta debe tener al menos 10 caracteres." }).max(500, { message: "La pregunta no puede exceder los 500 caracteres." }),
});

export type MedicalAssistantFormValues = z.infer<typeof MedicalAssistantFormSchema>;

export const GenericQueryFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  petName: z.string().min(2, { message: "El nombre de la mascota debe tener al menos 2 caracteres." }).max(50, { message: "El nombre de la mascota no puede exceder los 50 caracteres." }).optional(),
  species: z.string().min(3, { message: "La especie debe tener al menos 3 caracteres." }).max(50, { message: "La especie no puede exceder los 50 caracteres." }).describe("Especie de la mascota (ej: Perro, Gato)"),
  question: z.string().min(5, { message: "La pregunta debe tener al menos 5 caracteres." }).max(1000, { message: "La pregunta no puede exceder los 1000 caracteres." }),
});

export type GenericQueryFormValues = z.infer<typeof GenericQueryFormSchema>;
