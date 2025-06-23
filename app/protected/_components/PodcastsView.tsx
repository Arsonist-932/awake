import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { samplePodcasts } from "@/data/data";
import { Edit, Mic, Play, Plus, Trash2 } from "lucide-react";
import { formatTime } from "@/hooks/Date";
import { useMemo, useState } from "react";
import PodcastForm from "./Form/PodcastForm";
import { Badge } from "@/components/ui/badge";
import SearchTerm from "@/components/Search";
import Image from "next/image";

const PodcastsView = () => {
  const [showNewPodcastForm, setShowNewPodcastForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Logique de filtrage
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

              <div className="p-3">
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
        <PodcastForm
          isActive={true}
          onClose={() => setShowNewPodcastForm(false)}
        />
      )}
    </>
  );
};

export default PodcastsView;
