import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const UnauthenticatedPaths = ["/api", "/login", "/signup", "/logout", "/error"];

export const middleware = async (request: NextRequest) => {
  const authRequired = !UnauthenticatedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  return await updateSession(request, authRequired);
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
