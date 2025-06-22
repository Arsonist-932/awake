import { DefaultLayout } from "@/components/DefaultLayout";
import Podcast from "./_components/podcast";

const PodcastsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto px-4 py-16 lg:py-20">
        <h1 className="mb-8 text-center text-4xl font-bold">Podcasts</h1>

        <Podcast />
      </div>
    </DefaultLayout>
  );
};

export default PodcastsPage;
