import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";
import { NumericFormat } from "react-number-format";
import { useProductsDispatch } from "../../context/ProductContext";
import AdminGuard from "../AdminGuard";

export const ORIENTATIONS = Object.freeze({
  hoizontal: "horizontal",
  vertical: "vertical",
});

function ProductCard({ product, orientation = ORIENTATIONS.vertical }) {
  const { id, name, sku, price, brand, category, color, description, image } =
    product;

  const { handleToggleModal, setActiveProduct } = useProductsDispatch();

  const handleDeleteProduct = () => {
    setActiveProduct(id);
    handleToggleModal("delete-product");
  };

  const handleEditProduct = () => {
    setActiveProduct(id);
    handleToggleModal("edit-product");
  };

  return (
    <div
      key={id}
      className={clsx(
        [orientation === ORIENTATIONS.hoizontal && "flex"],
        "border rounded-lg group relative"
      )}
    >
      <div
        className={clsx(
          [
            orientation === ORIENTATIONS.vertical &&
              "aspect-h-1 aspect-w-1 w-full",
          ],
          "overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 transition lg:h-80"
        )}
      >
        <img
          src={image}
          alt='product image'
          className='h-full w-full object-cover object-center lg:h-full lg:w-full'
        />
      </div>
      <div
        className={clsx(
          orientation === ORIENTATIONS.hoizontal
            ? "flex flex-col h-full flex-1"
            : "h-full"
        )}
      >
        <div
          className={clsx(
            [orientation === ORIENTATIONS.hoizontal && "flex-col gap-4"],
            "p-4 pt-0 mt-4 flex justify-between"
          )}
        >
          <div>
            <h3 className='text-sm text-gray-700 font-semibold'>
              <a href='#'>
                <span aria-hidden='true' className='absolute inset-0' />
                {name}
              </a>
            </h3>
            <p className='mt-1 text-sm text-gray-500 italic capitalize'>
              {color}
            </p>
          </div>
          <p className='text-lg font-medium text-gray-900'>
            <NumericFormat
              value={price.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </p>
        </div>
        <p className='text-sm text-gray-500 px-4'>{description}</p>
        <div
          className={clsx(
            [orientation === ORIENTATIONS.hoizontal && "mt-auto"],
            "mt-auto p-4 flex"
          )}
        >
          <button
            className={clsx(
              [
                orientation === ORIENTATIONS.hoizontal
                  ? "ms-auto w-[25%]"
                  : "w-full",
              ],
              "transition bg-gray-300 p-2 rounded-md text-xs font-semibold text-white group-hover:bg-indigo-600 "
            )}
          >
            Add to Cart
          </button>
        </div>
        <AdminGuard>
          <button
            onClick={() => handleDeleteProduct()}
            className='absolute z-90 top-4 left-4 w-6 h-6 rounded-full flex justify-center items-center'
          >
            <TrashIcon className='transition text-gray-300 hover:text-indigo-600' />
          </button>
          <button
            onClick={() => handleEditProduct()}
            className='absolute z-90 top-4 right-4 w-6 h-6 rounded-full flex justify-center items-center'
          >
            <PencilSquareIcon className='transition text-gray-300 hover:text-indigo-600' />
          </button>
        </AdminGuard>
      </div>
    </div>
  );
}

export default ProductCard;
