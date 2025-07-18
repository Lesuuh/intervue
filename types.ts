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
  interview_id: string;
  jobPosition: string;
  jobDescription: string;
  duration: string;
  createdAt: string;
  expiresAt: string;
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
export interface InterviewStartState {
  interviewDetails: InterviewDetailsProps | null;
  username: string;
  userEmail: string;
  interviewId: string;
  setInterviewDetails: (details: InterviewDetailsProps) => void;
  setUsername: (name: string) => void;
  setUserEmail: (email: string) => void;
  setInterviewId: (id: string) => void;
  clearInterviewDetails: () => void;
}

type MessageRole = "system" | "assistant" | "user";

export interface ConversationMessage {
  role: MessageRole;
  content: string;
}
