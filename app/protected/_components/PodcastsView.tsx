import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { samplePodcasts } from "@/data/data";
import { Edit, Mic, Play, Plus, Trash2 } from "lucide-react";
import { formatTime } from "@/hooks/Date";
import { useState } from "react";
import PodcastForm from "./Form/PodcastForm";
import { Badge } from "@/components/ui/badge";

const PodcastsView = () => {
  const [showNewPodcastForm, setShowNewPodcastForm] = useState(false);

  return (
    <>
      <div className="space-y-10">
        {/* Title */}
        <section className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Gestion des Podcasts</h2>

          <Button
            onClick={() => setShowNewPodcastForm(true)}
            className="border-2 border-black bg-purple-600 text-white hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 rounded-full border" />
            Ajouter un podcast
          </Button>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {samplePodcasts.map((podcast) => (
            <Card key={podcast.id} className="p-6">
              <div className="mb-4 flex aspect-square items-center justify-center rounded-lg">
                <Mic className="h-12 w-12" />
              </div>

              <h3 className="mb-2 font-semibold">{podcast.title}</h3>

              <p className="mb-3 line-clamp-2 text-sm">{podcast.description}</p>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span>{formatTime(Math.floor(podcast.duration / 60))}</span>

                <Badge className="bg-green-800 font-medium text-white hover:bg-green-800">
                  {podcast.category}
                </Badge>
              </div>

              <div className="mb-4 flex items-center justify-between text-xs">
                <span>{podcast.downloads} téléchargements</span>

                <span>
                  {new Date(podcast.uploadDate).toLocaleDateString("fr-FR")}
                </span>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-purple-600 text-white hover:bg-purple-800"
                >
                  <Play className="mr-1 h-4 w-4" />
                  Écouter
                </Button>

                <Button variant="ghost" size="sm" onClick={(e) => e.target}>
                  <Edit className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
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
