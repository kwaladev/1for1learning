import { cn } from "@/components/ui";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Emily",
    username: "@emily_learns",
    body: "1FOR1Leaning has transformed my study habits. The personalized approach is incredible!",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Michael",
    username: "@mike_student",
    body: "I've improved my grades significantly since using 1FOR1Leaning. It's like having a personal tutor 24/7.",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Sarah",
    username: "@sarah_educator",
    body: "As an educator, I'm impressed by how 1FOR1Leaning adapts to each student's needs. It's a game-changer in education.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "محمد",
    username: "@mohammed_ar",
    body: "1FOR1Leaning ساعدني على تحسين كفاءة دراستي بشكل كبير. إنه حقًا يتكيف مع أسلوب تعلمي.",
    img: "https://avatar.vercel.sh/mohammed",
  },
  {
    name: "فاطمة",
    username: "@fatima_ar",
    body: "بفضل 1FOR1Leaning، أصبحت قادرة على فهم المواد الصعبة بسهولة أكبر. إنها حقًا منصة تعليمية مبتكرة.",
    img: "https://avatar.vercel.sh/fatima",
  },
  {
    name: "أحمد",
    username: "@ahmed_ar",
    body: "بفضل 1FOR1Learning، أصبحت قادرًا على التعلم بكفاءة وبوتيرتي الخاصة. إنها خدمة رائعة حقًا.",
    img: "https://avatar.vercel.sh/ahmed",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const Comments = () => {
  return (
    <div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-4 sm:py-20 md:py-20 xl:py-20">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
    </div>
  );
};

export { Comments };
