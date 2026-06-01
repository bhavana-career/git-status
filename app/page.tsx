'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SDGSection from '@/components/SDGSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col font-sans antialiased">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Features Grid Section */}
        <Features />

        {/* SDG-3 Alignment Section */}
        <SDGSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
