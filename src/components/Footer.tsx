import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AppRoute } from '../types/routes';
import { Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  companyName: string;
  companyLink?: string; // opcional por si quieres linkearlo
}

const Footer: React.FC<FooterProps> = ({ companyName, companyLink = "#" }) => {
  const [routes, setRoutes] = useState<AppRoute[]>([]);
  const [logoLoaded, setLogoLoaded] = useState(true);

  useEffect(() => {
    fetch('/data/routes.json')
      .then((res) => res.json())
      .then(setRoutes);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo ou Nome */}
        <div className="flex flex-col space-y-3">
          {logoLoaded ? (
            <img
              src="/logo.png"
              alt="Logo"
              onError={() => setLogoLoaded(false)}
              className="h-10 w-auto"
            />
          ) : (
            <a href={companyLink} className="text-xl font-bold hover:underline">
              {companyName}
            </a>
          )}
          <p className="text-sm text-gray-400">
            Comprometidos com seu conforto e bem-estar.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navegação</h3>
          <ul className="space-y-2">
            {routes.map((route) =>
              route.path ? (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="text-gray-300 hover:text-white hover:underline transition"
                  >
                    {route.label}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {currentYear}{' '}
        <a href={companyLink} className="hover:underline">
          {companyName}
        </a>. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
