"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, format, isBefore } from "date-fns";
import { Clock, Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const AllInterviews = () => {
  const heading = [
    "Position",
    "duration",
    "created",
    "expiring",
    "status",
    "actions",
  ];

  const status = ["Expired", "Active"];

  const user = useAuthStore((state) => state.user);

  const { data, isLoading, error } = useQuery({
    queryKey: ["all-interviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("userEmail", user?.email);

      if (error) {
        throw error;
      }

      return data;
    },
    enabled: !!user,
  });

  // get the created day, get the expiring day, if the expiring day is exceeded, set status as expired

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading interviews: {error.message}
      </div>
    );
  }

  console.log(data);

  const handleCopy = async (interviewId: string) => {
    const url = `http://localhost:3000/${interviewId}`;
    await navigator.clipboard.writeText(url);
    toast.success("Link Copied");
  };

  return (
    <section className="my-5">
      <header>
        <h2 className="text-2xl text-semibold">All Interviews</h2>
        <p className="text-sm text-gray-500">Manage all your created interviews</p>
      </header>
      <main className="my-10">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 border">
            <tr>
              {heading.map((tr) => (
                <th
                  key={tr}
                  className="px-6 py-3 text-left text-xs  bg-gray-100  font-medium text-gray-500 uppercase tracking-wider"
                >
                  {tr.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((interview) => {
              const now = new Date();
              const expiresAt = new Date(interview.expiresAt);
              const daysLeft = differenceInDays(expiresAt, now);

              let status = "";
              if (isBefore(expiresAt, now)) {
                status = "Expired";
              } else if (daysLeft <= 7) {
                status = "Expiring Soon";
              } else {
                status = "Active";
              }

              return (
                <tr key={interview.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {interview.jobPosition}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {interview.jobDescription}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {interview.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(interview.createdAt, "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {format(interview.expiresAt, "MMM dd, yyy")}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                      status === "Active"
                        ? "text-green-600 "
                        : status === "Expiring Soon"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(interview.interview_id)}
                        className="cursor-pointer"
                      >
                        <Copy className="h-4 w-4 cursor-pointer" />
                      </Button>
                      <a
                        href={`http://localhost:3000/interview/${interview.interview_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AllInterviews;
