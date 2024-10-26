'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BlockQuote } from '@/components/block-quote';
import { motion } from 'framer-motion';
import OverviewCards from './card-overview';
import { StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface RequestTutorFormProps {
    lang: string;
}

const levels = [
    { name: 'primary', subjects: ['Arabic', 'French', 'Mathematics', 'Science', 'Islamic Education', 'Civic Education', 'History', 'Geography', 'Art', 'Music', 'Physical Education'] },
    { name: 'middle', subjects: ['Arabic', 'French', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Islamic Education', 'Civic Education', 'Technology', 'Art', 'Music', 'Physical Education'] },
    { name: 'high', subjects: ['Arabic', 'French', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Philosophy', 'History', 'Geography', 'Islamic Education', 'Civic Education', 'Computer Science', 'Economics', 'Management', 'Technical Drawing'] },
];

export function RequestTutorForm({ lang }: RequestTutorFormProps) {
    const [subject, setSubject] = useState('');
    const [level, setLevel] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log('Form submitted:', { subject, level, description });
        router.push(`/request-tutor/${subject}/${level}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mx-auto">

            <div className='flex flex-col md:flex-row gap-8'>
                <div className='flex-1 space-y-4 max-w-xl'>
                    <div className="max-w-xl">
                        <BlockQuote quote="Education is the passport to the future, for tomorrow belongs to those who prepare for it today." author="Malcolm X" />
                    </div>
                    <div className='space-y-1 max-w-lg'>
                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                            Level of Education
                        </label>
                        <Select value={level} onValueChange={setLevel}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="primary">Primary</SelectItem>
                                <SelectItem value="middle">Middle School</SelectItem>
                                <SelectItem value="high">High School</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {
                        level && (
                            <div className='space-y-1 max-w-lg'>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <Select value={subject} onValueChange={setSubject}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            levels.filter((l) => l.name === level).map((level) => (
                                                level.subjects.map((subject) => (
                                                    <SelectItem value={subject}>{subject}</SelectItem>
                                                ))
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        )
                    }



                    <div className="max-w-lg center flex justify-end">
                        <NextButton disabled={!subject || !level} />
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <StarIcon className="w-6 h-6 text-yellow-500" />
                        Our Top Tutors
                    </h2>
                    <OverviewCards />
                </div>
            </div>

        </form>
    );
}


const NextButton = (
    { disabled }: { disabled?: boolean }
) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            disabled={disabled}
            className="py-2 px-4 rounded flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
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