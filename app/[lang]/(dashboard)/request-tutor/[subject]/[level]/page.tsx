import { Suspense } from 'react';
import { TutorResults } from '@/components/tutor-results';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TutorResultsPage({
    params: { lang, subject, level },
}: {
    params: { lang: string; subject: string; level: string };
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex flex-col gap-4'>
                <Link href={`/${lang}/request-tutor`}>
                    <BackButton />
                </Link>
                <h1 className="text-3xl font-bold mb-6">Tutor Results</h1>
            </div>
            <p className="text-lg mb-4">
                Showing tutors for {subject} at {level} level
            </p>
            <Suspense fallback={<TutorResultsSkeleton />}>
                <TutorResults lang={lang} subject={subject} level={level} />
            </Suspense>
        </div>
    );
}

function TutorResultsSkeleton() {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function BackButton() {
    return (
        <Button variant="link">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
        </Button>
    );
}

