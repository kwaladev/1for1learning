"use client";

import { BaggageClaim, Home, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signOut } from "@/app/[lang]/(login)/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/lib/auth";

function Header({ lang }: { lang: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push("/");
  }

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}`}
          className="hidden items-center space-x-2 md:flex"
        >
          <div>
            <Image
              src="/images/avatars/koala.svg"
              width="36"
              height="36"
              alt=""
            />
          </div>
          <div className="text-2xl font-semibold">1 For 1</div>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/pricing"
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <BaggageClaim className="mr-2 size-4" />
            Packs
          </Link>
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-9 cursor-pointer">
                  <AvatarImage alt={user.name || ""} />
                  <AvatarFallback>
                    {user.email
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 size-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form className="w-full">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="w-full flex-1 cursor-pointer"
                    >
                      <LogOut className="mr-2 size-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-gray-800">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <section className="flex min-h-screen flex-col">
      <Header lang={lang} />
      {children}
    </section>
  );
}
