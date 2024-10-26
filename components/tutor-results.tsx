'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { StarIcon, UsersIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { StarFilledIcon } from '@radix-ui/react-icons';
import Booking from './booking';

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
}

export function TutorResults({ subject, level }: TutorResultsProps) {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating an API call to fetch tutors
        const fetchTutors = async () => {
            setLoading(true);
            // In a real application, you would make an API call here
            // For now, we'll use a timeout to simulate a network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock data
            const mockTutors: Tutor[] = [
                {
                    id: '1',
                    name: 'John Doe',
                    experience: 2,
                    rating: 4.8,
                    totalHours: 46,
                    totalStudents: 8,
                    hourlyRate: 21.8,
                    avatar: '/images/others/photo-1.jpg',
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    experience: 5,
                    rating: 4.9,
                    totalHours: 30,
                    totalStudents: 5,
                    hourlyRate: 30,
                    avatar: '/images/others/photo-2.jpg',
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
            <h2 className="text-2xl font-bold">Available Tutors for {subject} ({level})</h2>
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
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col relative">
            <div className="absolute top-2 end-2 flex items-center gap-1 border border-green-600 rounded-full p-1">
                <span className="text-sm text-gray-600">
                    {tutor.rating}
                </span>
                <StarFilledIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center mb-4">
                <Image
                    src={tutor.avatar}
                    alt={tutor.name}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold">{tutor.name}</h3>
                    <p className="text-sm text-gray-600">
                        {tutor.experience} years of experience
                    </p>
                </div>
            </div>
            <div className="flex items-center mb-2">
                <UsersIcon className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-semibold">{tutor.totalStudents}</span>
                <span className="text-sm text-gray-600 ml-2">({tutor.totalHours} hours)</span>
            </div>
            <p className="text-lg font-bold mb-4">${tutor.hourlyRate}/hour</p>

            <Booking />
        </div>
    );
}
