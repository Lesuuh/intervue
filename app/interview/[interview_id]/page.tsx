"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import { useStartInterviewStore } from "@/store/useStartInterviewStore";
import { InterviewDetailsProps } from "@/types";
import { BrainCircuit, Loader, Loader2Icon, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Interview = () => {
  const { interview_id } = useParams();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const [interviewDetails, setInterviewDetails] =
    useState<InterviewDetailsProps>();

  const setCandidateEmail = useStartInterviewStore(
    (state) => state.setUserEmail
  );
  const setCandidateName = useStartInterviewStore((state) => state.setUsername);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    setisLoading(true);
    try {
      if (!interview_id) {
        setisLoading(false);
        toast.error("Interview is missing or not found");
        return;
      }
      const { data, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interview_id)
        .single();

      if (error || !data) {
        toast.error("Failed to fetch interview details");
        return;
      }

      if (data) {
        setInterviewDetails(data);
      }
    } catch (error) {
      setisLoading(false);
      const err = error as Error;
      toast.error(`Interview not found ${err.message}`);
    } finally {
      setisLoading(false);
    }
  };

  const startInterview = async () => {
    if (!fullName || !email) {
      toast.error("Please enter all details to proceed");
    }

    const { error } = await supabase
      .from("Candidates")
      .insert({
        email: email,
        fullName: fullName,
        interview_id: interview_id,
        role: role,
      })
      .select();

    if (error) {
      console.log(error.message);
    }

    setCandidateEmail(email);
    setCandidateName(fullName);

    router.push(`/interview/${interview_id}/start?name=${fullName}`);
  };

  console.log(interviewDetails);
  if (isLoading) {
    return (
      <div className="flex items-center  min-h-screen justify-center p-4">
        <Loader className="h-6 w-6 animate-spin text-black" />
      </div>
    );
  }

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
          Start your {interviewDetails?.jobPosition} interview
        </h2>
        <div className="w-full flex flex-col items-start justify-center space-y-4">
          <div className="w-full">
            <label htmlFor="name" className="text-[.9rem]">
              Fullname{" "}
            </label>
            <Input
              type="text"
              name="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g janesmith@gmail.com"
              id="email"
              className="my-1 py-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="role" className="text-[.9rem]">
              Role{" "}
            </label>
            <Input
              type="text"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g frontend developer"
              id="role"
              className="my-1 py-3"
            />
          </div>
        </div>

        <Button
          onClick={startInterview}
          disabled={!fullName}
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
