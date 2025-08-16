export interface FetchSkillsParams {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCategoriesSkills: (categories: CategorySkill[]) => void;
}

// Props pour la modal de skills
export interface EditingItem {
  type: "category" | "theme";
  data?: {
    categoryId?: string;
    categoryName?: string;
    name?: string;
    active?: boolean;
  };
}

// **** Props pour les compétences ****//
export interface Category {
  id: string;
  name: string;
  active?: boolean;
}

export interface Theme {
  id: string;
  name: string;
  category_id?: string;
  active?: boolean;
}

export interface CategorySkill {
  id: string;
  name: string;
  themes: Theme[];
  active?: boolean;
  categoryId?: string;
}
