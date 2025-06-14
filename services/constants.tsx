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

export const FEEDBACK_PROMPT = `
{{conversation}}
Depends on this Interview Conversation between assistant and user,
Give me feedback for user interview. Give me rating out of 10 for Technical Skills,
Communication, Problem Solving, Experience. Also give me summary in 3 lines
about the interview and one line to let me know whether they are recommended
for hire or not with a message. Give me response in JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "summary": "The candidate shows a fair level of technical knowledge but still needs improvement in structured problem-solving. Communication was understandable, though slightly informal in approach. Experience appears solid, with practical exposure to real-world projects.",
    "recommendation": "No",
    "recommendationMsg": "Candidate has potential but would benefit from further training and hands-on project involvement before taking on this role."
  }
}
`;
