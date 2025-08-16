import { SearchProps } from "@/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "./ui/select";

const SelectDashboard = ({
  value,

  onValueChange,
  placeholder,
  children,
}: SearchProps) => {
  return (
    <>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full border-gray-800 py-5 text-xs md:text-sm lg:w-auto">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectDashboard;
