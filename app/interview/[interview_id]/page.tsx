"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import { TimerIcon, Video } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const Interview = () => {
  const interviewId = useParams();
  console.log(interviewId?.interview_id);

  const getInterviewDetails = async () => {
    const { data: interviewDetails, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interviewId?.interview_id);

    if (error) {
      toast.error("Failed to fetch interview details");
      return;
    }

    console.log(interviewDetails);
  };

  getInterviewDetails();

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
        <h1>Full Stack Developer Interview</h1>
        <div className="flex items-center">
          <TimerIcon />
          <span>30 Minutes</span>
        </div>
        <div className="w-full flex flex-col items-start justify-center">
          <label htmlFor="name">Enter your name </label>
          <Input
            type="text"
            name="name"
            placeholder="e.g Jane Smith"
            id="name"
          />
        </div>

        <Button className="w-full">
          <Video /> Join Interview
        </Button>
      </main>
    </section>
  );
};

export default Interview;
