export interface FormData {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string[];
}

export type Question = {
  question: string;
  type: string;
};

export interface QuestionsListProps {
  formData: FormData;
  onCreateLink: (id: string) => void;
}

export interface QuestionListContainerProps {
  questions: Question[];
  onFinish: () => void;
}

export interface InterviewLinkProps {
  interviewId: string;
  formData: FormData;
}
