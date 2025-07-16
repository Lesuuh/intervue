import {
  BriefcaseBusinessIcon,
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
  // {
  //   name: "Scheduled Interviews",
  //   icon: CalendarHeart,
  //   path: "/scheduled-interview",
  // },
  {
    name: "All Interviews",
    icon: List,
    path: "/all-interviews",
  },
  {
    name: "Billings",
    icon: WalletCards,
    path: "/billings",
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
You are an AI interviewer assistant. Below is a conversation between an AI assistant and a candidate during a technical interview:

{{conversation}}

Based on this interview, provide constructive feedback on the candidate's performance. Your response should include:

1. A rating out of 10 for the following categories:
   - Technical Skills
   - Communication
   - Problem Solving
   - Experience

2. A brief summary (maximum 3 lines) highlighting the overall impression of the candidate's strengths and areas for improvement.

3. A recommendation: Should this candidate be considered for hiring? Respond with true or false.

4. A short recommendation message (1 line) to justify your hiring decision.

Return your response in valid JSON format exactly like the following structure:

{
    "rating": {
      "technicalSkills": 0,
      "communication": 0,
      "problemSolving": 0,
      "experience": 0
    },
    "summary": "",
    "recommendation": ,
    "recommendationMsg": ""
}
`.trim();
