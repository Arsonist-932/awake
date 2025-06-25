"use client";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import TextArea from "./ui/textarea";
import InputForm from "./InputForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium">
                Téléphone *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="N° de téléphone"
                type="tel"
                required
                className="mt-1 block w-full"
              />
            </div>

            {/* Message Type */}

            <div>
              <Label htmlFor="subject" className="block text-sm">
                Type de message *
              </Label>

              <Select
                value={formData.subject}
                onValueChange={(value: string) =>
                  setFormData((prev) => ({ ...prev, subject: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner l'objet de votre message" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Choisissez votre message</SelectItem>
                  <SelectItem value="project">
                    Je veux participer à un projet
                  </SelectItem>
                  <SelectItem value="quote">
                    J&apos;ai besoin d&apos;un devis
                  </SelectItem>
                  <SelectItem value="other">Autres demandes</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
