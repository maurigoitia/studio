
import { z } from 'zod';

export const WaitlistFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  userType: z.enum(["tutor", "veterinario"], { required_error: "Por favor, selecciona si eres tutor o veterinario." }),
});
export type WaitlistFormValues = z.infer<typeof WaitlistFormSchema>;


export const GenericQueryFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  petName: z.string().min(2, { message: "El nombre de la mascota debe tener al menos 2 caracteres." }).max(50, { message: "El nombre de la mascota no puede exceder los 50 caracteres." }).optional(),
  species: z.string().min(3, { message: "La especie debe tener al menos 3 caracteres." }).max(50, { message: "La especie no puede exceder los 50 caracteres." }).describe("Especie de la mascota (ej: Perro, Gato)"),
  question: z.string().min(5, { message: "La pregunta debe tener al menos 5 caracteres." }).max(1000, { message: "La pregunta no puede exceder los 1000 caracteres." }),
});
export type GenericQueryFormValues = z.infer<typeof GenericQueryFormSchema>;


export const SignUpFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;


export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(1, { message: "Por favor, introduce tu contraseña." }), // Min 1 for password as it's just for login
});
export type SignInFormValues = z.infer<typeof SignInFormSchema>;
