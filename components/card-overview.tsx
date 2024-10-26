"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import image1 from "@/public/images/others/photo-1.jpg";
import image2 from "@/public/images/others/photo-2.jpg";
import image3 from "@/public/images/others/photo-3.jpg";
import image4 from "@/public/images/others/photo-4.jpg";
import image5 from "@/public/images/others/photo-5.jpg";
import Link from "next/link";

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
        sm: "Mathematics Expert",
        image: image1,
        description:
            "Sarah is a passionate mathematics tutor with over 10 years of experience. She specializes in algebra, calculus, and statistics, making complex concepts easy to understand.",
    },
    {
        id: 2,
        title: "Michael Chen",
        sm: "Science Enthusiast",
        image: image2,
        description:
            "Michael is a dedicated science tutor, covering physics, chemistry, and biology. His hands-on approach and real-world examples make science exciting and accessible to all students.",
    },
    {
        id: 3,
        title: "Emily Rodriguez",
        sm: "Language Arts Specialist",
        image: image3,
        description:
            "Emily excels in teaching English literature and writing. Her creative methods inspire students to develop critical thinking skills and a love for reading and writing.",
    },
    {
        id: 4,
        title: "David Nguyen",
        sm: "Computer Science Guru",
        image: image4,
        description:
            "David is an experienced computer science tutor, focusing on programming languages, algorithms, and web development. He helps students build practical skills for the digital age.",
    },
    {
        id: 5,
        title: "Aisha Patel",
        sm: "History and Social Studies Expert",
        image: image5,
        description:
            "Aisha brings history to life with her engaging teaching style. She covers world history, civics, and geography, helping students understand the connections between past and present.",
    },
];

const OverviewCards = () => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    return (
        <div className="h-full center  w-full relative">
            <motion.ul
                className={`flex flex-col  gap-4 justify-center items-center max-w-md w-full`}
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
            className="w-full text-primary-foreground cursor-pointer"
            layoutId={`card-${props.card.id}`}
            onClick={props.onClick}
        >
            <div className="flex gap-6 h-20">
                <div className="min-w-20 h-20 rounded-3xl w-20 relative overflow-hidden">
                    <Image
                        src={props.card.image}
                        alt={props.card.title}
                        className="w-full h-full object-cover "
                        fill
                        placeholder="blur"
                    />
                </div>
                <div className="border-b h-full items-start justify-center flex flex-col  flex-1 dark:border-neutral-800 border-neutral-200">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <motion.h2
                                className="font-semibold text-xl text-secondary-foreground"
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
                        <button className="py-1 px-3 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold">
                            Select
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
                        className="fixed inset-0 flex items-center justify-center z-0 bg-secondary/50"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!!props.card && (
                    <motion.div
                        className="fixed inset-0 z-10 flex flex-col justify-center items-center"
                        onClick={props.onClick}
                    >
                        <motion.div
                            className="p-4 w-fit  relative overflow-hidden flex items-center justify-center flex-col bg-background rounded-3xl"
                            layoutId={`card-${props.card.id}`}
                        >
                            <div className="max-w-xl mx-auto flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="min-w-20 h-20 rounded-3xl w-20 relative overflow-hidden">
                                        <Image
                                            src={props.card.image}
                                            alt={props.card.title}
                                            className="w-full h-full object-cover "
                                            fill
                                            placeholder="blur"
                                        />
                                    </div>
                                    <div className="h-full items-start justify-center flex flex-col  flex-1">
                                        <div className="flex items-center justify-between w-full">
                                            <div>
                                                <motion.h2
                                                    className="font-semibold text-xl text-secondary-foreground"
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
                                                <button

                                                    className="py-1 px-3 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold">
                                                    Select
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <motion.p
                                    className="text-[#969799] font-medium text-[15px]"
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
