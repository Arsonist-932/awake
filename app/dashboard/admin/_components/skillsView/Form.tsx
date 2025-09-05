import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/InputForm";
import Selecteur from "@/components/Selecteur";
import { SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Category } from "@/types/skillsTypes";
import { FormDataProps } from "@/types/formType";

type Props = {
  show: boolean;
  onClose: () => void;
  formData: FormDataProps;
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  categories: Category[];
};

const Form = ({
  show,
  onClose,
  formData,
  setFormData,
  onSubmit,
  categories,
}: Props) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 font-[Roboto]">
      <form
        className="w-full max-w-md rounded-lg border border-black bg-white p-6 shadow-xl dark:border-white dark:bg-black"
        onSubmit={onSubmit}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formData?.type === "theme"
              ? formData.theme_name
                ? "Modifier le thème"
                : "Nouveau thème"
              : formData?.type === "categorie" && formData.categorie_name
                ? "Modifier la categorie"
                : "Nouvelle categorie"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form content */}
        <div className="space-y-4">
          {formData.type === "theme" && (
            <>
              <InputForm
                type="text"
                id="theme_name"
                name="Nom du thème *"
                placeholder={"Ex: Nutrition"}
                value={formData.theme_name || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    theme_name: e.target.value,
                  }))
                }
              />

              <div className="flex w-full flex-1 flex-col gap-2">
                <Label htmlFor="categorie_name">Nom de la catégorie *</Label>

                <Selecteur
                  name="categorie_name"
                  value={formData.categorie_id || ""}
                  onValueChange={(value) => {
                    const selected = categories.find((c) => c.id === value);
                    setFormData((prev) => ({
                      ...prev,
                      categorie_id: value,
                      categorie_name: selected?.name || "",
                    }));
                  }}
                >
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Selecteur>
              </div>
            </>
          )}

          {formData.type === "categorie" && (
            <InputForm
              id="categorie_name"
              type="text"
              name="Nom de la catégorie *"
              placeholder="Ex: Santé - Bien-être"
              value={formData.categorie_name || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  categorie_name: e.target.value,
                }))
              }
            />
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  active: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <label htmlFor="active" className="text-xs">
              {formData?.type === "theme" ? "Thème actif" : "Catégorie active"}{" "}
              (visible sur le site)
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button type="button" onClick={onClose} className="flex-1">
            Annuler
          </Button>

          <Button type="submit" variant={"closed"} className="flex-1">
            {formData?.categorie_name || formData?.theme_name
              ? "Modifier"
              : "Ajouter"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
