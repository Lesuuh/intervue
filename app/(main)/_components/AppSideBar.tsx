"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarOptions } from "@/services/constants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  console.log(path);
  return (
    <Sidebar>
      <SidebarHeader className="flex w-full">
        <h1 className="font-bold text-2xl text-blue-800">
          <span className="text-blue-900">AI</span>Cruiter
        </h1>
        <Button className="w-full mt-5 cursor-pointer">
          <Plus /> Create new Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={` ${path == option.path && "bg-blue-50"}`}
                  >
                    <Link href={option.path}>
                      <option.icon
                        className={`${path == option.path && "text-primary"}`}
                      />
                      <span
                        className={`text-[1rem] font-medium ${
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
      <SidebarFooter />
    </Sidebar>
  );
}
