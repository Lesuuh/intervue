import { InterviewDetailsProps, InterviewState } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStartInterviewStore = create<InterviewState>()(
  persist(
    (set) => ({
      interviewDetails: null,
      username: "",
      interviewId: "",
      userEmail: "",

      setInterviewDetails: (details: InterviewDetailsProps) =>
        set({ interviewDetails: details }),

      setUsername: (name: string) => set({ username: name }),

      setInterviewId: (id: string) => set({ interviewId: id }),

      setUserEmail: (email: string) => set({ userEmail: email }),

      clearInterviewDetails: () =>
        set({
          interviewDetails: null,
          userEmail: "",
          interviewId: "",
          username: "",
        }),
    }),
    {
      name: "start-interview-storage",
    }
  )
);
