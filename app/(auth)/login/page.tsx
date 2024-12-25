import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "./form";

const LoginPage = async () => {
  const supabase = await createClient();
  const user = await supabase.auth
    .getSession()
    .then(({ data }) => data.session?.user ?? null);

  if (user) return redirect("/");

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
