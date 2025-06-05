
"use server";

import { WaitlistFormSchema, GenericQueryFormSchema, SignUpFormSchema, SignInFormSchema, NewPetFormSchema, WaitlistSubscriptionSchema } from "@/lib/schemas";
import type { WaitlistFormValues, GenericQueryFormValues, SignInFormValues, SignUpFormValues, NewPetFormValues, WaitlistSubscriptionValues } from "@/lib/schemas";
import { genericQuery } from "@/ai/flows/generic-query-flow";
import type { GenericQueryInput, GenericQueryOutput } from "@/ai/flows/generic-query-flow";
import { firestore } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface WaitlistResponse {
  success: boolean;
  message: string;
}

export async function subscribeToWaitlistAction(data: WaitlistSubscriptionValues | WaitlistFormValues ): Promise<WaitlistResponse> {
  const schemaToUse = 'userType' in data ? WaitlistFormSchema : WaitlistSubscriptionSchema;
  const validatedFields = schemaToUse.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Datos inválidos. Por favor, revisa el formulario.",
    };
  }

  const { email } = validatedFields.data;
  const userType = 'userType' in validatedFields.data ? validatedFields.data.userType : 'tutor (via GIA)';

  console.log(`[subscribeToWaitlistAction] Waitlist subscription: Email - ${email}, User Type - ${userType}`);
  
  try {
    if (firestore) {
      await addDoc(collection(firestore, "waitlistSubscribers"), {
        email: email,
        userType: userType,
        subscribedAt: serverTimestamp(),
        source: 'userType' in data ? 'waitlist_form_landing' : 'gia_chat_widget'
      });
      console.log("[subscribeToWaitlistAction] Waitlist subscriber added to Firestore.");
    } else {
      console.warn("[subscribeToWaitlistAction] Firestore is not configured. Skipping waitlist save to Firestore.");
    }
  } catch (logError: any) {
    console.error("[subscribeToWaitlistAction] Error saving waitlist subscriber to Firestore:", logError.message, logError.stack);
    return {
      success: false,
      message: "Hubo un problema al registrar tu correo. Inténtalo más tarde o usa el formulario principal.",
    };
  }

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
  console.log("[askGenericQuestionAction] Received data:", JSON.stringify(data, null, 2));
  const validatedFields = GenericQueryFormSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    console.error("[askGenericQuestionAction] Validation error:", errorMessages, "Data:", JSON.stringify(data, null, 2));
    return {
      success: false,
      message: `Datos inválidos: ${errorMessages}. Por favor, revisa el formulario.`,
    };
  }
  
  const { userName, email, petName, species, question } = validatedFields.data;

  try {
    const input: GenericQueryInput = { userName, email, petName, species, question };
    console.log("[askGenericQuestionAction] Calling genericQuery with input:", JSON.stringify(input, null, 2));
    const result = await genericQuery(input);
    console.log("[askGenericQuestionAction] Received result from genericQuery:", JSON.stringify(result, null, 2));

    if (!result || typeof result.answer !== 'string' || result.answer.trim() === '') {
        console.error("[askGenericQuestionAction] Invalid or empty answer from GIA. Input:", JSON.stringify(input, null, 2), "Result:", JSON.stringify(result, null, 2));
        return { success: false, message: "GIA no pudo generar una respuesta formateada correctamente en este momento (cod: ACTION_NO_ANSWER). Inténtalo de nuevo más tarde." };
    }

    // Log conversation to Firestore (do not block response if logging fails)
    try {
      if (firestore) {
        await addDoc(collection(firestore, "giaConversationLogs"), {
          userId: email || 'anonymous_user_chat', 
          userName: userName || null,
          petName: petName || null,
          species: species || null,
          question: question,
          answer: result.answer,
          timestamp: serverTimestamp(),
          flow: 'genericQueryFlowGIA'
        });
        console.log("[askGenericQuestionAction] GIA conversation logged to Firestore.");
      } else {
        console.warn("[askGenericQuestionAction] Firestore is not configured. Skipping conversation log for GIA.");
      }
    } catch (logError: any) {
      console.error("[askGenericQuestionAction] Error logging GIA conversation to Firestore:", logError.message, logError.stack);
    }

    return { success: true, data: result };
  } catch (error: any) {
    console.error("[askGenericQuestionAction] CATCH_BLOCK_ERROR: Error calling genericQuery. Error:", error, "Error message:", error?.message, "Error stack:", error?.stack, "Input data:", JSON.stringify(data, null, 2));
    return { success: false, message: "Hubo un error al procesar tu pregunta (cod: ACTION_CATCH_ERR). Inténtalo de nuevo." };
  }
}


interface NewPetResponse {
  success: boolean;
  message: string;
  petId?: string;
}

export async function registerNewPetAction(data: NewPetFormValues): Promise<NewPetResponse> {
  const validatedFields = NewPetFormSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return {
      success: false,
      message: `Datos inválidos: ${errorMessages}. Por favor, revisa el formulario.`,
    };
  }

  console.log("[registerNewPetAction] Simulating saving new pet profile to Firestore:", validatedFields.data);
  
  await new Promise(resolve => setTimeout(resolve, 1000));


  return {
    success: true,
    message: "¡Perfil de mascota registrado con éxito! (Simulación)",
    petId: "simulated_pet_id_" + Date.now() 
  };
}
