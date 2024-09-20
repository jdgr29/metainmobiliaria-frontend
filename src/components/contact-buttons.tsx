"use client";

import { useState } from "react";
import { FaWhatsapp, FaPhoneSquare } from "react-icons/fa";
export default function ContactButtons() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const phoneNumber = "+18096747878"; // Replace with your actual phone number
  const whatsappMessage = encodeURIComponent(
    "Saludos, me gustaría información!"
  );

  return (
    <div className="fixed z-50 left-4 bottom-4 flex flex-col space-y-2">
      <a
        href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
        onMouseEnter={() => setHoveredButton("whatsapp")}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
        {hoveredButton === "whatsapp" && (
          <span className="absolute left-full ml-2 bg-gray-800 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
            Chat on WhatsApp
          </span>
        )}
      </a>
      <a
        href={`tel:${phoneNumber}`}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
        onMouseEnter={() => setHoveredButton("phone")}
        onMouseLeave={() => setHoveredButton(null)}
        aria-label="Call us"
      >
        <FaPhoneSquare size={24} />
        {hoveredButton === "phone" && (
          <span className="absolute left-full ml-2 bg-gray-800 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
            Call us
          </span>
        )}
      </a>
    </div>
  );
}
