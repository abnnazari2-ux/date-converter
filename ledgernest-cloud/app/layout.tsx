import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LedgerNest Cloud",
  description: "Premium cloud accounting SaaS"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
