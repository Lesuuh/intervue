import { QUESTIONS_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const MOCK_QUESTIONS = [
  {
    question: "Can you explain your experience with React and Next.js?",
    type: "Technical",
  },
  {
    question: "How do you approach debugging a UI issue?",
    type: "Problem Solving",
  },
  {
    question:
      "Describe a time you worked in a team and how you handled conflicts.",
    type: "Behavioral",
  },
];

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

    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log("OpenAI error, falling back to mock questions:", error);

    // Fallback response when rate limit or other errors occur
    return NextResponse.json({
      content: JSON.stringify(MOCK_QUESTIONS),
    });
  }
}
