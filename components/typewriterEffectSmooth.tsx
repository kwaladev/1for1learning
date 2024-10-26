"use client";

import { TextGenerateEffect } from "@/components/ui/typewriter-effect";

export function TypewriterEffectSmooths({ text }: { text: string }) {
  const words = text.split(' ').map((word, index) => ({
    text: word,
    className: index === text.split(' ').length - 1 ? "text-blue-500" : undefined,
  }));
  return (
    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      <TextGenerateEffect words={words} />
    </p>
  );
}
