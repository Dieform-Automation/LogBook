import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../assets/logo.png';
import MenuIcon from '../assets/menu.svg';
import CrossIcon from '../assets/cross.svg';

const Navbar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-gray-800 z-10">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
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
                  to="/customers"
                  activeClassName="active-link"
                  className="nav-link"
                >
                  Customers
                </NavLink>
                <NavLink to="/parts" activeClassName="active-link" className="nav-link">
                  Parts
                </NavLink>
                <NavLink
                  to="/receiving"
                  activeClassName="active-link"
                  className="nav-link"
                >
                  Receiving
                </NavLink>
                <NavLink
                  to="/shipping"
                  activeClassName="active-link"
                  className="nav-link"
                >
                  Shipping
                </NavLink>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            {/*  Mobile menu button  */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              {/* Menu open: "hidden", Menu closed: "block" */}
              <MenuIcon className={`${menuIsOpen ? 'hidden' : 'block'} h-6 w-6`} />

              {/* Menu open: "block", Menu closed: "hidden" */}
              <CrossIcon className={`${menuIsOpen ? 'block' : 'hidden'} h-6 w-6`} />
            </button>
          </div>
        </div>
      </div>
      {/*
          Mobile menu, toggle classNamees based on menu state.
          Open: "block", closed: "hidden"
      */}
      <div
        onClick={() => setMenuIsOpen(false)}
        className={`${menuIsOpen ? 'block' : 'hidden'} md:hidden`}
      >
        <div className="px-2 pb-3 space-y-1">
          <NavLink
            to="/customers"
            activeClassName="active-link"
            className="nav-link block"
          >
            Customers
          </NavLink>

          <NavLink to="/parts" activeClassName="active-link" className="nav-link block">
            Parts
          </NavLink>
          <NavLink
            to="/receiving"
            activeClassName="active-link"
            className="nav-link block"
          >
            Receiving
          </NavLink>

          <NavLink
            to="/shipping"
            activeClassName="active-link"
            className="nav-link block"
          >
            Shipping
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
