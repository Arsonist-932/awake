import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sampleClients } from "@/data/data";
import { XCircle } from "lucide-react";

const NewAppointmentForm = ({
  isActive,
  onClose,
}: {
  isActive: boolean;
  onClose: () => void;
}) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-black">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Nouveau rendez-vous
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <XCircle className="h-4 w-4" />
          </Button>
        </div>

        <form className="space-y-4">
          <div>
            <Label className="mb-1 block text-sm font-medium">Client</Label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Sélectionner un client</option>
              {sampleClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-1 block text-sm font-medium">Date</Label>
              <Input
                type="date"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium">Heure</Label>
              <Input
                type="time"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1 block text-sm font-medium">
              Type de séance
            </Label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Sélectionner un type</option>
              <option value="Hypnothérapie">Hypnothérapie</option>
              <option value="Coaching">Coaching</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          <div>
            <Label className="mb-1 block text-sm font-medium">
              Durée (minutes)
            </Label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>

          <div>
            <Label className="mb-1 block text-sm font-medium">
              Notes (optionnel)
            </Label>
            <textarea
              rows={3}
              className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
              placeholder="Notes sur le rendez-vous..."
            ></textarea>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              className="flex-1 bg-red-600 text-white hover:bg-red-900"
              onClick={onClose}
            >
              Annuler
            </Button>

            <Button variant="default">Créer le rendez-vous</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentForm;
