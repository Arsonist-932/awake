import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Calendar, Users, BarChart3, Mic } from "lucide-react";
import { AnalyticsData, Client, Podcast } from "@/data/types";
import { sampleAppointments, sampleClients, samplePodcasts } from "@/data/data";
import { sampleAnalytics } from "./AnalyticsView";
import { Badge } from "@/components/ui/badge";

const DashboardView = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [podcasts, setPodcasts] = useState<Podcast[]>(samplePodcasts);
  const [analytics] = useState<AnalyticsData>(sampleAnalytics);

  const Testing = () => {
    setActiveTab(activeTab);
    setClients(clients);
    setPodcasts(podcasts);
  };

  return (
    <>
      <button className="sr-only" onClick={Testing}></button>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">
                  Rendez-vous aujourd&apos;hui
                </p>
                <p className="text-2xl font-semibold">
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
                <p className="text-sm font-medium">Clients actifs</p>
                <p className="text-2xl font-semibold">{clients.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-100 p-2">
                <Mic className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Podcasts publiés</p>
                <p className="text-2xl font-semibold">{podcasts.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="rounded-lg bg-orange-100 p-2">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Vues ce mois</p>
                <p className="text-2xl font-semibold">
                  {analytics.monthlyViews.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Prochains rendez-vous
            </h3>
            <div className="space-y-3">
              {sampleAppointments.slice(0, 3).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{appointment.clientName}</p>
                    <p className="text-sm">
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
            <h3 className="mb-4 text-lg font-semibold">Analytics rapide</h3>
            <div className="space-y-4">
              {analytics.topPages.slice(0, 4).map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{page.page}</span>
                  <span className="text-sm font-medium">{page.views} vues</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
