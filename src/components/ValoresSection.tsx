import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const valores = [
  "Produzidos com materiais sustentáveis",
  "Tecnologia avançada para um sono profundo",
  "Conforto garantido todas as noites",
  "Design ergonômico para melhor postura",
  "Qualidade testada e aprovada por especialistas",
  "Compromisso com o bem-estar do seu descanso",
];

export default function ValoresSection() {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Por que escolher a Redentor Colchões?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
              <p className="text-left text-gray-800 text-lg font-medium">{valor}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
