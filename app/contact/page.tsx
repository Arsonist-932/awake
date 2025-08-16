import { DefaultLayout } from "@/components/layout/DefaultLayout";
import ContactForm from "./_components/contactForm";

const Contact = () => {
  return (
    <DefaultLayout>
      <section className="flex min-h-screen w-full flex-col items-center px-4 py-10 md:px-10">
        <div className="flex flex-col items-center justify-center gap-4 pt-8">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="max-w-2xl text-center text-lg">
            Prêt à débuter votre voyage vers le changement ? Envoyez-moi un
            message et je vous répondrai dans les plus brefs délais pour
            explorer ensemble votre prochain projet de transformation.
          </p>
        </div>

        <ContactForm />
      </section>
    </DefaultLayout>
  );
};

export default Contact;
