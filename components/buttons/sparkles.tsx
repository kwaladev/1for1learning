"use client";

import type { animate } from "framer-motion";
import { stagger, useAnimate } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type AnimationSequence = Parameters<typeof animate>[0];

const SparklesButton = ({ text = "Click me" }: { text: string }) => {
  const [starCount, setStarCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setStarCount(randomNumberGenerator(2, 50));
    }, 1000);
  }, [starCount]);

  const randomNumberGenerator = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  const [scope, animate] = useAnimate();
  const letters = text.split("");

  const handleBtnClick = () => {
    const sparkles = Array.from({ length: starCount });

    const sparkleAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.stars-${index}`,
      {
        x: randomNumberGenerator(-100, 100),
        y: randomNumberGenerator(-100, 100),
        scale: randomNumberGenerator(1, 0.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);
    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.stars-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);
    const sparkleReset: AnimationSequence = sparkles.map((_, index) => [
      `.stars-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.00000000001,
        at: "<",
      },
    ]);

    animate([
      ...(sparkleReset as any[]),
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...(sparkleAnimation as any[]),
      [".letter", { y: 0 }, { duration: 0.00000000001 }],
      ...(sparklesFadeOut as any[]),
    ]);
  };
  return (
    <div className="center h-full">
      <div ref={scope}>
        <button
          type="button"
          onClick={handleBtnClick}
          className="relative rounded-full border-2 border-border px-10 py-1.5 text-2xl transition-colors  duration-150"
        >
          <span className="sr-only">{text}</span>
          <span
            className="flex h-8 items-center justify-center overflow-hidden"
            aria-hidden
          >
            {letters.map((letter, index) => (
              <span
                data-letter={letter}
                className="letter relative inline-block h-8 text-base leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]"
                key={index}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="pointer-events-none absolute inset-0 -z-10 block">
            {Array.from({ length: starCount }).map((_, index) => (
              <Star
                className={`stars- absolute left-1/2 top-1/2 size-4 opacity-0${index}`}
                fill="blue"
                key={index}
              />
            ))}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SparklesButton;
