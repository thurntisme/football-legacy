export enum SubscriptionPlanEnum {
  FREE = "free",
  PRO = "pro",
  ELITE = "elite",
}

export const SubscriptionPlans = [
  {
    name: "Free Plan",
    slug: SubscriptionPlanEnum.FREE,
    description: "Basic features to get started",
    price: 0,
    isPopular: false,
    features: [
      "Basic team management",
      "Standard match simulation",
      "Limited transfer market access",
      "Basic player development",
    ],
  },
  {
    name: "Pro Plan",
    slug: SubscriptionPlanEnum.PRO,
    description: "Enhanced features for serious managers",
    price: 9.99,
    isPopular: true,
    features: [
      "All Free Plan features",
      "Advanced match tactics",
      "Full transfer market access",
      "Detailed player statistics",
      "500 coins monthly",
      "Ad-free experience",
    ],
  },
  {
    name: "Elite Plan",
    slug: SubscriptionPlanEnum.ELITE,
    description: "Premium experience for elite managers",
    price: 19.99,
    isPopular: false,
    features: [
      "All Pro Plan features",
      "Elite player generation",
      "Advanced scouting network",
      "Exclusive player items",
      "1500 coins monthly",
      "Priority customer support",
    ],
  },
];
