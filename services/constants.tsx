import {
  BriefcaseBusinessIcon,
  CalendarHeart,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  User2Icon,
  Users,
  WalletCards,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Schdueled Interview",
    icon: CalendarHeart,
    path: "/scheduled-interview",
  },
  {
    name: "All Interviews",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewTypes = [
  { title: "Technical", icon: Code2Icon },
  {
    title: "Behavioural",
    icon: User2Icon,
  },
  { title: "Experience", icon: BriefcaseBusinessIcon },
  { title: "Problem Solving", icon: Puzzle },
  { title: "Leadership", icon: Users },
];
