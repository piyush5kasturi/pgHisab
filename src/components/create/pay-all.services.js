import { useMutation } from "@tanstack/react-query";
import API from "../../lib/api-client";

export const fetchList = async (perPage = 10, page = 1) => {
  const url = `/api/pay/${perPage}/${page}`;
  const response = await API("get", url);
  const result = response?.data?.result;
  return {
    rows: result?.payDetailResponses,
    count: result?.totalCount,
    columns: result?.tableColumns,
  };
};

const payAll = async (values) => {
  const url = "/api/pay";
  const response = await API("post", url, values);
  if (!response) {
    throw false;
  }
  return response.data.result;
};

export function usePayAll() {
  const {
    mutate: payAllMutation,
    isLoading,
    error,
    data,
    isError,
  } = useMutation((values) => payAll(values));
  return {
    payAllMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}

const deletePayAll = async (id) => {
  const url = `/api/pay/${id}`;
  const response = await API("delete", url);
  if (!response) {
    throw false;
  }
  return true;
};

export function useDelete() {
  const {
    mutate: deleteMutation,
    isLoading,
    error,
    data,
    isError,
  } = useMutation((id) => deletePayAll(id));
  return {
    deleteMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}
