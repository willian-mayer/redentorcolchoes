import React, { useEffect, useState } from 'react';
import type { AboutContent } from '../types/about';
const About: React.FC = () => {
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch('/data/about.json')
      .then((res) => res.json())
      .then(setContent);
  }, []);

  if (!content) return null;

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={content.image}
          alt="Sobre nós"
          className="w-full h-auto rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-gray-700 leading-relaxed">{content.description}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
