"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Trees,
  Wifi,
  Zap,
  Droplet,
  Flame,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  Waves,
  X,
} from "lucide-react";
import { sanityClient } from "@/lib/sanity";
import { defineQuery } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Property } from "@/types";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

const options = { next: { revalidate: 60 } };
const PROPERTY_QUERY = defineQuery(`
  *[_type == "property" && _id == $id][0] {
    _id,
    title,
    address,
    bathrooms,
    floor,
    hasBalcony,
    hasGarden,
    hasLaundryroom,
    hasParking,
    hasPool,
    hasServiceRoom,
    isElectricityIncluded,
    isFeatured,
    isGasIncluded,
    isWaterIncluded,
    latitude,
    longitude,
    mainImage,
    parkingSpots,
    price,
    promotionalText,
    propertyImages,
    propertyType,
    restrooms,
    rooms,
    squareMeters,
    zipCode
  }
`);

const FeatureIcon: React.FC<{
  feature: string;
  isPresent: boolean;
  title: string;
}> = ({ feature, isPresent, title }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    balcony: <MapPin size={24} />,
    garden: <Trees size={24} />,
    laundry: <Wifi size={24} />,
    parking: <Car size={24} />,
    pool: <Waves size={24} />,
    serviceRoom: <Bed size={24} />,
  };

  return (
    <div
      className={`flex items-center ${isPresent ? "text-green-500" : "text-gray-400"}`}
    >
      {iconMap[feature]}
      <span className="ml-2 capitalize">{title}</span>
    </div>
  );
};

export default function PropertyDetailView() {
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const fetchedProperty = await sanityClient.fetch(
          PROPERTY_QUERY,
          { id },
          options
        );
        setProperty(fetchedProperty);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const builder = imageUrlBuilder(sanityClient);
  function urlTransformer(source: SanityImageSource): ImageUrlBuilder {
    return builder.image(source);
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.propertyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.propertyImages.length - 1 : prevIndex - 1
    );
  };

  const handleCall = () => {
    window.location.href = "tel:+8096747878";
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola me puedes me interesa más información sobre ${property.title} - Precio: $${property.price.toLocaleString()}`
    );
    window.open(`https://wa.me/18096747878?text=${message}`, "_blank");
  };

  const expandImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageExpanded(true);
  };

  const isNotLand = property.propertyType !== "land";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative h-screen md:h-[80vh] overflow-hidden">
        <AnimatePresence initial={false}>
          {
            <motion.img
              key={currentImageIndex}
              src={
                property?.propertyImages
                  ? urlTransformer(
                      property?.propertyImages[currentImageIndex]
                    ).url()
                  : urlTransformer(property?.mainImage).url()
              }
              alt={`Property image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          }
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between">
          <button
            onClick={prevImage}
            className="text-white p-4 hover:bg-black hover:bg-opacity-30 transition duration-300"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={nextImage}
            className="text-white p-4 hover:bg-black hover:bg-opacity-30 transition duration-300"
          >
            <ChevronRight size={40} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            {property.title}
          </h1>
          <p className="text-xl md:text-2xl">{property.address}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold mb-4">
                Acerca de la propiedad
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                {property.promotionalText}
              </p>
              {isNotLand && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                    <Bed size={32} className="text-indigo-500 mr-4" />
                    <div>
                      <span className="block text-2xl font-bold">
                        {property.rooms}
                      </span>
                      <span className="text-gray-500">
                        Número de habitaciones
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                    <Bath size={32} className="text-indigo-500 mr-4" />
                    <div>
                      <span className="block text-2xl font-bold">
                        {property.bathrooms}
                      </span>
                      <span className="text-gray-500">Baños</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                    <Square size={32} className="text-indigo-500 mr-4" />
                    <div>
                      <span className="block text-2xl font-bold">
                        {Number(property.squareMeters).toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        m² (metros cuadrados)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                    <MapPin size={32} className="text-indigo-500 mr-4" />
                    <div>
                      <span className="block text-2xl font-bold">
                        {property.floor}
                      </span>
                      <span className="text-gray-500">Piso</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                    <Car size={32} className="text-indigo-500 mr-4" />
                    <div>
                      <span className="block text-2xl font-bold">
                        {property.parkingSpots}
                      </span>
                      <span className="text-gray-500">Número de parqueos</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {isNotLand && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Características</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <FeatureIcon
                    feature="balcony"
                    title="Balcón"
                    isPresent={property.hasBalcony}
                  />
                  <FeatureIcon
                    title="Jardín"
                    feature="garden"
                    isPresent={property.hasGarden}
                  />
                  <FeatureIcon
                    title="Cuarto de lavado"
                    feature="laundry"
                    isPresent={property.hasLaundryroom}
                  />
                  <FeatureIcon
                    title="Parqueo"
                    feature="parking"
                    isPresent={property.hasParking}
                  />
                  <FeatureIcon
                    title="Piscina"
                    feature="pool"
                    isPresent={property.hasPool}
                  />
                  <FeatureIcon
                    title="Cuarto de servicio"
                    feature="serviceRoom"
                    isPresent={property.hasServiceRoom}
                  />
                </div>
              </motion.div>
            )}

            {isNotLand && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-4">
                  Servicios Incluidos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <div
                    className={`flex items-center ${property.isElectricityIncluded ? "text-green-500" : "text-gray-400"}`}
                  >
                    <Zap size={24} className="mr-2" />
                    <span>Electricidad</span>
                  </div>
                  <div
                    className={`flex items-center ${property.isWaterIncluded ? "text-green-500" : "text-gray-400"}`}
                  >
                    <Droplet size={24} className="mr-2" />
                    <span>Agua</span>
                  </div>
                  <div
                    className={`flex items-center ${property.isGasIncluded ? "text-green-500" : "text-gray-400"}`}
                  >
                    <Flame size={24} className="mr-2" />
                    <span>Gas</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg sticky top-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-2">
                ${property.price.toLocaleString()}
              </h2>
              <p className="text-xl mb-6">
                ¿Listo/a para hacer tuya esta propiedad?
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleCall}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                >
                  <Phone className="mr-2" size={20} />
                  Llamar Agente
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center"
                >
                  <MessageSquare className="mr-2" size={20} />
                  WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Location</h3>
          <div className="aspect-w-16 aspect-h-12 rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_TOKEN!}&q=${property.latitude},${property.longitude}`}
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Property Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.propertyImages?.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={urlTransformer(image).url()}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => expandImage(index)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {isImageExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <img
              src={urlTransformer(
                property.propertyImages[currentImageIndex]
              ).url()}
              alt={`Expanded property image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsImageExpanded(false)}
            >
              <X size={32} />
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={nextImage}
            >
              <ChevronRight size={48} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
