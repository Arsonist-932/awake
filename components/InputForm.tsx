import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputForm {
  id: string;
  name: string | boolean;
  type: string;
  placeholder?: string;
  classname?: string;
  min?: string;
  step?: string;
  value?: string;
  defaultValue?: string;
  required?: true;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}
const InputForm = ({
  id,
  name,
  type,
  placeholder,
  classname,
  min,
  step,
  value,
  defaultValue,
  onChange,
}: InputForm) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} className={`${classname}, text-sm`}>
          {name}
        </Label>
        <Input
          className="py-5 text-sm"
          type={type}
          id={id}
          placeholder={placeholder}
          min={min}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default InputForm;
