import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSideBar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div>
          <SidebarTrigger />
        </div>
        <div className="w-full p-10">
          <WelcomeContainer />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
