"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol menu mobile

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Navbar Utama: Fixed, berwarna hitam/oranye, dengan z-index tinggi
    <div className="bg-black shadow-md opacity-95 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Teknoz Logo"
              className="w-18 h-18 object-contain"
            />
            <span className="text-2xl font-bold text-white">Tectnooz</span>
          </div>
          {/* Navigasi Desktop */}
          <nav className="hidden md:flex space-x-8 items-center text-white font-medium">
            <a
              href="#"
              className="hover:text-orange-400 transition duration-150 whitespace-nowrap"
            >
              About Us
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition duration-150 whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition duration-150 whitespace-nowrap"
            >
              Blog List
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition duration-150 whitespace-nowrap"
            >
              Teams
            </a>
          </nav>
          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg shadow-orange-500/50">
              Login
            </button>
          </div>
          {/* Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-orange-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Ikon Hamburger */}

              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                // Ikon X
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "max-h-80 opacity-100 py-2"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
          <a
            onClick={toggleMenu}
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            About Us
          </a>

          <a
            onClick={toggleMenu}
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            Services
          </a>

          <a
            onClick={toggleMenu}
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            Blog List
          </a>

          <a
            onClick={toggleMenu}
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            Teams
          </a>
          {/* Mobile Login Button */}
          <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
