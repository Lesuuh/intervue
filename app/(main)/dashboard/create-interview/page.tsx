"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormContainer from "./_components/FormContainer";
import { useState } from "react";

const CreateNewInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log("Form Data", formData);
  };

  return (
    <div className="lg:px-40">
      <div className="flex gap-2 items-center">
        <ArrowLeft
          onClick={() => router.back()}
          className="w-5 cursor-pointer"
        />
        <h2 className="font-semibold">Create New Interview</h2>
      </div>
      <div className="my-5">
        <Progress value={step * 33} />
      </div>
      <FormContainer onHandleInputChange={onHandleInputChange} />
    </div>
  );
};

export default CreateNewInterview;
