export interface FormDataProps {
  type?: "categorie" | "theme";
  action?: "createCat" | "updateCat" | "createTheme" | "updateTheme";
  categorie_name?: string;
  categorie_id?: string;
  theme_name?: string;
  theme_id?: string;
  active?: boolean;
}
