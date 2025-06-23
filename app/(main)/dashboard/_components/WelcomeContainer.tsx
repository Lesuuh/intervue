"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Plus } from "lucide-react";

const WelcomeContainer = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold text-[2rem] ">Welcome back, lesuuh</h2>
        <p className="text-gray-600">
          Great interview start with great questions
        </p>
      </div>
      <div className="flex flex-col sm:flex-row space-x-4 items-center justify-between p-10 bg-gradient-to-r from-black to-slate-800 rounded-lg text-white">
        <div>
          <h3 className="font-semibold text-3xl mb-2">
            Create Your Next Interview
          </h3>
          <p className="text-sm text-slate-300">
            Generate AI-powered questions and share interview links in minutes
          </p>
        </div>
        <Button className="flex cursor-pointer bg-secondary mt-2 sm:mt-0 text-primary items-center gap-2">
          <Plus /> Create Interview
        </Button>
      </div>
    </div>
  );
};

export default WelcomeContainer;
