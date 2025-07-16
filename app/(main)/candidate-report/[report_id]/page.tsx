"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase";
import { useParams } from "next/navigation";

type candidateProps = {
  id: number;
  created_at: string;
  interview_id: string;
  feedback: {
    rating: {
      technicalSkills: number;
      communication: number;
      problemSolving: number;
      experience: number;
    };
    summary: string;
    recommendation: boolean;
    recommendationMsg: string;
  };
  fullName: string;
  email: string;
  role: string;
  score: number;
};

const CandidateReport = () => {
  const { report_id } = useParams();

  const [candidate, setCandidate] = useState<candidateProps>();

  const getCandidate = async () => {
    const { data, error } = await supabase
      .from("Candidates")
      .select("*")
      .eq("id", report_id)
      .single();

    if (data) {
      setCandidate(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidate();
  }, []);

  console.log("report", candidate)

  return (
    <div className="w-full my-20 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 bg-gray-100 rounded-full uppercase text-lg font-bold justify-center flex-shrink-0 items-center text-indigo-700">
          {candidate?.fullName.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {candidate?.fullName}
          </h1>
          <p className="text-sm text-gray-500">{candidate?.role}</p>
        </div>
        <div className="ml-auto text-right">
          <span className="inline-block bg-gray-100 text-gray-800 text-lg font-semibold rounded-full px-4 py-1">
            {candidate?.score}/10
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Skills Assessment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {candidate &&
            Object.entries(candidate?.feedback.rating).map(
              ([skillName, score]) => (
                <div key={skillName} className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 font-bold mb-1">
                    <span>
                      {
                        // Convert camelCase to words e.g., "technicalSkills" -> "Technical Skills"
                        skillName
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                      }
                    </span>
                    <span>{score}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(score / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Performance Summary
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {candidate?.feedback.summary}
        </p>
      </div>

      {candidate?.feedback.recommendation === true ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Recommended for Hire</p>
              <p className="text-sm">{candidate?.feedback.recommendationMsg}</p>
            </div>
            <Button className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded">
              Proceed to Offer
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Not Recommended for Hire</p>
              <p className="text-sm">{candidate?.feedback.recommendationMsg}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateReport;
