import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Colchao {
  name: string;
  imageUrl: string;
  description?: string;
  features?: string[];
  price?: string;
  dimensions?: string;
  materials?: string;
}

interface ColchoesData {
  [category: string]: Colchao[];
}

const ColchoesList: React.FC = () => {
  const { category } = useParams();
  const [colchoes, setColchoes] = useState<Colchao[]>([]);
  const [title, setTitle] = useState<string>('');

  // Modal state
  const [selectedColchao, setSelectedColchao] = useState<Colchao | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const openModal = (colchao: Colchao) => {
    setSelectedColchao(colchao);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedColchao(null);
    setModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>

      {colchoes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {colchoes.map((colchao, idx) => (
            <div
              key={idx}
              className="border rounded-lg border-gray-500 shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={colchao.imageUrl}
                alt={colchao.name}
                className="w-full h-48 object-contain bg-white"
                style={{ maxHeight: '180px' }}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-4">{colchao.name}</h2>
                <button
                  onClick={() => openModal(colchao)}
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">Nenhum colchão encontrado para esta categoria.</p>
      )}

      {/* Modal */}
      {modalOpen && selectedColchao && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              &times;
            </button>
            <img
              src={selectedColchao.imageUrl}
              alt={selectedColchao.name}
              className="w-full h-56 object-contain bg-white rounded"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedColchao.name}</h2>
            {selectedColchao.description && (
              <p className="mt-2 text-gray-700">{selectedColchao.description}</p>
            )}
            {selectedColchao.features && (
              <ul className="mt-3 list-disc list-inside text-gray-600">
                {selectedColchao.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            )}
            {selectedColchao.price && (
              <p className="mt-4 font-semibold text-lg">{selectedColchao.price}</p>
            )}
            {selectedColchao.dimensions && (
              <p className="mt-1 text-gray-500">{selectedColchao.dimensions}</p>
            )}
            {selectedColchao.materials && (
              <p className="mt-1 text-gray-500 italic">{selectedColchao.materials}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColchoesList;
