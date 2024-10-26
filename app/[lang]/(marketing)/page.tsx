import Link from "next/link";


import { XBlogArticle } from "@/components/blog-card";
import { Comments } from "@/components/comments";
import { FeaturesCard } from "@/components/features-card";
import { Meteorss } from "@/components/meteors-card";
import { Questions } from "@/components/questions";
import ShimmerButton from "@/components/shimmer-button";
import { TypewriterEffectSmooths } from "@/components/typewriterEffectSmooth";
import { WobbleCardShow } from "@/components/wobble";
import { WordReveal } from "@/components/word-reveal";
import type { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import type { Meteor } from "@/types/meteors";
import Image from "next/image";

const meteors_data: Meteor = {
  name: "Follow us on Facebook and Google",
  description:
    "Follow us on Facebook and Google to get the latest news and updates.",
  button_content: "Facebook",
  button_content2: "Google",
  url: "https://www.facebook.com/saasfly.io",
  url2: "https://www.google.com",
};

export default async function IndexPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);

  const blogContent = {
    slug: "revolutionize-your-learning-journey-with-1for1learning",
    author: "1FOR1Leaning",
    date: "26th March, 2024",
    title: dict.marketing.blog_title,
    description:
      dict.marketing.blog_description,
    image:
      "/images/blog_img.png",
    authorAvatar:
      "/images/avatars/koala.svg",
  };

  return (
    <>
      <section className="w-full px-8 sm:px-48 md:px-48 xl:h-[100vh] xl:px-48">
        <div className="grid grid-cols-1 gap-10 pb-10 md:pb-40 xl:grid-cols-2">
          <div className="flex flex-col items-start">
            <div className="flex flex-col pt-4 md:pt-28 lg:pt-28 xl:pt-28">
              {/* <Link href="https://document.saasfly.io" target="_blank">
                <DocumentGuide>
                  {dict.marketing.introducing || "Introducing Saasfly"}
                </DocumentGuide>
              </Link> */}

              <div className="mt-6">
                <h1 className="relative mb-6 max-w-4xl text-left text-4xl font-bold dark:text-zinc-100 sm:text-7xl md:text-7xl xl:text-7xl">
                  {dict.marketing.title ||
                    "Saasfly: A new SaaS player? Make things easier."}
                </h1>
              </div>

              <div>
                <span className="text-zinc-500 sm:text-xl">
                  {dict.marketing.sub_title ||
                    "Your complete All-in-One solution for building SaaS services."}
                </span>
                <TypewriterEffectSmooths text={dict.marketing.word_reveal || "Empowering Minds: Revolutionize Your Learning Journey with AI"} />
              </div>

              <div className="mb-4 mt-6 flex w-full flex-col justify-center space-y-4 sm:flex-row sm:justify-start sm:space-x-8 sm:space-y-0">
                <Link href={`${lang}/request-tutor`}>
                  <ShimmerButton className="mx-auto flex justify-center">
                    <span className="z-10 w-48 whitespace-pre bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center text-sm font-semibold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 dark:text-transparent">
                      {dict.marketing.get_started}
                    </span>
                  </ShimmerButton>
                </Link>

                {/* <Link href="https://github.com/saasfly/saasfly" target="_blank">
                  <div className="flex h-full items-center justify-center">
                    <Icons.GitHub className="mr-2 h-6 w-6" />
                    <span className="text-base font-semibold">
                      {dict.marketing.view_on_github || "View on GitHub"}
                    </span>
                  </div>
                </Link> */}
              </div>
            </div>
          </div>

          <div className="hidden h-full w-full xl:block">
            <div className="flex flex-col pt-28">
              <Meteorss meteor={meteors_data} />
              <div className="mt-4 flex w-full justify-between">
                <XBlogArticle blogContent={blogContent} btnText={dict.marketing.read_more} />
                <div className="ml-4">
                  <FeaturesCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden h-[100vh] w-full xl:block">
        <div className="flex h-full w-full justify-between px-[220px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <WobbleCardShow dict={dict} />
          </div>
          <div className="h-full w-[40%]">
            <div className="flex flex-col pl-[120px]">
              <WordReveal dict={dict} />
            </div>
          </div>
        </div>
      </section>

      <section className="hidden h-[100vh] w-full xl:block">
        <div className="flex h-full w-full justify-between px-[220px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <div className="px-[120px]">
              <Questions dict={dict} />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-8 xl:hidden">
        <Questions dict={dict} />
      </section>

      {/* New Features Grid Section */}
      <section id="features" className="w-full px-4 py-8">
        <div className="container mx-auto bg-gray-200 px-4 py-8 dark:bg-gray-900">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-gray-50">{dict.marketing.features_title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Personalized Learning System */}
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <Image src="/images/3dicons/book.png" alt="Personalized Learning System" width={100} height={100} />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-50">{dict.marketing.personalized_learning}</h3>
              <p className="text-gray-700 dark:text-gray-200">{dict.marketing.personalized_learning_desc}</p>
            </div>

            {/* AI Professor */}
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <Image src="/images/3dicons/ai.png" alt="Personalized Learning System" width={100} height={100} />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-50">{dict.marketing.ai_professor}</h3>
              <p className="text-gray-700 dark:text-gray-200">{dict.marketing.ai_professor_desc}</p>
            </div>

            {/* One-stop Shop */}
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <Image src="/images/3dicons/verified.png" alt="Personalized Learning System" width={100} height={100} />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-50">{dict.marketing.one_stop_shop}</h3>
              <p className="text-gray-700 dark:text-gray-200">{dict.marketing.one_stop_shop_desc}</p>
            </div>

            {/* Progress Tracking */}
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <Image src="/images/3dicons/chart.png" alt="Personalized Learning System" width={100} height={100} />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-50">{dict.marketing.progress_tracking}</h3>
              <p className="text-gray-700 dark:text-gray-200">{dict.marketing.progress_tracking_desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-8 pt-10 sm:px-0 sm:pt-0 md:px-0 md:pt-0 xl:px-0 xl:pt-0">
        <div className="flex h-full w-full flex-col items-center pb-[100px] pt-10">
          <div>
            <h1 className="mb-6 text-center text-3xl font-bold dark:text-zinc-100 md:text-5xl">
              {dict.marketing.comments_title}
            </h1>
          </div>
          <div className="mb-6 text-xl dark:text-zinc-100 md:text-xl">
            {dict.marketing.comments_subtitle}
          </div>

          <div className="w-full overflow-x-hidden">
            <Comments />
          </div>
        </div>
      </section>
    </>
  );
}
