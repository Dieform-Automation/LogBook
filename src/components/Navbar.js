import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-gray-800 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/">
                <img className="h-8" src={logo} alt="DieForm logo" />
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/receiving"
                  activeClassName="outline-none text-white bg-gray-700"
                  className="px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Receiving
                </NavLink>
                <NavLink
                  to="/shipping"
                  activeClassName="outline-none text-white bg-gray-700"
                  className="cursor-pointer px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Shipping
                </NavLink>
                <div className="relative">
                  <a
                    onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                    className="relative z-10 cursor-pointer flex items-center px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
                  >
                    Manage Data
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <button
                    className={`${
                      dropdownIsOpen ? 'block' : 'hidden'
                    } fixed inset-0 h-full w-full cursor-default`}
                    onClick={() => setDropdownIsOpen(false)}
                  />
                  <div
                    onClick={() => setDropdownIsOpen(false)}
                    className={`${
                      dropdownIsOpen ? 'block' : 'hidden'
                    }  absolute left-0 mt-2 w-48 rounded-md shadow-lg z-10`}
                  >
                    <div className="py-1 rounded-md bg-gray-800 shadow-xs">
                      <NavLink
                        to="/customers"
                        activeClassName="outline-none text-white bg-gray-700"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
                      >
                        Customers
                      </NavLink>

                      <NavLink
                        to="/parts"
                        activeClassName="outline-none text-white bg-gray-700"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
                      >
                        Parts
                      </NavLink>

                      <NavLink
                        to="/purchase-orders"
                        activeClassName="outline-none text-white bg-gray-700"
                        className="block px-4 py-2 text-sm  text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
                      >
                        Purchase Orders
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
              <svg
                className={`${menuIsOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
              <svg
                className={`${menuIsOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* 
    <!--
    Mobile menu, toggle classNamees based on menu state.
    
    Open: "block", closed: "hidden"
  --> */}
      <div
        onClick={() => setMenuIsOpen(false)}
        className={`${menuIsOpen ? 'block' : 'hidden'} md:hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
          <NavLink
            to="/receiving"
            activeClassName="outline-none text-white bg-gray-700"
            className="block px-3 py-1 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Receiving
          </NavLink>

          <NavLink
            to="/shipping"
            activeClassName="outline-none text-white bg-gray-700"
            className="block px-3 py-1 rounded-md text-base font-medium text-gray-300 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Shipping
          </NavLink>

          <h1 className="px-3 pt-2 text-sm uppercase font-bold text-gray-500">
            Manage Data
          </h1>

          <NavLink
            to="/customers"
            activeClassName="outline-none text-white bg-gray-700"
            className="block px-3 py-1 rounded-md text-sm font-medium text-gray-300 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Customers
          </NavLink>
          <NavLink
            to="/parts"
            activeClassName="outline-none text-white bg-gray-700"
            className="block px-3 py-1 rounded-md text-sm font-medium text-gray-300 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Parts
          </NavLink>
          <NavLink
            to="/purchase-orders"
            activeClassName="outline-none text-white bg-gray-700"
            className="block px-3 py-1 rounded-md text-sm font-medium text-gray-300 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Purchase Orders
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
