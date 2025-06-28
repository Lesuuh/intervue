import { supabase } from "@/services/supabase";
import { FormData, Question } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";

interface CreateInterviewProps {
  formData: FormData;
  questions: Question[];
  userEmail: string | null;
}

export function useCreateInterview() {
  return useMutation({
    mutationFn: async ({
      formData,
      questions,
      userEmail,
    }: CreateInterviewProps) => {
      const interview_id = uuidv4();
      const { data, error } = await supabase
        .from("Interviews")
        .insert([
          {
            ...formData,
            interview_id: interview_id,
            questionsList: JSON.stringify(questions),
            userEmail: userEmail,
            createdAt: new Date().toISOString(),
            expiresAt: addDays(new Date(), 30).toISOString(),
          },
        ])
        .select("*");
      if (error) throw error;
      return data;
    },
  });
}
