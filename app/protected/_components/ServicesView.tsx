import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleServices } from "@/data/data";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "../page";
import { useState } from "react";
import { formatTime } from "@/hooks/Date";
import ServiceForm from "./Form/NewServiceForm";

const ServicesView = () => {
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Gestion des Services</h2>
          <Button onClick={() => setShowNewServiceForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau service
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sampleServices.map((service) => (
            <Card key={service.id} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{service.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant={service.active ? "success" : "default"}>
                    {service.active ? "Actif" : "Inactif"}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                {service.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Prix</span>
                  <span className="font-semibold">{service.price}€</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Durée</span>
                  <span className="text-sm">
                    {formatTime(service.duration)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Catégorie</span>
                  <Badge>{service.category}</Badge>
                </div>
              </div>
              {service.priceHistory.length > 1 && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="mb-2 text-xs text-gray-500">
                    Historique des prix
                  </p>
                  <div className="space-y-1">
                    {service.priceHistory.slice(-2).map((history, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-gray-500">
                          {new Date(history.date).toLocaleDateString("fr-FR")}
                        </span>
                        <span className="">{history.price}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {showNewServiceForm && (
        <ServiceForm
          isActive={true}
          onClose={() => setShowNewServiceForm(false)}
        />
      )}
    </>
  );
};

export default ServicesView;
