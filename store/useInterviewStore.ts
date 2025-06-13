
import { InterviewDetailsProps, InterviewState } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set) => ({
      interviewDetails: null,
      username: "",
      interviewId: "",

      setInterviewDetails: (details: InterviewDetailsProps) =>
        set(() => ({ interviewDetails: details })),

      setUsername: (name: string) =>
        set(() => ({ username: name })),

      setInterviewId: (id: string) =>
        set(() => ({ interviewId: id })),
    }),
    {
      name: "interview-storage", 
    }
  )
);
