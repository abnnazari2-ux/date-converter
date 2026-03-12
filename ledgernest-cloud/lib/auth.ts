import { cookies } from "next/headers";

export const DEMO_CREDENTIALS = { email: "admin@ledgernest.cloud", password: "demo-admin-123" };

export async function login(email: string, password: string) {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    cookies().set("ledgernest_session", "demo-company:COMPANY_ADMIN", { httpOnly: true, sameSite: "lax" });
    return true;
  }
  return false;
}

export function logout() {
  cookies().delete("ledgernest_session");
}

export function getSession() {
  const raw = cookies().get("ledgernest_session")?.value;
  if (!raw) return null;
  const [companyId, role] = raw.split(":");
  return { companyId, role };
}
