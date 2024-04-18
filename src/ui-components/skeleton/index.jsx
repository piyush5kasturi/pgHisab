import classNames from "classnames";

export default function Skelton({
  type,
  width = "",
  height = 3,
  className,
  containerClassName = "",
}) {
  const singleLine = (
    lineWidth = width,
    lineHeigh = height,
    SingleLineClass = ""
  ) => (
    <div
      className={classNames("animate-pulse bg-gray-200 rounded-md", {
        [`w-${lineWidth}`]: lineWidth,
        [`h-${lineHeigh}`]: lineHeigh,
        "w-full": !lineWidth,
        [`${SingleLineClass}`]: SingleLineClass,
        [`${containerClassName}`]: containerClassName,
      })}
    />
  );
  switch (type) {
    case "integration-card":
      return (
        <div className="bg-gray-button  border-[1px] border-[#E7E7E7]  p-6 rounded-md space-y-2 w-full">
          <div className="flex w-full mb-4 justify-between">
            {singleLine("14", "14", "!rounded-xl")}
            {singleLine("", Number(height) * 4, "!w-32")}
          </div>
          {singleLine("28", "4")}
          {singleLine("44", height, "!mb-2")}
        </div>
      );
    case "single":
    default:
      return singleLine(width, height, className);
  }
}
