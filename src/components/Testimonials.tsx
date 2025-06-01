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
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) return null;

  const testimonial = data.testimonials[index];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
        <p className="text-gray-600">{data.description}</p>
      </div>

      <div className="relative h-48 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4"
          >
            <p className="text-lg italic mb-4 text-gray-700">"{testimonial.comment}"</p>
            <div className="flex justify-center mb-2">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400 h-5 w-5" />
              ))}
            </div>
            <p className="font-semibold text-gray-800">— {testimonial.author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;
