import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { removeAuthToken } from "../../utils/localAuth";

const NAVIGATION_ITEMS = [
  { id: 1, name: "Products", href: "#" },
  { id: 2, name: "Company", href: "#" },
  { id: 3, name: "Resources", href: "#" },
  { id: 4, name: "Contact us", href: "#" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          className='flex items-center justify-between p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <a href='#' className='-m-1.5 p-1.5'>
              <img className='h-8 w-auto' src='/logo.png' alt='Logo' />
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {NAVIGATION_ITEMS.map(({ id, name, href }) => (
              <a
                key={id}
                href={href}
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                {name}
              </a>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end space-x-4 pe-4'>
            <ShoppingCartIcon className='transition w-6 text-sm font-semibold text-gray-900 hover:text-indigo-500 hover:cursor-pointer' />
            <button
              className='transition w-6 text-sm font-semibold hover:text-indigo-500 hover:cursor-pointer'
              onClick={() => {
                removeAuthToken();
                navigate("/auth/login");
              }}
            >
              Logout
            </button>
          </div>
        </nav>
        <Dialog
          as='div'
          className='lg:hidden'
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Demo Company</span>
                <img className='h-8 w-auto' src='/logo.png' alt='' />
              </a>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {NAVIGATION_ITEMS.map(({ id, name, href }) => (
                    <a
                      key={name}
                      href={href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      {name}
                    </a>
                  ))}
                </div>
                <div className='py-6'>
                  <ShoppingCartIcon className='transition w-6 text-indigo-600 hover:text-indigo-500 hover:cursor-pointer' />
                  <button
                    className='transition w-6 text-indigo-600 hover:text-indigo-500 hover:cursor-pointer'
                    onClick={() => removeAuthToken()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
