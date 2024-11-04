import { Suspense } from "react";

import { RequestTutorForm } from "@/components/request-tutor-form";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RequestTutorPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Request a Tutor</h1>
      <Suspense fallback={<RequestTutorFormSkeleton />}>
        <RequestTutorForm lang={lang} />
      </Suspense>
    </div>
  );
}

function RequestTutorFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-1/2" />
    </div>
  );
}
