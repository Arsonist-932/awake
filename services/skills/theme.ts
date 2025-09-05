import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

// *** CREATION  DE THEME *** //
export const ThemeCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create_theme"],
    mutationFn: CreateTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      queryClient.invalidateQueries({ queryKey: ["categoriesWithSkills"] });
    },
  });
};

const CreateTheme = async (ThemeData: {
  name: string | undefined;
  category_id: string | undefined;
  active: boolean | undefined;
}) => {
  const { data, error } = await supabase
    .from("Skills")
    .insert(ThemeData)
    .select();

  if (error) {
    console.error("Erreur lors de la création du thème:", error);
    throw error;
  }

  console.log("Thème created:", data);
  return data;
};

// *** SUPPRESSION DE THEME *** //
export const handleDeleteTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-theme"],
    mutationFn: deleteTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      queryClient.invalidateQueries({ queryKey: ["categoriesWithSkills"] });
    },
  });
};

const deleteTheme = async ({
  id,
  category_name,
  theme_name,
}: {
  id: string;
  category_name: string;
  theme_name: string;
}) => {
  const isConfirmed = confirm(
    `Êtes-vous sûr(e) de vouloir supprimer le thème "${theme_name}}" de la catégorie "${category_name}" ?`,
  );

  if (!isConfirmed) {
    throw new Error("Suppression annulée");
  }

  const { data, error } = await supabase.from("Skills").delete().eq("id", id);

  if (error) {
    console.error(
      "Une erreur s'est produite lors de la suppression du theme:",
      error,
    );
    throw error;
  }

  return data;
};

// *** MAJ DE THEME *** //
export const updateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-theme"],
    mutationFn: handleUpdateTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      queryClient.invalidateQueries({ queryKey: ["categoriesWithSkills"] });
    },
  });
};

const handleUpdateTheme = async ({
  id,
  category_id,
  name,
  active,
}: {
  id: string | undefined;
  category_id?: string | undefined;
  name: string | undefined;
  active: boolean | undefined;
}) => {
  const isConfirmed = confirm(
    `Êtes-vous sûr(e) de vouloir modifier le thème "${name}" ?`,
  );

  if (!isConfirmed) {
    throw new Error("Mise à jour annulée");
  }

  const { data, error } = await supabase
    .from("Skills")
    .update({
      name: name,
      category_id: category_id,
      active: active,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Une erreur s'est produite ", +error.message);
    alert("Une erreur inattendue s'est produite");
    throw error;
  }

  return data;
};
