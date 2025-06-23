"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const progressSteps = [
    { label: "Details", completed: step >= 1 },
    { label: "Questions", completed: step >= 2 },
    { label: "Share", completed: step >= 3 },
  ];

  return (
    <section className="max-w-3xl w-full flex flex-col my-20 justify-center items-center mx-auto p-5 bg-white">
      <div className="w-full">
        {/* Back navigation */}
        <header className="flex items-center gap-3 mb-5">
          <ArrowLeft
            size={16}
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <p className="text-sm">Back to Dashboard</p>
        </header>

        <main>
          {/* Step Progress Indicator */}
          <div className="flex items-center justify-between mb-5 gap-4">
            {progressSteps.map((progressStep, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2 mr-5 flex-nowrap">
                  <p
                    className={`w-10 h-10 rounded-full flex justify-center items-center ${
                      step === index + 1
                        ? "font-bold bg-gray-200 text-gray-900"
                        : "font-normal bg-gray-100 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </p>

                  <p
                    className={`text-sm ${
                      step === index + 1
                        ? "font-semibold text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {progressStep.label}
                  </p>
                </div>

                {index < progressSteps.length - 1 && (
                  <Separator className="my-2 h-px w-full bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Child Page Content */}
          <div className="mb-6">{children}</div>

          <div>
            <Button>Generate Questions</Button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Layout;
