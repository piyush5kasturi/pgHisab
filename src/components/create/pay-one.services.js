import { useMutation } from "@tanstack/react-query";
import API from "../../lib/api-client";

export const fetchUser = async () => {
  const url = `/api/user`;
  const response = await API("get", url);
  const data = response?.data?.result?.map(({ autoID, name }) => ({
    label: name,
    value: autoID,
  }));
  return data;
};
//
export const fetchListSingle = async (perPage = 10, page = 1) => {
  const url = `/api/pay/YouPayme/${perPage}/${page}`;
  const response = await API("get", url);
  const result = response?.data?.result;
  return {
    rows: result?.paytoResponses,
    count: result?.totalCount,
    columns: result?.tableColumns,
  };
};

const paySingle = async (values) => {
  const url = "/YouPayme";
  const response = await API("post", url, values);
  if (!response) {
    throw false;
  }
  return response.data.result;
};

export function usePaySingle() {
  const {
    mutate: paySingleMutation,
    isLoading,
    error,
    data,
    isError,
  } = useMutation((values) => paySingle(values));
  return {
    paySingleMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}

const deletePayOne = async (id) => {
  const url = `/api/YouPayme/${id}`;
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
  } = useMutation((id) => deletePayOne(id));
  return {
    deleteMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}
