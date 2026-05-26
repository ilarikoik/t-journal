import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton, SidebarMenu ,SidebarHeader} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Trades", href: "/trades" },
  { label: "New Trade", href: "/trades/new" },
]

export function AppSidebar() {
  return (
    <Sidebar className="sidebar">
        <SidebarHeader className="px-4 py-4">
        <span className="text-lg font-bold font-mono" style={{ color: '#00d4aa' }}>
        TradeJournal
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton >
                    <NavLink className="w-full" to={item.href} end>{item.label}</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}