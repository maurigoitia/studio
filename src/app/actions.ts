
"use server";

import { WaitlistFormSchema, GenericQueryFormSchema, SignUpFormSchema, SignInFormSchema, NewPetFormSchema } from "@/lib/schemas";
import type { WaitlistFormValues, GenericQueryFormValues, SignInFormValues, SignUpFormValues, NewPetFormValues } from "@/lib/schemas";
import { genericQuery } from "@/ai/flows/generic-query-flow";
import type { GenericQueryInput, GenericQueryOutput } from "@/ai/flows/generic-query-flow";
import { firestore } from '@/lib/firebase/config'; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions

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
    const errorMessages = validatedFields.error.errors.map(e => `$\{e.path.join('.')\}: $\{e.message}`).join(', ');
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
          userId: email || 'anonymous_user', // Use email as userId or a placeholder
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
      // Continue without blocking the user's response
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
    const errorMessages = validatedFields.error.errors.map(e => `$\{e.path.join('.')\}: $\{e.message}`).join(', ');
    return {
      success: false,
      message: `Datos inválidos: ${errorMessages}. Por favor, revisa el formulario.`,
    };
  }

  // Simulate saving to Firestore
  console.log("Simulating saving new pet profile to Firestore:", validatedFields.data);
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real scenario, you would save to Firestore here:
  // if (!firestore) {
  //   return { success: false, message: "Error de configuración: Firestore no disponible." };
  // }
  // try {
  //   const petRef = await addDoc(collection(firestore, "petProfiles"), {
  //     ...validatedFields.data,
  //     createdAt: serverTimestamp(),
  //     // clinicId: someClinicId, // You'd associate this with the logged-in clinic
  //   });
  //   return { success: true, message: "¡Perfil de mascota registrado con éxito!", petId: petRef.id };
  // } catch (error) {
  //   console.error("Error registering new pet:", error);
  //   return { success: false, message: "No se pudo registrar el perfil de la mascota." };
  // }

  return {
    success: true,
    message: "¡Perfil de mascota registrado con éxito! (Simulación)",
    petId: "simulated_pet_id_" + Date.now() 
  };
}

// Note: SignUp and SignIn actions are handled by Firebase client-side SDK in AuthContext
// No specific server actions are needed here for them unless you have additional server-side logic
// to perform post-authentication, which is not the case for this basic setup.
// For example, creating a user profile in a separate database after Firebase signup.
