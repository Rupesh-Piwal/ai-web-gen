import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  pages: { id: string; title: string; preview?: string; icon?: React.ElementType }[];
  selectedPage: string;
  onPageSelect: (pageId: string) => void;
}

export function AppSidebar({
  pages,
  selectedPage,
  onPageSelect,
}: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200 bg-white w-64">
      <SidebarHeader className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Website Pages</h2>
        <p className="text-sm text-slate-500">Click a page to preview it</p>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase px-4 mt-4 mb-2">
            Pages
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => {
                const isActive = selectedPage === page.id;

                return (
                  <SidebarMenuItem key={page.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onPageSelect(page.id)}
                      className={`w-full justify-start p-3 h-auto ${
                        isActive ? "bg-blue-100 text-blue-800 font-semibold" : ""
                      }`}
                    >
                      {page.icon && (
                        <page.icon className="h-4 w-4 mr-3 text-slate-500" />
                      )}
                      <div className="flex-1 text-left">
                        <div className="truncate">{page.title}</div>
                        {page.preview && (
                          <div className="text-xs text-slate-500 mt-1 truncate">
                            {page.preview}
                          </div>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
