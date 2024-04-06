export const tabSlug = [
  {
    name: "All Pay",
    route: "create",
  },
  {
    name: "Pay One",
    route: "pay-one",
  },
];

export const columns = (data = []) => {
  if (data.length === 0) return []; // Return empty array if data is empty

  const keys = Object.keys(data[0]); // Get keys from the first object in data

  return keys.map((key) => {
    return {
      accessorFn: (row) => <span className="capitalize">{row[key]}</span>,
      id: key,
      cell: (info) => info.getValue(),
      header: () => <span>{key}</span>, // Use key as header
      footer: (props) => props.column.id,
    };
  });
};
