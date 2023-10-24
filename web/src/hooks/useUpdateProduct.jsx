import { useMutation, useQueryClient } from "react-query";
import api from "../lib/axios";

const updateProductMutation = async (product) => {
  const { data } = await api.put(`/product/${product.id}`, product);
  return data;
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateProduct,
    data,
    error,
    isLoading,
  } = useMutation((product) => updateProductMutation(product), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      return Promise.reject(error.response.data || error);
    },
  });

  return { updateProduct };
};

export default useUpdateProduct;
