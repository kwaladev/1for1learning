"use client";

import React from "react";

import { WobbleCard } from "@/components/ui/wobble-card";

export function WobbleCardShow({ dict }: { dict: any }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-3">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-balance text-left text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
            {dict.marketing.wobble_card_title}
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            {dict.marketing.wobble_card_description}
          </p>
        </div>
        <img
          src="/images/cap_2.png"
          width={500}
          height={500}
          alt="linear demo"
          className="absolute -bottom-10 -right-4 rounded-2xl object-contain lg:-right-[40%]"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-balance text-left text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
          {dict.marketing.wobble_card_title_2}
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          {dict.marketing.wobble_card_description_2}
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm text-balance  text-left text-base font-semibold tracking-[-0.015em] text-white md:max-w-lg md:text-xl lg:text-3xl">
            {dict.marketing.wobble_card_title_3}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            {dict.marketing.wobble_card_description_3}
          </p>
        </div>
        <img
          src="/images/cap_3.png"
          width={500}
          height={500}
          alt="linear demo"
          className="absolute -bottom-10 -right-10 rounded-2xl object-contain md:-right-[40%] lg:-right-[20%]"
        />
      </WobbleCard>
    </div>
  );
}
