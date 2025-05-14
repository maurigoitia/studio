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
