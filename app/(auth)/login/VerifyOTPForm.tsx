"use client";

import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { OTPInput, SlotProps } from "input-otp";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { verifyOTP } from "./actions";
import { VerifyOTPInput } from "./schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-14 h-20 md:w-20 md:h-28 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-4 outline-accent-foreground": props.isActive }
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

export const VerifyOTPForm = ({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: SubmitHandler<VerifyOTPInput>;
  onCancel: () => void;
}) => {
  const [error, setError] = useState("");

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 md:space-y-8 px-10">
      <h1 className="text-2xl md:text-3xl font-bold">
        Check your email for a code
      </h1>
      <p className="text-center">
        We’ve sent a 6-character code to{" "}
        <span className="font-bold">{email}</span>.
        <br />
        The code expires shortly, so please enter it soon.
      </p>
      <div className="space-y-4 py-6 md:py-10">
        <OTPInput
          autoFocus
          maxLength={6}
          containerClassName="group flex items-center has-[:disabled]:opacity-30"
          onChange={() => setError("")}
          onComplete={async (token) => {
            const { errors, ...data } = await verifyOTP({ email, token });
            if (errors) setError(errors.root.message);

            onSuccess(data as VerifyOTPInput);
          }}
          render={({ slots }) => (
            <>
              <div className="flex">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <div className="flex w-10 justify-center items-center">
                <div className="w-3 h-1 rounded-full bg-border bg-slate-50" />
              </div>

              <div className="flex">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
        <div className="text-red-500 text-center">{error}</div>
      </div>

      <div>
        <span>Can’t find your code? Check your spam folder!</span>
      </div>
    </div>
  );
};
