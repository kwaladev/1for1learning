"use client";

import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import OverviewCards from "./card-overview";
import MultiStepForm from "./multistepform";
import { TeamDataWithMembers } from "@/lib/db/schema";

interface RequestTutorFormProps {
  lang: string;
  teamData: TeamDataWithMembers;
}

export function RequestTutorForm({ lang, teamData }: RequestTutorFormProps) {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", { subject, level, description });
    router.push(`/request-tutor/${subject}/${level}`);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="w-full">
        <MultiStepForm teamData={teamData} />
      </div>

      <div className="mx-auto p-4">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <StarIcon className="size-6 text-yellow-500" />
          Our Top Tutors
        </h2>
        <OverviewCards />
      </div>
    </div>
  );
}

const NextButton = ({ disabled }: { disabled?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      disabled={disabled}
      className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>Next</span>
      <motion.svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          d="M12 5L19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 0 : -7 }}
          transition={{ duration: 0.2 }}
        />
      </motion.svg>
    </button>
  );
};
