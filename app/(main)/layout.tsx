"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSideBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader, Menu } from "lucide-react";
import { useCurrentUserSession } from "@/hooks/useAuth";
import { toast } from "sonner";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/store/useAuthStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, isLoading, error } = useCurrentUserSession();

  const getUserDetails = async () => {
    if (session) {
      const { data } = await supabase
        .from("Users")
        .select("*")
        .eq("email", session.user.email)
        .single();
      useAuthStore.getState().setUser(data);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (!session) {
      router.push("/login");
      return;
    }
    getUserDetails();
    if (error) {
      toast.error(error.message);
    }
  }, [session, router, error, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center p-4">
        <Loader className="h-6 w-6 animate-spin text-black" />
      </div>
    );
  }
  return (
    <div className="w-full mx-auto max-w-[100rem] bg-blue-50">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <div className="md:hidden">
            <SidebarTrigger>
              <Menu size={48} />
            </SidebarTrigger>
          </div>
          <div className="px-4 bg-blue-50">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
