"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@zeron-ui/ui/sidebar";
import { HomeIcon, InboxIcon, SettingsIcon } from "lucide-react";

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Settings", icon: SettingsIcon },
];

export default function SidebarExample() {
  return (
    <div className="relative h-full min-h-96 w-full overflow-hidden rounded-lg border bg-background">
      <SidebarProvider className="relative min-h-full" isMobile={false}>
        <Sidebar
          className="!absolute !flex !h-full border-r"
          collapsible="icon"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="font-medium text-sm">Dashboard</span>
          </header>
          <div className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
            Application content
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
