"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormContainer from "./_components/FormContainer";
import { useState } from "react";
import QuestionsList from "./_components/QuestionsList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";
import { FormData } from "@/types";

const CreateNewInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    interviewType: [],
  });
  const [interviewId, setInterviewId] = useState<string | null>(null);

  const onHandleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goToNextStep = () => {
    if (
      !formData.jobPosition ||
      !formData.jobDescription ||
      !formData.duration ||
      formData.interviewType.length === 0
    ) {
      toast.error("Please fill all the fields", {
        style: {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
        },
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const onCreateLink = (interview_id: string) => {
    setInterviewId(interview_id);
    setStep((prev) => prev + 1);
  };

  return (
    <div>
      {/* header */}
      <header className="flex gap-2 items-center">
        <ArrowLeft
          onClick={() => router.back()}
          className="w-5 cursor-pointer"
        />
        <h2 className="font-semibold">Create New Interview</h2>
      </header>

      {/* progress bar */}
      <div className="my-5">
        <Progress value={step * 33} />
      </div>

      {/* content */}
      <main>
        {step === 1 && (
          <FormContainer
            goToNextStep={goToNextStep}
            onHandleInputChange={onHandleInputChange}
          />
        )}
        {step === 2 && (
          <QuestionsList formData={formData} onCreateLink={onCreateLink} />
        )}
        {step === 3 && interviewId && (
          <InterviewLink interviewId={interviewId} formData={formData} />
        )}
      </main>
    </div>
  );
};

export default CreateNewInterview;
