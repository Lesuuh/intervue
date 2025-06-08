"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormContainer from "./_components/FormContainer";
import { useState } from "react";
import QuestionsList from "./_components/QuestionsList";
import { toast } from "sonner";

const CreateNewInterview = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log("Form Data", formData);
  };

  const goToNextStep = () => {
    if (Object.keys(formData).length <= 3) {
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

  return (
    <div className="">
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
      {step === 1 && (
        <FormContainer
          goToNextStep={() => goToNextStep()}
          onHandleInputChange={onHandleInputChange}
        />
      )}
      {step === 2 && <QuestionsList formData={formData} />}
    </div>
  );
};

export default CreateNewInterview;
