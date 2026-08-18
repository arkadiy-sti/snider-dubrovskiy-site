import { z } from "zod";

export const registrationSchema = z.object({
  parentName: z.string().min(2, "Please enter a name."),
  athleteAge: z
    .string()
    .min(1, "Please enter the athlete's age.")
    .refine((v) => Number(v) > 0 && Number(v) < 100, "Enter a valid age."),
  skatingLevel: z.string().min(1, "Please select a skating level."),
  yearsExperience: z.string().min(1, "Please select years of experience."),
  currentCoach: z.string().optional(),
  trainingGoals: z.string().min(5, "Tell us a bit about the athlete's goals."),
  preferredDays: z.array(z.string()).min(1, "Select at least one preferred day."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[0-9+()\-\s]+$/, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().optional(),
  privateAssessment: z.boolean().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
