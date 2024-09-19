"use client";

import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const center = {
  lat: 18.474470472142592,
  lng: -69.92967131949125,
};

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-100 text-white p-8 flex flex-col items-center"
    >
      <h1 className="text-4xl text-[#121212]  font-bold mb-6 text-center">
        Contáctanos en Meta Inmobiliaria
      </h1>

      {/* Información de Contacto */}
      <div className="w-full max-w-4xl mx-auto mb-12">
        <div className=" bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Nuestra Información de Contacto
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-green-400" />
              <span className="text-lg">+1 (809) 674-7878</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-400" />
              <span className="text-lg">info@metainmobiliaria.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaWhatsapp className="text-green-500" />
              <a
                href="https://wa.me/18096747878"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg underline"
              >
                WhatsApp: +1 (809) 674-7878
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-lg">
                Dirección: C. Max Henriquez Ureña, Santo Domingo, Plaza Vasquez
                No. 23, Suite 301
              </span>
            </div>
            {/* Botón de WhatsApp */}
            <div className="mt-8 flex justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/18096747878"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <FaWhatsapp />
                <span>Chatea con nosotros en WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="h-80 rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_TOKEN!}&q=${center.lat},${center.lng}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
