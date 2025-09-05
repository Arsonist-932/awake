"use client";
import { CategorySkill } from "@/types/skillsTypes";
import { CircleAlert } from "lucide-react";
import { fetchCategory } from "@/services/skills/category";
import { Button } from "../ui/button";

const Skills = () => {
  const { data: categories = [], isLoading, error } = fetchCategory();

  return (
    <>
      {isLoading && (
        <div className="mx-auto max-w-7xl pt-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-200 border-t-red-600"></div>
              <p className="mt-4">Chargement des compétences...</p>
            </div>
          </div>
        </div>
      )}

      {error?.message && (
        <section className="p-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <CircleAlert className="text-red-800" size={30} />
            <p>Aucune catégories ou themes trouvé </p>
          </div>

          <Button
            onClick={fetchCategory}
            className="mt-2 rounded bg-red-800 px-4 py-2 text-white hover:bg-red-900"
          >
            Réessayer
          </Button>
        </section>
      )}

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {categories.map((category: CategorySkill) => (
          <div
            key={category.id}
            className="transform rounded-lg p-6 shadow-lg transition duration-300"
          >
            <h3 className="mb-4 w-fit rounded-lg border border-transparent border-b-primary px-2 font-[Roboto] text-xl font-semibold">
              {category.name}
            </h3>

            {!Array.isArray(category.themes) || category.themes.length === 0 ? (
              <div className="p-4 text-center text-sm">
                <p>Aucune compétence à afficher</p>
              </div>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-3">
                {(category.themes || []).map((theme) => (
                  <li
                    key={theme.id}
                    className="flex cursor-default items-center gap-1 rounded-lg border px-2 py-1 text-xs shadow-sm shadow-primary hover:border-primary"
                  >
                    <span className="h-2 w-2 rounded-full bg-destructive"></span>
                    {theme.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Skills;
