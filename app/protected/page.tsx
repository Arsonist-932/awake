"use client";
import React, { useState } from "react";
import {
  Calendar,
  Users,
  BarChart3,
  Mic,
  Briefcase,
  Home,
  Settings,
  Bell,
  User,
} from "lucide-react";
import { AnalyticsData, Client, Podcast } from "@/data/types";
import { sampleClients, samplePodcasts } from "@/data/data";
import ClientsView from "./_components/ClientsView";
import ServicesView from "./_components/ServicesView";
import AppointmentsView from "./_components/Appointements";
import AnalyticsView, { sampleAnalytics } from "./_components/AnalyticsView";
import PodcastsView from "./_components/PodcastsView";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import DashboardView from "./_components/dashboardView";

// Dashboard Component
const HypnotherapyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [podcasts, setPodcasts] = useState<Podcast[]>(samplePodcasts);
  const [analytics] = useState<AnalyticsData>(sampleAnalytics);

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "appointments", label: "Rendez-vous", icon: Calendar },
    { id: "clients", label: "Clients", icon: Users },
    { id: "podcasts", label: "Podcasts", icon: Mic },
    { id: "services", label: "Services", icon: Briefcase },
  ];

  const testt = () => {
    setClients(clients);
    setPodcasts(podcasts);
  };

  console.log(testt);

  // Dashboard Overview Component
  <DashboardView />;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "analytics":
        return <AnalyticsView />;
      case "appointments":
        return <AppointmentsView />;
      case "clients":
        return <ClientsView />;
      case "podcasts":
        return <PodcastsView />;
      case "services":
        return <ServicesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen">
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 shadow-sm">
          <div className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {navItems.find((item) => item.id === activeTab)?.label ||
                    "Tableau de bord"}
                </h2>
                <p className="text-xs">
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

                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default HypnotherapyDashboard;
