import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InterviewTypes } from "@/services/constants";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const FormContainer = ({ onHandleInputChange }) => {
  const [interviewType, setInterviewType] = useState<string[]>([]);
  const handleInterviewType = (type: string) => {
    const data = interviewType.includes(type)
      ? interviewType.filter((item) => item !== type)
      : [...interviewType, type];

    setInterviewType(data);
  };

  useEffect(() => {
    onHandleInputChange("interviewType", interviewType);
  }, [interviewType]);
  return (
    <div className="p-5 bg-white rounded-xl space-y-2 w-full">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g Full Stack Developer"
          className="mt-2"
          onChange={(e) => onHandleInputChange("jobPosition", e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter details job description"
          className="h-[200px] mt-2"
          onChange={(e) =>
            onHandleInputChange("jobDescription", e.target.value)
          }
        />
      </div>
      <div className="w-full">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Mins</SelectItem>
            <SelectItem value="10">15 Mins</SelectItem>
            <SelectItem value="40">40 Mins</SelectItem>
            <SelectItem value="45">45 Mins</SelectItem>
            <SelectItem value="60">60 Mins</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap text-sm mt-2">
          {InterviewTypes.map((type, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white border border-gray-300 rounded-2xl hover:bg-secondary ${
                interviewType.includes(type.title)
                  ? "bg-blue-500 text-primary"
                  : ""
              }`}
              onClick={() => {
                handleInterviewType(type.title);
              }}
            >
              <type.icon size={16} />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button>
          Generate Question <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
