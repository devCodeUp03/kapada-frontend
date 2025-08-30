import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { setShowSearch } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between font-medium py-5">
      <Link to="/">
        <img
          src={assets.kapadaalogo}
          alt="logo"
          className=" w-55 h-15 sm:w-60 sm:h-18"
        />
      </Link>
      <ul className="hidden md:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search_icon"
        />

        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile_icon"
          />
          <div className="group-hover:block hidden absolute right-0 dropdown-menu pt-4">
            <div className="flex flex-col gap-2 px-5 py-3 w-36 bg-slate-100 text-gray-500 rounded">
              <p className="hover:text-black cursor-pointer">My profile</p>
              <p className="hover:text-black cursor-pointer">Orders</p>
              <p className="hover:text-black cursor-pointer">Logout</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]">
            1
          </p>
        </Link>

        <img
          onClick={() => setOpen(true)}
          src={assets.menu_icon}
          alt="menu-icon"
          className="w-5 md:hidden"
        />
      </div>
      {/* sidebar for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white trasition-all ${
          open ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="drop_icon"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setOpen(false)}
            to="/"
            className="py-2 pl-6  uppercase "
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/collection"
            className="py-2 pl-6  uppercase"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/about"
            className="py-2 pl-6  uppercase"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/contact"
            className="py-2 pl-6  uppercase"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
