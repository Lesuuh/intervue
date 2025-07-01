"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Building2, Check, Gem, Rocket } from "lucide-react";

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
      text: "since joining",
    },
    {
      value: 7,
      title: "Days until link expiring",
      text: "Default for Free plan",
    },
  ];

  // const [currentPlan, setCurrentPlan] = useState("Free");

  // plans
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
      icon: <Gem className="inline-block text-green-500" />, // Example icon
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
      icon: <Rocket className="inline-block text-blue-500" />,
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
      icon: <Briefcase className="inline-block text-purple-500" />,
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
      icon: <Building2 className="inline-block text-orange-500" />,
      buttonText: "Contact Sales",
    },
  ];
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

          <div className="flex items-center justify-between mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 min-w-3xs border p-4 rounded-lg"
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
        {/* cards */}
        <div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end my-10">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`h-auto border ${
                plan.name === "Free" ? "border-green-500" : ""
              }`}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-center">
                  <span className="mr-1">{plan.icon}</span>
                  {plan.name}
                  <h1 className="text-2xl mt-3">{plan.price}</h1>
                </CardTitle>
                <CardDescription className="text-xs">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <ul className="mb-4 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center">
                      <Check className="text-green-500 mr-3" /> {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">{plan.buttonText}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Billings;
