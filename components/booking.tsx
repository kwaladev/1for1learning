"use client";

import { useUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import zenith from "@/public/images/zenith.webp";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheckIcon, CalendarIcon, CalendarX2Icon, CheckCircle2, Loader, Sparkles, XIcon } from "lucide-react";
import Image from "next/image";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";

type User = {
    username: string;
    email: string;
};

const Booking = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState("");
    const { user: authUser } = useUser();
    const [user, setUser] = useState<User>({
        username: authUser?.name || "",
        email: authUser?.email || "",
    });
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isActive, setIsActive] = useState(0);

    const bookingVariant = {
        initial: {
            opacity: 0,
            y: -200,
        },
        animate: {
            opacity: 1,
            y: -320,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
                duration: 5,
                ease: [0.9, 0.1, 0.25, 1],
            },
        },
        exit: {
            opacity: 0,
            y: -180,
            transition: {
                duration: 0.2,
            },
        },
    };

    const times = ["1:00pm", "2:00pm", "3:00pm", "4:00pm"];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            setLoading(true);

            // validate form
            if (!username || !email) {
                throw new Error("Please fill out all fields");
            }
            // make some fake async call with promise for 5
            await new Promise((resolve) => setTimeout(resolve, 3000));

            setIsConfirmed(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };

    const { username, email } = user;

    return (
        <div className="h-full flex items-end justify-end w-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="absolute"
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
            <div
                className="z-10"
                style={{
                    filter: "url(#goo)",
                }}
            >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="h-[300px] bg-primary text-primary-foreground  absolute rounded-3xl overflow-hidden -z-10 w-[500px] p-5 mx-auto "
                            variants={bookingVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Button
                                onClick={() => setIsOpen(false)}
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2 rounded-full z-10">
                                <XIcon className="h-4 w-4" />
                            </Button>
                            <AnimatePresence>
                                {isSelected.length === 0 && (
                                    <motion.div
                                        exit={{
                                            opacity: 0,
                                            y: -100,
                                            transition: {
                                                duration: 0.2,
                                            },
                                        }}
                                        className="w-full h-full gap-10 flex"
                                    >
                                        <div className="flex-1">
                                            <div className="w-full flex items-center justify-between text-primary-foreground/50">
                                                <p>
                                                    Day
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-5 gap-3 text-primary-foreground/80">
                                                {days.map((day) => {
                                                    // some code here

                                                    return (
                                                        <motion.button
                                                            key={day}
                                                            className="py-1.5 rounded-xl flex-1 hover:bg-white/20 transition-all duration-150"
                                                        >
                                                            {day}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                            <div className="grid grid-cols-5 gap-3">
                                                {Array.from({ length: 20 }).map((_, index) => {
                                                    //some code here

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={cn(
                                                                "h-10 w-10 flex items-center justify-center text-primary-foreground rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-150",
                                                                isActive === index &&
                                                                "bg-white/50"
                                                            )}
                                                            onClick={() => {
                                                                setIsActive(index);
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex-[0.6] bg-primary flex flex-col gap-10">
                                            <div className="w-full flex items-center justify-between text-primary-foreground/50">
                                                <p>
                                                    Time
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-4 ">
                                                {times.map((time) => {
                                                    // some code here

                                                    return (
                                                        <motion.button
                                                            whileTap={{
                                                                scale: 0.9,
                                                            }}
                                                            onClick={() => setIsSelected(time)}
                                                            key={time}
                                                            className="bg-secondary backdrop-blur text-black dark:text-white px-4 py-1.5 rounded-xl"
                                                        >
                                                            {time}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div
                                        className="text-primary-foreground h-full w-full flex gap-2"
                                        initial={{
                                            y: -0,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            y: isConfirmed ? -400 : 0,
                                            opacity: 1,
                                            transition: {
                                                duration: 0.5,
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -100,
                                            transition: {
                                                duration: 0.2,
                                            },
                                        }}
                                    >
                                        <div className="flex flex-[.65] flex-col justify-between space-y-4 text-primary-foreground/90">
                                            <h1 className="textw">Confirm your booking:</h1>
                                            <div className="space-y-2">
                                                <div className="flex gap-2 items-center justify-center">
                                                    <CalendarCheckIcon className="h-10 w-10" />
                                                </div>
                                                <h2 className="flex flex-col gap-2">
                                                    <span> Monday, August {isActive + 1} 2024</span>{" "}
                                                    <span className="text-lg text-muted-foreground">
                                                        {isSelected}
                                                    </span>
                                                </h2>
                                            </div>
                                            <button
                                                onClick={() => setIsSelected("")}
                                                className="bg-slate-700 text-white flex items-center gap-2  justify-center px-4 h-10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="flex flex-1">
                                            <form
                                                onSubmit={handleSubmit}
                                                className="flex flex-col gap-5 w-full"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <label
                                                        htmlFor="name"
                                                        className="font-medium text-primary-foreground/70"
                                                    >
                                                        Your name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="username"
                                                        value={username}
                                                        onChange={onChange}
                                                        required
                                                        disabled={loading}
                                                        className="h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-2 px-5 text-primary-foreground/70 outline-none border-background"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2  w-full">
                                                    <label
                                                        htmlFor="name"
                                                        className="font-medium text-primary-foreground/70"
                                                    >
                                                        Your email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="name"
                                                        name="email"
                                                        value={email}
                                                        onChange={onChange}
                                                        required
                                                        placeholder="Your email"
                                                        disabled={loading}
                                                        className="h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-2 px-5 text-primary-foreground/70 outline-none border-background"
                                                    />
                                                </div>
                                                <motion.button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="bg-background dark:text-white text-black flex items-center gap-2  justify-center px-4 h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {loading && (
                                                        <Loader className="animate-spin h-4 w-4" />
                                                    )}{" "}
                                                    Book Now
                                                </motion.button>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {isConfirmed && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                        }}
                                        className="h-full w-full black absolute top-0 left-0 flex flex-col gap-4 items-center justify-center"
                                    >
                                        <CheckCircle2
                                            className="text-primary-foreground"
                                            fill="white"
                                            stroke="black"
                                        />
                                        <h1 className="text-primary-foreground font-bold flex flex-col text-center text-xl">
                                            <span>Booking confirmed!</span>
                                            <span>Looking forward to chatting!</span>
                                        </h1>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="w-full flex items-center justify-end">
                    {/* <div className="flex items-center justify-between bg-primary rounded-2xl mx-auto z-10  p-1 w-[500px] px-2.5">
                        <motion.div
                            animate={{
                                height: 50,
                            }}
                            className="bg-primary bg-black rounded-lg max-w-[50px] min-w-[50px] flex items-center justify-center"
                        >
                            <div className="h-4 rounded w-4 bg-white dark:bg-black rotate-45" />
                        </motion.div>

                        <motion.button
                            className="bg-secondary text-black dark:text-white px-4 py-1.5 rounded-xl"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            Book a call
                        </motion.button>
                    </div> */}
                    <SecondBrainBtn text="Book a session" onClick={() => setIsOpen((prev) => !prev)} />
                </div>
            </div>
        </div>
    );
};

const SecondBrainBtn = ({ text, onClick }: { text: string; onClick: () => void }) => {
    const [hovering, setHovering] = useState(false);
    return (
        <motion.button
            whileHover={{
                scale: 1.3,
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={onClick}
            className="bg-indigo-500 text-white z-0 relative outline-none border-none text-primary-foreground px-10 py-3 font-medium rounded-xl overflow-hidden hover:shadow-[0_0_10px]  hover:shadow-indigo-400"
        >
            <span className="flex gap-2 items-center z-10 tracking-tight">
                <span>
                    <Sparkles className="h-4 w-4" fill="white" />
                </span>
                <span className="tracking-tight">{text}</span>
            </span>

            <span className="absolute inset-0 top-0 left-0 -translate-x-0 -translate-y-0 shadow-[0_0_10px_inset] -z-10 shadow-indigo-300 rounded-xl"></span>

            <span
                className={cn(
                    "absolute w-8 h-[200%] bg-indigo-100/10 -top-1/2 -left-5 -z-[20] rotate-12 transition-all duration-300",
                    hovering && "left-[90%]"
                )}
            />
        </motion.button>
    );
};

export default Booking;
