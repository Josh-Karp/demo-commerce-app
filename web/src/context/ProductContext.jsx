import React, { createContext, useContext, useState } from "react";

const ProductsContext = createContext();
const ProductsDispatchContext = createContext();

const ProductsProvider = ({ children }) => {
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [orientation, setOrientation] = useState("vertical");
  const [sortBy, setSortBy] = useState({
    key: "popularity",
    order: "asc",
  });
  const [filterBy, setFilterBy] = useState({
    category: null,
    color: null,
  });

  const handleToggleModal = (id) => {
    setActiveModal((prev) => (prev === id ? null : id));
  };

  return (
    <ProductsContext.Provider
      value={{ sortBy, filterBy, orientation, activeProduct, activeModal }}
    >
      <ProductsDispatchContext.Provider
        value={{
          setSortBy,
          setFilterBy,
          setOrientation,
          setActiveProduct,
          handleToggleModal,
        }}
      >
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => useContext(ProductsContext);
const useProductsDispatch = () => useContext(ProductsDispatchContext);

export {
  ProductsContext,
  ProductsProvider,
  useProductsContext,
  useProductsDispatch
};

