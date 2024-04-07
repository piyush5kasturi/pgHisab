import { useEffect, useMemo, useState } from "react";

import Table from "../../ui-components/table";
import AddExpense from "../../ui-components/modals/add-expense";
import Button from "../../ui-components/button";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "./pay-all.services";
import { columns } from "./helper";
const PayAll = () => {
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
    return columns(data?.rows);
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
      {/* <div className="w-full flex flex-col justify-center items-center px-4 py-3 md:py-0 md:h-screen">
        {isLoading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {message === "success" && (
              <div
                id="alert-3"
                className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                <div className="ms-3 text-sm font-medium">{data?.data}</div>
                <button
                  type="button"
                  onClick={() => setMessage("")}
                  className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-3"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}
            {message === "error" && (
              <div
                id="alert-2"
                className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <div className="ms-3 text-sm font-medium">{data?.message}</div>
                <button
                  type="button"
                  onClick={() => setMessage("")}
                  className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-2"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
              {allData?.map(({ name, totalPrice }, index) => {
                return (
                  <div
                    key={index}
                    className=" flex flex-col text-white min-w-0 break-words bg-gradient-to-tl from-purple-700 to-pink-500  shadow-soft-xl rounded-2xl bg-clip-border"
                  >
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap ">
                        <div className="flex-none  max-w-full px-3">
                          <div>
                            <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                              {name}
                            </p>
                            <h5 className="mb-0 font-bold">{totalPrice}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {allData && (
                <div className=" flex flex-col text-white min-w-0 break-words bg-gradient-to-tl from-purple-700 to-pink-500  shadow-soft-xl rounded-2xl bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap ">
                      <div className="flex-none  max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                            Total
                          </p>
                          <h5 className="mb-0 font-bold">
                            {allData?.[0]?.total}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Name*
                </label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <select
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option value="Arshdeep Singh">Arshdeep Singh</option>
                      <option value="Tarun Mittal">Tarun Mittal</option>
                      <option value="Piyush Kasturi">Piyush Kasturi</option>
                    </select>
                  )}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Amount*
                </label>
                <Controller
                  control={control}
                  name="amount"
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <input
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                        errors?.amount && "border border-red-500"
                      }`}
                      id="password"
                      type="number"
                      min={0}
                      placeholder="Enter Amount"
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div> */}
    </>
  );
};

export default PayAll;
