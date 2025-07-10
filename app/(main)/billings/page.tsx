"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Building, Check, Crown, Zap } from "lucide-react";

const Billings = () => {
  const stats = [
    {
      value: 2,
      title: "Interview created this month",
      text: `3 remaining`,
    },
    {
      value: 12,
      title: "Total inteviews created",
      text: "Since joining",
    },
    {
      value: 7,
      title: "Days until link expiring",
      text: "Default for Free plan",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "0/Forever",
      period: "forever",
      description: "Perfect for trying out our platform",
      features: [
        "5 interviews per month",
        "Basic AI questions",
        "Email support",
        "7-day link expiry",
        "Standard templates",
      ],
      limitations: [
        "Limited customization",
        "No analytics",
        "No priority support",
      ],
      popular: false,
      current: true,
      icon: <Zap className="h-5 w-5 text-gray-600 mr-2" />,
      buttonText: "Current Plan",
    },
    {
      name: "Pro",
      price: "29/month",
      period: "month",
      description: "Ideal for growing teams and recruiters",
      features: [
        "50 interviews per month",
        "Advanced AI questions",
        "Priority email support",
        "30-day link expiry",
        "Custom templates",
        "Basic analytics",
        "Interview recordings",
        "Candidate feedback",
      ],
      limitations: [],
      popular: true,
      current: false,
      icon: <Crown className="h-5 w-5 text-yellow-500 mr-2" />,
      buttonText: "Upgrade to Pro",
    },
    {
      name: "Business",
      price: "99/month",
      period: "month",
      description: "For larger teams with advanced needs",
      features: [
        "200 interviews per month",
        "Premium AI questions",
        "Phone & email support",
        "90-day link expiry",
        "Advanced templates",
        "Detailed analytics",
        "Interview recordings",
        "Candidate feedback",
        "Team collaboration",
        "Custom branding",
        "API access",
      ],
      limitations: [],
      popular: false,
      current: false,
      icon: <Building className="h-5 w-5 text-blue-600 mr-2" />,
      buttonText: "Upgrade to Business",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited interviews",
        "Custom AI training",
        "Dedicated support",
        "Custom link expiry",
        "White-label solution",
        "Advanced analytics",
        "Interview recordings",
        "Candidate feedback",
        "Team collaboration",
        "Custom branding",
        "API access",
        "SSO integration",
        "Custom integrations",
      ],
      limitations: [],
      popular: false,
      current: false,
      icon: <Building className="h-5 w-5 text-purple-600 mr-2" />,
      buttonText: "Contact Sales",
    },
  ];

  const handleUpgrade = (planName: string) => {
    console.log(`Upgrade to ${planName}`);
    // your upgrade logic
  };

  return (
    <section>
      <header className="my-6">
        <h1 className="text-3xl font-bold">Billings & Subscriptions</h1>
        <p className="text-gray-600">
          Manage your subscriptions and view billing history
        </p>
      </header>
      <main>
        <div className="border p-6 rounded-lg bg-white">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-semibold text-2xl">Current Plan</h2>
              <p className="text-sm text-gray-500">
                You are currently on the free plan
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-2xl">$0</h2>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full items-center justify-between mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 min-w-3xs w-full border p-4 rounded-lg"
              >
                <h2 className="text-2xl font-semibold">{stat.value}</h2>
                <p className="text-sm font-light text-gray-500">{stat.title}</p>
                <p className="text-xs font-light text-gray-500">{stat.text}</p>
              </div>
            ))}
          </div>

          <div>
            <Progress value={40} />
            <p className="mt-2.5 text-gray-600 font-light text-sm">
              2 of 5 Interviews used (40%)
            </p>
          </div>
        </div>
{/* pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 my-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg border-2 p-6 ${
                plan.popular
                  ? "border-black shadow-lg"
                  : plan.current
                  ? "border-green-500"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  {plan.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-2">
                    {plan.name}
                  </h3>
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.current
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : plan.popular
                    ? "bg-black hover:bg-gray-800 text-white"
                    : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => handleUpgrade(plan.name)}
                disabled={plan.current}
              >
                {plan.current ? (
                  "Current Plan"
                ) : plan.name === "Enterprise" ? (
                  "Contact Sales"
                ) : (
                  <>
                    Upgrade to {plan.name}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Billings;
