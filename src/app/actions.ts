
"use server";

import { WaitlistFormSchema, GenericQueryFormSchema } from "@/lib/schemas";
import type { WaitlistFormValues, GenericQueryFormValues } from "@/lib/schemas";
import { genericQuery } from "@/ai/flows/generic-query-flow";
import type { GenericQueryInput, GenericQueryOutput } from "@/ai/flows/generic-query-flow";


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

interface GenericQueryResponse {
  success: boolean;
  message?: string;
  data?: GenericQueryOutput;
}

export async function askGenericQuestionAction(data: GenericQueryFormValues): Promise<GenericQueryResponse> {
  const validatedFields = GenericQueryFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Datos inválidos. Por favor, revisa el formulario.",
    };
  }
  
  const { email, petName, species, question } = validatedFields.data;

  try {
    const input: GenericQueryInput = { email, petName, species, question };
    const result = await genericQuery(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error asking generic question:", error);
    return { success: false, message: "Hubo un error al procesar tu pregunta. Inténtalo de nuevo." };
  }
}
