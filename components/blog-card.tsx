import { FollowerPointerCard } from "@/components/ui/following-pointer";

export function XBlogArticle({
  blogContent,
  btnText,
}: {
  blogContent: {
    slug: string;
    author: string;
    date: string;
    title: string;
    description: string;
    image: string;
    authorAvatar: string;
  };
  btnText: string;
}) {
  return (
    <div className="w-96">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl">
          <div className="aspect-w-16 aspect-h-10 xl:aspect-w-16 xl:aspect-h-10 relative w-full overflow-hidden rounded-t-lg bg-gray-100">
            <img
              src={blogContent.image}
              alt="thumbnail"
              className="object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
            />
          </div>
          <div className=" p-4">
            <h2 className="my-4 text-lg font-bold text-zinc-700">
              {blogContent.title}
            </h2>
            <h2 className="my-4 text-sm font-normal text-zinc-500">
              {blogContent.description}
            </h2>
            <div className="relative z-10 mt-10 block w-full rounded-xl bg-black px-6 py-2 text-xs font-bold text-white">
              {btnText}
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
