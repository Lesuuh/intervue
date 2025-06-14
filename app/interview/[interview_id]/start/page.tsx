"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import { Bot, CircleUserRoundIcon, Mic, Phone, Timer } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useEffect, useRef, useState } from "react";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";

type MessageRole = "system" | "assistant" | "user";

interface ConversationMessage {
  role: MessageRole;
  content: string;
}

// const conversation = [
//   {
//     role: "system",
//     content:
//       "You are an AI voice assistant conducting interviews.\nYour job is to ask candidates provided interview questions, and assess their responses.\n\nBegin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:\n\"Hey there! Welcome to your backend interview. Let's get started with a few questions!\"\n\nAsk one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise.\n\nQuestions: What is the virtual DOM in React, and how does it improve performance?,Explain the difference between server-side rendering and client-side rendering in Next.js.,How do you optimize performance in a large React application?,What are dynamic routes in Next.js and how do you implement them?,Can you describe a bug you encountered in React and how you solved it?,What is the purpose of the `useEffect` hook in React?,What strategies do you use to manage global state in React apps?,Have you used any component libraries with React or ...",
//   },
//   {
//     role: "assistant",
//     content: "Hi, Lizzie. How are you? Ready for your interview on back end?",
//   },
//   { role: "user", content: "Again, I thought I was doing front end." },
//   {
//     role: "assistant",
//     content:
//       "You're totally right. My bad. This one's all about front end, especially React and a bit of Next. Js. Thanks for catching that. Hey there. Welcome to your front end interview. Let's get started with a few questions. First up, what is the virtual DOM in React, and how does it improve performance?",
//   },
//   {
//     role: "user",
//     content:
//       "Visual dome is just like a light switch type of dome where which, uh, components where, um, it renders, but it doesn't touch the entire component.",
//   },
//   { role: "assistant", content: "You're on the right track." },
//   { role: "user", content: "Alright. Let's let's end the interview." },
//   {
//     role: "assistant",
//     content:
//       "No worries at all. Sometimes it's just not the day, and that's totally fine. You gave it a shot, and that's what counts. Thanks for chatting. Hope to see you crushing projects soon. Take care.",
//   },
// ];

const Start = () => {
  const vapiRef = useRef<Vapi | null>(null);
  const interviewDetails = useInterviewStore((state) => state.interviewDetails);
  const username = useInterviewStore((state) => state.username);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>();

  // initialize vapi instance
  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY!);
    }

    const vapi = vapiRef.current;

    // handle then conversation message
    const handleMessage = (message: any) => {
      console.log("✅ Message received:", message);
      if (message?.conversation) {
        const convo = message.conversation;
        console.log("✅ Conversation string:", convo);
        setConversation(convo);
      }
    };

    vapi.on("call-start", () => {
      console.log("Call has started");
      toast.success("Call connected");
    });

    vapi.on("speech-start", () => {
      console.log("Speech has started");
      setActiveUser(false);
      toast.info("Ai is speaking");
    });

    vapi.on("speech-end", () => {
      console.log("Speech has ended");
      setActiveUser(true);
      toast.info("You are speaking");
    });

    vapi.on("call-end", () => {
      console.log("Call has stopped");
      toast.success("Interview Ended");
    });

    vapi.on("message", handleMessage);

    vapi.on("error", (e) => {
      console.error(e);
    });

    // clean up
    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => {});
      vapi.off("speech-start", () => {});
      vapi.off("speech-end", () => {});
      vapi.off("call-end", () => {});
      vapi.off("error", () => {});
    };
  }, []);

  // start interview
  useEffect(() => {
    if (interviewDetails && vapiRef.current) {
      startCall();
    }
  }, [interviewDetails]);

  // start interview
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

    await vapiRef.current?.start({
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

  // stop/end the call
  const handleStopInterview = () => {
    vapiRef.current?.stop();
    generateFeedback();
  };

  const filteredConversation = conversation?.filter(
    (convo) => convo.role !== "system"
  );
  const generateFeedback = async () => {
    const result = await axios.post("/api/ai-feedbak", {
      conversation: filteredConversation,
    });

    console.log(result.data);
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
            <div className="flex flex-col items-center relative">
              {" "}
              {!activeUser && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
              )}
              <Bot />
              <p>Recruiter</p>
            </div>
          </div>
          <div className="bg-white w-full h-60 rounded-lg flex justify-center items-center">
            <div className="flex flex-col items-center relative">
              {" "}
              {activeUser && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
              )}
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
