import { Label } from "./label";

interface TextAreaProps {
  label: string;
  id: string;
  required?: boolean;
  row?: number;
  placeholder: string;
  classname?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

const TextArea = ({
  label,
  id,
  required,
  row,
  placeholder,
  classname,
  value,
  onChange,
}: TextAreaProps) => {
  return (
    <>
      <div className={`${classname}`}>
        <Label htmlFor={id} className="mb-1 block text-sm">
          {label}
        </Label>

        <textarea
          id={id}
          rows={row}
          required={required}
          className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;
