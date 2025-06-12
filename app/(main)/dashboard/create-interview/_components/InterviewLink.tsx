import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterviewLinkProps } from "@/types";
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  Facebook,
  List,
  Mail,
  Plus,
  Slack,
  TimerIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const InterviewLink = ({ interviewId, formData }: InterviewLinkProps) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId;
  const getInterviewUrl = () => {
    return url;
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Interview link copied to clipboard")
  };

  return (
    <div className="w-full">
      <main className="w-full mx-auto flex flex-col items-center justify-center gap-6 py-6">
        {/* Success Icon */}
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 shadow-[0_4px_15px_rgba(34,197,94,0.5)]">
            <Check size={20} className="text-white" />
          </div>
        </div>

        {/* Title & Message */}
        <h1 className="text-center text-2xl font-semibold">
          Your AI Interview is Ready
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Share this link with your candidates to start the interview process
        </p>

        {/* Interview Link Box */}
        <div className="bg-white w-full flex flex-col gap-3 p-4 rounded-md shadow-sm">
          <div className="flex items-center justify-between text-sm font-medium">
            <p>Interview link</p>
            <p>Valid for 30 days</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              defaultValue={getInterviewUrl()}
              disabled
              className="flex-1"
            />
            <Button onClick={onCopyLink} className="w-full sm:w-auto">
              <Copy className="mr-1" /> Copy Link
            </Button>
          </div>

          <div className="flex flex-wrap justify-between text-sm text-muted-foreground gap-2">
            <div className="flex items-center gap-1">
              <TimerIcon size={16} />
              <span>{formData.duration} Minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <List size={16} />
              <span>10 Questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Expires: Nov 20, 2025</span>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white w-full grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 rounded-md shadow-sm">
          <Button variant="outline">
            <Mail className="mr-1" /> Email
          </Button>
          <Button variant="outline">
            <Slack className="mr-1" /> Slack
          </Button>
          <Button variant="outline">
            <Facebook className="mr-1" /> WhatsApp
          </Button>
        </div>

        {/* Navigation Buttons as Links */}
        <div className="bg-white w-full grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-md shadow-sm">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-1" /> Back to Dashboard
            </Button>
          </Link>
          <Link href="/create-interview">
            <Button variant="outline" className="w-full">
              <Plus className="mr-1" /> Create another interview
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default InterviewLink;
