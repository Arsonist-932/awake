"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NavItem } from "@/types";
import {
  Calendar,
  Users,
  BarChart3,
  Mic,
  Briefcase,
  Home,
  BrainCog,
  User,
  Carrot,
} from "lucide-react";

export const navItems = [
  { id: "dashboard", label: "Tableau de bord", icon: Home },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "clients", label: "Clients", icon: Users },
  { id: "podcasts", label: "Podcasts", icon: Mic },
  { id: "appointments", label: "Rendez-vous", icon: Calendar },
  { id: "skills", label: "Compétences", icon: BrainCog },
  { id: "cardGeneration", label: "Générateur de cartes", icon: Carrot },
];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") || "dashboard";
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <>
      <div className="hidden h-screen md:flex">
        <div className="border-r border-gray-200 shadow-sm">
          <div className="p-6">
            <h1 className="text-xl font-bold">Hypno Dashboard</h1>
            <p className="text-sm">Cabinet de thérapie</p>
          </div>

          <nav className="mt-6">
            <div className="px-3">
              {navItems.map((item: NavItem) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`mb-1 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "hover:bg-foreground/30"
                        : "hover:bg-foreground/30"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="absolute bottom-0 border-t border-gray-200 p-4">
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
      </div>
    </>
  );
};

export default Sidebar;
