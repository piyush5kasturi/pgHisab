import { useEffect, useMemo, useState } from "react";

import Table from "../../ui-components/table";
import Button from "../../ui-components/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "./helper";
import { fetchList } from "./pay-list.services";
import Alert from "../../ui-components/alert";
const PayList = () => {
  const queryClient = useQueryClient();
  const [{ limit, page }, setPage] = useState({ limit: 10, page: 1 });
  const {
    isLoading,
    isError,
    error,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["pay-final", "list"],
    queryFn: () => fetchList(limit, page),
    enabled: false,
  });

  useEffect(() => {
    if (page > 0) {
      queryClient.removeQueries({ queryKey: ["pay-final", "list"] });
      refetch();
    }
  }, [refetch, page, queryClient]);

  const Columns = useMemo(() => {
    return columns(data?.columns);
  }, [data]);

  const memorizedColumns = useMemo(
    () => [
      ...Columns,
      {
        accessorFn: (row) => row.autoID,
        id: "List",
        cell: ({ row }) => {
          return (
            <Button
              text="Pay Now"
              disabled={row?.original?.status === 2}
              onClick={() =>
                window.open(
                  `paytmmp://pay?pa=${row?.original?.upiID}&am=${row?.original?.payAmount}`,
                  "_blank"
                )
              }
            />
          );
        },
        header: () => <div className="text-right"></div>,
        footer: (props) => props.column.autoID,
      },
    ],
    [Columns]
  );
  return (
    <>
      {isError && <Alert text={error?.displayMessage} type="error" />}
      <Table
        onChangePage={(page) => {
          setPage({ limit: 10, page });
        }}
        columns={memorizedColumns}
        data={data?.rows || []}
        isLoading={isLoading}
        total={data?.count || 0}
        page={page}
      />
    </>
  );
};

export default PayList;
