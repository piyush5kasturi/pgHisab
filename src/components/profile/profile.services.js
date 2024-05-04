import API from "../../lib/api-client";

export const fetchProfile = async (id) => {
  const url = `/api/user/${id}`;
  const response = await API("get", url);
  console.log(response,";;;")
  // return {
  //   rows: result?.paytoResponses,
  //   count: result?.totalCount,
  //   columns: result?.tableColumns,
  // };
};
