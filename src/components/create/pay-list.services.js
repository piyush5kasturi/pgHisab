import { useMutation } from "@tanstack/react-query";
import API from "../../lib/api-client";

export const fetchList = async (perPage = 10, page = 1) => {
  const url = `/PayList/${perPage}/${page}`;
  const response = await API("get", url);
  const result = response?.data?.result;
  return { rows: result?.payResponses, count: result?.totalCount, columns:result?.tableColumns };
};


const payAmount = async (values) => {
  const url = "/QR/77";
  const response = await API("post", url, values);
  if (!response) {
  throw false;
  }
  return response.data.result;
};

export function usePayAmount() {
  const {
    mutate: payAmountMutation,
    isLoading,
    error,
    data,
  } = useMutation((values) => payAmount(values));
  return {
    payAmountMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
  };
}
