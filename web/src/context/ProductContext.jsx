import React, { createContext, useContext, useState } from "react";

const ProductsContext = createContext();
const ProductsDispatchContext = createContext();

const ProductsProvider = ({ children }) => {
  const [orientation, setOrientation] = useState("vertical");
  const [sortBy, setSortBy] = useState({
    key: "popularity",
    order: "asc",
  });
  const [filterBy, setFilterBy] = useState({
    category: null,
    color: null,
  });

  return (
    <ProductsContext.Provider value={{ sortBy, filterBy, orientation }}>
      <ProductsDispatchContext.Provider
        value={{ setSortBy, setFilterBy, setOrientation }}
      >
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => useContext(ProductsContext);
const useProductsDispatch = () => useContext(ProductsDispatchContext);

export { ProductsContext, ProductsProvider, useProductsContext, useProductsDispatch };

