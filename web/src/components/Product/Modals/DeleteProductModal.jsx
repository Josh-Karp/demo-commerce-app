import { TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useProductsContext, useProductsDispatch } from "../../../context/ProductContext";
import useDeleteProduct from "../../../hooks/useDeleteProduct";
import Modal from "../../Layout/Modal";

function DeleteProductModal({ setOpen, open = false }) {
  const { activeProduct } = useProductsContext();
  const { setActiveProduct } = useProductsDispatch();
  const { deleteProduct } = useDeleteProduct();

  const handleDelete = async () => {
    try {
      await deleteProduct(activeProduct);

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpen(false);
      setActiveProduct(null);
    }
  };

  return (
    <Modal
      label='Add Product'
      open={open}
      setOpen={setOpen}
      icon={
        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
          <TrashIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
        </div>
      }
      button={
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      }
    >
      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          Are you sure you want to remove this product? The product will be
          permanently removed. This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}

export default DeleteProductModal;
