import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const session = getSession();
  if (!session) redirect("/auth/login");
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
}
