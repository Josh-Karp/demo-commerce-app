import { useMutation, useQueryClient } from "react-query";
import api from "../lib/axios";

const createProductMutation = async (product) => {
  const { data } = await api.post("/product/", product);
  return data;
};

const useCreateProduct = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: createProduct,
    data,
    error,
    isLoading,
  } = useMutation((product) => createProductMutation(product), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
      return Promise.reject(error.response.data || error);
    },
  });

  return { createProduct };
};

export default useCreateProduct;
