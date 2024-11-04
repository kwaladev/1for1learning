import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { UserProvider } from "@/lib/auth";
import { getUser } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Next.js SaaS Starter",
  description: "Get started quickly with Next.js, Postgres, and Stripe.",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white text-black dark:bg-gray-950 dark:text-white ${manrope.className}`}
    >
      <body className="min-h-dvh bg-gray-50">
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  );
}
