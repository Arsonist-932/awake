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
import { sampleAppointments, sampleClients, samplePodcasts } from "@/data/data";
import ClientsView from "./_components/ClientsView";
import ServicesView from "./_components/ServicesView";
import AppointmentsView from "./_components/Appointements";
import AnalyticsView, { sampleAnalytics } from "./_components/AnalyticsView";
import PodcastsView from "./_components/PodcastsView";
import { ThemeSwitcher } from "@/components/theme-switcher";

// Components
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Badge = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

// Dashboard Component
const HypnotherapyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [podcasts, setPodcasts] = useState<Podcast[]>(samplePodcasts);
  const [analytics] = useState<AnalyticsData>(sampleAnalytics);

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Home },
    { id: "appointments", label: "Rendez-vous", icon: Calendar },
    { id: "clients", label: "Clients", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "podcasts", label: "Podcasts", icon: Mic },
    { id: "services", label: "Services", icon: Briefcase },
  ];

  const testt = () => {
    setClients(clients);
    setPodcasts(podcasts);
  };

  console.log(testt);

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Rendez-vous aujourd'hui
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  sampleAppointments.filter((a) => a.date === "2025-06-20")
                    .length
                }
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-2">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Clients actifs
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {clients.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-2">
              <Mic className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Podcasts publiés
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {podcasts.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="rounded-lg bg-orange-100 p-2">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vues ce mois</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analytics.monthlyViews.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Prochains rendez-vous
          </h3>
          <div className="space-y-3">
            {sampleAppointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {appointment.clientName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {appointment.time} - {appointment.type}
                  </p>
                </div>
                <Badge
                  variant={
                    appointment.status === "confirmed"
                      ? "success"
                      : appointment.status === "pending"
                        ? "warning"
                        : "danger"
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Analytics rapide
          </h3>
          <div className="space-y-4">
            {analytics.topPages.slice(0, 4).map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{page.page}</span>
                <span className="text-sm font-medium text-gray-900">
                  {page.views} vues
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "appointments":
        return <AppointmentsView />;
      case "clients":
        return <ClientsView />;
      case "analytics":
        return <AnalyticsView />;
      case "podcasts":
        return <PodcastsView />;
      case "services":
        return <ServicesView />;
      default:
        return <DashboardOverview />;
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
