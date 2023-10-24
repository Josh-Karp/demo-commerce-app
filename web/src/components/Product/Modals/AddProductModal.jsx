import { PlusCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import useCreateProduct from "../../../hooks/useCreateProduct";
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

function AddProductModal({ setOpen, onClick, open = false }) {
  const { createProduct } = useCreateProduct();

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const {
      name,
      sku,
      price,
      brand,
      category,
      color,
      description,
      imgUrl,
      imgAlt,
    } = e.target.elements;

    const product = {
      name: name.value,
      sku: sku.value,
      price: price.value,
      brand: brand.value,
      category: category.value,
      color: color.value,
      "img_url": imgUrl.value,
      "img_alt": imgAlt.value,
      description: description.value,
    };

    try {
      await createProduct(product);

      toast.success("Product created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setOpen("add-product");
    }
  };

  return (
    <Modal
      label='Add Product'
      open={open}
      setOpen={setOpen}
      icon={
        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10'>
          {
            <PlusCircleIcon
              className='h-6 w-6 text-indigo-600'
              aria-hidden='true'
            />
          }
        </div>
      }
      button={
        <button
          type='submit'
          form='add-product-form'
          className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto'
        >
          Add
        </button>
      }
    >
      <form
        className='w-full'
        id='add-product-form'
        onSubmit={handleCreateProduct}
      >
        <p className='text-sm leading-6 text-gray-600'>
          Please enter the product information.
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
                defaultValue={""}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddProductModal;
