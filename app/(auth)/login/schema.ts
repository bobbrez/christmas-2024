import { z } from "zod";

export const RequestOTPSchema = z.object({
  email: z.string().email(),
});

export type RequestOTPInput = z.infer<typeof RequestOTPSchema>;

export const VerifyOTPInputSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

export type VerifyOTPInput = z.infer<typeof VerifyOTPInputSchema>;
