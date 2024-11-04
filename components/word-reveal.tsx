import TextReveal from "@/components/ui/text-reveal";

export async function WordReveal({ dict }: { dict: any }) {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center rounded-lg dark:bg-background">
      <TextReveal text={dict.marketing.word_reveal} />
    </div>
  );
}
