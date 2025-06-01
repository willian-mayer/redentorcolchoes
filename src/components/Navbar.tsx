import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { AppRoute } from '../types/routes';

interface NavbarProps {
  title?: string;
}

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    {children}
  </button>
);

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routes, setRoutes] = useState<AppRoute[]>([]);
  const [logoLoaded, setLogoLoaded] = useState(true);

  useEffect(() => {
    fetch('/data/routes.json')
      .then((res) => res.json())
      .then((data) => setRoutes(data));
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo o Título */}
        <div className="flex items-center space-x-2 z-10">
          {logoLoaded ? (
            <img
              src="/logo.png"
              onError={() => setLogoLoaded(false)}
              alt="logo"
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-xl font-bold">{title}</span>
          )}
        </div>

        {/* Links centrados en pantallas grandes */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Botón a la derecha en pantallas grandes */}
        <div className="hidden lg:flex items-center space-x-2 z-10">
          <Button>Contactar</Button>
        </div>

        {/* Botón hamburguesa en móvil */}
        <div className="lg:hidden z-10">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="lg:hidden flex flex-col px-4 space-y-2 mt-2"
        >
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {route.label}
            </Link>
          ))}
          <Button>Contactar</Button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
