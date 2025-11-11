import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-900 py-16 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Konten Utama - Grid Responsif */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Kolom 1: Brand & Sosial Media */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="mb-4 text-2xl font-bold text-orange-500">
              Tectnooz
            </h2>
            <p className="mb-6 text-sm leading-relaxed">
              Transform your business with our cutting-edge RPA solution
              designed for modern companies.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Product */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Company */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Legal */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-orange-400"
                >
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="mt-16 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Tectnooz. All rights reserved. Build by Adiikfini
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Distributed by{" "}
            <a href="#" className="text-orange-500 hover:text-orange-400">
              Github
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
