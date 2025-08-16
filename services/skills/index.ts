import { createClient } from "@/lib/supabase/client";
import {
  Category,
  CategorySkill,
  FetchSkillsParams,
  Theme,
} from "@/types/skills";

const supabase = createClient();

export const fetchSkills = async ({
  setLoading,
  setError,
  setCategoriesSkills,
}: FetchSkillsParams) => {
  try {
    setLoading(true);
    setError(null);

    const { data: categories, error: categoriesError } = await supabase
      .from("Categories")
      .select("*");

    if (categoriesError) {
      throw categoriesError;
    }

    const { data: themes, error: skillError } = await supabase
      .from("Skills")
      .select("*");

    if (skillError) {
      throw skillError;
    }

    const categoriesWithThemes: CategorySkill[] = (categories || []).map(
      (category: Category) => ({
        id: category.id,
        name: category.name,
        themes: (themes || []).filter(
          (theme: Theme) => theme.category_id === category.id,
        ),
      }),
    );

    setCategoriesSkills(categoriesWithThemes);
  } catch (error) {
    console.error("Erreur:", error);
    setError("Impossible de charger les compétences");
    setCategoriesSkills([]);
  } finally {
    setLoading(false);
  }
};

export const CategorieWithSkill = async () => {
  const [Categories, Themes] = await Promise.all([
    supabase.from("Categories").select("*"),
    supabase.from("Skills").select("*"),
  ]);

  if (Categories.error) throw Categories.error;
  if (Themes.error) throw Themes.error;

  const categoriesWithThemes =
    Categories.data?.map((category) => ({
      id: category.id,
      name: category.name,
      themes:
        Themes.data?.filter((theme) => theme.category_id === category.id) || [],
    })) || [];

  return categoriesWithThemes;
};

// *** Créattion d'une catégoerie *** //
export const CreatCategoryeSkill = async () => {
  try {
    const { data, error } = await supabase
      .from("Categories")
      .insert({ name: "New Category" })
      .select();

    if (error) {
      throw error;
    }

    if (data) {
      console.log("Category created:", data);
    }
  } catch (error) {
    console.log("Erreur lors de la création de la catégorie:", error);
  }
};

// Fonction de suppression d"une catégorie.
export const DeleteCategory = async ({ id, name }: Category) => {
  const isConfirmed = confirm(
    `Êtes-vous sûr(e) de vouloir supprimer la catégorie "${name}" ?`,
  );

  if (!isConfirmed) {
    return null;
  }

  try {
    const { error } = await supabase.from("Categories").delete().eq("id", id);

    if (error) {
      alert("Une erreur s'est produite");
      throw error;
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.error("Erreur inattendue :", error);
    alert("Une erreur inattendue s'est produite");
    return error;
  }
};

export const UpdateSkill = async () => {};

export const DeleteSkill = async () => {};
