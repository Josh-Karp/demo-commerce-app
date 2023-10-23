import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

function RegisterPage() {
  const { register } = useRegister();
  const { navigate } = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, firstName, lastName, email, password, confirmPassword } =
      e.target.elements;

    if (password.value !== confirmPassword.value) {
      return toast.error("Passwords do not match");
    }

    const credentials = {
      username: username.value,
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
    };

    try {
      await register(credentials);

      toast.success("Account created successfully");

      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='/logo.png'
            alt='Logo'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create a new account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-4' action='#' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Username
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                First name
              </label>
              <div className='mt-2'>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  autoComplete='firstName'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Last name
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  autoComplete='lastName'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Confirm password
              </label>
              <div className='mt-2'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Create account
              </button>
            </div>
            <div className='flex justify-end text-sm' onClick={null}>
              <Link
                to='/login'
                className='ms-auto font-semibold text-indigo-600 hover:text-indigo-500'
              >
                Already registered?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
