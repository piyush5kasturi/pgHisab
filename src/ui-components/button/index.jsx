import classNames from "classnames";
import  LoadingIcon  from "../../assets/ui-icons/loader.svg?react";

export default function Button({
  variant = "primary",
  disabled = false,
  full,
  className = "",
  size = "normal",
  type = "button",
  onClick,
  text,
  isLoading = false,
}) {
  const getType = () => {
    switch (variant) {
      case "action-button":
        return `bg-gray-button hover:bg-primary-200 hover:text-primary dark:text-white dark:bg-dark-light dark:hover:bg-primary`;
      case "secondary":
        return "bg-light dark:bg-[#262626] dark:text-white";
      case "bordered":
        return `bg-light dark:bg-[#262626] hover:bg-gray-button border dark:border-0 text-[#E7E7E7]`;
      case "danger":
        return "bg-danger text-white";
      case "action-danger":
        return `bg-gray-button hover:bg-danger-light hover:text-danger dark:text-white dark:bg-dark-light dark:hover:bg-danger`;
      case "danger-light":
        return "bg-danger-light text-danger hover:bg-danger hover:text-white dark:bg-danger dark:text-white";
      case "dark":
        return "bg-gray-700 text-white";
      case "primary-light":
        return `bg-gray-button text-primary bg-primary-200 dark:bg-primary-200`;
      default:
        return `bg-[#00D936] text-white`;
    }
  };

  const getSize = () => {
    switch (size) {
      case "large":
        return "text-base px-6 py-3";
      case "small":
        return "text-sm px-4 md:px-6 py-[8px]";
      case "extra-small":
        return "text-xs px-4 py-[6px]";
      case "medium":
        return "text-base px-4 py-3";
      default:
        return "text-sm px-4 py-2 h-10";
    }
  };
  return (
    <button
      type={type}
      className={classNames(
        "inline-flex rounded items-center justify-center tracking-wide outline-none whitespace-nowrap",
        { [`${getType()}`]: !disabled },
        { "w-full": full },
        getSize(),
        {
          "!bg-light  !text-[#B0B0B0] ": disabled,
        },
        { [className]: className }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && (
        <LoadingIcon className="w-5 h-5 mr-2 animate-spin fill-primary border-t-transparent dark:stroke-gray-600" />
      )}
      {text}
    </button>
  );
}
