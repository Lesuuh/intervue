"use client";

import { useRouter } from "next/navigation";
import FormContainer from "./_components/FormContainer";
import { useState } from "react";
import { toast } from "sonner";
import { FormData } from "@/types";
import { useFormStore } from "@/store/useFormStore";

const CreateNewInterview = () => {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<FormData>({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    interviewType: [],
  });
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const setFormData = useFormStore((state) => state.setFormData);
  const formData = useFormStore((state) => state.formData);

  const onHandleInputChange = (field: string, value: string | string[]) => {
    setFormDetails((prev) => ({ ...prev, [field]: value }));
  };
  const goToNextStep = () => {
    if (
      !formDetails.jobPosition ||
      !formDetails.jobDescription ||
      !formDetails.duration
    ) {
      toast.error("Please fill in all fields before proceeding.");
      return;
    } else if (!formDetails.interviewType.length) {
      toast.error("Please select at least one interview type.");
    } else {
      setFormData(formDetails);
      console.log(formData);
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
