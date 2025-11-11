// src/app/products/components/ServicesHero.tsx
import React from 'react';

function ServicesHero() {
  return (
    <section className="bg-gray-900 py-20 text-center text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          Our <span className="text-orange-600">Services</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
          Comprehensive automation solutions designed to accelerate your digital transformation and drive business growth.
        </p>
      </div>
    </section>
  );
}

export default ServicesHero;