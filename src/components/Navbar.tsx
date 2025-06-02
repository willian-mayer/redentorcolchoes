import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
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
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/routes.json')
      .then((res) => res.json())
      .then(setRoutes);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo o título */}
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
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 items-center">
          {routes.map((route) =>
            route.children ? (
              <div key={route.label} className="relative group">
                <button
                  onClick={() =>
                    setSubmenuOpen(submenuOpen === route.label ? null : route.label)
                  }
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  {route.label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {/* Submenu */}
                {submenuOpen === route.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded mt-2 py-2 w-48 z-20">
                    {route.children.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path!}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        onClick={() => setSubmenuOpen(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={route.path}
                to={route.path!}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {route.label}
              </Link>
            )
          )}
        </div>

        {/* Botón a la derecha */}
        <div className="hidden lg:flex items-center space-x-2 z-10">
          <Button>Contactar</Button>
        </div>

        {/* Botón hamburguesa */}
        <div className="lg:hidden z-10">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {isOpen && (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: 'auto' }}
    className="lg:hidden flex flex-col px-4 space-y-2 mt-2"
  >
    {routes.map((route) =>
      route.children ? (
        <div key={route.label}>
          <button
            onClick={() =>
              setSubmenuOpen(submenuOpen === route.label ? null : route.label)
            }
            className="flex justify-between items-center w-full text-left text-gray-700 font-semibold py-2"
          >
            {route.label}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                submenuOpen === route.label ? 'rotate-180' : ''
              }`}
            />
          </button>
          {submenuOpen === route.label && (
            <div className="pl-4 space-y-1">
              {route.children.map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path!}
                  className="block text-gray-600 hover:text-blue-600 transition"
                  onClick={() => {
                    setIsOpen(false);
                    setSubmenuOpen(null);
                  }}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          key={route.path}
          to={route.path!}
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={() => setIsOpen(false)}
        >
          {route.label}
        </Link>
      )
    )}
    <Button>Contactar</Button>
  </motion.div>
)}

    </nav>
  );
};

export default Navbar;
