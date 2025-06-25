import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Edit, Play, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { formatTime } from "@/hooks/Date";
import { samplePodcasts } from "@/data/data";
import SearchTerm from "@/components/Search";
import ModalForm from "./ModalForm";
import InputForm from "@/components/InputForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextArea from "@/components/ui/textarea";
import { Mic, Upload } from "lucide-react";

const PodcastsView = () => {
  // LOGIQUE DE FILTRAGE
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPodcasts = useMemo(() => {
    return samplePodcasts.filter((podcast) => {
      const matchesSearch =
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.uploadDate.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "title" && podcast.title) ||
        (filterStatus === "description" && podcast.description) ||
        (filterStatus === "uploadDate" && podcast.uploadDate);

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // GESTION FORMULAIRE
  const [showNewPodcastForm, setShowNewPodcastForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [PodcastFormData, setPodcastFormData] = useState<{
    title: string;
    description: string;
    image: File | string;
    audio: string;
    category: string;
  }>({
    title: "",
    description: "",
    image: "",
    audio: "",
    category: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setPodcastFormData({ ...PodcastFormData, [e.target.id]: e.target.value });
  };

  // Fonction pour gérer la sélection d'image et créer la prévisualisation
  const PreviewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // Vérifier que files n'est pas null et qu'il contient au moins un fichier
    if (files && files.length > 0) {
      const file = files[0];

      // Vérifier le type de fichier
      if (file.type.startsWith("image/")) {
        // Créer une URL de prévisualisation
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Mettre à jour le state avec le fichier
        setPodcastFormData({
          ...PodcastFormData,
          image: file, // Stocker le fichier, pas juste la valeur
        });
      } else {
        alert("Veuillez sélectionner un fichier image valide");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = () => {
    console.log("Podcast crée", PodcastFormData);
  };

  return (
    <>
      <div className="space-y-10">
        {/* Title */}
        <section className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Gestion des Podcasts</h2>

          <Button
            variant={"closed"}
            onClick={() => setShowNewPodcastForm(true)}
          >
            <Plus className="h-4 w-4 rounded-full border" />
            Ajouter un podcast
          </Button>
        </section>

        {/* Search Bar */}
        <SearchTerm
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Rechercher un podcast..."
          filterValue={filterStatus}
          onFilterChange={setFilterStatus}
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {filteredPodcasts.map((podcast) => (
            <Card key={podcast.id} className="relative">
              <div className="mb-4 flex aspect-square items-center justify-center rounded-lg p-0">
                <Image
                  src={podcast.coverImage}
                  width={500}
                  height={500}
                  alt="image"
                  className="w-full overflow-hidden rounded-t-lg"
                />
              </div>

              <div className="px-3">
                <h3 className="mb-2 font-semibold">{podcast.title}</h3>

                <p className="mb-3 line-clamp-2 text-sm">
                  {podcast.description}
                </p>
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span>{formatTime(Math.floor(podcast.duration / 60))}</span>

                  <span>
                    {new Date(podcast.uploadDate).toLocaleDateString("fr-FR")}
                  </span>

                  <Badge className="absolute right-2 top-2 bg-green-800 text-white hover:bg-green-800">
                    {podcast.category}
                  </Badge>
                </div>

                <div className="mb-4 flex items-center justify-end text-xs">
                  <span>{podcast.downloads} téléchargements</span>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-red-600 text-white hover:bg-red-800">
                    <Play className="mr-1 h-4 w-4" />
                    Écouter
                  </Button>

                  <Button
                    className="p-2 hover:bg-transparent"
                    variant="ghost"
                    onClick={(e) => e.target}
                  >
                    <Edit />
                  </Button>

                  <Button className="p-2 hover:bg-transparent" variant="ghost">
                    <Trash2 size={50} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {showNewPodcastForm && (
        <ModalForm
          title="Créer un nouveau podcast"
          isOpen={showNewPodcastForm}
          onClose={() => setShowNewPodcastForm(false)}
          onSubmit={handleSubmit}
          submitLabel="Publier le podcast"
        >
          <div className="flex flex-col gap-3">
            <InputForm
              id="title"
              name="Titre *"
              type="text"
              value={PodcastFormData.title}
              placeholder="Titre du podcast"
              onChange={handleChange}
            />

            <TextArea
              id="description"
              label="Description *"
              value={PodcastFormData.description}
              row={2}
              placeholder="Décription détaillée du podcast"
              onChange={handleChange}
            />

            {/* IMAGE */}
            <div>
              <Label htmlFor="image" className="mb-1 block text-sm font-medium">
                Image de couverture
              </Label>

              <div className="flex justify-center rounded-md border border-gray-600 px-6 pb-6 pt-5 transition-colors">
                <div className="relative space-y-1 text-center">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <Image
                        src={imagePreview}
                        alt="Prévisualisation"
                        className="mx-auto h-full w-full rounded-md object-cover"
                        height={300}
                        width={300}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setPodcastFormData({ ...PodcastFormData, image: "" });
                        }}
                        className="absolute right-2 top-0 text-red-600 hover:text-red-600 dark:hover:text-red-900"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex text-sm">
                      <label className="relative cursor-pointer rounded-md">
                        <Upload className="mx-auto h-12 w-12" />
                        <span>Télécharger une image ou glisser-déposer</span>
                        <p className="text-xs">PNG, JPG jusqu&apos;à 5MB</p>

                        <Input
                          id="image"
                          type="file"
                          required
                          className="sr-only"
                          accept="image/*"
                          onChange={PreviewFile}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* FICHIER AUDIO*/}
            <div>
              <Label htmlFor="audio">Fichier audio *</Label>
              <div className="flex justify-center rounded-md border border-gray-600 px-6 pb-6 pt-5 transition-colors">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm">
                    <label className="relative cursor-pointer rounded-md">
                      <Mic className="mx-auto h-12 w-12" />
                      <span>Télécharger un fichier audio</span>{" "}
                      <p className="text-xs">
                        MP3, WAV, M4A jusqu&apos;à 100MB
                      </p>
                      <Input
                        id="audio"
                        type="file"
                        className="sr-only"
                        accept="audio/*"
                        value={PodcastFormData.audio}
                        onChange={(e) =>
                          setPodcastFormData({
                            ...PodcastFormData,
                            audio: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <Label htmlFor="categories">Catégorie</Label>

              <Select
                value={PodcastFormData.category}
                onValueChange={(value: string) =>
                  setPodcastFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Sélectionner une catégorie</SelectItem>
                  <SelectItem value="Bienfait">Bien-être</SelectItem>
                  <SelectItem value="hypnose">Hypnose</SelectItem>
                  <SelectItem value="Méditation">Méditation</SelectItem>
                  <SelectItem value="Interview">Sommeil</SelectItem>
                  <SelectItem value="developpement">
                    Développement Personnel
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ModalForm>
      )}
    </>
  );
};

export default PodcastsView;
