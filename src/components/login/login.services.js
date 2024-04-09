
import { useMutation } from "@tanstack/react-query";
import API from "../../lib/api-client";
import Cookies from "js-cookie";

const signIn = async (values) => {
    const url = '/login';
    const response = await API('post', url, values);
    if (!response) {
        throw false;
    }
    Cookies.set('pg-token', response?.data?.result?.token);
    return response.data.result;

};

export function useSignIn() {
    const {
        mutate: signInMutation,
        isLoading,
        error,
        data,
        isError,
    } = useMutation((values) => signIn(values));
    return {
        signInMutation,
        isLoading,
        error: (error && error?.data) || '',
        data,
        isError,
    };
}
