"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import { useInterviewStore } from "@/store/useInterviewStore";
import { InterviewDetailsProps } from "@/types";

import {
  BrainCircuit,
  Loader,
  Loader2Icon,
  TimerIcon,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Interview = () => {
  const interviewId = useParams();
  const [interviewData, setInterviewData] =
    useState<InterviewDetailsProps | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const setInterview = useInterviewStore((state) => state.setInterviewDetails);
  const setInterviewId = useInterviewStore((state) => state.setInterviewId);
  const setUsername = useInterviewStore((state) => state.setUsername);
  const setEmail = useInterviewStore((state) => state.setUserEmail);
  const router = useRouter();

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    setisLoading(true);
    try {
      if (!interviewId?.interview_id) {
        setisLoading(false);
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
        setInterview(interviewDetails[0]);
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
    if (!userName) {
      toast.error("Please enter your name to join the interview");
    }

    setUsername(userName);
    setEmail(userEmail);
    setInterviewId(interviewId?.interview_id as string);
    router.push(
      `/interview/${interviewId?.interview_id}/start?name=${userName}`
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center  min-h-screen justify-center p-4">
        <Loader className="h-6 w-6 animate-spin text-black" />
      </div>
    );
  }

  // if (notFound || !interviewData) {
  //   return (
  //     <section className="flex mx-auto w-full justify-center items-center bg-gray-100 min-h-screen ">
  //       <main className="flex flex-col bg-white w-full max-w-xl px-20 py-4 rounded-lg items-center justify-center gap-4">
  //         <h2>Interview not found</h2>
  //         <p>Please check the interview link or contact support.</p>
  //       </main>
  //     </section>
  //   );
  // }

  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white items-center justify-center">
      <div className="my-2 flex items-center">
        <BrainCircuit className="text-blue-700" size={50} />
        <h2 className="text-3xl font-semibold ml-1">AI Interview</h2>
      </div>
      <p className="text-gray-500 mb-4">
        Complete your interview in just 15 minutes
      </p>
      <main className="p-6 rounded space-y-6 w-full bg-white max-w-md border-1 shadow-1">
        <h2 className="text-xl font-semibold text-center">
          Start your interview
        </h2>
        <div className="w-full flex flex-col items-start justify-center space-y-4">
          <div className="w-full">
            <label htmlFor="name" className="text-[.9rem]">
              Fullname{" "}
            </label>
            <Input
              type="text"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g Jane Smith"
              id="name"
              className="my-1 py-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-[.9rem]">
              Email{" "}
            </label>
            <Input
              type="text"
              name="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="e.g janesmith@gmail.com"
              id="email"
              className="my-1 py-3"
            />
          </div>
        </div>

        <Button
          onClick={onJoinInterview}
          disabled={!userName}
          className="w-full py-3 cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2Icon /> Starting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Video /> Start Interview
            </span>
          )}
        </Button>
      </main>
    </section>
  );
};

export default Interview;
