import classNames from "classnames";
import Label from "../label";

export default function Input({
  type = "text",
  value,
  onChange,
  errors,
  placeholder = "Enter Value",
  label,
  required = false,
  disabled = false,
}) {
  return (
    <div className="flex flex-col relative gap-2">
      {label && (
        <Label required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      <input
        value={value}
        onChange={onChange}
        className={classNames(
          `shadow appearance-none border rounded w-full py-2.5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`,
          { "border border-red-500": errors }
        )}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
