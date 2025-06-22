import { Card } from "@/components/ui/card";
import { AnalyticsData } from "@/data/types";

export const sampleAnalytics: AnalyticsData = {
  totalViews: 12456,
  monthlyViews: 2847,
  topPages: [
    { page: "/services", views: 1234 },
    { page: "/about", views: 987 },
    { page: "/contact", views: 654 },
    { page: "/podcast", views: 432 },
  ],
  viewsData: [
    { date: "2025-06-14", views: 145 },
    { date: "2025-06-15", views: 189 },
    { date: "2025-06-16", views: 234 },
    { date: "2025-06-17", views: 198 },
    { date: "2025-06-18", views: 276 },
    { date: "2025-06-19", views: 213 },
    { date: "2025-06-20", views: 156 },
  ],
};

const AnalyticsView = () => {
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Analytics du Site Web</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="mb-2 text-lg font-semibold">Vues totales</h3>
            <p className="text-3xl font-bold text-purple-600">
              {sampleAnalytics.totalViews.toLocaleString()}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 text-lg font-semibold">Vues ce mois</h3>
            <p className="text-3xl font-bold text-green-600">
              {sampleAnalytics.monthlyViews.toLocaleString()}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 text-lg font-semibold">Moyenne journalière</h3>
            <p className="text-3xl font-bold text-red-600">
              {Math.round(sampleAnalytics.monthlyViews / 30)}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Évolution des vues (7 derniers jours)
            </h3>
            <div className="space-y-2">
              {sampleAnalytics.viewsData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">
                    {new Date(data.date).toLocaleDateString("fr-FR")}
                  </span>
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-32 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${(data.views / Math.max(...sampleAnalytics.viewsData.map((d) => d.views))) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{data.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Pages les plus consultées
            </h3>
            <div className="space-y-3 text-black">
              {sampleAnalytics.topPages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <span className="font-medium">{page.page}</span>
                  <span className="text-sm">{page.views} vues</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default AnalyticsView;
