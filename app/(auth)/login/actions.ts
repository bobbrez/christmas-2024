"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import {
  RequestOTPInput,
  RequestOTPSchema,
  VerifyOTPInput,
  VerifyOTPInputSchema,
} from "./schema";

export const requestOTP = async (
  inputs: RequestOTPInput
): Promise<{ errors?: { root: { message: string } }; user?: User }> => {
  const { email } = RequestOTPSchema.parse(inputs);
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) return { errors: { root: { message: error.message } } };

  return {};
};

export const verifyOTP = async (
  inputs: VerifyOTPInput
): Promise<{ errors?: { root: { message: string } }; user?: User }> => {
  const { email, token } = VerifyOTPInputSchema.parse(inputs);
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) return { errors: { root: { message: error.message } } };

  revalidatePath("/", "layout");

  return {};
};
