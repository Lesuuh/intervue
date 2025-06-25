"use client";
import { supabase } from "@/services/supabase";
import { InterviewDetailsProps } from "@/types";
import { Calendar, Clock, Clock2, Tag } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const InterviewDetails = () => {
  const { interviewId } = useParams();

  const [interview, setInterview] = useState<InterviewDetailsProps>();
  // get interviews
  const getInterviewDetails = async () => {
    const { data: interview, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interviewId)
      .maybeSingle();

    if (interview) {
      setInterview(interview);
    }
    if (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getInterviewDetails();
    }
  }, []);

  return (
    <section className="">
      <header className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Interview Details</h2>
      </header>
      <main className="bg-white p-6 my-7 rounded-lg space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{interview?.jobPosition}</h2>
          <p className="px-2 py-1 rounded-lg bg-green-100 text-green-500 text-sm">
            Active
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex  flex-col ">
            <p className="text-gray-600 text-sm">Duration</p>
            <div className="flex items-center gap-2">
              <Clock size={16} /> {interview?.duration} Minutes
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">Created on</p>
            <div className="flex items-center gap-1">
              <Calendar size={16} /> {interview?.createdAt}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">Type</p>
            <div>
              <Tag size={16} />
              {/* {interview?.interviewType.map((type, index) => (
                  <p key={index}>{type}</p>
                ))} */}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">Expires</p>
            <div className="flex items-center gap-1">
              <Clock2 size={16} /> {interview?.expiresAt}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Job Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap">
            {interview?.jobDescription}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Interview Questions</h3>
          {/* {interview?.questionsList.map((question, index) => (
            <p key={index}>
              {typeof question === "string"
                ? question
                : question.question ?? ""}
            </p>
          ))} */}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Candidates (3)</h3>
        </div>
      </main>
    </section>
  );
};

export default InterviewDetails;
