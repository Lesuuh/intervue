import { Question } from "@/types";
import { create } from "zustand";

interface InterviewState {
  interview: Question[];
  setInterview: (questions: Question[]) => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  interview: [],
  setInterview: (questions) => set(() => ({ interview: questions || [] })),
}));
