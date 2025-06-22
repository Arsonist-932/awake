import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";

const ServiceForm = ({
  isActive,
  onClose,
}: {
  isActive: boolean;
  onClose: () => void;
}) => {
  if (!isActive) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-black">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Nouveau service</h3>
            <Button
              variant={"outline"}
              onClick={onClose}
              className="bg-red-700 text-white hover:bg-red-800"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* FORM */}
          <form className="space-y-4">
            <div>
              <Label className="mb-1 block text-sm font-medium">
                Nom du service *
              </Label>
              <Input
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Nom du service"
              />
            </div>

            <div>
              <Label className="mb-1 block text-sm font-medium">
                Description *
              </Label>
              <textarea
                rows={3}
                required
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
                placeholder="Description détaillée du service..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="mb-1 block text-sm font-medium">
                  Prix (€) *
                </Label>
                <Input
                  type="number"
                  required
                  min="0"
                  step="5"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="0"
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium">
                  Durée (min) *
                </Label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium">
                Catégorie
              </Label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                <option value="">Sélectionner une catégorie</option>
                <option value="Hypnothérapie">Hypnothérapie</option>
                <option value="Coaching">Coaching</option>
                <option value="Consultation">Consultation</option>
                <option value="Formation">Formation</option>
              </select>
            </div>
            <div className="flex items-center">
              <Input
                type="checkbox"
                id="active"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="active" className="ml-2 block text-sm">
                Service actif (visible sur le site)
              </Label>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                variant="secondary"
                className="flex-1 bg-red-700 text-white hover:bg-red-800"
                onClick={onClose}
              >
                Annuler
              </Button>

              <Button variant="default" className="flex-1">
                Créer le service
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ServiceForm;
