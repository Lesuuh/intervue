"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import { Bot, CircleUserRoundIcon, Mic, Phone, Timer } from "lucide-react";
// import Vapi from "@vapi-ai/web";

const Start = () => {
//   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY!);

//   const interviewQuestions = useInterviewStore(
//     (state) => state.interviewQuestions
//   );
  const username = useInterviewStore((state) => state.username);
//   const interviewId = useInterviewStore((state) => state.setInterviewId);

// const startCall =()=>[
//     if(interviewDetails && username){

//     }
// ]

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
          <Phone
            size={14}
            className="bg-red-500 p-2 rounded-full w-10 h-10 text-white"
          />
        </div>
        <p>Interview in progress</p>
      </main>
    </section>
  );
};

export default Start;
