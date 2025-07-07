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
  pages: { id: string; title: string; preview?: string; icon?: any }[];
  selectedPage: string;
  onPageSelect: (pageId: string) => void;
}

export function AppSidebar({
  pages,
  selectedPage,
  onPageSelect,
}: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="p-6">
        <h2 className="text-lg font-semibold text-slate-800">Website Pages</h2>
        <p className="text-sm text-slate-600">Manage your generated pages</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => (
                <SidebarMenuItem key={page.id}>
                  <SidebarMenuButton
                    isActive={selectedPage === page.id}
                    onClick={() => onPageSelect(page.id)}
                    className="w-full justify-start p-3 h-auto"
                  >
                    {page.icon && <page.icon className="h-4 w-4 mr-3" />}
                    <div className="flex-1 text-left">
                      <div className="font-medium">{page.title}</div>
                      {page.preview && (
                        <div className="text-xs text-slate-500 mt-1">
                          {page.preview}
                        </div>
                      )}
                    </div>
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
