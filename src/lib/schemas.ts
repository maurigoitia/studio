
import { z } from 'zod';

export const WaitlistFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  userType: z.enum(["tutor", "veterinario"], { required_error: "Por favor, selecciona si eres tutor o veterinario." }),
});
export type WaitlistFormValues = z.infer<typeof WaitlistFormSchema>;

// Schema para el chatbot GIA simplificado
export const GenericQueryFormSchema = z.object({
  question: z.string().min(1, { message: "La pregunta no puede estar vacía." }).max(1000, { message: "La pregunta no puede exceder los 1000 caracteres." }).describe('The question to ask GIA.'),
  userName: z.string().optional().describe("The optional name of the user asking the question."),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }).optional().describe('The optional email of the user asking the question.'),
  petName: z.string().min(1).max(50).optional().describe("The optional name of the user's pet."),
  species: z.string().min(1).max(50).optional().describe("Optional species of the pet (e.g., Dog, Cat)"),
});
export type GenericQueryFormValues = z.infer<typeof GenericQueryFormSchema>;

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(1, { message: "Por favor, introduce tu contraseña." }),
});
export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export const NewPetFormSchema = z.object({
  petName: z.string().min(2, { message: "El nombre de la mascota debe tener al menos 2 caracteres." }).max(50),
  species: z.string().min(3, { message: "La especie debe tener al menos 3 caracteres." }).max(50),
  breed: z.string().max(50).optional(),
  birthDate: z.string().optional().describe("YYYY-MM-DD"),
  ownerName: z.string().min(2, { message: "El nombre del tutor debe tener al menos 2 caracteres." }).max(100),
  ownerEmail: z.string().email({ message: "Por favor, introduce un correo electrónico válido para el tutor." }),
  ownerPhone: z.string().min(7, { message: "El teléfono debe tener al menos 7 dígitos." }).max(20).optional(),
});
export type NewPetFormValues = z.infer<typeof NewPetFormSchema>;

// Schema para suscripción a waitlist desde GIA (simplificado)
export const WaitlistSubscriptionSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  // userType es opcional y se puede omitir si el origen es GIA, o poner un default
  userType: z.literal('tutor (via GIA)').default('tutor (via GIA)'),
});
export type WaitlistSubscriptionValues = z.infer<typeof WaitlistSubscriptionSchema>;
