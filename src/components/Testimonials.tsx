import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import type { TestimonialData } from '../types/testimonials';

const Testimonials: React.FC = () => {
  const [data, setData] = useState<TestimonialData | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/data/testimonials.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.testimonials.length) {
        setIndex((prev) => (prev + 1) % data.testimonials.length);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) return null;

  const testimonial = data.testimonials[index];

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {data.title}
        </h2>
        <p className="text-gray-600 text-lg">{data.description}</p>
      </div>

      <div className="relative min-h-[200px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-2xl shadow-md px-8 py-10 max-w-2xl text-center"
          >
            <p className="text-xl italic text-gray-800 mb-6">
              “{testimonial.comment}”
            </p>

            <div className="flex justify-center mb-4">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400 h-5 w-5" />
              ))}
            </div>

            <p className="font-semibold text-gray-700 text-base">— {testimonial.author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;
