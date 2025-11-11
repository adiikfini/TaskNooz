"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol menu mobile

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed z-50 w-full bg-black opacity-95 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Tectnooz Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-white">Tectnooz </span>
          </Link>

          {/* Navigasi Desktop (Menggunakan Link) */}
          <nav className="hidden items-center space-x-8 font-medium text-white md:flex">
            <Link
              href="/about" // <-- 3. Path diperbarui
              className="whitespace-nowrap transition duration-150 hover:text-orange-400"
            >
              About Us
            </Link>
            <Link
              href="/products" // <-- 3. Path diperbarui (Asumsi 'Services' adalah halaman 'Products')
              className="whitespace-nowrap transition duration-150 hover:text-orange-400"
            >
              Services
            </Link>
            <Link
              href="/blog" // <-- 3. Path diperbarui
              className="whitespace-nowrap transition duration-150 hover:text-orange-400"
            >
              Blog List
            </Link>
            <Link
              href="/teams" // <-- 3. Path diperbarui
              className="whitespace-nowrap transition duration-150 hover:text-orange-400"
            >
              Teams
            </Link>
          </nav>

          {/* Login Button (Masih <button> karena bukan navigasi) */}
          <div className="hidden items-center space-x-4 md:flex">
            <button className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/50 transition duration-300 hover:bg-orange-600">
              Login
            </button>
          </div>

          {/* Hamburger Button (State management tetap sama) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-orange-500 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-inset"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Menggunakan Link) */}
      <div
        className={`transform transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-80 py-2 opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="space-y-1 px-2 pt-2 pb-3 text-center sm:px-3">
          <Link
            onClick={toggleMenu}
            href="/about" // <-- 3. Path diperbarui
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            About Us
          </Link>

          <Link
            onClick={toggleMenu}
            href="/products" // <-- 3. Path diperbarui
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            Services
          </Link>

          <Link
            onClick={toggleMenu}
            href="/blog" // <-- 3. Path diperbarui
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            Blog List
          </Link>

          <Link
            onClick={toggleMenu}
            href="/teams" // <-- 3. Path diperbarui
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-orange-400"
          >
            Teams
          </Link>
          
          {/* Mobile Login Button */}
          <button className="mt-4 w-full rounded-lg bg-orange-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-orange-600">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;