"use client";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { RequestOTPInput, VerifyOTPInput } from "./schema";
import { RequestOTPForm } from "./RequestOTPForm";
import { VerifyOTPForm } from "./VerifyOTPForm";

export const LoginForm = () => {
  const [email, setEmail] = useState("");

  const onRequestSuccess: SubmitHandler<RequestOTPInput> = async ({ email }) =>
    setEmail(email);

  const onVerifySuccess: SubmitHandler<VerifyOTPInput> = async (data) => {
    console.log("Success", data);
  };

  return (
    <div className="space-y-6">
      {email ? (
        <VerifyOTPForm
          email={email}
          onSuccess={onVerifySuccess}
          onCancel={() => setEmail("")}
        />
      ) : (
        <RequestOTPForm onSuccess={onRequestSuccess} />
      )}
    </div>
  );
};
