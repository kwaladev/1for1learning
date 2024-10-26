import { env } from "@/env.mjs";

interface SubscriptionPlanTranslation {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
}

export const priceDataMap: Record<string, SubscriptionPlanTranslation[]> = {
  en: [
    {
      id: "free",
      title: "Free",
      description: "For Casual Learners",
      benefits: [
        "Access to basic learning materials",
        "Limited AI-powered study recommendations",
        "Up to 5 personalized quizzes per month",
      ],
      limitations: [
        "No access to premium content",
        "Limited personalization features",
        "Basic progress tracking",
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      id: "standard",
      title: "Standard",
      description: "Enhance Your Learning",
      benefits: [
        "Full access to all learning materials",
        "Advanced AI-powered study recommendations",
        "Unlimited personalized quizzes",
        "Priority customer support",
        "Progress tracking and analytics",
      ],
      limitations: [
        "Limited access to one-on-one tutoring sessions",
      ],
      prices: {
        monthly: 19.99,
        yearly: 199.99,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID ?? "",
      },
    },
    {
      id: "premium",
      title: "Premium",
      description: "Ultimate Learning Experience",
      benefits: [
        "All Standard plan features",
        "Unlimited one-on-one tutoring sessions",
        "Exclusive access to expert-led webinars",
        "Advanced performance analytics",
        "Personalized learning path creation",
        "24/7 premium customer support",
      ],
      limitations: [],
      prices: {
        monthly: 49.99,
        yearly: 499.99,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID ?? "",
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID ?? "",
      },
    },
  ]
};
