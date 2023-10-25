import React from "react";
import toast from "react-hot-toast";
import toBase64 from "../../utils/toBase64";

function FileUpload({ file, setFile = () => {}, label = null }) {
  const handleChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const base64Image = await toBase64(file);
        setFile(base64Image);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div className='col-span-full'>
      <label
        for='file-upload'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
        {file ? (
          <div className='flex flex-col justify-center items-center'>
            <img className='rounded-md' src={file} />
            <span
              className='font-semibold mt-4 text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
              role='button'
              onClick={clearFile}
            >
              Clear
            </span>
          </div>
        ) : (
          <div className='text-center'>
            <svg
              className='mx-auto h-12 w-12 text-gray-300'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fill-rule='evenodd'
                d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                clip-rule='evenodd'
              />
            </svg>
            <div className='mt-4 flex justify-center text-sm leading-6 text-gray-600'>
              <label
                for='file-upload'
                className='relative justify-center cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span className='content-center'>Upload a file</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  className='sr-only'
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>
            <p className='text-xs leading-5 text-gray-600'>
              PNG, JPG, GIF up to 10MB
            </p>
            <img className='mt-4' src={file} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
