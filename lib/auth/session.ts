export const SESSION_COOKIE = "prodpilot_session";

export function isProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/copilot") ||
    pathname.startsWith("/prd") ||
    pathname.startsWith("/analytics") ||
    pathname.startsWith("/onboarding")
  );
}

export function isAuthPath(pathname: string): boolean {
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/onboarding")
  );
}
