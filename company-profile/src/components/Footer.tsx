import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Konten Utama - Grid Responsif */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Kolom 1: Brand & Sosial Media */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Tectnooz
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              Transform your business with our cutting-edge SaaS solution
              designed for modern companies.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Product */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >Features</a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >Blog</a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >Contact Us</a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >About</a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Sassland. All rights reserved. Build by Codescandy
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Distributed by{" "}
            <a href="#" className="text-orange-500 hover:text-orange-400">
              ThemeWagon
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
