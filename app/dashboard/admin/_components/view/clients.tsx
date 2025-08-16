import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleClients } from "@/data/data";
import { Client } from "@/types/types";
import { Edit, Eye, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import InputForm from "@/components/InputForm";
import ModalForm from "../ModalForm";
import Filter from "@/components/filter";
import SelectDashboard from "@/components/SelectDashboard";
import { SelectItem } from "@/components/ui/select";

const ClientsView = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [clientFormData, setClientFormData] = useState({
    lastname: "",
    fisrtname: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setClientFormData({ ...clientFormData, [e.target.id]: e.target.value });
  };

  // Logique de filtrage
  const filteredClients = useMemo(() => {
    return sampleClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "name" && client.name) ||
        (filterStatus === "email" && client.email) ||
        (filterStatus === "phone" && client.phone);

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const handleSubmit = () => {};

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 pb-6 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Gestion des Clients</h2>

        <Button onClick={() => setShowNewClientForm(true)} variant={"closed"}>
          <Plus className="h-4 w-4 rounded-full border" />
          Nouveau client
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col items-center gap-4 py-6 lg:flex-row">
        <Filter
          value={searchTerm}
          placeholder="Rechercher un client..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <SelectDashboard
          value={filterStatus}
          placeholder="Tous les clients"
          onValueChange={(value) => {
            setFilterStatus(value);
          }}
        >
          <SelectItem value="all">Tous les client</SelectItem>
          <SelectItem value="order">Tri : A-Z</SelectItem>
          <SelectItem value="desorder">Tri : Z - A</SelectItem>
        </SelectDashboard>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{client.name}</h3>

                <div className="flex space-x-3">
                  <button>
                    <Eye className="h-4 w-4" />
                  </button>

                  <button onClick={() => setSelectedClient(client)}>
                    <Edit className="h-4 w-4" />
                    {selectedClient?.email}
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-1 py-2 text-sm">
                <a href={`tel:${client.phone}`}>{client.phone}</a>
                <a href={`mailto:${client.email}`} className="underline">
                  {client.email}
                </a>

                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="min-sm:text-base text-xs">
                    Nb de séances : {client.totalSessions} séances
                  </span>
                  {client.lastSession && (
                    <span className="text-xs">
                      Dernière:{" "}
                      {new Date(client.lastSession).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {showNewClientForm && (
        <ModalForm
          title="Créer un nouvelle fiche client"
          isOpen={showNewClientForm}
          onClose={() => setShowNewClientForm(false)}
          onSubmit={handleSubmit}
          submitLabel="Nouveau Client"
        >
          <div className="space-y-4">
            <InputForm
              name="Nom *"
              id="lastname"
              type="text"
              placeholder=""
              value=""
              onChange={handleChange}
            />

            <InputForm
              name="Prénom *"
              id="firstname"
              type="text="
              value=""
              onChange={handleChange}
            />

            <InputForm
              name="email"
              id="Email *"
              type="email"
              placeholder=""
              value=""
              onChange={handleChange}
            />

            <InputForm
              name="Téléphone"
              id="phone"
              type="text"
              placeholder=""
              value=""
              onChange={handleChange}
            />

            <InputForm
              name="Avatar"
              id="photo"
              type="file"
              placeholder=""
              value=""
              onChange={handleChange}
            />
          </div>
        </ModalForm>
      )}
    </>
  );
};

export default ClientsView;
