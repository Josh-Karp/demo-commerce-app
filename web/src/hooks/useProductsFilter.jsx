import { useEffect, useState } from "react";
import sortArray from "../utils/sortArray";

function useProductsFilter(products, sortBy, filterBy) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products) return;
    
    const { key, order } = sortBy;
    const sortedProducts = sortArray(products, key, order);

    const { category, color } = filterBy;
    const filteredProducts = sortedProducts.filter((product) => {
      if (category && color) {
        return product.category === category && product.color === color;
      } else if (category) {
        return product.category === category;
      } else if (color) {
        return product.color === color;
      }
      return true;
    });

    setFilteredProducts(filteredProducts);
  }, [products, sortBy, filterBy]);

  return filteredProducts;
}

export default useProductsFilter;