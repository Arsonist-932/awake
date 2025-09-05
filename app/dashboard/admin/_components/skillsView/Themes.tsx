import { Button } from "@/components/ui/button";
import { handleDeleteTheme } from "@/services/skills/theme";
import { Category } from "@/types/skillsTypes";
import { Edit, Plus, Trash2 } from "lucide-react";

interface ThemeProps {
  category: Category;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<Object>>;
}

const Themes = ({ category, setShowForm, setFormData }: ThemeProps) => {
  const themeDeleted = handleDeleteTheme();

  const count = category.themes?.length || 0;
  const plural = count > 1 ? "s" : "";

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="rounded-full py-1 text-sm font-medium">
          {count} thème{plural} disponible{plural}
        </h3>

        <Button
          size={"sm"}
          onClick={() => {
            setShowForm(true);
            setFormData({
              type: "theme",
              action: "createTheme",
              active: true,
            });
          }}
        >
          <Plus className="h-4 w-4" />
          Ajouter un thème
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {category.themes &&
          category.themes.map((theme) => (
            <div
              key={theme.id}
              className="flex cursor-default items-center justify-between rounded-lg border border-black p-3 font-[Roboto] transition-colors hover:bg-gray-300/90 dark:border-gray-200 dark:hover:bg-gray-200/30"
            >
              <div className="flex items-center gap-2">
                <button
                  className={`h-2 w-2 rounded-full ${theme.active ? "bg-green-500" : "bg-red-500"}`}
                ></button>

                <span className="text-sm font-medium">{theme.name}</span>
              </div>

              <div className="flex items-center">
                <button
                  className="hover: rounded-md p-1 transition-colors hover:text-red-600"
                  onClick={() => {
                    setShowForm(true);
                    setFormData({
                      type: "theme",
                      action: "updateTheme",
                      categorie_name: category.name,
                      categorie_id: category.id,
                      theme_name: theme.name,
                      theme_id: theme.id,
                      active: theme.active,
                    });
                  }}
                >
                  <Edit className="h-3 w-3" />
                </button>

                <button
                  className="rounded-md p-1 transition-colors hover:text-red-600"
                  onClick={() => {
                    themeDeleted.mutate({
                      id: theme.id,
                      theme_name: theme.name,
                      category_name: category.name,
                    });
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Themes;
