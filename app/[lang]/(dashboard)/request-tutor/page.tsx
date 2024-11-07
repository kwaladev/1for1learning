import { Suspense } from "react";

import { RequestTutorForm } from "@/components/request-tutor-form";
import { Skeleton } from "@/components/ui/skeleton";
import { getTeamForUser, getUser } from "@/lib/db/queries";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RequestTutorPage(
  props: {
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error("Team not found");
  }

  const {
    lang
  } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Request a Tutor</h1>
      <Suspense fallback={<RequestTutorFormSkeleton />}>
        <RequestTutorForm lang={lang} teamData={teamData} />
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
