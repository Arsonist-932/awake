import { useState } from "react";
import InputForm from "@/components/InputForm";
import { Label } from "@/components/ui/label";

import { sampleAppointments } from "@/data/data";
import { Appointment } from "@/data/types";
import { formatDate, formatTime } from "@/hooks/Date";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ModalForm from "./ModalForm";
import TextArea from "@/components/ui/textarea";
import { sampleClients } from "@/data/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";

const AppointmentsView = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [appointments, setAppointments] =
    useState<Appointment[]>(sampleAppointments);
  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const [appointementFormData, setAppointementFormData] = useState({
    client: "",
    date: "",
    hour: "",
    type: "",
    duration: "",
    note: "",
  });

  const handleChange = () => {};

  const handleSubmit = () => {};

  const test = () => {
    if (selectedAppointment) {
      // Par exemple : log ou autre traitement
      console.log("Appointment selected:", selectedAppointment);
    }
    setSelectedAppointment(null);
    setAppointments(appointments);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Gestion des Rendez-vous</h2>
        <Button
          onClick={() => setShowNewAppointmentForm(true)}
          variant={"closed"}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      {/* Search */}
      <Card className="space-y-6 p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />

              <Input
                type="text"
                placeholder="Rechercher un client ou type de séance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="all">Tous les statuts</option>
            <option value="confirmed">Confirmé</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>

        {/* Tableau Clients */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="divide-red-500">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-800">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium">
                      {appointment.clientName}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm">
                      {formatDate(appointment.date)}
                    </div>
                    <div className="text-sm">{appointment.time}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm">{appointment.type}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm">
                      {formatTime(appointment.duration)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge
                      variant={
                        appointment.status === "confirmed"
                          ? "success"
                          : appointment.status === "pending"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {appointment.status === "confirmed" && (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      )}
                      {appointment.status === "pending" && (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {appointment.status === "cancelled" && (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {appointment.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <button className="hidden" onClick={test}>
        fr
      </button>

      {showNewAppointmentForm && (
        <ModalForm
          title="Créer un nouveau RDV"
          isOpen={showNewAppointmentForm}
          onClose={() => setShowNewAppointmentForm(false)}
          onSubmit={handleSubmit}
          submitLabel="Ajouter le RDV"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Client *</Label>

              <Select
                value={appointementFormData.client}
                onValueChange={(value: string) =>
                  setAppointementFormData((prev) => ({
                    ...prev,
                    client: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {sampleClients.map((client, index) => (
                    <SelectItem key={index} value={client.name}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputForm
                id="date"
                name="Date de réservation *"
                type="date"
                value={appointementFormData.date}
                onChange={handleChange}
              />

              <InputForm
                id="hour"
                name="Heure de réservation *"
                type="time"
                value={appointementFormData.hour}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="mb-1 block text-sm font-medium">
                Type de séance *
              </Label>

              <Select
                value={appointementFormData.type}
                onValueChange={(value: string) =>
                  setAppointementFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un type de RDV" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hypnothérapie">Hypnothérapie</SelectItem>
                  <SelectItem value="Coaching">Coaching</SelectItem>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 block text-sm font-medium">
                Durée (minutes)
              </Label>

              <Select
                value={appointementFormData.duration}
                onValueChange={(value: string) =>
                  setAppointementFormData((prev) => ({
                    ...prev,
                    duration: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une durée" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TextArea
              id="note"
              label="Note (optionnel)"
              value=""
              row={2}
              placeholder="Notes sur le rendez-vous..."
              onChange={handleChange}
            />
          </div>
        </ModalForm>
      )}
    </div>
  );
};

export default AppointmentsView;
