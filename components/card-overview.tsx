"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import image1 from "@/public/images/others/photo-1.jpg";
import image2 from "@/public/images/others/photo-2.jpg";
import image3 from "@/public/images/others/photo-3.jpg";
import image4 from "@/public/images/others/photo-4.jpg";
import image5 from "@/public/images/others/photo-5.jpg";

type Card = {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
  sm: string;
};

const CARDS: Card[] = [
  {
    id: 1,
    title: "Sarah Johnson",
    sm: "Mathematics",
    image: image1,
    description:
      "Sarah is a passionate mathematics tutor with over 10 years of experience. She specializes in algebra, calculus, and statistics, making complex concepts easy to understand.",
  },
  {
    id: 2,
    title: "Michael Chen",
    sm: "Science",
    image: image2,
    description:
      "Michael is a dedicated science tutor, covering physics, chemistry, and biology. His hands-on approach and real-world examples make science exciting and accessible to all students.",
  },
  {
    id: 3,
    title: "Emily Rodriguez",
    sm: "Language Arts",
    image: image3,
    description:
      "Emily excels in teaching English literature and writing. Her creative methods inspire students to develop critical thinking skills and a love for reading and writing.",
  },
  {
    id: 4,
    title: "David Nguyen",
    sm: "Computer Science",
    image: image4,
    description:
      "David is an experienced computer science tutor, focusing on programming languages, algorithms, and web development. He helps students build practical skills for the digital age.",
  },
  {
    id: 5,
    title: "Aisha Patel",
    sm: "History and Social Studies",
    image: image5,
    description:
      "Aisha brings history to life with her engaging teaching style. She covers world history, civics, and geography, helping students understand the connections between past and present.",
  },
];

const OverviewCards = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <div className="center relative  size-full">
      <motion.ul
        className="flex w-full  max-w-md flex-col items-center justify-center gap-4"
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {CARDS.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </motion.ul>
      <Modal card={selectedCard} onClick={() => setSelectedCard(null)} />
    </div>
  );
};

function Card(props: { card: Card; onClick: () => void }) {
  return (
    <motion.li
      key={props.card.title}
      className="w-full cursor-pointer text-primary-foreground"
      layoutId={`card-${props.card.id}`}
      onClick={props.onClick}
    >
      <div className="flex h-20 w-80 max-w-96 gap-6 ">
        <div className="relative size-20 min-w-20 overflow-hidden rounded-3xl">
          <Image
            src={props.card.image}
            alt={props.card.title}
            className="size-full object-cover "
            fill
            placeholder="blur"
          />
        </div>
        <div className="flex h-full flex-1 flex-col items-start justify-center  border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex w-full items-center justify-between">
            <div>
              <motion.h2
                className="text-xl font-semibold text-secondary-foreground"
                layoutId={`title-${props.card.id}`}
              >
                {props.card.title}
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                layoutId={`title-sm-${props.card.id}`}
              >
                {props.card.sm}
              </motion.p>
            </div>
            <button className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-500">
              View
            </button>
          </div>
        </div>
      </div>
      <motion.span layoutId={`description-${props.card.id}`} />
    </motion.li>
  );
}

function Modal(props: { card: Card | null; onClick: () => void }) {
  return (
    <>
      <AnimatePresence>
        {!!props.card && (
          <motion.div
            className="fixed inset-0 z-0 flex items-center justify-center bg-secondary/50"
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!!props.card && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center"
            onClick={props.onClick}
          >
            <motion.div
              className="relative flex  w-fit flex-col items-center justify-center overflow-hidden rounded-3xl bg-background p-4"
              layoutId={`card-${props.card.id}`}
            >
              <div className="mx-auto flex max-w-xl flex-col gap-4">
                <div className="flex gap-4">
                  <div className="relative size-20 min-w-20 overflow-hidden rounded-3xl">
                    <Image
                      src={props.card.image}
                      alt={props.card.title}
                      className="size-full object-cover "
                      fill
                      placeholder="blur"
                    />
                  </div>
                  <div className="flex h-full flex-1 flex-col items-start  justify-center">
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <motion.h2
                          className="text-xl font-semibold text-secondary-foreground"
                          layoutId={`title-${props.card.id}`}
                        >
                          {props.card.title}
                        </motion.h2>
                        <motion.p
                          className="text-muted-foreground"
                          layoutId={`title-sm-${props.card.id}`}
                        >
                          {props.card.sm}
                        </motion.p>
                      </div>
                      <Link href={`/request-tutor/${props.card.id}`}>
                        <button className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-500">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <motion.p
                  className="text-[15px] font-medium text-[#969799]"
                  layoutId={`description-${props.card.id}`}
                >
                  {props.card.description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default OverviewCards;
