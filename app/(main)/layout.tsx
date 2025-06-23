"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSideBar";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader, Menu } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [setUser, router]);

  if (loading) {
    return (
      <div className="flex items-center  min-h-screen justify-center p-4">
        <Loader className="h-6 w-6 animate-spin text-black" />
      </div>
    );
  }
  return (
    <div className="w-full mx-auto max-w-[100rem]">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <div className="">
            <SidebarTrigger />
          </div>
          <div className="px-4 bg-gray-200">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
