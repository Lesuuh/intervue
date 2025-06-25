"use client";

import { useRouter } from "next/navigation";
import InterviewCard from "./InterviewCard";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";
import { InterviewDetailsProps } from "@/types";
import { toast } from "sonner";

const RecentInterviews = () => {
  const router = useRouter();
  const [recentInterviews, setRecentInterviews] = useState<
    InterviewDetailsProps[]
  >([]);
  // get interviews
  const getInterviewDetails = async () => {
    const { data: recentInterviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    if (recentInterviews) {
      setRecentInterviews(recentInterviews);
    }
    if (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const handleView = (interviewId: string) => {
    router.push(`/dashboard/interview-details/${interviewId}`);
  };

  if (!recentInterviews || recentInterviews.length === 0) {
    return (
      <main className="flex flex-col gap-4 p-4 bg-white rounded-lg ">
        <h3 className="text-lg font-semibold">Recent Interviews</h3>
        <p className="text-center py-3">No interviews created yet.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-4 p-4 bg-white rounded-lg ">
      <h3 className="text-lg font-semibold">Recent Interviews</h3>
      {recentInterviews.map((interview, index) => (
        <InterviewCard
          key={index}
          role={interview.jobPosition}
          interview_id={interview.interview_id}
          duration={interview.duration}
          createdAt={interview.createdAt}
          expiresAt={interview.expiresAt}
          onView={() => handleView(interview.interview_id)}
        />
      ))}
    </main>
  );
};

export default RecentInterviews;
