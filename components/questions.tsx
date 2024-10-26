import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Questions({ dict }: { dict: any }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{dict.marketing.questions_1_title}</AccordionTrigger>
        <AccordionContent>
          {dict.marketing.questions_1}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{dict.marketing.questions_2_title}</AccordionTrigger>
        <AccordionContent>
          {dict.marketing.questions_2}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>{dict.marketing.questions_3_title}</AccordionTrigger>
        <AccordionContent>
          {dict.marketing.questions_3}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
