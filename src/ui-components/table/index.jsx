import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Header from "./header";
import classNames from "classnames";
const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];
const Table = () => {
  const [data, _setData] = useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div
      className={classNames(
        "w-full relative overflow-x-auto overflow-y-hidden no-scrollbar"
        // {
        //   [className]: className,
        // }
      )}
    >
      <table
        className={classNames(
          "w-full border-[1px] border-[#E7E7E7] dark:border-light-color border-separate border-spacing-0 rounded-t-lg"
          // { [tableClassName]: tableClassName }
        )}
      >
        <Header table={table} />
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames(
                    "py-3 px-6 border-[#E7E7E7] dark:border-light-color dark:text-white text-sm h-[68px] ",
                    {
                      "border-b-[1px]":
                        table.getRowModel().rows?.length - 1 !== i,
                      // "pr-6": useCheckBox,
                      // "px-6": !useCheckBox,
                      // [tdClassName]: tdClassName,
                    }
                    // { "bg-light dark:bg-dark-light": checkedRow }
                  )}
                  style={{ maxWidth: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
