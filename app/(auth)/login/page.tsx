"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
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

  const login = useLogin();
  const { isPending } = login;

  async function signInWithEmail() {
    try {
      const { data, error } = await login.mutateAsync({
        email,
        password,
      });
      if (error) {
        console.error("Full error:", error);
        toast.error(
          (error as { message?: string })?.message || "Something went wrong"
        );
        return;
      }
      setUser(data.user);
      router.push("/dashboard");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-sm border flex flex-col items-center ">
        <h2 className="text-2xl font-bold">Welcome to AI Cruiter</h2>
        <p>Login</p>

        <div className="w-full flex flex-col gap-3 my-5">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@yourmail.com"
            className="px-2 py-3 w-full"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            className="px-2 py-3 w-full "
          />
        </div>
        <div className="w-full flex justify-center mt-2">
          <Button
            onClick={signInWithEmail}
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <Loader  className="bg-white" /> : null}
            {isPending ? "Logging in...." : "Login"}
          </Button>
        </div>
        <p className="text-[.8rem] text-gray-500 py-2 cursor-pointer">
          Don&apos;t have an account,{" "}
          <span className="text-blue-600 underline">
            <Link href="/create-account">Create account</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
