import { QUESTIONS_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// mock question
// const mockData = {
//   interviewQuestions: [
//     {
//       question:
//         "What is the virtual DOM in React, and how does it improve performance?",
//       type: "Technical",
//     },
//     {
//       question:
//         "Explain the difference between server-side rendering and client-side rendering in Next.js.",
//       type: "Technical",
//     },
//     {
//       question: "How do you optimize performance in a large React application?",
//       type: "Technical",
//     },
//     {
//       question:
//         "What are dynamic routes in Next.js and how do you implement them?",
//       type: "Technical",
//     },
//     {
//       question:
//         "Can you describe a bug you encountered in React and how you solved it?",
//       type: "Problem Solving",
//     },
//     {
//       question: "What is the purpose of the `useEffect` hook in React?",
//       type: "Technical",
//     },
//     {
//       question:
//         "What strategies do you use to manage global state in React apps?",
//       type: "Technical",
//     },
//     {
//       question:
//         "Have you used any component libraries with React or Next.js? Which ones and why?",
//       type: "Experience",
//     },
//     {
//       question: "Explain how API routes work in Next.js.",
//       type: "Technical",
//     },
//     {
//       question:
//         "Describe a time you worked under pressure to meet a deadline. How did you manage it?",
//       type: "Problem Solving",
//     },
//   ],
// };

export async function POST(req: Request) {
  const { jobPosition, jobDescription, InterviewType, duration } =
    await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", InterviewType);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    return NextResponse.json(completion.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI error:", error);
    // return NextResponse.json(JSON.stringify(mockData), { status: 200 });
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
