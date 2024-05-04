import { useEffect, useMemo, useState } from "react";

import Table from "../../ui-components/table";
import AddExpense from "../../ui-components/modals/add-expense";
import Button from "../../ui-components/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "./helper";
import { fetchListSingle } from "./pay-one.services";
import Alert from "../../ui-components/alert";
const defaultPopupState = {
  isPopupOpen: false,
  type: null,
  data: null,
};
const PayOne = () => {
  const queryClient = useQueryClient();
  const [{ limit, page }, setPage] = useState({ limit: 10, page: 1 });
  const [{ type, isPopupOpen, data: popupData }, setPopupState] =
    useState(defaultPopupState);

  const {
    isLoading,
    isError,
    error,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["pay-single", "list"],
    queryFn: () => fetchListSingle(limit, page),
    enabled: false,
  });

  useEffect(() => {
    if (page > 0) {
      queryClient.removeQueries({ queryKey: ["pay-single", "list"] });
      refetch();
    }
  }, [refetch, page, queryClient]);

  const Columns = useMemo(() => {
    return columns(data?.columns);
  }, [data]);

  const memorizedColumns = useMemo(() => [...Columns], [Columns]);

  return (
    <>
      {isPopupOpen && type === "add" && (
        <AddExpense
          isOpen={isPopupOpen}
          toggle={() => {
            setPopupState(defaultPopupState);
            refetch();
          }}
          singlePerson
          editData={popupData}
        />
      )}

      <div className="pb-4 flex justify-end">
        <Button
          type="button"
          text="Add Expense"
          onClick={() => setPopupState({ isPopupOpen: true, type: "add" })}
        />
      </div>
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

export default PayOne;
