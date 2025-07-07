import { ReactNode } from "react";

interface TopToolbarProps {
  websiteTitle: string;
  additionalActions?: ReactNode;
}

export const TopToolbar = ({
  websiteTitle,
  additionalActions,
}: TopToolbarProps) => {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            {websiteTitle}
          </h1>
          <p className="text-sm text-slate-500">Dashboard</p>
        </div>

        <div className="flex items-center gap-3">
          {additionalActions}
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};
