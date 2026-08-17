import { z } from "zod";

export const contactSchema = z.object({
  senderName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  email: z.string().email("Invalid email address format"),
  message: z
    .string()
    .min(10, "Tell me a bit more about what is broken (at least 10 chars)")
    .max(1000, "Message max 1000 chars"),
});

export type ContactInput = z.infer<typeof contactSchema>;
