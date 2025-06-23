import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchTermProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  className?: string;
  showFilter?: boolean;
}

const SearchTerm = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Rechercher...",
  filterValue,
  onFilterChange,
  filterOptions = [],
  className = "",
  showFilter = false,
}: SearchTermProps) => {
  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {showFilter && filterOptions.length > 0 && (
        <select
          value={filterValue || ""}
          onChange={(e) => onFilterChange?.(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SearchTerm;
