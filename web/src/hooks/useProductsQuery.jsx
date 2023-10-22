
import axios from "axios";
import { useQuery } from "react-query";

const fetchProducts = async () => {
  const { data } = await axios.get(`http://localhost:5000/product/`);
  return data;
};

function useProductsQuery() {
  const { isLoading, isError, data } = useQuery(["products"], () =>
    fetchProducts()
  );
  return { isLoading, isError, data };
}

export default useProductsQuery;
