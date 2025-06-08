import {
  BriefcaseBusinessIcon,
  CalendarHeart,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  User2Icon,
  Users,
  WalletCards,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Schedueled Interview",
    icon: CalendarHeart,
    path: "/scheduled-interview",
  },
  {
    name: "All Interviews",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewTypes = [
  { title: "Technical", icon: Code2Icon },
  {
    title: "Behavioural",
    icon: User2Icon,
  },
  { title: "Experience", icon: BriefcaseBusinessIcon },
  { title: "Problem Solving", icon: Puzzle },
  { title: "Leadership", icon: Users },
];

export const QUESTIONS_PROMPT = `
You are an expert technical interviewer. 
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}

Job Description: {{jobDescription}}

Interview Duration: {{duration}} minutes

Interview Type(s): {{type}}

Your task:

- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- Generate a list of interview questions tailored to the interview duration.
- Match the tone and depth to the interview type(s).
- Return your response strictly as a JSON array named "interviewQuestions" with objects containing:
  {
    "question": "string",
    "type": "Technical" | "Behavioral" | "Experience" | "Problem Solving" | "Leadership"
  }

Example:

interviewQuestions = [
  {
    "question": "Describe your experience with React and Next.js.",
    "type": "Technical"
  },
  ...
]

Only output the JSON array. Do not add any explanation or extra text.
`;
