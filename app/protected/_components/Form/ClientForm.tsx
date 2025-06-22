import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircle } from "lucide-react";

const ClientForm = ({
  isActive,
  onClose,
}: {
  isActive: boolean;
  onClose?: () => void;
}) => {
  if (!isActive) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="max-h-[90vh] w-full max-w-lg rounded-lg bg-white p-6 dark:bg-black">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Fiche client</h3>

            <Button
              variant={"outline"}
              onClick={onClose}
              className="bg-red-700 text-white hover:bg-red-800"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="lastname" className="text-sm font-medium">
                Nom
              </Label>
              <Input type="text" id="name" placeholder="Dupont" />
            </div>

            <div>
              <Label htmlFor="firstname" className="text-sm font-medium">
                Prénom
              </Label>
              <Input type="text" id="firstname" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <Input type="text" id="name" />
              </div>
              <div>
                <Label className="text-sm font-medium">Téléphone</Label>
                <Input type="text" id="name" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-medium">Client depuis</Label>
                <Input type="text" id="name" />
              </div>
              <div>
                <Label className="text-sm font-medium">Nombre de séances</Label>
                <Input type="text" id="name" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1 bg-red-700 text-white hover:bg-red-900"
              onClick={onClose}
            >
              Annuler
            </Button>

            <Button variant="default" className="flex-1">
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientForm;
