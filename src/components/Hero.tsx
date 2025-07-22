import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeroSlide } from '../types/hero';

const Hero: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/data/hero.json')
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null;

  const slide = slides[index];

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
              {slide.description}
            </p>
            <button
              type="button"
              className="
                bg-blue-600
                hover:bg-blue-700
                focus:outline-none
                focus:ring-4
                focus:ring-blue-300
                text-white
                font-semibold
                py-3
                px-8
                rounded-lg
                shadow-lg
                transition
                duration-300
                ease-in-out
                drop-shadow-md
              "
              onClick={() => alert('Botão clicado!')}
            >
              Comprar Agora
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Hero;
