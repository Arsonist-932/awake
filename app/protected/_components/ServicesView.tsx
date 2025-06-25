import { useMemo, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";

import { formatTime } from "@/hooks/Date";
import { sampleServices } from "@/data/data";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TextArea from "@/components/ui/textarea";

import SearchTerm from "@/components/Search";
import ModalForm from "./ModalForm";
import InputForm from "@/components/InputForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServicesView = () => {
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    feature: "",
    active: true || false,
  });

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleDelete = () => {
    confirm("Êtes-vous sûr de vouloir supprimer ce service ?");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
                      onClick={handleDelete}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>

              <p className="text-xs">{service.description}</p>

              <div className="flex flex-col gap-2 py-6">
                {service.feature.map((feature, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <span className="h-2 w-2 rounded-full border bg-red-700"></span>
                    <p className="text-xs">{feature}</p>
                  </div>
                ))}
              </div>

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
        <ModalForm
          title="Créer un nouveau service"
          isOpen={showNewServiceForm}
          onClose={() => setShowNewServiceForm(false)}
          onSubmit={handleSubmit}
          submitLabel="Publier le service"
        >
          <div className="space-y-4">
            <InputForm
              id="name"
              name="Nom du service *"
              placeholder=""
              type="text"
              value={formData.name}
              onChange={handleChange}
            />

            <TextArea
              label="Description *"
              id="description"
              row={3}
              placeholder="Description détaillée du service"
              value={formData.description}
              onChange={handleChange}
            />

            <InputForm
              id="feature"
              name="Features"
              placeholder="Incrivez ce qui est inclus dans l'offre"
              type="text"
              value={formData.feature}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 items-center gap-6">
              <InputForm
                id="price"
                name="Prix (€) *"
                placeholder="0"
                type="number"
                min={"5"}
                step={"5"}
                value={formData.price}
                onChange={handleChange}
              />

              <div>
                <Label className="mb-1 block text-sm font-medium">
                  Durée (min) *
                </Label>

                <Select
                  value={formData.duration}
                  onValueChange={(value: string) =>
                    setFormData((prev) => ({ ...prev, duration: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Select
              value={formData.category}
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3Hypnothérapie0">Hypnothérapie</SelectItem>
                <SelectItem value="Hypnothérapie">Hypnothérapie</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Formation">Formation</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center">
              <Input
                type="checkbox"
                id="active"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                onChange={handleChange}
              />
              <Label htmlFor="active" className="ml-2 block text-sm">
                Service actif (visible sur le site)
              </Label>
            </div>
          </div>
        </ModalForm>
      )}
    </>
  );
};

export default ServicesView;
