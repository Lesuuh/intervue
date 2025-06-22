"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Full error:", error);
      toast.error(error.message || "Something went wrong");
      return;
    }
    setUser(data);
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 rounded-sm border flex flex-col items-center ">
        <h2 className="text-2xl font-bold">Welcome to AI Cruiter</h2>
        <p>Login</p>

        <div className="w-full flex flex-col gap-3 my-5">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@yourmail.com"
            className="px-2 py-1 w-full"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            className="px-2 py-1 w-full placeholder:text-[1.2rem]"
          />
        </div>
        <div className="w-full flex justify-center mt-2">
          <Button onClick={signInWithEmail} className="w-full cursor-pointer">
            Create Account
          </Button>
        </div>
        <p className="text-[.8rem] text-gray-500 py-2 cursor-pointer">
          Don&apos;t have an account,{" "}
          <span className="text-blue-600 underline">
            <Link href="/create-account">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
