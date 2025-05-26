
"use server";

import { WaitlistFormSchema, GenericQueryFormSchema, SignInFormSchema, SignUpFormSchema } from "@/lib/schemas";
import type { WaitlistFormValues, GenericQueryFormValues, SignInFormValues, SignUpFormValues } from "@/lib/schemas";
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
    // Construct a more detailed error message from Zod errors
    const errorMessages = validatedFields.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return {
      success: false,
      message: `Datos inválidos: ${errorMessages}. Por favor, revisa el formulario.`,
    };
  }
  
  const { email, petName, species, petAge, question } = validatedFields.data;

  try {
    const input: GenericQueryInput = { email, petName, species, petAge, question };
    const result = await genericQuery(input);
    if (!result || !result.answer) {
        console.error("No answer received from GIA for input:", input);
        return { success: false, message: "GIA no pudo generar una respuesta en este momento. Inténtalo de nuevo más tarde." };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error("Error asking generic question:", error);
    return { success: false, message: "Hubo un error al procesar tu pregunta. Inténtalo de nuevo." };
  }
}

// Note: SignUp and SignIn actions are handled by Firebase client-side SDK in AuthContext
// No specific server actions are needed here for them unless you have additional server-side logic
// to perform post-authentication, which is not the case for this basic setup.
// For example, creating a user profile in a separate database after Firebase signup.
