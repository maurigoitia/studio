"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { WaitlistFormSchema, type WaitlistFormValues } from "@/lib/schemas";
import { subscribeToWaitlistAction } from "@/app/actions";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showConfetti, setShowConfetti] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(WaitlistFormSchema),
    defaultValues: {
      email: "",
      userType: undefined,
    },
  });

  async function onSubmit(data: WaitlistFormValues) {
    startTransition(async () => {
      const response = await subscribeToWaitlistAction(data);
      if (response.success) {
        toast({
          title: "¡Éxito!",
          description: response.message,
        });
        form.reset();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Confetti effect for 3 seconds
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-xl relative overflow-hidden">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-accent rounded-full animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  animationDuration: `${Math.random() * 2 + 3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.5 + 0.5,
                }}
              />
            ))}
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left block text-foreground">Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="tu@correo.com" {...field} className="bg-background"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-left block text-foreground">Soy un...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="tutor" />
                    </FormControl>
                    <FormLabel className="font-normal text-foreground">
                      Tutor de Mascota
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="veterinario" />
                    </FormControl>
                    <FormLabel className="font-normal text-foreground">
                      Veterinario
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Unirme a la lista
        </Button>
      </form>
      <style jsx>{`
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          top: -20px;
        }
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </Form>
  );
}
