"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarOptions } from "@/services/constants";
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { Separator } from "@radix-ui/react-separator";
import { LogOut, PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const { user } = useAuthStore();

  // logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      clearUser();
      toast.success("Logout successful");
      router.push("/login");
    }
  };
  return (
    <Sidebar className="">
      <SidebarHeader className="flex w-full ">
        <h1 className="font-semibold text-xl flex justify-between text-blue-800 ">
          <span className="text-primary text-2xl">Intervue</span>
          <SidebarTrigger>
            <PanelLeftIcon />
          </SidebarTrigger>
        </h1>{" "}
        <Separator className="my-2 h-px w-full bg-gray-200" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={`text-gray-700 ${
                      path == option.path && "bg-gray-200 hover:bg-gray-100 "
                    }`}
                  >
                    <Link href={option.path}>
                      <option.icon
                        className={`${path == option.path && "text-primary"}`}
                      />
                      <span
                        className={`text-[1rem] font-semibold ${
                          path == option.path && "text-primary"
                        }`}
                      >
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <Separator className="my-2 h-px w-full bg-gray-200" />
      <SidebarFooter>
        <div className="flex items-center gap-2">
          <p className="bg-gray-300 w-10 h-10 rounded-full justify-center items-center flex">
            L
          </p>
          <div>
            <p>{user?.name}</p>
            <p className="text-gray-700">{user?.email}</p>
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-center p-2 w-full flex items-center gap-2 font-semibold text-[1rem] text-gray-800"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
