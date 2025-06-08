"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSideBar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const createNewUser = useAuthStore((state) => state.createNewUser);

  useEffect(() => {
    createNewUser();
  }, [createNewUser]);

  return (
    <div className="w-full mx-auto max-w-[100rem]">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <div>
            <SidebarTrigger />
          </div>
          <div className="w-full p-10">
            <WelcomeContainer />
          </div>
          <div className="px-10 bg-gray-200">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
