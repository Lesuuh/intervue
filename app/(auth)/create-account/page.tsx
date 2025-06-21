"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://localhost/3000/login",
      },
    });
    if (error) {
      toast.error(error.message);
      console.error(error.message);
      return;
    }

    if (data.user) {
      const { error } = await supabase.from("Users").insert([
        {
          email: email,
          name: name,
          credits: 0,
        },
      ]);

      if (error) {
        toast.error(error.message);
        console.error(error.message);
      }
    }
  }
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 rounded-sm border flex flex-col items-center ">
        <h2 className="text-2xl font-bold">Welcome to AI Cruiter</h2>
        <p>Create Account</p>

        <div className="w-full flex flex-col gap-3 my-5">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="px-2 py-1 w-full"
          />
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
            placeholder="......"
            className="px-2 py-1 w-full placeholder:text-[2rem]"
          />
        </div>
        <div className="w-full flex justify-center mt-2">
          <Button className="w-full" onClick={signUpNewUser}>
            Create Account
          </Button>
        </div>
        <p className="text-[.8rem] text-gray-500 py-2 cursor-pointer">
          Already have an account?,{" "}
          <span className="text-blue-600 underline">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
