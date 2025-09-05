import { createClient } from "@/lib/supabase/client";
import { Category, Theme } from "@/types/skillsTypes";
import { PostgrestResponse } from "@supabase/supabase-js";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//**** Variabless *****//
const supabase = createClient();

//************************************//
// Fonctions Puor les catégories *****//
//************************************//

// *** RECUPERATION DES CATEGORIES ET DES COMPETENCES *** //
const CategorieWithSkill = async () => {
  const [Categories, Themes]: [
    PostgrestResponse<Category>,
    PostgrestResponse<Theme>,
  ] = await Promise.all([
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

export const fetchCategory = () => {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: CategorieWithSkill,
    staleTime: 15 * 60 * 1000, // Donnés fraiche pendant 15 min
  });
};

// *** CREATION DE CATEGORIE *** //
const CreatCategorySkill = async (categoryData: {
  name: string | undefined;
  active: boolean | undefined;
  categorie?: string;
}) => {
  const { data, error } = await supabase
    .from("Categories")
    .insert(categoryData)
    .select();

  if (error) {
    console.error("Erreur lors de la création de la catégorie:", error);
    throw error;
  }

  console.log("Category created:", data);

  return data;
};

export const createCat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["Create_Category"],
    mutationFn: CreatCategorySkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
  });
};

// *** SUPPRESSION DE CATEGORIE *** //
export const handleDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete_Category"],
    mutationFn: DeleteCategory,
    // Invalider et refetch les données des catégories
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      queryClient.invalidateQueries({ queryKey: ["categoriesWithSkills"] });
    },
  });
};

const DeleteCategory = async ({ id, name, active }: Category) => {
  const isConfirmed = confirm(
    `Êtes-vous sûr(e) de vouloir supprimer la catégorie "${name}" ?`,
  );

  if (!isConfirmed) {
    throw new Error("Suppression annulée");
  }

  const { error } = await supabase.from("Categories").delete().eq("id", id);

  if (error) {
    console.error("Une erreur s'est produite");
    alert("Une erreur inattendue s'est produite");
    throw error;
  }

  return { id, name, active };
};

// *** MIS A JOUR CATEGORIE ***//
export const handleUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["Update_Category"],
    mutationFn: UpdateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
  });
};

const UpdateCategory = async ({
  id,
  name,
  active,
}: {
  id?: string | undefined;
  name: string | undefined;
  active: boolean | undefined;
}) => {
  const isConfirmed = confirm(
    `Êtes-vous sûr(e) de vouloir modifier la catégorie "${name}" ?`,
  );
  if (!isConfirmed) {
    throw new Error("Mise à jour annulée");
  }

  const { data, error } = await supabase
    .from("Categories")
    .update({ name: name, active: active })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Une erreur s'est produite" + error);
    alert("Une erreur inattendue s'est produite");
    throw error;
  }

  return data;
};
