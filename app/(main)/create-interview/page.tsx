"use client";

import { useRouter } from "next/navigation";
import FormContainer from "./_components/FormContainer";
import { useState } from "react";
import { toast } from "sonner";
import { FormData } from "@/types";

const CreateNewInterview = () => {
  const router = useRouter();
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
      !formData.duration
    ) {
      toast.error("Please fill in all fields before proceeding.");
      return;
    } else if (!formData.interviewType.length) {
      toast.error("Please select at least one interview type.");
    } else {
      router.push("/create-interview/questions");
    }
  };
  return (
    <div>
      <FormContainer
        goToNextStep={goToNextStep}
        onHandleInputChange={onHandleInputChange}
      />
    </div>
  );
};

export default CreateNewInterview;
