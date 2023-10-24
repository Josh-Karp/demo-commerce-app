import React from "react";

function LoadingSpinner() {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-indigo-600' />
    </div>
  );
}

export default LoadingSpinner;
