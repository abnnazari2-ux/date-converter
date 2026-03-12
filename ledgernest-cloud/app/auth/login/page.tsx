import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  async function signIn(formData: FormData) {
    "use server";
    const ok = await login(String(formData.get("email")), String(formData.get("password")));
    if (ok) redirect("/app/dashboard");
  }
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form action={signIn} className="card w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <input name="email" defaultValue="admin@ledgernest.cloud" className="w-full rounded border p-2" />
        <input name="password" defaultValue="demo-admin-123" type="password" className="w-full rounded border p-2" />
        <button className="w-full rounded bg-navy p-2 text-white">Sign in</button>
      </form>
    </main>
  );
}
