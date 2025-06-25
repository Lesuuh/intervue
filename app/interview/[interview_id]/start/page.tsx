"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import {
  Bot,
  BotIcon,
  BrainCircuit,
  CircleStop,
  CircleUserRoundIcon,
  Clock,
  Mic,
  Phone,
  Timer,
  User,
} from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useEffect, useRef, useState } from "react";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { ConversationMessage } from "@/types";
import { supabase } from "@/services/supabase";
import { Button } from "@/components/ui/button";

const conversation: ConversationMessage[] = [
  {
    role: "system",
    content:
      "You are an AI voice assistant conducting interviews.\nYour job is to ask candidates provided interview questions, and assess their responses.\n\nBegin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:\n\"Hey there! Welcome to your backend interview. Let's get started with a few questions!\"\n\nAsk one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise.\n\nQuestions: What is the virtual DOM in React, and how does it improve performance?,Explain the difference between server-side rendering and client-side rendering in Next.js.,How do you optimize performance in a large React application?,What are dynamic routes in Next.js and how do you implement them?,Can you describe a bug you encountered in React and how you solved it?,What is the purpose of the `useEffect` hook in React?,What strategies do you use to manage global state in React apps?,Have you used any component libraries with React or ...",
  },
  {
    role: "assistant",
    content: "Hi, Lizzie. How are you? Ready for your interview on back end?",
  },
  { role: "user", content: "Again, I thought I was doing front end." },
  {
    role: "assistant",
    content:
      "You're totally right. My bad. This one's all about front end, especially React and a bit of Next. Js. Thanks for catching that. Hey there. Welcome to your front end interview. Let's get started with a few questions. First up, what is the virtual DOM in React, and how does it improve performance?",
  },
  {
    role: "user",
    content:
      "Visual dome is just like a light switch type of dome where which, uh, components where, um, it renders, but it doesn't touch the entire component.",
  },
  { role: "assistant", content: "You're on the right track." },
  { role: "user", content: "Alright. Let's let's end the interview." },
  {
    role: "assistant",
    content:
      "No worries at all. Sometimes it's just not the day, and that's totally fine. You gave it a shot, and that's what counts. Thanks for chatting. Hope to see you crushing projects soon. Take care.",
  },
];

const Start = () => {
  const vapiRef = useRef<Vapi | null>(null);
  const interviewDetails = useInterviewStore((state) => state.interviewDetails);
  const username = useInterviewStore((state) => state.username);
  const userEmail = useInterviewStore((state) => state.userEmail);
  const [activeUser, setActiveUser] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(true);
  // const [conversation, setConversation] = useState<ConversationMessage[]>();

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
        // setConversation(convo);
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
      // startCall();
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

  // generate feedback
  const generateFeedback = async () => {
    console.log("Sending conversation:", filteredConversation);
    try {
      const result = await axios.post("/api/ai-feedback", filteredConversation);

      const { data, error } = await supabase
        .from("Feedback")
        .insert([
          {
            userName: username,
            userEmail: userEmail,
            feedback: result.data,
            recommendation: "yes",
          },
        ])
        .select();
    } catch (error) {
      console.error("Error generating feedback:", error);
    }
  };

  return (
    <section className="flex p-5 flex-col justify-center w-full bg-blue-50 mx-auto items-center min-h-screen">
      <main className="flex flex-col w-full max-w-[100rem]">
        <div className="bg-white rounded-lg w-full flex items-center justify-between p-6">
          <h3 className="text-xl font-semibold">Voice Interview Session</h3>
          <div className="flex space-x-3 items-center">
            <Clock size={16} />
            <p className="font-semibold text-lg">00:00</p>
            <p className="bg-gray-300 px-2 py-1 text-xs font-semibold rounded-3xl">
              In Progress
            </p>
            {/* End Interview Button */}
            <AlertConfirmation handleStopInterview={handleStopInterview}>
              <Button
                onClick={handleStopInterview}
                className="py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white  font-semibold transition"
              >
                <CircleStop /> End Interview
              </Button>
            </AlertConfirmation>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-between lg:gap-5 items-center">
          <div className="bg-white w-full my-10 rounded-2xl">
            <div className="text-center py-4 flex items-center justify-center rounded-tl-xl rounded-tr-xl border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <BotIcon size={24} />
              <p className="text-2xl ml-2">Interviewer</p>
            </div>
            <div className="flex items-center w-full justify-center  h-[500px] relative">
              <div className="relative">
                {/* Pulse rings when AI is speaking */}
                {isAISpeaking && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping scale-110" />
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-pulse scale-105" />
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-40 animate-ping scale-100 animation-delay-300" />
                  </>
                )}

                {/* AI Avatar */}
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isAISpeaking
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg scale-105"
                      : "bg-gradient-to-br from-gray-400 to-gray-600 shadow-md"
                  }`}
                >
                  <Bot className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white w-full my-10 rounded-2xl ">
            <div className="text-center  py-4 flex items-center justify-center rounded-tl-xl rounded-tr-xl border-b bg-gradient-to-r from-green-500 to-teal-600 text-white">
              <User size={24} />
              <p className="text-2xl ml-2">Candidate</p>
            </div>
            <div className=" flex items-center justify-center w-full h-[500px] relative">
              <div className="relative ">
                {/* Pulse rings when candidate is speaking */}
                {isAISpeaking && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping scale-110" />
                    <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-pulse scale-105" />
                    <div className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping scale-100 animation-delay-300" />
                  </>
                )}

                {/* Candidate Avatar */}
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isAISpeaking
                      ? "bg-gradient-to-br from-green-500 to-teal-600 shadow-lg scale-105"
                      : "bg-gradient-to-br from-gray-400 to-gray-600 shadow-md"
                  }`}
                >
                  <User className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-xl w-full mb-4 shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <BrainCircuit size={18} /> Interview Tips
            </h4>
            <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
              <li>
                Relax and answer each question to the best of your ability.
              </li>
              <li>Speak clearly and take your time before responding.</li>
              <li>
                If you don’t know an answer, it’s okay to say so—just try your
                best!
              </li>
              <li>Ask for clarification if you don’t understand a question.</li>
              <li>Stay positive and confident throughout the interview.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* <main className="flex flex-col justify-center items-center max-w-2xl w-full p-4 bg-gray-100 rounded-lg">
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
      </main> */}
    </section>
  );
};

export default Start;
