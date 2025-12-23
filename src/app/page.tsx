'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import HeroSequence from '@/components/HeroSequence';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

import portfolioData from '@/data/portfolio.json';

// Ensure data types match, casting if necessary since strict JSON import might infer specific types
import { PortfolioData } from '@/types/portfolio';
const data = portfolioData as unknown as PortfolioData;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-black min-h-screen text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <SmoothScroll>
            <Navbar />
            <HeroSequence />
            <div className="relative z-10 bg-black">
              <About data={data} />
              <Projects data={data} />
              <Footer />
            </div>
          </SmoothScroll>
        </motion.div>
      )}
    </main>
  );
}
