import Skelton from "../ui-components/skeleton";

export const placeholderElInput = () => {
  return (
    <div className="mb-0">
      <Skelton width="20" className="mb-3" containerClassName="dark:!bg-dark-light" height={5} />
      <Skelton
        width="20"
        className="mb-3 w-full"
        height={10}
        containerClassName="dark:!bg-dark-light"
      />
    </div>
  );
};

export const placeholderElBtn = (no = 2) => {
  return [...Array(no).keys()].map((i) => (
    <div className="mb-0 w-full" key={i}>
      <Skelton
        width="20"
        className="mb-3 w-full"
        height={10}
        containerClassName="dark:bg-dark-light"
      />
    </div>
  ));
};
