"use client";
import { fetchSkills } from "@/hooks/fetchSkills";
import { CategorySkill } from "@/types/skills";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { CircleAlert } from "lucide-react";

const Skills = () => {
  const [categoriesSkills, setCategoriesSkills] = useState<CategorySkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSkills = useCallback(() => {
    fetchSkills({ setLoading, setError, setCategoriesSkills });
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const skillsContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <span className="ml-2">Chargement des compétences...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <CircleAlert className="text-red-800" size={30} />
            <p>{error}</p>
          </div>

          <Button
            onClick={loadSkills}
            className="mt-2 rounded bg-red-800 px-4 py-2 text-white hover:bg-red-900"
          >
            Réessayer
          </Button>
        </div>
      );
    }

    if (!Array.isArray(categoriesSkills) || categoriesSkills.length === 0) {
      return (
        <div className="p-4 text-center text-sm">
          <p>Aucune compétence à afficher</p>
          <button
            onClick={loadSkills}
            className="mt-2 rounded bg-red-900 px-4 py-2 text-white"
          >
            Recharger
          </button>
        </div>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {categoriesSkills.map((category: CategorySkill) => (
          <div
            key={`category-${category.id}`}
            className="transform rounded-lg p-6 shadow-lg transition duration-300"
          >
            <h3 className="mb-4 w-fit rounded-lg border border-transparent border-b-primary px-2 font-[Roboto] text-xl font-semibold">
              {category.name}
            </h3>

            <ul className="mt-4 flex flex-wrap gap-3">
              {(category.themes || []).map((theme) => (
                <li
                  key={`theme-${theme.id}`}
                  className="flex cursor-default items-center gap-1 rounded-lg border px-2 py-1 text-xs shadow-sm shadow-primary hover:border-primary"
                >
                  <span className="h-2 w-2 rounded-full bg-destructive"></span>
                  {theme.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }, [categoriesSkills, loading, error, fetchSkills]);

  return skillsContent;
};

export default Skills;
