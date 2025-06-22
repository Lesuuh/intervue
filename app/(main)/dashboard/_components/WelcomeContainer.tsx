"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { BellRing } from "lucide-react";

const WelcomeContainer = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="bg-white p-3 rounded-2xl w-full flex justify-between items-center shadow-md">
      <div>
        <h2 className="text-lg">
          Welcome back, <span className="font-bold">{user?.username}</span>
        </h2>
        <h2 className="text-gray-500 text-sm">
          AI-Driver Interview Hassel-Free Hiring
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <BellRing />
      </div>
    </div>
  );
};

export default WelcomeContainer;
