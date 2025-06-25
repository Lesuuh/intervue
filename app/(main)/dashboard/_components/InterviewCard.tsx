"use client";

import { Calendar, Clock, Eye, TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type InterviewCardProps = {
  interview_id: string;
  role: string;
  duration: string;
  createdAt: string | Date;
  expiresAt: string | Date;
  onView: (interview_id: string) => void;
};

export default function InterviewCard({
  role,
  duration,
  createdAt,
  expiresAt,
  onView,
  interview_id
}: InterviewCardProps) {
  return (
    <div className="bg-white shadow-1 rounded-2xl p-5 space-y-4 border-1">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{role}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(interview_id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          Created: {format(new Date(createdAt), "PPpp")}
        </div>
        <div className="flex items-center gap-2">
          <TimerReset className="w-4 h-4 text-gray-500" />
          Expires: {format(new Date(expiresAt), "PPpp")}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          Duration: {duration}
        </div>
      </div>
    </div>
  );
}
