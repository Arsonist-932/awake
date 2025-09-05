export interface FetchSkillsParams {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCategoriesSkills: (categories: CategorySkill[]) => void;
}

// **** Props pour les compétences ****//
export interface Category {
  id: string;
  name: string;
  themes?: Theme[];
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
