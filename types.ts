export interface FormData {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  interviewType: string[];
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

export interface InterviewDetailsProps {
  id: string;
  created_at: string;
  jobPosition: string;
  jobDescription: string;
  duration: string;
  interviewType: string[];
  questionsList: Question[];
}

export interface InterviewState {
  interviewDetails: InterviewDetailsProps | null;
  username: string;
  userEmail: string;
  interviewId: string;
  setInterviewDetails: (details: InterviewDetailsProps) => void;
  setUsername: (name: string) => void;
  setUserEmail: (email: string) => void;
  setInterviewId: (id: string) => void;
}

type MessageRole = "system" | "assistant" | "user";

export interface ConversationMessage {
  role: MessageRole;
  content: string;
}
