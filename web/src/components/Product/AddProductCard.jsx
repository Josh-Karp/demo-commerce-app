import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

function AddProductCard() {
  return (
    <div className='border rounded-lg relative'>
      <div className='group px-4 py-12 h-full flex flex-1 flex-col justify-center items-center gap-2 hover:cursor-pointer'>
        <PlusCircleIcon className='transition w-12 h-12 text-gray-300 group-hover:text-indigo-600' />
        <p className="text-xs font-semibold">Add product</p>
      </div>
    </div>
  );
}

export default AddProductCard;
