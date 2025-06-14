"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import { Bot, CircleUserRoundIcon, Mic, Phone, Timer } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useEffect } from "react";
import AlertConfirmation from "./_components/AlertConfirmation";

const Start = () => {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY!);

  const interviewDetails = useInterviewStore((state) => state.interviewDetails);
  const username = useInterviewStore((state) => state.username);

  console.log(interviewDetails?.questionsList);

  useEffect(() => {
    if (interviewDetails) {
      startCall();
    }
  }, [interviewDetails]);

  const startCall = async () => {
    const rawQuestionList = interviewDetails?.questionsList;
    let parsedList = [];

    try {
      parsedList =
        typeof rawQuestionList === "string"
          ? JSON.parse(rawQuestionList)
          : rawQuestionList;
    } catch (error) {
      console.error("Failed to parse questionsList", error);
      return;
    }

    const questionList = parsedList.map(
      (q: { question: string }) => q.question
    );

    await vapi.start({
      name: "AI Recruiter",
      firstMessage: `Hi ${username}, how are you? Ready for your interview on ${interviewDetails?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM",
      },
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewDetails?.jobPosition} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise.

Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging — use casual phrases like:
"Alright, next up..." or "Let's tackle a tricky one!"

After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty
- Keep responses short and natural, like a real conversation
- Adapt based on the candidate's confidence level

Ensure the interview remains focused on React.
`.trim(),
          },
        ],
      },
    });
  };

  const handleStopInterview = () => {
    vapi.stop();
  };

  return (
    <section className="flex justify-center w-full mx-auto items-center min-h-screen">
      <main className="flex flex-col justify-center items-center max-w-2xl w-full p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-between w-full">
          <h2>AI Interview Session</h2>
          <span className="flex items-center gap-2">
            <Timer />
            00:00:00
          </span>
        </div>
        <div className="w-full grid grid-cols-1 my-5 sm:grid-cols-2 gap-3">
          <div className="bg-white w-full h-60 rounded-lg flex justify-center items-center">
            <div className="flex flex-col items-center ">
              {" "}
              <Bot />
              <p>Recruiter</p>
            </div>
          </div>
          <div className="bg-white w-full h-60 rounded-lg flex justify-center items-center">
            <div className="flex flex-col items-center ">
              {" "}
              <CircleUserRoundIcon />
              {username}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Mic size={14} className="bg-white p-2 rounded-full w-10 h-10" />
          <AlertConfirmation handleStopInterview={() => handleStopInterview()}>
            <Phone
              size={14}
              className="bg-red-500 p-2 rounded-full w-10 h-10 text-white"
            />
          </AlertConfirmation>
        </div>
        <p>Interview in progress</p>
      </main>
    </section>
  );
};

export default Start;
