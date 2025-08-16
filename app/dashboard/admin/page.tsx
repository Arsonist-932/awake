"use client";
import { Bell } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import Sidebar from "./_components/layout/Sidebar";
import SidebarMobile from "./_components/layout/SidebarMobile";
import SkillsDashboard from "./_components/view/skills";
import AppointmentsView from "./_components/view/appointement";
import ClientsView from "./_components/view/clients";
import PodcastsView from "./_components/view/podcast";
import DashboardView from "./_components/view/dashboard";
import AnalyticsView from "./_components/view/analytics";
import ServicesView from "./_components/view/services";
import CardGenerator from "./_components/view/card";

const DashboardAdmin = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

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
      case "skills":
        return <SkillsDashboard />;
      case "services":
        return <ServicesView />;
      case "cardGeneration":
        return <CardGenerator />;
      default:
        return <DashboardView />;
    }
  };

  const getTitle = () => {
    const titles = {
      dashboard: "Tableau de bord",
      analytics: "Analytics",
      appointments: "Rendez-vous",
      clients: "Clients",
      podcasts: "Podcasts",
      skills: "Compétences",
      services: "Services",
      cardGeneration: "Générateur de cartes",
    };
    return titles[activeTab as keyof typeof titles] || "Tableau de bord";
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b border-black shadow-sm dark:border-gray-200">
            <div className="px-6 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{getTitle()}</h2>
                  <p className="text-xs">
                    {new Date().toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center">
                  <Button variant="ghost" size="sm">
                    <Bell className="h-5 w-5" />
                  </Button>

                  <ThemeSwitcher />

                  <SidebarMobile />
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
