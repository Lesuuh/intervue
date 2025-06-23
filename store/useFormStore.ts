// store/useFormStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FormData = {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  interviewType: string[];
};

type FormStore = {
  formData: null | FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: null,

      setFormData: (data) =>
        set((state) => ({
          formData: state.formData ? { ...state.formData, ...data } : { 
            jobPosition: data.jobPosition ?? "", 
            jobDescription: data.jobDescription ?? "", 
            duration: data.duration ?? "", 
            interviewType: data.interviewType ?? [] 
          }
        })),

      resetForm: () =>
        set({
          formData: null,
        }),
    }),
    {
      name: "form-storage",
    }
  )
);
