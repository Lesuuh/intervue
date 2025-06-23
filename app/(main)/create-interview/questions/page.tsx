import { Pen, Trash2 } from "lucide-react";
import React from "react";

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
    </section>
  );
};

export default Questions;
