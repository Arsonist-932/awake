import {
  User,
  Home,
  Calendar,
  Users,
  BarChart3,
  Mic,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
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
      <div className="w-64 border-r border-gray-200 shadow-sm max-lg:hidden">
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
                      ? "hover:bg-foreground/30"
                      : "hover:bg-foreground/30"
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
    </>
  );
};

export default Sidebar;
