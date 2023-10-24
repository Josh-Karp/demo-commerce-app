import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='bg-white'>
        <div className='mx-auto mt-20 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
          {children}
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
