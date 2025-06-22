"use client";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

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
    >
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
            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="flex-1">
                <Label htmlFor="lastname" className="block text-sm font-medium">
                  Nom *
                </Label>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Nom"
                  required
                  className="mt-1 block w-full"
                />
              </div>

              <div className="mt-4 flex-1 md:mt-0">
                <Label
                  htmlFor="firstname"
                  className="block text-sm font-medium"
                >
                  Prénom *
                </Label>
                <Input
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Prénom"
                  required
                  className="mt-1 block w-full"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
                required
                className="mt-1 block w-full"
              />
            </div>

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
              <Label htmlFor="subject" className="block text-sm font-medium">
                Type de message
              </Label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-secondary focus:ring-secondary"
              >
                <option value="">Choisissez votre message</option>
                <option value="project">Je veux participer à un projet</option>
                <option value="quote">J&apos;ai besoin d&apos;un devis</option>
                <option value="other">Autre</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="block text-sm font-medium">
                Message
              </Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border p-2 shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
              />
            </div>

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
