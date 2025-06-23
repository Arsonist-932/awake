import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { DefaultLayout } from "@/components/DefaultLayout";

import { ArrayServices, ArrayServicesPro } from "@/data/data";
import Princing from "@/components/Princing";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="flex w-full flex-1 flex-col items-center gap-20 py-8 sm:py-14">
          <div className="flex flex-1 flex-col gap-6 px-4">
            <section id="about">
              <div className="flex items-center justify-evenly gap-3 py-6 max-lg:flex-col md:gap-4">
                <div className="overflow-hidden">
                  <Image
                    src={"/images/about-img.jpg"}
                    alt="Image de présentation"
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-col items-center justify-center gap-3 lg:w-1/2">
                  <h2 className="mb-2 text-xl uppercase">Qui Suis-je ?</h2>

                  <p>
                    Je suis Valeycia Fortuné, Maître Praticien en Hypnose
                    Ericksonienne formée à l&apos;IFHE (Institut Français
                    d&apos;Hypnose Humaniste & Ericksonienne). Depuis 2016, ma
                    pratique s&apos;enrichit des approches en PNL et nouvelle
                    Hypnose, me permettant d&apos;accompagner efficacement mes
                    clients vers leurs objectifs.
                  </p>

                  <p>
                    Mon approche unique combine les techniques puissantes de
                    l&apos;hypnose ericksonienne aux outils du coaching de vie.
                    Je crois profondément en la capacité de chacun à mobiliser
                    ses ressources intérieures pour surmonter ses défis.
                  </p>

                  <p>
                    Que vous souhaitiez gérer votre stress, dépasser vos
                    blocages ou retrouver confiance en vous, je crée un espace
                    sécurisant où vous pourrez explorer et activer votre
                    potentiel en toute confiance.
                  </p>

                  <div className="flex w-full gap-2 max-md:flex-col">
                    <Button asChild>
                      <Link href={"/contact"} className="w-full">
                        Me contacter
                      </Link>
                    </Button>

                    <Button variant="primary" asChild>
                      <Link href={"/contact"}>Reserver une séance</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section id="skills">
              <div className="space-y-6 py-16">
                <h2 className="mb-5 text-center text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                  Mes compétences
                </h2>

                <p className="text-center lg:px-16">
                  L&apos;hypnose thérapeutique et le coaching de vie permettent
                  d&apos;accompagner efficacement de nombreuses problématiques.
                  Voici les principaux domaines dans lesquels je peux vous
                  accompagner vers un changement positif et durable
                </p>

                <Skills />
              </div>
            </section>

            <section id="services" className="space-y-8 py-10">
              <div className="flex flex-col gap-6">
                <h2 className="text-center text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                  Mes Services
                </h2>

                <div className="text-center">
                  <p>
                    Découvrez les services que je propose pour vous aider à
                    atteindre vos objectifs de bien-être et de développement
                    personnel.
                  </p>

                  <p>
                    Que ce soit pour surmonter des blocages, gérer le stress, ou
                    améliorer votre confiance en vous, je suis là pour vous
                    accompagner dans votre parcours de transformation.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                <Princing Array={ArrayServices} />
              </div>
            </section>

            <section id="servicespro" className="space-y-8 py-10">
              <div className="flex flex-col gap-6">
                <h2 className="text-center text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                  Mes Services Professionnels
                </h2>

                <div className="text-center">
                  <p>
                    Découvrez les services que je propose pour vous aider à
                    atteindre vos objectifs de bien-être et de développement
                    personnel.
                  </p>

                  <p>
                    Que ce soit pour surmonter des blocages, gérer le stress, ou
                    améliorer votre confiance en vous, je suis là pour vous
                    accompagner dans votre parcours de transformation.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <Princing Array={ArrayServicesPro} />
              </div>
            </section>

            <section id="podcasts" className="pt-16">
              <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                  <h2 className="text-center text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                    Podcasts
                  </h2>

                  <p className="">
                    Explorez nos podcasts pour vous inspirer, apprendre, et
                    évoluer dans votre bien-être quotidien.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex-1">
                    <Image
                      src={"/images/podcast.webp"}
                      alt="Podcast illustration"
                      className="w-full rounded-lg shadow-lg"
                      width={612}
                      height={408}
                      priority
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="mb-6 lg:text-lg">
                      Nos podcasts explorent divers thèmes liés à la santé, au
                      bien-être et au développement personnel. Plongez dans un
                      monde de réflexion et de sérénité.
                    </p>

                    <Button variant={"primary"} asChild>
                      <Link href="/podcasts" className="w-full rounded-lg p-3">
                        Découvrir nos podcasts
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section id="testimonials" className="pt-16">
              <div className="container mx-auto px-6">
                <h2 className="via-white-500 mb-6 bg-gradient-to-r from-red-900 to-white/80 bg-clip-text text-center text-6xl font-bold leading-tight text-transparent">
                  Ils nous font confiance
                </h2>

                <Testimonials />
              </div>
            </section>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
