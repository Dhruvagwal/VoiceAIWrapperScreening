"use client";

import * as React from "react";
import {
  AudioWaveform,
  ChartArea,
  Command,
  Frame,
  GalleryVerticalEnd,
} from "lucide-react";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PROJECTS } from "@/graphql/queries";
import type { Project } from "@/lib/types";
import { useQuery } from "@apollo/client";

const DEAFULT_DATA = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "VoiceAIWrapper",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "ReferScout",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Supafunnel",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, loading, error } = useQuery(PROJECTS);

  const projects: Project[] = data?.projects ?? [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const parseProjectsById = (id: string) => {
    return projects
      .filter((p) => p.status === id)
      .map((p) => {
        return {
          name: p.name,
          url: `/projects/${p.id}`,
          icon: Frame,
        };
      });
  };
  const parseProjects = {
    active: parseProjectsById("ACTIVE"),
    completed: parseProjectsById("COMPLETED"),
    hold: parseProjectsById("ON_HOLD"),
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={DEAFULT_DATA.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenuButton asChild>
            <a href={"/"}>
              <ChartArea />
              <span>Analytics</span>
            </a>
          </SidebarMenuButton>
        </SidebarGroup>
        <NavProjects
          add
          title="Active Projects"
          projects={parseProjects.active}
        />
        {Boolean(parseProjects.completed.length) && (
          <NavProjects
            title="Completed Projects"
            projects={parseProjects.completed}
          />
        )}
        {Boolean(parseProjects.hold.length) && (
          <NavProjects title="Onhold Projects" projects={parseProjects.hold} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={DEAFULT_DATA.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
