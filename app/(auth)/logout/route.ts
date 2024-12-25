import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });

  const url = new URL(req.url);
  url.pathname = "/login";

  return NextResponse.redirect(url);
};
