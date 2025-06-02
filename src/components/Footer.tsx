import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AppRoute } from '../types/routes';
import { Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
  const [routes, setRoutes] = useState<AppRoute[]>([]);
  const [logoLoaded, setLogoLoaded] = useState(true);

  useEffect(() => {
    fetch('/data/routes.json')
      .then((res) => res.json())
      .then(setRoutes);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo */}
        <div className="flex flex-col items-start space-y-2">
          {logoLoaded ? (
            <img
              src="/logo.png"
              alt="Logo"
              onError={() => setLogoLoaded(false)}
              className="h-10 w-auto"
            />
          ) : (
            <span className="text-xl font-bold">{companyName}</span>
          )}
        </div>

        {/* Navegación */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Navegación</h3>
          {routes.map((route) =>
  route.path ? (
    <Link
      key={route.path}
      to={route.path}
      className="text-gray-300 hover:text-white transition"
    >
      {route.label}
    </Link>
  ) : null
)}

        </div>

        {/* Redes sociales */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
          <div className="flex space-x-4">
            {/* Agrega href reales luego */}
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-6 w-6 hover:text-blue-500 transition" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6 hover:text-pink-500 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10">
        © {currentYear} {companyName}. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
