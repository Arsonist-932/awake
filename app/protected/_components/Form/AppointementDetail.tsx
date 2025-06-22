import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/hooks/Date";
import { XCircle } from "lucide-react";
import { Appointment } from "@/data/types";
import Badge from "../Badge";

interface AppointmentModalProps {
  selectedAppointment: Appointment | null;
  setSelectedAppointment: (appointment: Appointment | null) => void;
}

const AppointmentModal = ({
  selectedAppointment,
  setSelectedAppointment,
}: AppointmentModalProps) => {
  if (!selectedAppointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Détails du rendez-vous
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedAppointment(null)}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Client</label>
            <p className="text-gray-900">{selectedAppointment.clientName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Date et heure
            </label>
            <p className="text-gray-900">
              {formatDate(selectedAppointment.date)} à{" "}
              {selectedAppointment.time}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Type de séance
            </label>
            <p className="text-gray-900">{selectedAppointment.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Durée</label>
            <p className="text-gray-900">
              {formatTime(selectedAppointment.duration)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Statut</label>
            <div className="mt-1">
              <Badge
                variant={
                  selectedAppointment.status === "confirmed"
                    ? "success"
                    : selectedAppointment.status === "pending"
                      ? "warning"
                      : "danger"
                }
              >
                {selectedAppointment.status}
              </Badge>
            </div>
          </div>
          {selectedAppointment.notes && (
            <div>
              <label className="text-sm font-medium text-gray-500">Notes</label>
              <p className="text-gray-900">{selectedAppointment.notes}</p>
            </div>
          )}
        </div>
        <div className="mt-6 flex space-x-3">
          <Button variant="secondary" className="flex-1">
            Modifier
          </Button>

          <Button variant="default" className="flex-1">
            Annuler RDV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
