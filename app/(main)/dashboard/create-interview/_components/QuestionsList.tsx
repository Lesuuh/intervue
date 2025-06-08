import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type QuestionsListProps = {
  formData: {
    duration: string;
    interviewType: string[];
    jobDescription: string;
    jobPosition: string;
  };
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
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

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
      <h2>Generated Questions</h2>
      <div>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="p-2 my-2 bg-white rounded-md shadow-sm">
              <h2 className="text-sm font-semibold">
                {index + 1}. {question}
              </h2>
            </div>
          ))
        ) : (
          <p>No questions generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
