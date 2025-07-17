import {
  IconPaint,
  IconPalette,
  IconPackages,
  IconChecklist,
} from "@tabler/icons-react";
import { Command } from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  teams: [
    {
      name: "Tenant Config",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        // {
        //   title: "Dashboard",
        //   url: "/",

        //   icon: IconLayoutDashboard,
        // },
        {
          title: "Domain",
          url: "/domains",
          icon: IconChecklist,
        },
        {
          title: "Theme config",
          url: "/theme-config",

          icon: IconPaint,
        },
        {
          title: "Domain config",
          icon: IconPackages,
          items: [
            {
              title: "Theme",
              url: "/domain-config",

              icon: IconPalette,
            },
          ],
        },
       
      ],
    },
  ],
};
