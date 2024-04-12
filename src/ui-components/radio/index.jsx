import RoundedCheck from "../../assets/ui-icons/rounded-check.svg?react";
import RoundedUncheck from "../../assets/ui-icons/rounded-uncheck.svg?react";
import classNames from "classnames";

export default function RadioThemeOne({
  onChange,
  type = "checkbox",
  label = "",
  name = "",
  value,
  error,
  disabled,
  className,
  ...props
}) {

  return (
    <label
      className={classNames(
        "inline-flex font-larsseit items-center relative w-full border border-[#E7E7E7] rounded-lg px-5 py-2 round min-h-[4.1rem]",
        {
          "cursor-pointer": !disabled,
          "bg-[#00D93620] !border-[#00D936]": value,
        }
      )}
      htmlFor={name}
    >
      <input
        type={type}
        className={classNames(
          `form-radio relative rounded hidden w-4 h-4 mr-1`,
          { "cursor-pointer": !disabled },
          { "appearance-none border border-red-600 bg-white": error },

        )}
        onChange={onChange}
        name={name}
        checked={value}
        disabled={disabled}
        id={name}
        {...props}
      />
      {value ? (
        <RoundedCheck
          className={classNames(
            "fill-[#00D936] stroke-[#ffffff]"
          )}
        />
      ) : (
        <RoundedUncheck
          className={classNames(
            "stroke-[#D1D1D1]"
          )}
        />
      )}
      {label && (
        <span
          className={classNames(
            " text-[#262626] text-sm ml-3",
            className
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}
