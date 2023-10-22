import clsx from "clsx";
import React, { useState } from "react";
import AddProductCard from "../components/Product/AddProductCard";
import AddProductModal from "../components/Product/Modals/AddProductModal";
import DeleteProductModal from "../components/Product/Modals/DeleteProductModal";
import ProductActions from "../components/Product/ProductActions";
import ProductCard, { ORIENTATIONS } from "../components/Product/ProductCard";
import { useProductsContext } from "../context/ProductContext";
import useProductsQuery from "../hooks/useProductsQuery";
import sortArray from "../utils/sortArray";

// const products = [
//   {
//     id: 1,
//     name: "Basic Black Tee",
//     category: "tee",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.",
//     price: 100,
//     color: "black",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     popularity: 90,
//     createdAt: "2021-08-01T00:00:00.000Z",
//   },
//   {
//     id: 2,
//     name: "Basic White Tee",
//     category: "other",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.",
//     price: 200,
//     color: "white",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
//     imageAlt: "Front of men's Basic Tee in white.",
//     popularity: 70,
//     createdAt: "2021-07-02T00:00:00.000Z",
//   },
//   {
//     id: 3,
//     name: "Basic Black Tee",
//     category: "tee",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.",
//     price: 300,
//     color: "black",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
//     imageAlt: "Front of men's Basic Tee in white.",
//     popularity: 80,
//     createdAt: "2021-06-02T00:00:00.000Z",
//   },
// ];

const MODALS = [
  {
    id: "delete-product",
    open: true,
    component: DeleteProductModal,
  },
  {
    id: "add-product",
    open: false,
    component: AddProductModal,
  },
];

function ProductPage() {
  const [sortedProducts, setSortedProducts] = useState([]);
  const { data: products, isLoading, isError } = useProductsQuery();
  const { sortBy, filterBy, orientation } = useProductsContext();
  const [modals, setModals] = useState(MODALS[0]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const { key, order } = sortBy;
  const sorted_products = sortArray(products, key, order);

  const { category, color } = filterBy;
  const filtered_products = sorted_products.filter((product) => {
    if (category && color) {
      return product.category === category && product.color === color;
    } else if (category) {
      return product.category === category;
    } else if (color) {
      return product.color === color;
    }
    return true;
  });

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
            {filtered_products.map((product) => (
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
      {MODALS.map(({ id, open, component }) => (
        <component
          key={id}
          open={open}
          onClick={() =>
            setModels({
              ...modals,
              [id]: {
                open: open,
              },
            })
          }
        />
      ))}
    </>
  );
}

export default ProductPage;
