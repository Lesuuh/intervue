"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase";

const page = () => {
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.error("Error logging in with Github:", error.message);
    }
  };
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 rounded-sm border flex flex-col items-center ">
        <h2 className="text-2xl font-bold">Welcome to AI Cruiter</h2>
        <p>Sign in with Github Authentication</p>
        <Button
          onClick={handleGithubLogin}
          className="w-full mt-7 cursor-pointer"
        >
          Login with Github
        </Button>
      </div>
    </div>
  );
};

export default page;
