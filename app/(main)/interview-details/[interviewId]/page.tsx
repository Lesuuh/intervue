"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase";
import { InterviewDetailsProps } from "@/types";
import { Calendar, Clock, Clock2, Tag } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const InterviewDetails = () => {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState<InterviewDetailsProps>();
  const [candidates, setCandidates] = useState<any[]>([]);

  // Get interview details
  const getInterviewDetails = async () => {
    const { data: interview, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interviewId)
      .maybeSingle();

    if (interview) {
      // Parse questionsList if it's a string
      if (typeof interview.questionsList === "string") {
        try {
          interview.questionsList = JSON.parse(interview.questionsList);
        } catch {
          interview.questionsList = [];
        }
      }
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
      getInterviewCandidates(interviewId as string);
    }
  }, [interviewId]);

  const getInterviewCandidates = async (interviewId: string) => {
    const { data, error } = await supabase
      .from("Candidates")
      .select("*")
      .eq("interview_id", interviewId);
    if (error) {
      console.error(error);
    } else {
      console.log("Candidates:", data);
      setCandidates(data);
    }
  };

  console.log(candidates);

  return (
    <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="bg-white shadow-lg rounded-xl p-6 mb-8 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Interview Details
        </h2>
      </header>
      <main className="bg-white shadow-lg rounded-xl p-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {interview?.jobPosition || "Loading..."}
          </h2>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium transition-colors duration-200 hover:bg-green-200">
            Active
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-500 font-medium">Duration</p>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={18} className="text-indigo-500" />
              <span className="text-sm">
                {interview?.duration || "N/A"} Minutes
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-500 font-medium">Created on</p>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar size={18} className="text-indigo-500" />
              <span className="text-sm">{interview?.createdAt || "N/A"}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-500 font-medium">Type</p>
            <div className="flex items-center gap-2 text-gray-700">
              <Tag size={18} className="text-indigo-500" />
              <span className="text-sm">
                {Array.isArray(interview?.interviewType)
                  ? interview.interviewType.join(", ") || "N/A"
                  : interview?.interviewType || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-500 font-medium">Expires</p>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock2 size={18} className="text-indigo-500" />
              <span className="text-sm">{interview?.expiresAt || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Job Description
          </h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
            {interview?.jobDescription || "No description available."}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Interview Questions
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            {Array.isArray(interview?.questionsList) &&
            interview.questionsList.length > 0 ? (
              interview.questionsList.map((question, index) => (
                <p key={index} className="text-gray-600 flex items-start gap-2">
                  <span className="text-indigo-500 font-medium">
                    {index + 1}.
                  </span>
                  {typeof question === "string"
                    ? question
                    : question.question ?? "No question text"}
                </p>
              ))
            ) : (
              <p className="text-gray-500 italic">No questions available.</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {" "}
            {candidates.length === 0
              ? "No Candidates"
              : `${candidates.length} Candidate${
                  candidates.length > 1 ? "s" : ""
                }`}
          </h3>

          <div className="text-gray-600 bg-gray-50 p-4 rounded-lg">
            {candidates.length === 0 ? (
              "No Candidates"
            ) : (
              <div className="grid gap-4 ">
                {candidates.map((cdn, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg uppercase">
                      {cdn.fullName?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {cdn.fullName}
                      </p>
                      <p className="text-sm text-gray-500">{cdn.email}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <p>{cdn.score} / 10</p>

                      <Button
                        className=" px-3 py-3 rounded bg-black text-white text-xs font-semibold hover:bg-gray-900 transition"
                        onClick={() => {
                          // Replace with your navigation logic, e.g.:
                          // router.push(`/candidates/${cdn.id}`)
                          alert(`View candidate: ${cdn.fullName}`);
                        }}
                      >
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default InterviewDetails;
