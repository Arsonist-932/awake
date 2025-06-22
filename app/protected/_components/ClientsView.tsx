import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleClients } from "@/data/data";
import { Client } from "@/data/types";
import { Edit, Eye, Plus } from "lucide-react";
import { useState } from "react";
import ClientForm from "./Form/ClientForm";

const ClientsView = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [showNewClientForm, setShowNewClientForm] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 pb-6 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Gestion des Clients</h2>

        <Button
          onClick={() => setShowNewClientForm(true)}
          className="border-2 border-black bg-purple-600 text-white hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 rounded-full border" />
          Nouveau client
        </Button>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleClients.map((client) => (
            <div
              key={client.id}
              className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{client.name}</h3>

                <div className="flex space-x-3">
                  <button onClick={() => setSelectedClient(client)}>
                    {selectedClient?.name} <Eye className="h-4 w-4" />
                  </button>

                  <button>
                    <Edit className="h-4 w-4" />
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
        <ClientForm
          isActive={true}
          onClose={() => setShowNewClientForm(false)}
        />
      )}
    </>
  );
};

export default ClientsView;
