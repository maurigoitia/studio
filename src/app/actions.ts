"use server";

import { medicalHistoryAssistant } from "@/ai/flows/medical-history-assistant";
import type { MedicalHistoryAssistantInput, MedicalHistoryAssistantOutput } from "@/ai/flows/medical-history-assistant";
import { WaitlistFormSchema, MedicalAssistantFormSchema } from "@/lib/schemas";
import type { WaitlistFormValues, MedicalAssistantFormValues } from "@/lib/schemas";

interface WaitlistResponse {
  success: boolean;
  message: string;
}

export async function subscribeToWaitlistAction(data: WaitlistFormValues): Promise<WaitlistResponse> {
  const validatedFields = WaitlistFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Datos inválidos. Por favor, revisa el formulario.",
    };
  }

  const { email, userType } = validatedFields.data;

  // Simulate saving to a database or mailing list
  console.log(`Waitlist subscription: Email - ${email}, User Type - ${userType}`);
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "¡Gracias por registrarte! Te mantendremos informado.",
  };
}

interface MedicalAdviceResponse {
  success: boolean;
  message?: string;
  data?: MedicalHistoryAssistantOutput;
}

export async function getMedicalAdviceAction(data: MedicalAssistantFormValues): Promise<MedicalAdviceResponse> {
  const validatedFields = MedicalAssistantFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Datos inválidos. Por favor, revisa el formulario.",
    };
  }
  
  const { medicalHistory, question } = validatedFields.data;

  try {
    const input: MedicalHistoryAssistantInput = { medicalHistory, question };
    const result = await medicalHistoryAssistant(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting medical advice:", error);
    return { success: false, message: "Hubo un error al procesar tu solicitud. Inténtalo de nuevo." };
  }
}
