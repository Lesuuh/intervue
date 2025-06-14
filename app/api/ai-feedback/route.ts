import { FEEDBACK_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { conversation } = req.json;

  //   replace conversation
  const final_prompt = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );

  //   pass the final prompt to the ai model

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: final_prompt }],
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
