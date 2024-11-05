"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheckIcon,
  CheckCircle2,
  Loader,
  Sparkles,
  XIcon,
} from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { useUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

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
  const [date, setDate] = useState<Date | undefined>(new Date());

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
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });

      setIsConfirmed(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { username, email } = user;

  return (
    <div className="flex size-full items-end justify-end">
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
              className="absolute -z-10 mx-auto  h-[300px] w-[500px] overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground "
              variants={bookingVariant}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Button
                onClick={() => setIsOpen(false)}
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2 z-10 rounded-full"
              >
                <XIcon className="size-4" />
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
                    className="flex size-full gap-10"
                  >
                    <div className="flex-1">
                      <div className="flex w-full items-center justify-between text-primary-foreground/50">
                        <p>Day</p>
                      </div>
                      <div className="grid grid-cols-5 gap-3 text-primary-foreground/80">
                        {days.map((day) => {
                          // some code here

                          return (
                            <motion.button
                              key={day}
                              className="flex-1 rounded-xl py-1.5 transition-all duration-150 hover:bg-white/20"
                            >
                              {day}
                            </motion.button>
                          );
                        })}
                      </div>
                      <div>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        {Array.from({ length: 20 }).map((_, index) => {
                          // some code here

                          return (
                            <button
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              className={cn(
                                "flex size-10 cursor-pointer items-center justify-center rounded-xl text-primary-foreground transition-all duration-150 hover:bg-white/20",
                                isActive === index && "bg-white/50"
                              )}
                              onClick={() => {
                                setIsActive(index);
                              }}
                            >
                              {index + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-[0.6] flex-col gap-10 bg-primary">
                      <div className="flex w-full items-center justify-between text-primary-foreground/50">
                        <p>Time</p>
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
                              className="rounded-xl bg-secondary px-4 py-1.5 text-black backdrop-blur dark:text-white"
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
                    className="flex size-full gap-2 text-primary-foreground"
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
                        <div className="flex items-center justify-center gap-2">
                          <CalendarCheckIcon className="size-10" />
                        </div>
                        <h2 className="flex flex-col gap-2">
                          <span> Monday, August {isActive + 1} 2024</span>{" "}
                          <span className="text-lg text-muted-foreground">
                            {isSelected}
                          </span>
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSelected("")}
                        className="flex h-10 items-center justify-center gap-2  rounded-xl bg-slate-700 px-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex flex-1">
                      <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-5"
                      >
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="name"
                            className="font-medium text-primary-foreground/70"
                          >
                            Your name
                            <input
                              type="text"
                              id="name"
                              name="username"
                              value={username}
                              onChange={onChange}
                              required
                              disabled={loading}
                              className="h-14 rounded-xl border-2 border-background bg-transparent px-5 text-primary-foreground/70 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Your name"
                            />
                          </label>
                        </div>
                        <div className="flex w-full flex-col  gap-2">
                          <label
                            htmlFor="name"
                            className="font-medium text-primary-foreground/70"
                          >
                            Your email
                            <input
                              type="email"
                              id="name"
                              name="email"
                              value={email}
                              onChange={onChange}
                              required
                              placeholder="Your email"
                              disabled={loading}
                              className="h-14 rounded-xl border-2 border-background bg-transparent px-5 text-primary-foreground/70 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </label>
                        </div>
                        <motion.button
                          type="submit"
                          disabled={loading}
                          className="flex h-14 items-center justify-center gap-2 rounded-xl  bg-background px-4 text-black disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                        >
                          {loading && (
                            <Loader className="size-4 animate-spin" />
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
                    className="black absolute left-0 top-0 flex size-full flex-col items-center justify-center gap-4"
                  >
                    <CheckCircle2
                      className="text-primary-foreground"
                      fill="white"
                      stroke="black"
                    />
                    <h1 className="flex flex-col text-center text-xl font-bold text-primary-foreground">
                      <span>Booking confirmed!</span>
                      <span>Looking forward to chatting!</span>
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex w-full items-center justify-end">
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
          <SecondBrainBtn
            text="Book a session"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

const SecondBrainBtn = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <motion.button
      whileHover={{
        scale: 1.3,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onClick}
      className="relative z-0 overflow-hidden rounded-xl border-none bg-indigo-500 px-10 py-3 font-medium text-primary-foreground outline-none hover:shadow-[0_0_10px]  hover:shadow-indigo-400"
    >
      <span className="z-10 flex items-center gap-2 tracking-tight">
        <span>
          <Sparkles className="size-4" fill="white" />
        </span>
        <span className="tracking-tight">{text}</span>
      </span>

      <span className="absolute inset-0 -z-10 -translate-x-0 -translate-y-0 rounded-xl shadow-[0_0_10px_inset] shadow-indigo-300" />

      <span
        className={cn(
          "absolute -left-5 -top-1/2 -z-20 h-[200%] w-8 rotate-12 bg-indigo-100/10 transition-all duration-300",
          hovering && "left-[90%]"
        )}
      />
    </motion.button>
  );
};

export default Booking;
