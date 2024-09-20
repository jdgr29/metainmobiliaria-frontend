"use client";

import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const center = {
  lat: 18.474470472142592,
  lng: -69.92967131949125,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const ContactItem = ({ icon, text, link }) => (
  <motion.div variants={itemVariants} className="flex items-center space-x-3">
    {icon}
    {link ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg hover:underline"
      >
        {text}
      </a>
    ) : (
      <span className="text-lg">{text}</span>
    )}
  </motion.div>
);

const Contact = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-gray-800 p-8 flex flex-col items-center"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
      >
        Contáctanos en Meta Inmobiliaria
      </motion.h1>

      {/* Información de Contacto */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-4xl mx-auto mb-12"
      >
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Nuestra Información de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactItem
              icon={<FaPhoneAlt className="text-blue-500" />}
              text="+1 (809) 674-7878"
            />
            <ContactItem
              icon={<FaEnvelope className="text-blue-500" />}
              text="info@metainmobiliaria.com"
            />
            <ContactItem
              icon={<FaWhatsapp className="text-green-500" />}
              text="WhatsApp: +1 (809) 674-7878"
              link="https://wa.me/18096747878"
            />
            <ContactItem
              icon={<FaMapMarkerAlt className="text-red-500" />}
              text="C. Max Henriquez Ureña, Santo Domingo, Plaza Vasquez No. 23, Suite 301"
            />
          </div>

          {/* Botón de WhatsApp */}
          <motion.div
            className="mt-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/18096747878"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-colors duration-300 hover:bg-green-600"
            >
              <FaWhatsapp />
              <span>Chatea con nosotros en WhatsApp</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Mapa */}
      <motion.div variants={itemVariants} className="w-full max-w-4xl mx-auto">
        <div className="h-80 rounded-lg overflow-hidden shadow-xl">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_TOKEN!}&q=${center.lat},${center.lng}`}
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
