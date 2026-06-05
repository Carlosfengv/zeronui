"use client";

import { Badge } from "@zeron-ui/ui/badge";
import { Button } from "@zeron-ui/ui/button";
import { Kbd } from "@zeron-ui/ui/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@zeron-ui/ui/sidebar";
import {
  AppWindowIcon,
  BotIcon,
  ChevronDownIcon,
  CommandIcon,
  DatabaseIcon,
  FileTextIcon,
  FolderOpenIcon,
  HomeIcon,
  Layers3Icon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  UserRoundIcon,
  ZapIcon,
} from "lucide-react";
import type { CSSProperties, ComponentType } from "react";

type NavItem = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string;
};

const resourceItems: NavItem[] = [
  { title: "Dashboard", icon: HomeIcon, active: true },
  { title: "Inspiration", icon: SparklesIcon },
  { title: "Apps", icon: AppWindowIcon },
  { title: "Skills", icon: ZapIcon },
  { title: "Files", icon: FolderOpenIcon },
  { title: "Data", icon: DatabaseIcon },
];

const agentItems = [
  { name: "Research Pilot", status: "Ready", tone: "bg-emerald-500" },
  { name: "Sales Briefing", status: "Syncing", tone: "bg-sky-500" },
  { name: "Ops Console", status: "Idle", tone: "bg-violet-500" },
];

const sidebarVars = {
  "--sidebar-width": "16rem",
  "--sidebar-width-icon": "4rem",
  "--sidebar": "#f7f9fc",
  "--sidebar-foreground": "#050814",
  "--sidebar-accent": "#e7edf7",
  "--sidebar-accent-foreground": "#050814",
  "--sidebar-border": "#d7dfeb",
  "--sidebar-primary": "#050814",
  "--sidebar-primary-foreground": "#ffffff",
  "--sidebar-ring": "#9aa8bd",
} as CSSProperties;

function WorkspaceSwitcher() {
  return (
    <Button
      className="h-12 w-full justify-start gap-2 rounded-xl border border-sidebar-border bg-white px-2 shadow-none hover:bg-sidebar-accent group-data-[collapsible=icon]:size-11 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
      type="button"
      variant="ghost"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground">
        <Layers3Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
        <div className="truncate font-medium text-sm leading-5">Zenova Lab</div>
        <div className="truncate text-muted-foreground text-xs leading-4">
          Product workspace
        </div>
      </div>
      <ChevronDownIcon className="size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
    </Button>
  );
}

function CommandSearch() {
  return (
    <div className="px-3 group-data-[collapsible=icon]:px-3">
      <Button
        className="h-10 w-full justify-start rounded-lg border border-transparent bg-white/65 px-2 text-muted-foreground shadow-none hover:bg-sidebar-accent group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
        type="button"
        variant="ghost"
      >
        <SearchIcon className="size-4 shrink-0 group-data-[collapsible=icon]:size-5" />
        <span className="min-w-0 flex-1 truncate text-left text-sm group-data-[collapsible=icon]:hidden">
          Search or command
        </span>
        <Kbd className="group-data-[collapsible=icon]:hidden">⌘K</Kbd>
      </Button>
    </div>
  );
}

