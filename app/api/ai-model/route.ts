import { QUESTIONS_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { jobPosition, jobDescription, InterviewType, duration } =
    await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", InterviewType);

  console.log(FINAL_PROMPT);
  console.log("hello");

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
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    const errorStatus =
      typeof error === "object" && error !== null && "status" in error
        ? error.status
        : 500;
    return NextResponse.json({ message: errorMessage, status: errorStatus });
  }
}
