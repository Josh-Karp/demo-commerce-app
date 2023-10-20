import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React, { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MenuDropdown({
  label,
  items,
  onClick = () => {},
  position = "right",
  checkbox = false,
  activeItem = null,
}) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='group inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900'>
          {label}
          <ChevronDownIcon
            className='-mr-1 h-5 w-5 transition text-gray-400 group-hover:text-gray-500'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={clsx(
            "absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            position === "left" ? "right-0" : "left-0"
          )}
        >
          <div className='py-1'>
            {items.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <div
                    className={clsx("flex items-center hover:bg-gray-100", {
                      "bg-gray-100": active || activeItem === item.name,
                    })}
                    onClick={() => onClick(item)}
                  >
                    {checkbox && (
                      <input
                        id={item.id}
                        name={item.name}
                        type='checkbox'
                        checked={activeItem === item.name}
                        className='ms-4 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      />
                    )}
                    <a href='#' className='w-full block px-4 py-2 text-sm'>
                      {item.label}
                    </a>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MenuDropdown;
