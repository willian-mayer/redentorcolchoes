import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BannerCTAData } from '../types/banner';

const BannerCTA: React.FC = () => {
  const [data, setData] = useState<BannerCTAData | null>(null);

  useEffect(() => {
    fetch('/data/banner.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <section
      className="relative h-98 flex items-center justify-center text-white overflow-hidden"
      style={{ backgroundImage: `url('/images/cta/image.jpg')` }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">{data.title}</h2>
        <p className="text-lg md:text-xl mb-6 drop-shadow-sm">{data.description}</p>

        <Link
          to={data.buttonLink}
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition-all duration-300"
        >
          {data.buttonLabel}
        </Link>
      </div>
    </section>
  );
};

export default BannerCTA;
