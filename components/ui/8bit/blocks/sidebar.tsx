import { Calendar, Home, Inbox, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import "@/components/ui/8bit/styles/retro.css";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Project",
    url: "/project",
    icon: Inbox,
  },
  {
    title: "Education",
    url: "/education",
    icon: Calendar,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Search,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      className={`${"retro"} border-r-4 border-foreground dark:border-ring`}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
