"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useFormStore";
import { useInterviewStore } from "@/store/useInterviewStore";
import { Question } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Dot, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const questionList = [
  {
    id: 1,
    type: "Behavioural",
    label: "Q1",
    question: "Tell me about your experience with frontend development.",
  },
  {
    id: 2,
    type: "Technical",
    label: "Q2",
    question: "What is the virtual DOM and how does it work in React?",
  },
  {
    id: 3,
    type: "Technical",
    label: "Q3",
    question: "Can you explain the difference between let, const, and var?",
  },
  {
    id: 4,
    type: "Behavioural",
    label: "Q4",
    question: "Describe a time you overcame a challenge in a team project.",
  },
  {
    id: 5,
    type: "System Design",
    label: "Q5",
    question:
      "How would you design a scalable component architecture in React?",
  },
];

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
  const setInterview_id = useInterviewStore((state) => state.setInterviewId);

  useEffect(() => {
    if (formData) {
      generateQuestions();
    }
  }, []);

  // generate questions using AI
  const generateQuestions = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await axios.post("/api/ai-model", { ...formData });

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

  // then send the question to supabase along with the interview_id
  const onFinish = async () => {
    const interview_id = uuidv4();
    try {
      const { data, error } = await supabase
        .from("Interviews")
        .insert([
          {
            ...formData,
            questionsList: JSON.stringify(questions),
            userEmail: user?.email,
            interview_id: interview_id,
          },
        ])
        .select();

      setInterview_id(interview_id);

      if (error) {
        throw error;
      }

      toast.success("Interview Questions generated successfully");
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to save interview: ${error.message}`);
      } else {
        toast.error("Failed to save interview: Unknown error");
      }
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-col gap-2 w-full border border-primary rounded-sm p-5 bg-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-blue-300 border-t-primary"></div>
        <p className="text-xs font-bold">Hold on small, questions dey come</p>
        <p className="text-primary">
          Our AI is crafting personalized questions based on your inputs
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col gap-2 w-full border border-red-500 rounded-sm p-5 bg-red-100">
        <p className="text-red-500">
          An Error occurred while generating questions, please try again
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
        {questionList.map((q) => (
          <div key={q.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-gray-500">{q.label}</p>
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
          {questionList.length} questions <Dot /> Estimated duration: 30 minutes
        </p>
        <Link href={"/create-interview/share"}>
          <Button>Looks good - Continue</Button>
        </Link>
      </div>
    </section>
  );
};

export default Questions;
