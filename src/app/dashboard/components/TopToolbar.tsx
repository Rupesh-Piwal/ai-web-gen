"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

interface TopToolbarProps {
  websiteTitle: string;
}

export function TopToolbar({ websiteTitle }: TopToolbarProps) {
  return (
    <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-lg font-semibold text-slate-800">
            {websiteTitle}
          </h1>
        </div>
      </div>
    </div>
  );
}
