"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  List,
  Mail,
  MessageCircleCode,
  Plus,
  Slack,
  TimerIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const InterviewLink = () => {
  const { interviewId } = useInterviewStore();

  const url = `http://localhost:3000/interview/${interviewId}`;

  const { data: interviewData, isLoading } = useQuery({
    queryKey: ["interview-details"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("id", interviewId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!interviewId,
  });

  const expiresAt = interviewData?.expiresAt
    ? new Date(interviewData.expiresAt)
    : "In 30 days";

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Interview link copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <Loader className="text-black" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-0">
      <main className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-8 py-10">
        {/* Success Icon */}
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 ">
          <Check size={30} className="text-green-700" />
        </div>

        {/* Title & Message */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Your AI Interview is Ready
          </h1>
          <p className="text-sm text-gray-500">
            Share this link with your candidates to start the interview process
            for the {interviewData?.jobPosition} role
          </p>
        </div>

        {/* Interview Link Box */}
        <div className="bg-white w-full border border-gray-200 flex flex-col gap-4 p-5 rounded-lg">
          <div className="flex items-center justify-between text-sm font-medium text-gray-600">
            <p>Interview Link</p>
            <p className="text-gray-400">Valid for 30 days</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              value={url}
              disabled
              className="flex-1 bg-gray-50 border border-gray-200 text-sm"
            />
            <Button onClick={onCopyLink} className="w-full sm:w-auto">
              <Copy className="mr-1" size={16} /> Copy Link
            </Button>
          </div>

          <div className="flex flex-wrap justify-between text-sm text-gray-500 gap-2">
            <div className="flex items-center gap-1">
              <TimerIcon size={16} />
              <span>{interviewData?.duration} Minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <List size={16} />
              <span>{interviewData?.questionsList.length} Questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span className="text-red-500">
                Expires:{" "}
                {expiresAt
                  ? typeof expiresAt === "string"
                    ? expiresAt
                    : expiresAt.toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white w-full border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 rounded-lg ">
          <Button variant="outline" className="w-full">
            <Mail size={16} className="mr-2" /> Email
          </Button>
          <Button variant="outline" className="w-full">
            <Slack size={16} className="mr-2" /> Slack
          </Button>
          <Button variant="outline" className="w-full">
            <MessageCircleCode size={16} className="mr-2" /> WhatsApp
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white w-full border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-lg ">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2" size={16} /> Back to Dashboard
            </Button>
          </Link>
          <Link href="/create-interview">
            <Button className="w-full">
              <Plus className="mr-2" size={16} /> Create Another Interview
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default InterviewLink;
