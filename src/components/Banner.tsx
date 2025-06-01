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
      className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        <p className="text-lg md:text-xl mb-6">{data.description}</p>
        <Link
          to={data.buttonLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition"
        >
          {data.buttonLabel}
        </Link>
      </div>
    </section>
  );
};

export default BannerCTA;
