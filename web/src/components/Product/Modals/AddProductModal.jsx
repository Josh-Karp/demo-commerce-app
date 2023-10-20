import { PhotoIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
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

function AddProductModal() {
  return (
    <Modal
      label='Add Product'
      open={true}
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
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto'
          onClick={() => onClick(false)}
        >
          Add
        </button>
      }
    >
      <form className='w-full'>
        <p className='text-sm leading-6 text-gray-600'>
          Please enter the product information.
        </p>

        <div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6'>
          <div className='sm:col-span-3'>
            <label
              htmlFor='first-name'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Name
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='first-name'
                id='first-name'
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

          <div className='col-span-full'>
            <label
              htmlFor='cover-photo'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Image
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-8'>
              <div className='text-center'>
                <PhotoIcon
                  className='mx-auto h-12 w-12 text-gray-300'
                  aria-hidden='true'
                />
                <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                  >
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className='sr-only'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs leading-5 text-gray-600'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddProductModal;
