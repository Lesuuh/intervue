import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  type: string;
}

interface QuestionListContainerProps {
  questions: Question[];
}

const QuestionListContainer = ({
  questions,
  onFinish,
}: QuestionListContainerProps) => {
  return (
    <div>
      <h2>Generated Questions:</h2>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="p-2 my-2 bg-white rounded-md shadow-sm">
            <div>
              <h2 className="text-sm font-semibold">
                {index + 1}. {question.question}
              </h2>
              <p className="text-xs italic text-gray-500">{question.type}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onFinish()}>Finish</Button>
      </div>
    </div>
  );
};

export default QuestionListContainer;
