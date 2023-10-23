import clsx from "clsx";
import React, { useState } from "react";
import AddProductCard from "../components/Product/AddProductCard";
import AddProductModal from "../components/Product/Modals/AddProductModal";
import DeleteProductModal from "../components/Product/Modals/DeleteProductModal";
import EditProductModal from "../components/Product/Modals/EditProductModal";
import ProductActions from "../components/Product/ProductActions";
import ProductCard, { ORIENTATIONS } from "../components/Product/ProductCard";
import {
  useProductsContext,
  useProductsDispatch,
} from "../context/ProductContext";
import { useProducts } from "../hooks/useProducts";
import useProductsFilter from "../hooks/useProductsFilter";

const MODALS = [
  {
    id: "delete-product",
    Component: DeleteProductModal,
  },
  {
    id: "edit-product",
    Component: EditProductModal,
  },
  {
    id: "add-product",
    Component: AddProductModal,
  }
];

function ProductPage() {
  const [sortedProducts, setSortedProducts] = useState([]);

  const { data: products, isLoading, isError } = useProducts();
  const { sortBy, filterBy, orientation, activeModal } = useProductsContext();
  const { handleToggleModal } = useProductsDispatch();
  const filteredProducts = useProductsFilter(products, sortBy, filterBy);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <ProductActions />
          <div
            className={clsx(
              [
                orientation === ORIENTATIONS.vertical &&
                  "sm:grid-cols-2 lg:grid-cols-4",
              ],
              "border p-8 rounded-lg mt-2 grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8"
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                orientation={orientation}
                {...product}
              />
            ))}
            <AddProductCard />
          </div>
        </div>
      </div>
      {MODALS.map(({ id, Component }) => (
        <Component
          key={id}
          open={activeModal === id}
          setOpen={() => handleToggleModal(id)}
        />
      ))}
    </>
  );
}

export default ProductPage;
