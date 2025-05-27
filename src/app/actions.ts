
"use server";

import { WaitlistFormSchema, GenericQueryFormSchema, SignUpFormSchema, SignInFormSchema, NewPetFormSchema, WaitlistSubscriptionSchema } from "@/lib/schemas";
import type { WaitlistFormValues, GenericQueryFormValues, SignInFormValues, SignUpFormValues, NewPetFormValues, WaitlistSubscriptionValues } from "@/lib/schemas";
import { genericQuery } from "@/ai/flows/generic-query-flow";
import type { GenericQueryInput, GenericQueryOutput } from "@/ai/flows/generic-query-flow";
import { firestore } from '@/lib/firebase/config'; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

interface WaitlistResponse {
  success: boolean;
  message: string;
}

export async function subscribeToWaitlistAction(data: WaitlistSubscriptionValues | WaitlistFormValues ): Promise<WaitlistResponse> {
  // We check which schema to use based on the presence of userType,
  // as WaitlistSubscriptionSchema (from GIA chat) doesn't have it.
  const schemaToUse = 'userType' in data ? WaitlistFormSchema : WaitlistSubscriptionSchema;
  const validatedFields = schemaToUse.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Datos inválidos. Por favor, revisa el formulario.",
    };
  }

  const { email } = validatedFields.data;
  // userType is only present in WaitlistFormValues from the main waitlist form
  const userType = 'userType' in validatedFields.data ? validatedFields.data.userType : 'tutor (via GIA)';


  console.log(`Waitlist subscription: Email - ${email}, User Type - ${userType}`);
  
  // Simulate saving to Firestore for now
  try {
    if (firestore) {
      await addDoc(collection(firestore, "waitlistSubscribers"), {
        email: email,
        userType: userType,
        subscribedAt: serverTimestamp(),
        source: 'userType' in data ? 'waitlist_form_landing' : 'gia_chat_widget'
      });
      console.log("Waitlist subscriber added to Firestore.");
    } else {
      console.warn("Firestore is not configured. Skipping waitlist save to Firestore.");
    }
  } catch (logError) {
    console.error("Error saving waitlist subscriber to Firestore:", logError);
    // Continue without blocking the user's response, but inform them of potential issue
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
  const validatedFields = GenericQueryFormSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    console.error("Validation error in askGenericQuestionAction:", errorMessages, "Data:", data);
    return {
      success: false,
      message: `Datos inválidos: ${errorMessages}. Por favor, revisa el formulario.`,
    };
  }
  
  const { userName, email, petName, species, question } = validatedFields.data;

  try {
    const input: GenericQueryInput = { userName, email, petName, species, question };
    const result = await genericQuery(input);

    if (!result || !result.answer) {
        console.error("No answer received from GIA for input:", input);
        return { success: false, message: "GIA no pudo generar una respuesta en este momento. Inténtalo de nuevo más tarde." };
    }

    // Log conversation to Firestore (do not block response if logging fails)
    try {
      if (firestore) {
        await addDoc(collection(firestore, "giaConversationLogs"), {
          userId: email || 'anonymous_user', 
          userName: userName || null,
          petName: petName || null,
          species: species,
          question: question,
          answer: result.answer,
          timestamp: serverTimestamp(),
          flow: 'genericQueryFlowGIA'
        });
        console.log("GIA conversation logged to Firestore.");
      } else {
        console.warn("Firestore is not configured. Skipping conversation log for GIA.");
      }
    } catch (logError) {
      console.error("Error logging GIA conversation to Firestore:", logError);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Error asking generic question:", error);
    return { success: false, message: "Hubo un error al procesar tu pregunta. Inténtalo de nuevo." };
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

  console.log("Simulating saving new pet profile to Firestore:", validatedFields.data);
  
  await new Promise(resolve => setTimeout(resolve, 1000));


  return {
    success: true,
    message: "¡Perfil de mascota registrado con éxito! (Simulación)",
    petId: "simulated_pet_id_" + Date.now() 
  };
}
