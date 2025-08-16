"use client";
import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextArea from "@/components/ui/textarea";
import InputForm from "@/components/InputForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      setFormData({
        lastname: "",
        firstname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <>
      {isPending ? (
        <div className="mt-60 space-y-4 rounded-lg border p-6 text-center text-green-600">
          <p className="">Merci pour votre message</p>

          <p>Nous vous répondrons dans les plus brefs délais</p>
        </div>
      ) : (
        <form
          className="mt-10 w-full max-w-3xl rounded-lg p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            {/* Nom et Prénom */}
            <div className="grid gap-5 md:grid-cols-2">
              <InputForm
                id="lastname"
                name="Nom *"
                type="string"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Indiquez votre nom"
                required
              />

              <InputForm
                id="firstname"
                name="Prénom *"
                type="string"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Indiquez votre prénom"
                required
              />
            </div>

            {/* Email */}
            <InputForm
              id="email"
              name="Email *"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@exemple.com"
              required
            />

            {/* Téléphone */}
            <InputForm
              id="phone"
              name="Téléphone *"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="N° de téléphone"
              required
            />

            {/* Message Type */}

            <Select
              value={formData.subject}
              onValueChange={(value: string) =>
                setFormData((prev) => ({ ...prev, subject: value }))
              }
            >
              <SelectGroup>
                <SelectLabel className="p-0 py-1 text-sm text-white">
                  Objet du message *
                </SelectLabel>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner l'objet du message" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">Informations</SelectItem>
                  <SelectItem value="quote">Demande de devis</SelectItem>
                  <SelectItem value="other">Autres demandes</SelectItem>
                </SelectContent>
              </SelectGroup>
            </Select>

            {/* Message */}
            <TextArea
              label="Message *"
              id="message"
              value={formData.message}
              row={4}
              placeholder="Rédigez votre demande ..."
              onChange={handleChange}
            />

            {/* Submit Button */}
            <div className="flex">
              <Button
                variant="default"
                type="submit"
                className="w-full gap-2 py-4"
              >
                <Send size={20} /> Envoyer
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ContactForm;
