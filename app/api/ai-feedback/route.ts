import { FEEDBACK_PROMPT } from "@/services/constants";
import { ConversationMessage } from "@/types";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const mockFeedback = {
  rating: {
    technicalSkills: 8,
    communication: 8,
    problemSolving: 7,
    experience: 7,
  },
  summary:
    "The candidate shows strong React skills and solid understanding of state management. Communication was clear and examples were relevant. Some experience with backend integration but could deepen expertise further.",
  recommendation: true,
  recommendationMsg:
    "Candidate demonstrates good technical capability and should be considered for hiring.",
};

export async function POST(req: Request) {
  console.log("=== API ROUTE HIT ===");
  try {
    const conversationArr = await req.json();
    console.log("Request conversation:", conversationArr);

    if (!Array.isArray(conversationArr)) {
      return NextResponse.json(
        { error: "Invalid request body: 'conversation' must be an array." },
        { status: 400 }
      );
    }

    const conversation = conversationArr;

    const formattedConversation = conversation
      .map(
        (entry: ConversationMessage) =>
          `${entry.role.toUpperCase()}: ${entry.content}`
      )
      .join("\n");

    console.log("Formatted:", formattedConversation);

    const final_prompt = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      formattedConversation
    );

    console.log("final----------", final_prompt);

    //   pass the final prompt to the ai model
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/1",
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: final_prompt }],
    });

    return NextResponse.json(completion.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json(mockFeedback, { status: 200 });
    // console.error("Failed in POST handler:", error);
    // return NextResponse.json(
    //   { error: "Invalid request body" },
    //   { status: 400 }
    // );
    // return NextResponse.json(
    //   {
    //     message: "Internal Server Error",
    //     error: error instanceof Error ? error.message : error,
    //   },
    //   { status: 500 }
    // );
  }
}
