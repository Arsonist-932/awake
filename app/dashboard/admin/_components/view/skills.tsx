import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Filter from "@/components/filter";
import ErrorAPI from "@/components/API/error";
import Loading from "@/components/API/loading";
import {
  createCat,
  fetchCategory,
  handleUpdateCategory,
} from "@/services/skills/category";
import Selecteur from "@/components/Selecteur";
import CardsCat from "../skillsView/CardsCat";
import { Category } from "@/types/skillsTypes";
import Themes from "../skillsView/Themes";
import { FormDataProps } from "@/types/formType";
import { ThemeCreate, updateTheme } from "@/services/skills/theme";
import Form from "../skillsView/Form";

const SkillsDashboard = () => {
  const { data: categories = [], isLoading, error } = fetchCategory();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormDataProps>({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category: Category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.themes || []).some((theme) =>
          theme.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" || category.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, categories]);

  const createCategory = createCat();
  const createTheme = ThemeCreate();
  const updateCategory = handleUpdateCategory();
  const updateThem = updateTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.action === "createCat") {
      createCategory.mutate({
        name: formData.categorie_name,
        active: formData.active,
      });
    }

    if (formData.action === "updateCat") {
      updateCategory.mutate({
        id: formData.categorie_id,
        name: formData.categorie_name,
        active: formData.active,
      });
    }

    if (formData.action === "createTheme") {
      createTheme.mutate({
        name: formData.theme_name,
        category_id: formData.categorie_id,
        active: formData.active,
      });
    }

    if (formData.action === "updateTheme") {
      updateThem.mutate({
        id: formData.theme_id,
        category_id: formData.categorie_id,
        name: formData.theme_name,
        active: formData.active,
      });
    }

    setTimeout(() => {
      setFormData({
        categorie_name: "",
        categorie_id: "",
        theme_name: "",
        theme_id: "",
        active: false,
      });
      setShowForm(false);
    }, 3000);
  };

  return (
    <>
      {error ? (
        <ErrorAPI error={error.message} onClick={fetchCategory} />
      ) : (
        <section className="mx-auto">
          <div className="mx-auto space-y-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <h2 className="text-center text-2xl font-bold">
                Gestion des compétences
              </h2>

              <Button
                variant={"default"}
                onClick={() => {
                  setShowForm(true);
                  setFormData({
                    type: "categorie",
                    action: "createCat",
                    active: true,
                  });
                }}
              >
                <Plus className="h-4 w-4" />
                Nouvelle catégorie
              </Button>
            </div>

            {/* Filtres et recherche */}
            <section className="flex flex-col items-center gap-4 lg:flex-row">
              <Filter
                value={searchTerm}
                placeholder="Rechercher une catégorie ou un thème..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Selecteur
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((categpry: Category) => (
                  <SelectItem key={categpry.id} value={categpry.name}>
                    {categpry.name}
                  </SelectItem>
                ))}
              </Selecteur>
            </section>

            {isLoading && <Loading />}

            {/* Catégories et thèmes */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.length === 0 ? (
                <div className="mx-auto flex flex-col items-center text-center">
                  <Search className="mb-4 h-8 w-8 text-gray-500" />
                  <h3 className="mb-2 text-lg font-medium">
                    Aucune catégorie trouvée
                  </h3>
                  <p className="text-gray-500">
                    Essayez de modifier vos critères de recherche ou ajoutez une
                    nouvelle catégorie.
                  </p>
                </div>
              ) : (
                filteredCategories.map((category: Category) => (
                  <div key={category.id}>
                    <CardsCat
                      category={category}
                      setShowForm={setShowForm}
                      setFormData={setFormData}
                    >
                      <div className="py-6">
                        {!category.themes || category.themes.length === 0 ? (
                          <div className="py-8 text-center">
                            <p className="mb-4">
                              Aucun thème dans cette catégorie
                            </p>

                            <Button
                              variant={"default"}
                              onClick={() => {
                                setShowForm(true);
                                setFormData({
                                  type: "theme",
                                  action: "createTheme",
                                  active: true,
                                });
                              }}
                            >
                              + Ajouter un thème
                            </Button>
                          </div>
                        ) : (
                          <Themes
                            category={category}
                            setShowForm={setShowForm}
                            setFormData={setFormData}
                          />
                        )}
                      </div>
                    </CardsCat>
                  </div>
                ))
              )}
            </section>
          </div>

          {/* Modal pour ajouter/modifier */}
          <Form
            show={showForm}
            onClose={() => setShowForm(false)}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            categories={categories}
          />
        </section>
      )}
    </>
  );
};

export default SkillsDashboard;
