"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MissionVisionObjectives() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const sections = [
    {
      title: "Misión",
      content:
        "En Meta Inmobiliaria, nuestra misión es revolucionar el sector inmobiliario mediante la tokenización de activos, brindando acceso democratizado a inversiones inmobiliarias y mejorando la eficiencia y transparencia en el mercado. Nos dedicamos a ofrecer soluciones innovadoras que simplifiquen la compra, venta y gestión de propiedades a través de tecnología blockchain, facilitando la inversión inmobiliaria para un público más amplio y diverso.",
      icon: (
        <svg
          className="w-16 h-16 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Visión",
      content:
        "Nuestra visión es liderar la transformación del mercado inmobiliario global mediante la tokenización de activos, estableciendo nuevos estándares de accesibilidad, liquidez y transparencia. Queremos ser reconocidos como el referente en la implementación de tecnologías blockchain en el sector inmobiliario, creando un ecosistema más inclusivo y eficiente que impulse el crecimiento y la innovación en la industria.",
      icon: (
        <svg
          className="w-16 h-16 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: "Objetivos",
      content: [
        {
          title: "Innovación Tecnológica",
          description:
            "Desarrollar y aplicar soluciones avanzadas de tokenización inmobiliaria que optimicen la compra, venta y gestión de activos, aprovechando las ventajas de la tecnología blockchain.",
        },
        {
          title: "Accesibilidad y Democratización",
          description:
            "Facilitar el acceso a inversiones inmobiliarias para una gama más amplia de inversores a través de la tokenización, reduciendo las barreras de entrada y promoviendo la inclusión financiera.",
        },
        {
          title: "Transparencia y Seguridad",
          description:
            "Garantizar la máxima transparencia y seguridad en todas las transacciones mediante el uso de tecnología blockchain, asegurando que cada operación sea rastreable y verificable.",
        },
        {
          title: "Educación y Capacitación",
          description:
            "Ofrecer programas de formación y recursos educativos para nuestros clientes y socios sobre la tokenización inmobiliaria y sus beneficios, promoviendo una mayor comprensión y confianza en esta tecnología emergente.",
        },
        {
          title: "Crecimiento Sostenible",
          description:
            "Expandir nuestro portafolio de propiedades tokenizadas y nuestras alianzas estratégicas de manera que se mantenga la integridad del mercado y se maximice el valor para nuestros clientes y socios.",
        },
        {
          title: "Impacto Positivo en el Mercado",
          description:
            "Contribuir al desarrollo y modernización del mercado inmobiliario global, impulsando prácticas innovadoras que mejoren la eficiencia, liquidez y equidad en el sector.",
        },
        {
          title: "Colaboraciones Estratégicas",
          description:
            "Establecer alianzas con plataformas blockchain, instituciones financieras y otros actores clave para potenciar la adopción de la tokenización inmobiliaria y fomentar un ecosistema robusto y colaborativo.",
        },
      ],
      icon: (
        <svg
          className="w-16 h-16 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          {...fadeInUp}
        >
          Meta Inmobiliaria: Transformando el Mercado Inmobiliario
        </motion.h1>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-col sm:flex-row items-center pb-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                  <div className="flex-shrink-0 mr-4">{section.icon}</div>
                  <CardTitle className="mt-4 sm:mt-0 text-3xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {typeof section.content === "string" ? (
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {section.content}
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {section.content.map((item, idx) => (
                        <li
                          key={idx}
                          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                        >
                          <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
