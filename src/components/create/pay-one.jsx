import { useEffect, useMemo, useState } from "react";

import Table from "../../ui-components/table";
import AddExpense from "../../ui-components/modals/add-expense";
import Button from "../../ui-components/button";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "./pay-all.services";
import { columnsOne } from "./helper";
const PayOne = () => {
  const [{ limit, page }, setPage] = useState({ limit: 10, page: 1 });
  const [{ type, isPopupOpen }, setPopupState] = useState({
    isPopupOpen: false,
    type: null,
  });

  const {
    isLoading,
    isError,
    error,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["pay-all", "list"],
    queryFn: () => fetchList(limit, page),
    enabled: false,
  });

  useEffect(() => {
    if (page > 0) refetch();
  }, [refetch, page]);

  const memorizedColumns = useMemo(() => {
    return columnsOne(data?.rows);
  }, [data]);
  return (
    <>
      {isPopupOpen && type === "edit_days" && (
        <AddExpense
          isOpen={isPopupOpen}
          toggle={() => {
            setPopupState({
              isPopupOpen: false,
              type: null,
            });
            setPage({ limit: 10, page: 1 });
            refetch();
          }}
        />
      )}
      <div className="pb-4 flex justify-end">
        <Button
          type="button"
          text="Add Expense"
          onClick={() =>
            setPopupState({ isPopupOpen: true, type: "edit_days" })
          }
        />
      </div>
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

export default PayOne;
