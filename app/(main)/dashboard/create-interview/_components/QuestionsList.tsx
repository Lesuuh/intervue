import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const QuestionsList = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);
  const generateQuestionList = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/ai-model", {
        ...formData,
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch data from server");
      }
      console.log(res.data.content);
      const content = JSON.parse(res.data.content);
      setQuestions(content);
    } catch (error) {
      toast.error("Server Error, Try again later", {
        style: {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
        },
      });
      console.log(error);
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
  return (
    <div>
      <h2>Generated Questions</h2>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="p-2 my-2 bg-white rounded-md shadow-sm">
            <h2 className="text-sm font-semibold">
              {index + 1}. {question}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
