import { useQuery } from "react-query";
import api from "../lib/axios";

const fetchProducts = async (id = null) => {
  const { data } = await api.get(`/product/${id ? id : ""}`);
  return data;
};

function useProducts() {
  const { isLoading, isError, data } = useQuery(["products"], () =>
    fetchProducts()
  );
  return { isLoading, isError, data };
}

function useProduct(id) {
  const { isLoading, isError, data } = useQuery(["product", id], () =>
    fetchProducts(id)
  );
  return { isLoading, isError, data };
}

export { useProduct, useProducts };