function ResourceNav() {
  return (
    <SidebarGroup className="px-3 py-1 group-data-[collapsible=icon]:px-3">
      <SidebarGroupLabel className="px-0 text-muted-foreground">
        Resources
      </SidebarGroupLabel>
      <SidebarMenu>
        {resourceItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              className="h-9 rounded-lg border border-transparent px-2 data-[active=true]:border-sidebar-border data-[active=true]:bg-sidebar-accent group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
              isActive={item.active}
              tooltip={item.title}
            >
              <item.icon className="size-4 group-data-[collapsible=icon]:size-5" />
              <span>{item.title}</span>
            </SidebarMenuButton>
            {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function AgentNav() {
  return (
    <SidebarGroup className="px-3 py-1 group-data-[collapsible=icon]:px-3">
      <SidebarGroupLabel className="justify-between px-0 text-muted-foreground">
        <span>Agents</span>
        <Badge
          className="h-5 rounded-sm px-1.5 group-data-[collapsible=icon]:hidden"
          variant="secondary"
        >
          {agentItems.length}
        </Badge>
      </SidebarGroupLabel>
      <SidebarMenu>
        {agentItems.map((agent) => (
          <SidebarMenuItem key={agent.name}>
            <SidebarMenuButton
              className="h-10 rounded-lg border border-transparent px-2 hover:bg-sidebar-accent group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
              tooltip={agent.name}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-white ${agent.tone}`}
              >
                <BotIcon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm leading-5">
                  {agent.name}
                </span>
                <span className="block truncate text-muted-foreground text-xs leading-4">
                  {agent.status}
                </span>
              </span>
            </SidebarMenuButton>
            <SidebarMenuAction showOnHover>
              <MoreHorizontalIcon />
            </SidebarMenuAction>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="h-9 rounded-lg border border-dashed border-sidebar-border px-2 text-muted-foreground group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
            tooltip="New agent"
          >
            <PlusIcon className="size-4 group-data-[collapsible=icon]:size-5" />
            <span>New agent</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function RuntimeStatus() {
  return (
    <div className="mx-3 rounded-lg border border-sidebar-border bg-white/70 px-3 py-2 group-data-[collapsible=icon]:hidden">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-emerald-500" />
        <span className="font-medium text-xs">Runtime healthy</span>
      </div>
      <div className="mt-1 text-muted-foreground text-xs">3 agents online</div>
    </div>
  );
}

function UserMenu() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Button
      className="h-11 w-full justify-start gap-2 rounded-xl px-2 shadow-none hover:bg-sidebar-accent group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
      type="button"
      variant="ghost"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <UserRoundIcon className="size-4" />
      </div>
      {!collapsed ? (
        <>
          <div className="min-w-0 flex-1 text-left">
            <div className="truncate font-medium text-sm leading-5">
              Carlos
            </div>
            <div className="truncate text-muted-foreground text-xs leading-4">
              Workspace admin
            </div>
          </div>
          <SettingsIcon className="size-4 text-muted-foreground" />
        </>
      ) : null}
    </Button>
  );
}

function SidebarShell() {
  return (
    <Sidebar
      className="!absolute !flex !h-full border-r border-sidebar-border"
      collapsible="icon"
    >
      <SidebarHeader className="gap-3 p-3">
        <WorkspaceSwitcher />
      </SidebarHeader>
      <CommandSearch />
      <SidebarContent className="gap-1 py-2">
        <ResourceNav />
        <SidebarSeparator />
        <AgentNav />
      </SidebarContent>
      <SidebarFooter className="gap-3 p-3">
        <RuntimeStatus />
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default function SidebarExample() {
  return (
    <div className="relative h-full min-h-[34rem] w-full overflow-hidden rounded-lg border bg-background">
      <SidebarProvider
        className="relative min-h-full"
        defaultOpen
        isMobile={false}
        style={sidebarVars}
      >
        <SidebarShell />
        <SidebarInset className="min-w-0">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-background px-3">
            <SidebarTrigger />
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <CommandIcon className="size-4 text-muted-foreground" />
              <span className="truncate font-medium text-sm">
                Dashboard
              </span>
            </div>
            <Button size="sm" type="button" variant="outline">
              <FileTextIcon className="size-4" />
              Report
            </Button>
          </header>
          <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] gap-3 overflow-hidden p-4">
            <section className="min-h-0 rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-xs">Workspace</div>
              <div className="mt-1 font-semibold text-lg">Zenova Lab</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-background p-3">
                  <div className="text-muted-foreground text-xs">Agents</div>
                  <div className="mt-1 font-semibold text-2xl">12</div>
                </div>
                <div className="rounded-lg border bg-background p-3">
                  <div className="text-muted-foreground text-xs">Tasks</div>
                  <div className="mt-1 font-semibold text-2xl">48</div>
                </div>
              </div>
            </section>
            <section className="min-h-0 rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-xs">Activity</div>
              <div className="mt-4 space-y-3">
                {["Model routing synced", "Skill review complete", "New app connected"].map((item) => (
                  <div className="flex items-center gap-2" key={item}>
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
