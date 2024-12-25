"use client";

import { Button } from "@/components/ui/button";
import { ErrorMessage, Field } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { ArrowRightCircleIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { requestOTP } from "./actions";
import { RequestOTPInput, RequestOTPSchema } from "./schema";

export const RequestOTPForm = ({
  onSuccess,
}: {
  onSuccess: SubmitHandler<RequestOTPInput>;
}) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RequestOTPInput>({
    defaultValues: { email: "" },
    resolver: zodResolver(RequestOTPSchema, { async: true }),
  });

  const onSubmit: SubmitHandler<RequestOTPInput> = async (data) => {
    const { errors } = await requestOTP(data);
    if (!errors) return onSuccess(data);

    Object.entries(errors).map(([errField, errObj]) =>
      setError(errField as keyof RequestOTPInput & { root: string }, errObj)
    );
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-200">
          Sign into Christmas 2024
        </h2>
        <Field>
          {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        </Field>

        <Field>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@email.com"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Field>

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          color="indigo"
          className="flex w-full justify-center"
        >
          Sign in with Email <ArrowRightCircleIcon />
        </Button>
        <div className="flex rounded-md bg-gray-900 p-4 text-sm text-gray-500">
          <SparklesIcon className="mr-2 h-5 w-5" />
          <p>We’ll email you a magic code for a password-free sign in.</p>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Need an account?{" "}
        <Button plain href="/signup">
          Request access
        </Button>
      </p>
    </div>
  );
};
