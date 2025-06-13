"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import { useInterviewStore } from "@/store/useInterviewStore";
import { InterviewDataProps } from "@/types";
import { TimerIcon, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Interview = () => {
  const interviewId = useParams();
  const [interviewData, setInterviewData] = useState<InterviewDataProps | null>(
    null
  );
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState(false);
  const [userName, setUserName] = useState("");
  const setInterview = useInterviewStore((state) => state.setInterview);
  const interview = useInterviewStore((state) => state.interview);
  const router = useRouter();

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      setisLoading(true);
      if (!interviewId?.interview_id) {
        setisLoading(false);
        setNotFound(true);
        toast.error("Interview is missing or not found");
        return;
      }
      const { data: interviewDetails, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interviewId?.interview_id);

      if (error || !interviewDetails) {
        toast.error("Failed to fetch interview details");
        return;
      }

      if (interviewDetails && interviewDetails.length > 0) {
        setInterviewData(interviewDetails[0]);
        setInterview(interviewDetails[0].questions ?? []);
      }
    } catch (error) {
      setisLoading(false);
      const err = error as Error;
      toast.error(`Interview not found ${err.message}`);
    } finally {
      setisLoading(false);
    }
  };

  const onJoinInterview = () => {
    setInterview(interviewData?.questionsList || []);
    if (!userName) {
      toast.error("Please enter your name to join the interview");
    }
    router.push(
      `/interview/${interviewId?.interview_id}/start?name=${userName}`
    );
  };
  console.log(interview);
  if (isLoading) {
    return (
      <section className="flex mx-auto w-full justify-center items-center bg-gray-100 min-h-screen ">
        <main className="flex flex-col bg-white w-full max-w-xl px-20 py-4 rounded-lg items-center justify-center gap-4">
          <h2>Loading...</h2>
        </main>
      </section>
    );
  }

  if (notFound || !interviewData) {
    return (
      <section className="flex mx-auto w-full justify-center items-center bg-gray-100 min-h-screen ">
        <main className="flex flex-col bg-white w-full max-w-xl px-20 py-4 rounded-lg items-center justify-center gap-4">
          <h2>Interview not found</h2>
          <p>Please check the interview link or contact support.</p>
        </main>
      </section>
    );
  }

  return (
    <section className="flex mx-auto w-full justify-center items-center bg-gray-100 min-h-screen ">
      <main className="flex  flex-col bg-white w-full max-w-xl px-20 py-4 rounded-lg items-center justify-center gap-4">
        <h2>Ai Cruiter</h2>
        <p>AI-Powered Interview Platform</p>
        <Image
          src={"/undraw_interview_yz52.svg"}
          width={200}
          height={100}
          alt="interview-image"
        ></Image>
        <h1>{interviewData?.jobPosition} Interview</h1>
        <div className="flex items-center">
          <TimerIcon />
          <span>{interviewData?.duration} Minutes</span>
        </div>
        <div className="w-full flex flex-col items-start justify-center">
          <label htmlFor="name">Enter your name </label>
          <Input
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g Jane Smith"
            id="name"
          />
        </div>

        <Button
          onClick={onJoinInterview}
          disabled={!userName}
          className="w-full"
        >
          <Video /> Join Interview
        </Button>
      </main>
    </section>
  );
};

export default Interview;
