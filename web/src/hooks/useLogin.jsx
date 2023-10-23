import { useMutation } from "react-query";
import api from "../lib/axios";
import { setAuthToken } from "../utils/localAuth";

const loginMutation = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

const useLogin = () => {
  const {
    mutateAsync: login,
    data,
    error,
    isLoading,
  } = useMutation((credentials) => loginMutation(credentials), {
    onSuccess: (data) => {
      setAuthToken(data.token); // save token to local storage, this is not secure & only for the sake of simplicity
    },
    onError: (error) => {
      return Promise.reject(error.response.data || error);
    },
  });

  return { login, data, error, isLoading };
};

export default useLogin;
