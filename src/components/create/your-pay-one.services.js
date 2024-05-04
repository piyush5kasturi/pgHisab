import API from "../../lib/api-client";

export const fetchYourListSingle = async (perPage = 10, page = 1) => {
  const url = `/api/pay/YouPaymeAll/${perPage}/${page}`;
  const response = await API("get", url);
  const result = response?.data?.result;
  return {
    rows: result?.paytoResponses,
    count: result?.totalCount,
    columns: result?.tableColumns,
  };
};
