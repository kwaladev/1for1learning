import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { TutorResults } from "@/components/tutor-results";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TutorResultsPage({
  params: { lang, subject, level },
}: {
  params: { lang: string; subject: string; level: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <Link href={`/${lang}/request-tutor`}>
          <BackButton />
        </Link>
        <h1 className="mb-6 text-3xl font-bold">Tutor Results</h1>
      </div>
      <p className="mb-4 text-lg">
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
          <Skeleton className="size-20 rounded-full" />
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
      <ArrowLeftIcon className="mr-2 size-4" />
      Back
    </Button>
  );
}
