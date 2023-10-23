import { useMutation, useQueryClient } from "react-query";
import api from "../lib/axios";

const deleteProductMutation = async (id) => {
  const res = await api.delete(`/product/${id}`);
  return res;
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  const {
    mutateAsync: deleteProduct,
    data,
    error,
    isLoading,
  } = useMutation((id) => deleteProductMutation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
      return Promise.reject(error.response.data || error);
    },
  });

  return { deleteProduct };
};

export default useDeleteProduct;
