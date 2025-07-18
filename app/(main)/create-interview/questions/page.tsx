"use client";

import { Button } from "@/components/ui/button";
import { useCreateInterview } from "@/hooks/useCreateInterview";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useFormStore";
import { Question } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Dot, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Type color mapping
const typeColors: Record<string, string> = {
  Behavioural: "bg-blue-50 text-blue-500",
  Technical: "bg-green-50 text-green-600",
  "System Design": "bg-purple-50 text-purple-600",
};

const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const formData = useFormStore((state) => state.formData);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (formData) {
      // generate questions using AI
      const generateQuestions = async () => {
        try {
          setLoading(true);
          setError(false);

          const res = await axios.post("/api/ai-questions", { ...formData });

          if (res.status !== 200) {
            throw new Error("Failed to fetch data from server");
          }

          const rawData = res.data;
          const cleanedData = rawData.replace(/```json|```/g, "").trim();
          const parsedData = JSON.parse(cleanedData);

          const result = parsedData.interviewQuestions.map(
            (item: { question: string; type: string }) => ({
              question: item.question,
              type: item.type,
            })
          );

          setQuestions(result);
          console.log(result);
        } catch (error) {
          toast.error("Server Error, Try again later", {
            style: {
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
            },
          });
          console.error(error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      generateQuestions();
    }
  }, [formData]);

  // then send the question to supabase along with the interview_id
  const createInterview = useCreateInterview();
  const onFinish = async () => {
    try {
      if (!formData || !user) {
        toast.error("Something went wrong");
        router.push("/login");
        return;
      }
      const data = await createInterview.mutateAsync({
        formData,
        questions,
        userEmail: user?.email,
      });
      router.push("/create-interview/share");
      toast.success("Interview Questions generated successfully");
      console.log(data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleContinue = () => {
    onFinish();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col gap-3 w-full border border-blue-300 rounded-md p-6 bg-blue-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-4 border-blue-200 border-t-primary"></div>
        <p className="text-sm font-semibold text-blue-800">
          Preparing your interview questions...
        </p>
        <p className="text-xs text-gray-700 text-center max-w-sm">
          Please hold on while our AI carefully generates questions tailored to
          your inputs.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col gap-3 w-full border border-red-400 rounded-md p-6 bg-red-50">
        <p className="text-sm font-semibold text-red-600">
          Oops! Something went wrong.
        </p>
        <p className="text-xs text-gray-700 text-center max-w-sm">
          We encountered an issue while generating your questions. Please try
          again shortly.
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Review Questions</h2>
      <p className="text-gray-600 mb-6">
        Questions for Frontend developer position:
      </p>

      <main className="space-y-4">
        {questions.map((q, index) => (
          <div key={index} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-gray-500">Q{index + 1}</p>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    typeColors[q.type] || "bg-gray-100 text-gray-500"
                  }`}
                >
                  {q.type}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Pen size={16} className="text-primary cursor-pointer" />
                <Trash2 size={16} className="text-red-500 cursor-pointer" />
              </div>
            </div>
            <p className="text-gray-700">{q.question}</p>
          </div>
        ))}
      </main>
      <Separator className="my-2 h-px w-full bg-gray-200 mt-10" />
      <div className="flex flex-col space-y-3 items-center justify-between mt-6">
        <p className="flex items-center gap-2 text-gray-600 text-xs">
          {questions.length} questions <Dot /> Estimated duration:{" "}
          {formData?.duration} minutes
        </p>
        <Link href={"/create-interview/share"} onClick={handleContinue}>
          <Button>Looks good - Continue</Button>
        </Link>
      </div>
    </section>
  );
};

export default Questions;
