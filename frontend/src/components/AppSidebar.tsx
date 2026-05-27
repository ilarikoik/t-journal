import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  getToken,
  removeToken,
  getUsername,
  removeUsername,
} from "@/services/authService";
import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Trades", href: "/trades" },
  { label: "New Trade", href: "/trades/new" },
];

export function AppSidebar() {
  const navigate = useNavigate();

  console.log(getUsername() + "askdasdads");

  const handleLogout = () => {
    removeToken();
    removeUsername();
    navigate("/login");
  };

  const token = getToken();
  return (
    <>
      {token && (
        <Sidebar className="sidebar">
          <SidebarHeader className="px-4 py-4">
            <span
              className="text-lg font-bold font-mono"
              style={{ color: "#00d4aa" }}
            >
              {getUsername() || "Käyttäjä"}
            </span>
            <span>HALOO</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton>
                        <NavLink className="w-full" to={item.href} end>
                          {item.label}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarFooter className="p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm w-full hover:opacity-80 transition-opacity text-red-400"
                  // style={{ color: "#64748b" }}
                >
                  <LogOut size={16} />
                  Kirjaudu ulos
                </button>
              </SidebarFooter>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
