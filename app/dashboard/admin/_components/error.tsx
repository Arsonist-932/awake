import { Button } from "@/components/ui/button";
import { ErrorAPIProps } from "@/types";
import { CircleAlert } from "lucide-react";

const ErrorAPI = ({ error, onClick }: ErrorAPIProps) => {
  return (
    <>
      <section className="flex min-h-full p-6">
        <div className="mx-auto flex max-w-7xl justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <CircleAlert className="text-red-800" />
            </div>

            <h3 className="mb-2 font-medium">Erreur de chargement</h3>

            <p className="mb-4 text-sm text-red-600">{error}</p>

            <Button variant={"closed"} onClick={onClick}>
              Réessayer
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorAPI;
