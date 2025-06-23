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

  return (
    <div>


      {/* content */}
      {/* <main>
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
      </main> */}
    </div>
  );
};

export default CreateNewInterview;
