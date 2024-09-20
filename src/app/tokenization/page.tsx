"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  Building,
  Coins,
  BarChart,
  Users,
  Lock,
  BookOpen,
} from "lucide-react";

export default function TokenizacionInmobiliaria() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      title: "¿Cómo Funciona la Tokenización Inmobiliaria?",
      icon: <Building className="w-6 h-6" />,
      content: [
        {
          subtitle: "Digitalización del Activo",
          description:
            "Un activo inmobiliario, como un edificio o una propiedad, se digitaliza mediante la creación de un token en una plataforma blockchain.",
        },
        {
          subtitle: "Emisión de Tokens",
          description:
            "La propiedad se divide en múltiples tokens digitales. Por ejemplo, un edificio puede ser tokenizado en 1,000 tokens, donde cada token representa una fracción del valor del edificio.",
        },
        {
          subtitle: "Registro en Blockchain",
          description:
            "Los tokens se registran en una cadena de bloques (blockchain), que actúa como un libro de registro inmutable y transparente para todas las transacciones relacionadas con los tokens.",
        },
        {
          subtitle: "Venta y Comercio de Tokens",
          description:
            "Los tokens pueden ser comprados, vendidos o negociados en plataformas de intercambio especializadas en activos tokenizados. Esto permite a los inversores adquirir fracciones de propiedades sin necesidad de comprar el activo completo.",
        },
        {
          subtitle: "Distribución de Ingresos",
          description:
            "Los ingresos generados por la propiedad, como alquileres o ventas, se distribuyen entre los poseedores de tokens en proporción a la cantidad de tokens que poseen.",
        },
      ],
    },
    {
      title: "Beneficios de la Tokenización Inmobiliaria",
      icon: <Coins className="w-6 h-6" />,
      content: [
        {
          subtitle: "Liquidez Mejorada",
          description:
            "La tokenización permite la compra y venta de fracciones de propiedades, lo que puede aumentar la liquidez en el mercado inmobiliario, que tradicionalmente es menos líquido.",
        },
        {
          subtitle: "Accesibilidad",
          description:
            "Permite a los inversores participar en el mercado inmobiliario con una inversión menor, ya que pueden adquirir solo una fracción del activo.",
        },
        {
          subtitle: "Transparencia",
          description:
            "La tecnología blockchain ofrece un registro transparente e inmutable de todas las transacciones, lo que aumenta la confianza y reduce el riesgo de fraude.",
        },
        {
          subtitle: "Eficiencia",
          description:
            "Los procesos de compra y venta se simplifican mediante contratos inteligentes (smart contracts) que automatizan y agilizan las transacciones.",
        },
        {
          subtitle: "Diversificación",
          description:
            "Los inversores pueden diversificar su portafolio inmobiliario al invertir en múltiples propiedades a través de tokens.",
        },
      ],
    },
    {
      title: "Aplicaciones y Casos de Uso",
      icon: <BarChart className="w-6 h-6" />,
      content: [
        {
          subtitle: "Inversión Fraccionada",
          description:
            "Permite a los inversores comprar partes de propiedades comerciales o residenciales que de otro modo serían inalcanzables para pequeños inversores.",
        },
        {
          subtitle: "Recaudación de Fondos",
          description:
            "Los desarrolladores inmobiliarios pueden recaudar fondos para nuevos proyectos mediante la emisión de tokens.",
        },
        {
          subtitle: "Gestión de Propiedades",
          description:
            "Facilita la gestión y distribución de ingresos derivados de la propiedad, como alquileres o dividendos.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-5 bg-gradient-to-br from-gray-100 to-gray-200p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white mt-5 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 mb-6"
          >
            ¿Qué es la tokenización inmobiliaria?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-gray-600 mb-8"
          >
            La tokenización inmobiliaria es un proceso mediante el cual se
            convierte un activo inmobiliario en un conjunto de tokens digitales
            que representan una fracción del valor total del activo. Estos
            tokens se emiten y gestionan en una plataforma basada en blockchain,
            lo que permite a los inversores comprar, vender y negociar
            fracciones del activo inmobiliario de manera más accesible y
            eficiente.
          </motion.p>

          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={false}
              animate={{
                backgroundColor:
                  activeSection === section.title ? "#f3f4f6" : "#ffffff",
              }}
              className="mb-4 rounded-lg overflow-hidden"
            >
              <motion.button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() =>
                  setActiveSection(
                    activeSection === section.title ? null : section.title
                  )
                }
              >
                <div className="flex items-center">
                  {section.icon}
                  <span className="ml-3 text-xl font-semibold">
                    {section.title}
                  </span>
                </div>
                <motion.div
                  animate={{
                    rotate: activeSection === section.title ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: activeSection === section.title ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="px-6 py-4 space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      className="text-gray-700"
                    >
                      <h3 className="font-semibold text-lg mb-2">
                        {item.subtitle}
                      </h3>
                      <p>{item.description}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gray-100 p-6 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">
              Accesible para todos los inversores
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Lock className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">Seguro y transparente</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="p-6 bg-blue-50"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
          </div>
          <p className="text-gray-700">
            La tokenización inmobiliaria representa una evolución en la forma en
            que las personas pueden invertir en bienes raíces, haciendo el
            mercado más accesible y eficiente.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
