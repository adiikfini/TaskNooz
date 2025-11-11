// src/app/products/page.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import ServicesHero from './components/ServicesHero';
import ServiceList from './components/ServiceList';
import ServiceTestimonials from './components/ServiceTestimonials';
import Footer from '@/components/Footer'; // Asumsi Anda punya Footer
import PricingSection from './components/PricingSection';

export default function ProductsPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      {/* Padding top untuk kompensasi navbar fixed */}
      <main className="pt-20">
        <ServicesHero />
        <ServiceList />
        <PricingSection />
        <ServiceTestimonials />
      </main>

      <Footer />
    </div>
  );
}