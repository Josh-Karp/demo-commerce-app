import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProductsContext } from "../../../context/ProductContext";
import { useProduct } from "../../../hooks/useProducts";
import useUpdateProduct from "../../../hooks/useUpdateProduct";
import Modal from "../../Layout/Modal";

const COLORS = Object.freeze({
  red: "Red",
  blue: "Blue",
  green: "Green",
  yellow: "Yellow",
  black: "Black",
  white: "White",
  gray: "Gray",
  purple: "Purple",
  pink: "Pink",
  orange: "Orange",
});

const CATEGORIES = Object.freeze({
  tee: "Tee",
  hoodie: "Hoodie",
  pants: "Pants",
  other: "Other",
});

function EditProductModal({ setOpen, onClick, open = false }) {
  const { updateProduct } = useUpdateProduct();
  const { activeProduct } = useProductsContext();
  const { data, isLoading, isError } = useProduct(activeProduct);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const product_data = {
      id: data.id,
      ...product,
    };

    try {
      await updateProduct(product_data);

      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setOpen("edit-product");
    }
  };

  const handleUpdateValues = (e) => {
    const { name, value } = e.target;

    setProduct(() => ({
      [name]: value,
    }));
  };

  if (isLoading) {
    return null;
  }

  if (isError) {
    toast.error("Something went wrong");
    return null;
  }

  return (
    <Modal
      label='Edit Product'
      open={open}
      setOpen={setOpen}
      icon={
        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10'>
          {
            <PencilSquareIcon
              className='h-6 w-6 text-indigo-600'
              aria-hidden='true'
            />
          }
        </div>
      }
      button={
        <button
          type='submit'
          className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto'
          form='edit-product-form'
        >
          Update
        </button>
      }
    >
      <form
        className='w-full'
        id='edit-product-form'
        onSubmit={handleUpdateProduct}
      >
        <p className='text-sm leading-6 text-gray-600'>
          Please enter the updated product information.
        </p>

        <div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6'>
          <div className='sm:col-span-3'>
            <label
              htmlFor='name'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Name
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='name'
                id='name'
                value={product.name}
                onChange={(e) => handleUpdateValues(e)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='sku'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Sku
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='sku'
                id='sku'
                value={product.sku}
                onChange={(e) => handleUpdateValues(e)}
                autoComplete='given-name'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='price'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Price
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='price'
                id='price'
                value={product.price}
                onChange={(e) => handleUpdateValues(e)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='brand'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Brand
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='brand'
                id='brand'
                value={product.brand}
                onChange={(e) => handleUpdateValues(e)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='category'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Category
            </label>
            <div className='mt-2'>
              <select
                id='category'
                name='category'
                value={product.category}
                onChange={(e) => handleUpdateValues(e)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {Object.keys(CATEGORIES).map((color) => (
                  <option key={color} value={color}>
                    {CATEGORIES[color]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='color'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Color
            </label>
            <div className='mt-2'>
              <select
                id='color'
                name='color'
                value={product.color}
                onChange={(e) => handleUpdateValues(e)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
              >
                {Object.keys(COLORS).map((color) => (
                  <option key={color} value={color}>
                    {COLORS[color]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='image-url'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Image Url
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='imgUrl'
                id='image-url'
                value={product.imgUrl}
                onChange={(e) => handleUpdateValues(e)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='sm:col-span-3'>
            <label
              htmlFor='image-alt'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Image Alt
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='imgAlt'
                id='image-alt'
                value={product.imgAlt}
                onChange={(e) => handleUpdateValues(e)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div className='col-span-full'>
            <label
              htmlFor='description'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Description
            </label>
            <div className='mt-2'>
              <textarea
                id='description'
                name='description'
                rows={3}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                value={product.description}
                onChange={(e) => handleUpdateValues(e)}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default EditProductModal;
