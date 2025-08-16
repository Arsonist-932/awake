import { Edit, Plus, Trash2, Search, ArrowUp, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CategorySkill, EditingItem } from "@/types/skills";
import { SelectItem } from "@/components/ui/select";
import SelectDashboard from "@/components/SelectDashboard";
import {
  CategorieWithSkill,
  DeleteCategory,
  fetchSkills,
} from "@/services/skills";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/InputForm";
import ErrorAPI from "../error";
import Loading from "../loading";
import Filter from "@/components/filter";

const SkillsDashboard = () => {
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingItem, setEditingItem] = useState<EditingItem>();

  const [formData, setFormData] = useState({
    name: "",
    categoryName: "",
    active: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //Gestion de l'état de chargement et des erreurs
  const [categoriesSkills, setCategoriesSkills] = useState<CategorySkill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const loadSkills = useCallback(() => {
    fetchSkills({ setLoading, setError, setCategoriesSkills });
  }, []);

  // Logique de filtrage
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = useMemo(() => {
    return categoriesSkills.filter((category: CategorySkill) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.themes || []).some((theme) =>
          theme.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" || category.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, categoriesSkills]);

  const toggleThemeStatus = (categoryId: string, themeId: string) => {
    setCategoriesSkills((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              themes:
                cat.themes?.map((theme) =>
                  theme.id === themeId
                    ? { ...theme, active: !theme.active }
                    : theme,
                ) || [],
            }
          : cat,
      ),
    );
  };

  useEffect(() => {
    // Chargement initial des compétences
    loadSkills();

    // Fermeture modal avec Échap
    if (!showNewServiceForm) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowNewServiceForm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loadSkills, showNewServiceForm]);

  return (
    <>
      {error ? (
        <ErrorAPI
          error={error}
          onClick={() => {
            setError(null);
            loadSkills();
          }}
        />
      ) : (
        <section className="mx-auto">
          <div className="mx-auto space-y-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <h2 className="text-center text-2xl font-bold">
                Gestion des compétences
              </h2>

              <Button
                variant={"closed"}
                onClick={() => {
                  setEditingItem({
                    type: "category",
                  });
                  setShowNewServiceForm(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Nouvelle catégorie
              </Button>
            </div>

            {/* Filtres et recherche */}
            <section
              id="Filter"
              className="flex flex-col items-center gap-4 lg:flex-row"
            >
              <Filter
                value={searchTerm}
                placeholder="Rechercher une catégorie ou un thème..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SelectDashboard
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categoriesSkills.map((categpry) => (
                  <SelectItem key={categpry.id} value={categpry.name}>
                    {categpry.name}
                  </SelectItem>
                ))}
              </SelectDashboard>
            </section>

            {loading && <Loading />}

            {/* Catégories et thèmes */}
            <section className="space-y-6">
              {filteredCategories.length === 0 ? (
                <div className="rounded-lg p-12 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">
                    Aucune catégorie trouvée
                  </h3>
                  <p className="text-gray-500">
                    Essayez de modifier vos critères de recherche ou ajoutez une
                    nouvelle catégorie.
                  </p>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="rounded-lg border border-black shadow-sm dark:border-gray-200"
                  >
                    {/* En-tête de catégorie */}
                    <div className="border-b border-black p-6 dark:border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="font-[Roboto] text-xl font-semibold">
                          {category.name}
                        </h2>

                        <div className="flex gap-2 p-2">
                          <button
                            onClick={() => {
                              setEditingItem({
                                type: "category",
                                data: {
                                  categoryId: category.id,
                                  categoryName: category.name,
                                },
                              });
                              setShowNewServiceForm(true);
                            }}
                            className="hover: rounded-md transition-colors hover:text-gray-600"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            className="transition-colors hover:text-gray-600"
                            onClick={async () => {
                              await DeleteCategory({
                                id: category.id,
                                name: category.name,
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <button className="flex items-center gap-1 rounded-md text-xs font-medium transition-colors">
                            <ArrowUp className="h-4 w-4 hover:text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Thèmes */}
                    <div className="p-6">
                      {!category.themes || category.themes.length === 0 ? (
                        <div className="py-8 text-center">
                          <p className="mb-4">
                            Aucun thème dans cette catégorie
                          </p>

                          <Button
                            variant={"closed"}
                            onClick={() => {
                              setEditingItem({
                                type: "theme",
                                data: {
                                  categoryId: category.id,
                                  categoryName: category.name,
                                },
                              });
                              setShowNewServiceForm(true);
                            }}
                            className="text-xs text-white"
                          >
                            + Ajouter un thème
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="rounded-full py-1 text-sm font-medium">
                              {category.themes?.length || 0} thème
                              {(category.themes?.length || 0) > 1 ? "s" : ""}
                              <span>
                                {""} disponible
                                {(category.themes?.length || 0) > 1 ? "s" : ""}
                              </span>
                            </h3>

                            <Button
                              size={"sm"}
                              onClick={() => {
                                setEditingItem({
                                  type: "theme",
                                });
                                setShowNewServiceForm(true);
                              }}
                            >
                              <Plus className="h-4 w-4" />
                              Ajouter un thème
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {category.themes.map((theme) => (
                              <div
                                key={theme.id}
                                className="flex cursor-default items-center justify-between rounded-lg border border-black p-3 font-[Roboto] transition-colors hover:bg-gray-300/90 dark:border-gray-200 dark:hover:bg-gray-200/30"
                              >
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      toggleThemeStatus(category.id, theme.id)
                                    }
                                    className={`h-2 w-2 rounded-full ${theme.active ? "bg-green-500" : "bg-red-500"}`}
                                  ></button>

                                  <span className="text-sm font-medium">
                                    {theme.name}
                                  </span>
                                </div>

                                <div className="flex items-center">
                                  <button
                                    onClick={() => {
                                      setEditingItem({
                                        type: "theme",
                                        data: {
                                          categoryId: category.id,
                                          categoryName: category.name,
                                          name: theme.name,
                                        },
                                      });
                                      setShowNewServiceForm(true);
                                    }}
                                    className="hover: rounded-md p-1 transition-colors hover:text-red-600"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </button>

                                  <button className="rounded-md p-1 transition-colors hover:text-red-600">
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>

          {/* Modal pour ajouter/modifier */}
          {showNewServiceForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 font-[Roboto]">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-black">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {editingItem?.type === "theme"
                      ? editingItem.data
                        ? "Modifier le thème"
                        : "Nouveau thème"
                      : editingItem?.data?.categoryName
                        ? "Modifier la catégorie"
                        : "Nouvelle catégorie"}
                  </h3>

                  <button
                    onClick={() => setShowNewServiceForm(false)}
                    className="hover: rounded-md p-1 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <InputForm
                    id="name"
                    type="text"
                    name={
                      editingItem?.type === "theme"
                        ? "Nom du thème *"
                        : "Nom de la catégorie *"
                    }
                    placeholder={
                      editingItem?.type === "theme"
                        ? "Ex: Nutrition"
                        : "Ex: Santé - Bien-être"
                    }
                    value={editingItem?.data?.name}
                    onChange={handleChange}
                  />

                  {editingItem?.type === "theme" && (
                    <InputForm
                      id="CategoryTheme"
                      type="text"
                      name="Nom de la catégorie *"
                      placeholder={"Ex: Santé - Bien-être"}
                      value={editingItem?.data?.categoryName || ""}
                      onChange={handleChange}
                    />
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="active"
                      defaultChecked={editingItem?.data?.active ?? true}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="active" className="text-xs">
                      {editingItem?.type === "theme"
                        ? "Thème actif"
                        : "Catégorie active"}{" "}
                      (visible sur le site)
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => setShowNewServiceForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>

                  <Button type="submit" variant={"closed"} className="flex-1">
                    {editingItem?.data ? "Modifier" : "Ajouter"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default SkillsDashboard;
