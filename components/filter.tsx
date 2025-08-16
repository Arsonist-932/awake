import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { FilterProps } from "@/types";

const Filter = ({ value, placeholder, onChange }: FilterProps) => {
  return (
    <>
      <div className="relative w-full">
        <Input
          type="search"
          name="search"
          value={value}
          placeholder={placeholder || ""}
          onChange={onChange}
          className="border-gray-800 py-6 pl-8 text-sm dark:border-gray-300"
        />

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </>
  );
};

export default Filter;
