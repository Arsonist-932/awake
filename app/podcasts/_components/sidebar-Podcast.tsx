import {
  MoreHorizontal,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Podcast } from "./podcast";

const SidebarPodcast = ({
  podcastList,
  Onclick,
  isPlaying,
}: {
  podcastList: Podcast | null;
  Onclick: () => void;
  isPlaying: boolean;
}) => {
  return (
    <>
      {/* Lecteur fixe en bas */}
      {podcastList && (
        <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg">
          <div className="border-t bg-white/95 shadow-2xl dark:bg-gray-900/95">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                    <Image
                      src={podcastList.imageUrl}
                      alt={podcastList.title}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="line-clamp-1 font-medium">
                      {podcastList.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {podcastList.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-3 md:flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                    >
                      <Volume2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                    >
                      <MoreHorizontal size={18} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                    >
                      <SkipBack size={18} />
                    </Button>

                    <Button
                      onClick={Onclick}
                      size="icon"
                      className="h-12 w-12 rounded-full bg-primary"
                    >
                      {isPlaying ? (
                        <Pause size={22} />
                      ) : (
                        <Play size={22} className="ml-1" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                    >
                      <SkipForward size={18} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="mt-2">
                <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-full w-1/3 bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarPodcast;
