import { Button } from "@/components/ui/button";
import {
  User,
  Home,
  Calendar,
  Users,
  BarChart3,
  Mic,
  Briefcase,
  Bell,
  Settings,
} from "lucide-react";
import { JSX, useState } from "react";

type SidebarProps = {
  render: () => JSX.Element | null;
};

const Sidebar = ({ render }: { render: () => JSX.Element | null }) => {
  const navItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Home },
    { id: "appointments", label: "Rendez-vous", icon: Calendar },
    { id: "clients", label: "Clients", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "podcasts", label: "Podcasts", icon: Mic },
    { id: "services", label: "Services", icon: Briefcase },
  ];

  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold">Hypno Dashboard</h1>
          <p className="text-sm">Cabinet de thérapie</p>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`mb-1 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-foreground/90 text-black"
                      : "hover:bg-foreground/90 hover:text-black"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-gray-100 p-2">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Dr. Thérapeute</p>
              <p className="text-xs">Hypnothérapeute</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {navItems.find((item) => item.id === activeTab)?.label ||
                    "Tableau de bord"}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{render()}</main>
      </div>
    </>
  );
};

export default Sidebar;
