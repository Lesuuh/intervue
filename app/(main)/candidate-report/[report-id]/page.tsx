"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const CandidateReport = () => {
  const candidate = {
    name: "Michael Chen",
    position: "Full Stack Developer Position",
    score: 8.5,
    skills: [
      { name: "Technical Skills", score: 9 },
      { name: "Problem Solving", score: 8 },
      { name: "Communication", score: 8.5 },
      { name: "Experience", score: 8.5 },
    ],
    summary:
      "Michael demonstrated exceptional technical proficiency and problem-solving abilities. His communication was clear and professional throughout the interview. He showed strong understanding of full-stack development concepts and provided excellent examples from his past experience.",
    recommended: false,
  };

  return (
    <div className="w-full my-20 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 bg-gray-100 rounded-full uppercase text-lg font-bold justify-center flex-shrink-0 items-center text-indigo-700">
          {candidate.name?.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-sm text-gray-500">{candidate.position}</p>
        </div>
        <div className="ml-auto text-right">
          <span className="inline-block bg-gray-100 text-gray-800 text-lg font-semibold rounded-full px-4 py-1">
            {candidate.score}/10
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Skills Assessment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {candidate.skills.map((skill) => (
            <div key={skill.name} className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 font-bold mb-1">
                <span>{skill.name}</span>
                <span>{skill.score}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(skill.score / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Performance Summary
        </h2>
        <p className="text-gray-600 leading-relaxed">{candidate.summary}</p>
      </div>

      {candidate.recommended ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Recommended for Hire</p>
              <p className="text-sm">
                Candidate shows strong potential and matches our requirements
              </p>
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
              <p className="text-sm">
                Candidate did not meet all key criteria for this position.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateReport;
