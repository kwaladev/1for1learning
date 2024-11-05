"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { UsersIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import Booking from "./booking";
import { Calendar } from "./ui/calendar";

interface Tutor {
  id: string;
  name: string;
  experience: number;
  rating: number;
  totalHours: number;
  totalStudents: number;
  hourlyRate: number;
  avatar: string;
}

interface TutorResultsProps {
  subject: string;
  level: string;
  lang: string;
}

export function TutorResults({ subject, level, lang }: TutorResultsProps) {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  useEffect(() => {
    // Simulating an API call to fetch tutors
    const fetchTutors = async () => {
      setLoading(true);
      // In a real application, you would make an API call here
      // For now, we'll use a timeout to simulate a network request
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      // Mock data
      const mockTutors: Tutor[] = [
        {
          id: "1",
          name: "John Doe",
          experience: 2,
          rating: 4.8,
          totalHours: 46,
          totalStudents: 8,
          hourlyRate: 21.8,
          avatar: "/images/others/photo-1.jpg",
        },
        {
          id: "2",
          name: "Jane Smith",
          experience: 5,
          rating: 4.9,
          totalHours: 30,
          totalStudents: 5,
          hourlyRate: 30,
          avatar: "/images/others/photo-2.jpg",
        },
        // Add more mock tutors as needed
      ];

      setTutors(mockTutors);
      setLoading(false);
    };

    fetchTutors();
  }, [subject, level]);

  if (loading) {
    return <div className="text-center">Loading tutors...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Available Tutors for {subject} ({level})
      </h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      {tutors.length === 0 ? (
        <p>No tutors found for the selected subject and level.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="relative flex flex-col rounded-lg bg-white p-6 shadow-md">
      <div className="absolute end-2 top-2 flex items-center gap-1 rounded-full border border-green-600 p-1">
        <span className="text-sm text-gray-600">{tutor.rating}</span>
        <StarFilledIcon className="size-5 text-green-600" />
      </div>
      <div className="mb-4 flex items-center">
        <Image
          src={tutor.avatar}
          alt={tutor.name}
          width={64}
          height={64}
          className="mr-4 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{tutor.name}</h3>
          <p className="text-sm text-gray-600">
            {tutor.experience} years of experience
          </p>
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <UsersIcon className="mr-1 size-5 text-yellow-400" />
        <span className="font-semibold">{tutor.totalStudents}</span>
        <span className="ml-2 text-sm text-gray-600">
          ({tutor.totalHours} hours)
        </span>
      </div>
      <p className="mb-4 text-lg font-bold">${tutor.hourlyRate}/hour</p>

      <Booking />
    </div>
  );
}
