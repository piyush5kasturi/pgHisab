
import { useMutation } from "@tanstack/react-query";
import API from "../../lib/api-client";

const payAll = async (values) => {
    const url = '/api/pay';
    const response = await API('post', url, values);
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
    } = useMutation((values) => payAll(values));
    return {
      payAllMutation,
        isLoading,
        error: (error && error?.data) || '',
        data,
    };
}
