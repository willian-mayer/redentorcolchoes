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
      <h1 className="text-3xl font-bold text-center mb-10">{title}</h1>

      {colchoes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {colchoes.map((colchao, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <img
                src={colchao.imageUrl}
                alt={colchao.name}
                className="w-full h-60 object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition">
                  {colchao.name}
                </h2>
                {/* Ejemplo de precio si tienes ese dato */}
                {/* <p className="mt-2 text-gray-700 font-medium">R$ {colchao.price}</p> */}
                <button
                  type="button"
                  className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition"
                  onClick={() => alert(`Mais informações sobre: ${colchao.name}`)}
                >
                  Ver mais
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-16 text-lg">
          Nenhum colchão encontrado para esta categoria.
        </p>
      )}
    </div>
  );
};

export default ColchoesList;
