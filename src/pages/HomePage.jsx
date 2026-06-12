import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ServicesSection from '../components/home/ServicesSection';
import ProductsShowcase from '../components/home/ProductsShowcase';
import ProcessSection from '../components/home/ProcessSection';
import GallerySection from '../components/home/GallerySection';
import ContactSection from '../components/home/ContactSection';

const HomePage = () => {
  useEffect(() => {
    // Scroll to hash if exists
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <div className="bg-[#090909]">
      <div id="home"><HeroSection /></div>
      <div id="tentang"><FeaturesSection /></div>
      <div id="produk"><ServicesSection /></div>
      <ProductsShowcase />
      <ProcessSection />
      <GallerySection />
      <div id="kontak"><ContactSection /></div>
    </div>
  );
};

export default HomePage;
