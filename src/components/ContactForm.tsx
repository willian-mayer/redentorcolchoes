import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import type { ContactItem } from '../types/contact-info';

const ContactForm: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactItem[]>([]);

  useEffect(() => {
    fetch('/data/contact-info.json')
      .then((res) => res.json())
      .then(setContactInfo);
  }, []);

  const renderIcon = (iconName: string) => {
    const LucideIcon = Icons[iconName as keyof typeof Icons] as React.FC<{ className?: string }>;
    return LucideIcon ? <LucideIcon className="w-5 h-5 text-blue-600" /> : null;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Lado esquerdo */}
      <div className="space-y-8">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.881180087207!2d-46.656574924670474!3d-23.570490278796714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c64f44f2f9%3A0x8a1efb23ef9c5f!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1710000000000"
          width="100%"
          height="250"
          allowFullScreen
          loading="lazy"
          className="rounded shadow-md"
        ></iframe>

        <ul className="space-y-4">
          {contactInfo.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              {renderIcon(item.icon)}
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Lado direito */}
      <form
        method="POST"
        action="https://formsubmit.co/fake@email.com"
        className="space-y-6 bg-white p-6 rounded shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            required
            placeholder="Nome"
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            required
            placeholder="Sobrenome"
            className="border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <input
          type="email"
          name="email"
          required
          placeholder="E-mail"
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <input
          type="tel"
          name="phone"
          required
          placeholder="(11) 91234-5678"
          pattern="\(\d{2}\)\s?\d{4,5}-\d{4}"
          title="Formato: (11) 91234-5678"
          className="w-full border border-gray-300 px-4 py-2 rounded"
        />

        <textarea
          name="message"
          required
          placeholder="O que você deseja cotar?"
          className="w-full border border-gray-300 px-4 py-2 rounded h-32 resize-none"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full"
        >
          Enviar mensagem
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
