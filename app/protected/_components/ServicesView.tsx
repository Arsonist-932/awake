import { useMemo, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { formatTime } from "@/hooks/Date";
import { sampleServices } from "@/data/data";
import SearchTerm from "@/components/Search";
import ServiceForm from "./Form/NewServiceForm";

const ServicesView = () => {
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const statusFilterOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "active", label: "Actif" },
    { value: "inactive", label: "Inactif" },
  ];

  // Logique de filtrage
  const filteredServices = useMemo(() => {
    return sampleServices.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && service.active) ||
        (filterStatus === "inactive" && !service.active);

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  return (
    <>
      <div className="space-y-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Gestion des Services</h2>
          <Button
            variant={"closed"}
            onClick={() => setShowNewServiceForm(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau service
          </Button>
        </div>

        {/* Search */}
        <SearchTerm
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Rechercher un service, description ..."
          showFilter={true}
          filterValue={filterStatus}
          onFilterChange={setFilterStatus}
          filterOptions={statusFilterOptions}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredServices.map((service) => (
            <Card key={service.id} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{service.name}</h3>

                <div className="flex items-center space-x-2">
                  <Badge variant={service.active ? "success" : "destructive"}>
                    {service.active ? "Actif" : "Inactif"}
                  </Badge>

                  <div className="flex items-center gap-2">
                    <Button
                      className="p-0 hover:bg-transparent"
                      variant="ghost"
                      onClick={() => setShowNewServiceForm(true)}
                    >
                      <Edit />
                    </Button>

                    <Button
                      className="p-0 hover:bg-transparent"
                      variant="ghost"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-xs">{service.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="">Prix</span>
                  <span className="">{service.price}€</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Durée</span>
                  <span className="text-sm">
                    {formatTime(service.duration)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Catégorie</span>
                  <Badge variant={"danger"}>{service.category}</Badge>
                </div>
              </div>

              {service.priceHistory.length > 1 && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="mb-2 text-xs">Historique des prix</p>
                  <div className="space-y-1">
                    {service.priceHistory.slice(-2).map((history, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="0">
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
