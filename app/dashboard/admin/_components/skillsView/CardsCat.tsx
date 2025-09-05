import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { handleDeleteCategory } from "@/services/skills/category";
import { Category } from "@/types/skillsTypes";
import { ArrowUp, Edit, Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";

interface CardCatProps {
  category: Category;
  children?: ReactNode;
  showForm?: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<Object>>;
}

const CardsCat = ({
  category,
  children,
  showForm,
  setShowForm,
  setFormData,
}: CardCatProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteCategories = handleDeleteCategory();

  const handleUpdate = () => {
    setShowForm(!showForm);
    setFormData({
      type: "categorie",
      action: "updateCat",
      categorie_name: category.name,
      categorie_id: category.id,
      active: true,
    });
  };

  const handleDelete = () => {
    deleteCategories.mutate({
      id: category.id,
      name: category.name,
    });
  };

  return (
    <>
      <Card className="border-b border-black dark:border-gray-200">
        <CardTitle className="flex items-center justify-between p-6">
          <h2 className="font-[Roboto] text-xl font-semibold">
            {category.name}
          </h2>

          <div className="flex gap-2 p-2">
            <button className="hover: rounded-md transition-colors hover:text-gray-600">
              <Edit className="h-4 w-4" onClick={handleUpdate} />
            </button>

            <button className="transition-colors hover:text-gray-600">
              <Trash2 className="h-4 w-4" onClick={handleDelete} />
            </button>

            <button
              className={`flex items-center gap-1 rounded-md text-xs font-medium transition-colors ${isOpen ? "rotate-180" : "rotate-0"}`}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <ArrowUp className="h-4 w-4 hover:text-gray-600" />
            </button>
          </div>
        </CardTitle>

        {isOpen && (
          <CardContent className="border-t border-black dark:border-gray-200">
            {children}
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default CardsCat;
