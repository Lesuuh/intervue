import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { v4 as uuidv4 } from "uuid";

type QuestionsListProps = {
  formData: {
    duration: string;
    interviewType: string[];
    jobDescription: string;
    jobPosition: string;
  };
};

type Question = {
  question: string;
  type: string;
};

const cleanJsonString = (str: string) => {
  let cleaned = str.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
  }
  return cleaned;
};

const QuestionsList = ({ formData }: QuestionsListProps) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState(false);
  const user = useAuthStore((state) => state.user);
  console.log(user.email);

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);
  console.log(formData);

  const generateQuestionList = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await axios.post("/api/ai-model", { ...formData });

      if (res.status !== 200) {
        throw new Error("Failed to fetch data from server");
      }

      const cleanContent = cleanJsonString(res.data.content);

      const content = JSON.parse(cleanContent);

      if (!Array.isArray(content)) {
        throw new Error("Invalid response format: expected an array");
      }

      setQuestions(content);
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

  const onFinish = async () => {
    const interview_id = uuidv4();

    try {
      const { data, error } = await supabase
        .from("Interviews")
        .insert([
          {
            ...formData,
            questionsList: JSON.stringify(questions), // stringify if JSON column
            userEmail: user?.email,
            interview_id: interview_id,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      toast.success("Interview Questions generated successfully");
      console.log(data);
    } catch (error) {
      toast.error(`Failed to save interview: ${error.message}`);
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
    <div>
      <QuestionListContainer questions={questions} onFinish={onFinish} />
    </div>
  );
};

export default QuestionsList;
