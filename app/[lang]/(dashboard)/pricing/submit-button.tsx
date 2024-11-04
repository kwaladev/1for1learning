"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-white text-black hover:bg-gray-100"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          Get Started
          <ArrowRight className="ml-2 size-4" />
        </>
      )}
    </Button>
  );
}
