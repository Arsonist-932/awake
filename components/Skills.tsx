import { categoriesSkills } from "@/data/data";

const Skills = () => {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {categoriesSkills.map(
          (category: { name: string; themes: string[] }, index: number) => (
            <div
              key={index}
              className="transform rounded-lg p-6 shadow-lg transition duration-300"
            >
              <h3 className="mb-4 w-fit rounded-lg border border-transparent border-b-primary px-2 font-[Roboto] text-xl font-semibold">
                {category.name}
              </h3>

              <ul className="mt-4 flex flex-wrap gap-3">
                {category.themes.map((theme: string, index: number) => (
                  <li
                    key={index}
                    className="flex cursor-default items-center gap-1 rounded-lg border px-2 py-1 text-xs shadow-sm shadow-primary hover:border-primary"
                  >
                    <span className="h-2 w-2 rounded-full bg-destructive"></span>
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
    </>
  );
};
export default Skills;
