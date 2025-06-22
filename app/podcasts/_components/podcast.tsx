"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SidebarPodcast from "@/app/podcasts/_components/sidebar-Podcast";

type Podcast = {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: string;
  imageUrl: string;
  theme: string;
  createdAt: Date;
};

async function getPodcasts() {
  return [
    {
      id: "1",
      title: "L'hypnose pour gérer l'anxiété au quotidien",
      description:
        "Découvrez comment l'hypnose peut vous aider à retrouver calme et sérénité face aux situations stressantes de la vie quotidienne.",
      audioUrl: "/podcasts/episode1.mp3",
      duration: "28:45",
      imageUrl: "/images/hypnose-anxiete.webp",
      theme: "hypnose",
      createdAt: new Date("2024-12-01"),
    },
    {
      id: "2",
      title: "Reprogrammer ses croyances limitantes",
      description:
        "Comment identifier et transformer les croyances qui vous empêchent d'atteindre vos objectifs grâce aux techniques de coaching et d'hypnose.",
      audioUrl: "/podcasts/episode2.mp3",
      duration: "35:20",
      imageUrl: "/images/croyances-limitantes.jpg",
      theme: "hypnose",
      createdAt: new Date("2024-11-15"),
    },
    {
      id: "3",
      title: "L'auto-hypnose pour un sommeil réparateur",
      description:
        "Apprenez des techniques d'auto-hypnose simples et efficaces pour améliorer la qualité de votre sommeil et vous endormir plus facilement.",
      audioUrl: "/podcasts/episode3.mp3",
      duration: "24:30",
      imageUrl: "/images/sommeil-hypnose.webp",
      theme: "hypnose",
      createdAt: new Date("2024-11-01"),
    },
    {
      id: "4",
      title: "Confiance en soi : dépasser ses peurs",
      description:
        "Un épisode dédié aux techniques de coaching pour développer une confiance inébranlable et surmonter les peurs qui vous paralysent.",
      audioUrl: "/podcasts/episode4.mp3",
      duration: "31:15",
      imageUrl: "/images/confiance-soi.webp",
      theme: "hypnose",
      createdAt: new Date("2024-10-18"),
    },
    {
      id: "5",
      title: "Hypnose et gestion de la douleur chronique",
      description:
        "Explorez comment l'hypnose thérapeutique peut devenir un allié précieux dans la gestion de la douleur chronique et l'amélioration du bien-être.",
      audioUrl: "/podcasts/episode5.mp3",
      duration: "29:40",
      imageUrl: "/images/douleur-chronique.webp",
      theme: "hypnose",
      createdAt: new Date("2024-10-05"),
    },
    {
      id: "6",
      title: "Définir et atteindre ses objectifs de vie",
      description:
        "Les clés du coaching pour clarifier vos objectifs, créer un plan d'action efficace et maintenir votre motivation sur le long terme.",
      audioUrl: "/podcasts/episode6.mp3",
      duration: "33:50",
      imageUrl: "/images/objectifs-vie.jpg",
      theme: "hypnose",
      createdAt: new Date("2024-09-20"),
    },
    {
      id: "7",
      title: "L'hypnose pour arrêter de fumer définitivement",
      description:
        "Témoignages et techniques : comment l'hypnose peut vous accompagner dans votre sevrage tabagique de manière naturelle et durable.",
      audioUrl: "/podcasts/episode7.mp3",
      duration: "26:35",
      imageUrl: "/images/arret-tabac.webp",
      theme: "hypnose",
      createdAt: new Date("2024-09-05"),
    },
    {
      id: "8",
      title: "Gestion des émotions et intelligence émotionnelle",
      description:
        "Développez votre intelligence émotionnelle grâce aux outils de coaching et apprenez à mieux comprendre et gérer vos émotions.",
      audioUrl: "/podcasts/episode8.mp3",
      duration: "37:20",
      imageUrl: "/images/emotions.jpg",
      theme: "hypnose",
      createdAt: new Date("2024-08-22"),
    },
    {
      id: "9",
      title: "L'hypnose régressive : explorer son passé pour guérir",
      description:
        "Découvrez l'hypnose régressive, ses bienfaits thérapeutiques et comment elle peut vous aider à résoudre des traumatismes du passé.",
      audioUrl: "/podcasts/episode9.mp3",
      duration: "42:10",
      imageUrl: "/images/hypnose-regressive.webp",
      theme: "hypnose",
      createdAt: new Date("2024-08-08"),
    },
    {
      id: "10",
      title: "Reconversion professionnelle : oser le changement",
      description:
        "Les étapes clés d'une reconversion réussie, comment surmonter ses peurs et créer la carrière qui vous correspond vraiment.",
      audioUrl: "/podcasts/episode10.mp3",
      duration: "38:45",
      imageUrl: "/images/reconversion.jpg",
      theme: "hypnose",
      createdAt: new Date("2024-07-25"),
    },
    {
      id: "11",
      title: "Hypnose et perte de poids : changer sa relation à la nourriture",
      description:
        "Comment l'hypnose peut transformer votre rapport à l'alimentation et vous accompagner dans une perte de poids saine et durable.",
      audioUrl: "/podcasts/episode11.mp3",
      duration: "30:25",
      imageUrl: "/images/perte-poids.webp",
      theme: "Bien-être",
      createdAt: new Date("2024-07-10"),
    },
    {
      id: "12",
      title: "L'équilibre vie privée - vie professionnelle",
      description:
        "Stratégies de coaching pour créer un équilibre harmonieux entre vos aspirations professionnelles et votre épanouissement personnel.",
      audioUrl: "/podcasts/episode12.mp3",
      duration: "34:15",
      imageUrl: "/images/equilibre-vie.jpg",
      theme: "Développement personnel",
      createdAt: new Date("2024-06-26"),
    },
  ];
}

const Podcast = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const loadPodcasts = async () => {
      const data = await getPodcasts();
      setPodcasts(data);
    };
    loadPodcasts();
  }, []);

  const togglePlay = (podcast: Podcast) => {
    if (currentPodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPodcast(podcast);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {podcasts.map((podcast) => (
          <Card
            key={podcast.id}
            className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div
              className="relative aspect-video cursor-pointer"
              onClick={() => togglePlay(podcast)}
            >
              <Image
                src={podcast.imageUrl}
                alt={podcast.title}
                className="object-cover brightness-100 transition-all duration-300 group-hover:brightness-75"
                fill
                priority
              />

              {/* Overlay avec bouton play/pause */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-white/90 text-primary shadow-lg transition-transform duration-300 hover:scale-110 dark:bg-gray-900/90"
                >
                  {currentPodcast?.id === podcast.id && isPlaying ? (
                    <Pause size={32} />
                  ) : (
                    <Play size={32} className="ml-1" />
                  )}
                </Button>
              </div>

              {/* Badge de durée */}
              <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                {podcast.duration}
              </div>
            </div>

            <CardContent className="space-y-3 p-3">
              <div className="space-y-1.5">
                <h3 className="line-clamp-1 text-lg font-semibold leading-tight tracking-tight">
                  {podcast.title}
                </h3>

                <p className="line-clamp-2 text-sm">{podcast.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lecteur fixe en bas */}
      <SidebarPodcast
        podcastList={currentPodcast}
        Onclick={() => setIsPlaying(!isPlaying)}
        isPlaying={isPlaying}
      />
    </>
  );
};

export default Podcast;
