import { useMutation } from "react-query";
import api from "../lib/axios";
import { setAuthToken } from "../utils/localAuth";

const registerMutation = async (credentials) => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};

const useRegister = () => {
  const {
    mutateAsync: register,
    data,
    error,
    isLoading,
  } = useMutation((credentials) => registerMutation(credentials), {
    onSuccess: (data) => {
      setAuthToken(data.token); // save token to local storage, this is not secure & only for the sake of simplicity
    },
    onError: (error) => {
      return Promise.reject(error.response.data || error);
    },
  });

  return { register, data, error, isLoading };
};

export default useRegister;
