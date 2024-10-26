interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const priceFaqDataMap: Record<string, FAQItem[]> = {
  en: [
    {
      id: "item-1",
      question: "What features are included in the Free plan?",
      answer:
        "Our Free plan includes access to basic learning materials, limited AI-powered study recommendations, and up to 5 personalized quizzes per month. It's a great way to start your learning journey with 1FOR1Learning.",
    },
    {
      id: "item-2",
      question: "What does the Standard plan offer and how much does it cost?",
      answer:
        "The Standard plan costs $19.99 per month or $199.99 per year. It provides full access to all learning materials, advanced AI-powered study recommendations, unlimited personalized quizzes, priority customer support, and progress tracking and analytics.",
    },
    {
      id: "item-3",
      question: "What are the benefits of the Premium plan and its pricing?",
      answer:
        "The Premium plan is priced at $49.99 per month or $499.99 per year. It offers all Standard plan features plus unlimited one-on-one tutoring sessions, exclusive access to expert-led webinars, advanced performance analytics, personalized learning path creation, and 24/7 premium customer support.",
    },
    {
      id: "item-4",
      question: "Is there a discount for annual subscriptions?",
      answer:
        "Yes, we offer discounts for annual subscriptions. The Standard plan annual subscription saves you about two months' worth of payments compared to the monthly plan. The Premium plan annual subscription offers similar savings.",
    },
    {
      id: "item-5",
      question: "Can I switch between plans or cancel my subscription?",
      answer:
        "Yes, you can upgrade, downgrade, or cancel your subscription at any time. If you upgrade, you'll have immediate access to the new features. If you downgrade or cancel, you'll continue to have access to your current plan until the end of your billing cycle.",
    },
  ],
};
