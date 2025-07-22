import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Colchao } from '../types/colchao';

interface ColchoesData {
  [category: string]: Colchao[];
}

const ColchoesList: React.FC = () => {
  const { category } = useParams();
  const [colchoes, setColchoes] = useState<Colchao[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    fetch('/data/colchoes.json')
      .then((res) => res.json())
      .then((data: ColchoesData) => {
        if (category && data[category]) {
          setColchoes(data[category]);
          setTitle(category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
        } else {
          setColchoes([]);
          setTitle('Categoria não encontrada');
        }
      });
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>

      {colchoes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {colchoes.map((colchao, idx) => (
            <div key={idx} className="border rounded-lg border-gray-500 shadow hover:shadow-lg transition overflow-hidden">
              <img
                src={colchao.imageUrl}
                alt={colchao.name}
                className="w-full h-60  px-2"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{colchao.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">Nenhum colchão encontrado para esta categoria.</p>
      )}
    </div>
  );
};

export default ColchoesList;
