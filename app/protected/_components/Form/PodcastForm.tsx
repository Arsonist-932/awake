import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mic, Upload, XCircle } from "lucide-react";
import { useState } from "react";

const PodcastForm = ({
  isActive,
  onClose,
}: {
  isActive: boolean;
  onClose: () => void;
}) => {
  const [PodcastFormData, setPodcastFormData] = useState({
    title: "",
    description: "",
    image: "",
    audio: "",
    categories: "",
  });

  if (!isActive) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(PodcastFormData);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-xl bg-white p-6 dark:bg-black">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Ajout d&apos;un nouveau podcast
            </h3>

            <Button
              variant={"outline"}
              onClick={onClose}
              className="bg-red-700 text-white"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* FORMULAIRE */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                type="text"
                required
                className="border-gray-600 text-sm"
                placeholder="Titre du podcast"
                value={PodcastFormData.title}
                onChange={(e) =>
                  setPodcastFormData({
                    ...PodcastFormData,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>

              <textarea
                id="description"
                rows={2}
                required
                className="w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm"
                placeholder="Description du contenu du podcast..."
                value={PodcastFormData.description}
                onChange={(e) =>
                  setPodcastFormData({
                    ...PodcastFormData,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div>
              <Label htmlFor="image" className="mb-1 block text-sm font-medium">
                Image de couverture
              </Label>

              <div className="flex justify-center rounded-md border border-gray-600 px-6 pb-6 pt-5 transition-colors">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm">
                    <label className="relative cursor-pointer rounded-md">
                      <Upload className="mx-auto h-12 w-12" />
                      <span>Télécharger une image ou glisser-déposer</span>
                      <p className="text-xs">PNG, JPG jusqu'à 5MB</p>

                      <Input
                        id="image"
                        type="file"
                        required
                        className="sr-only"
                        accept="image/*"
                        value={PodcastFormData.image}
                        onChange={(e) =>
                          setPodcastFormData({
                            ...PodcastFormData,
                            image: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

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
                        required
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
              <select
                id="categories"
                className="0 w-full rounded-md border border-gray-600 px-3 py-2 text-sm"
                required
                value={PodcastFormData.categories}
                onChange={(e) =>
                  setPodcastFormData({
                    ...PodcastFormData,
                    categories: e.target.value,
                  })
                }
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Bienfait">Bien-être</option>
                <option value="hypnose">Hypnose</option>
                <option value="Méditation">Méditation</option>
                <option value="Interview">Sommeil</option>
                <option value="developpement">Développement Personnel</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                variant="secondary"
                className="flex-1 bg-red-700 text-white hover:bg-red-900"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button className="flex-1">Publier le podcast</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PodcastForm;
