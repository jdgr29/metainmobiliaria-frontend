"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PropertyMapComponent } from "./property-map";
import { sanityClient } from "@/lib/sanity";
import { defineQuery } from "next-sanity";
import { Property } from "@/types";
import imageUrlBuilder from "@sanity/image-url";
import RecentPosts from "./recent-post";
import FeaturePosts from "./feature-posts";
import { motion } from "framer-motion";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const options = { next: { revalidate: 60 } };
const PROPERTY_QUERY = defineQuery(
  `*[_type == "property"] | order(price asc) {
    _id,
    title,
    isFeatured,
    propertyType,
    promotionalText,
    rooms,
    price,
    bathrooms,
    restrooms,
    squareMeters,
    parkingSpots,
    floor,
    hasPool,
    hasBalcony,
    hasServiceRoom,
    hasLaundryroom,
    hasGarden,
    hasParking,
    mainImage,
    propertyImages,
    isGasIncluded,
    isElectricityIncluded,
    isWaterIncluded,
    latitude,
    longitude,
    address,
    zipCode
  }`
);

export default function ResponsiveLandingPage() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<
    Property[] | null
  >(null);

  const [hasPool, setHasPool] = useState(false);
  const [hasBalcony, setHasBalcony] = useState(false);
  const [hasServiceRoom, setHasServiceRoom] = useState(false);
  const [hasLaundryroom, setHasLaundryroom] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [hasParking, setHasParking] = useState(false);

  const propertyFetcher = async () => {
    const prop = await sanityClient.fetch(PROPERTY_QUERY, {}, options);

    if (prop) {
      setProperties(prop);
      filterProperties(prop);
    }
  };

  const filterProperties = (propertiesToFilter: Property[]) => {
    let filtered = propertiesToFilter;

    if (location) {
      filtered = filtered.filter((prop) =>
        prop.address.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (propertyType) {
      filtered = filtered.filter((prop) => prop.propertyType === propertyType);
    }

    if (bedrooms) {
      const minBedrooms = parseInt(bedrooms, 10);
      filtered = filtered.filter((prop) => prop.rooms >= minBedrooms);
    }

    if (bathrooms) {
      const minBathrooms = parseInt(bathrooms, 10);
      filtered = filtered.filter((prop) => prop.bathrooms >= minBathrooms);
    }

    filtered = filtered.filter(
      (prop) => prop.price >= priceRange[0] && prop.price <= priceRange[1]
    );

    if (hasPool) filtered = filtered.filter((prop) => prop.hasPool);
    if (hasBalcony) filtered = filtered.filter((prop) => prop.hasBalcony);
    if (hasServiceRoom)
      filtered = filtered.filter((prop) => prop.hasServiceRoom);
    if (hasLaundryroom)
      filtered = filtered.filter((prop) => prop.hasLaundryroom);
    if (hasGarden) filtered = filtered.filter((prop) => prop.hasGarden);
    if (hasParking) filtered = filtered.filter((prop) => prop.hasParking);

    setFilteredProperties(filtered);
  };

  const builder = imageUrlBuilder(sanityClient);
  function urlTransformer(source: SanityImageSource) {
    return builder.image(source);
  }

  useEffect(() => {
    propertyFetcher();
  }, []);

  useEffect(() => {
    if (properties) {
      filterProperties(properties);
    }
  }, [
    priceRange,
    location,
    propertyType,
    bedrooms,
    bathrooms,
    hasPool,
    hasBalcony,
    hasServiceRoom,
    hasLaundryroom,
    hasGarden,
    hasParking,
  ]);

  const handleClearFilters = () => {
    setLocation("");
    setPropertyType("");
    setBedrooms("");
    setBathrooms("");
    setPriceRange([0, 1000000]);
    setHasPool(false);
    setHasBalcony(false);
    setHasServiceRoom(false);
    setHasLaundryroom(false);
    setHasGarden(false);
    setHasParking(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full py-4 md:py-16 lg:py-2 xl:py-2 bg-cover bg-center"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <img
                src={"/assets/meta-big-logo-light.png"}
                style={{
                  height: "314px",
                  width: "314px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                alt="Logo"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex relative top-1 z-10 flex-col items-center space-y-2 text-center"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
                  Encuentra el Hogar de Tus Sueños
                </h1>
                <p className="mx-auto max-w-[700px] text-foreground md:text-xl">
                  Descubre la propiedad perfecta que se adapta a tu estilo de
                  vida y presupuesto.
                </p>
              </div>
              <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                <CardContent className={`p-6 ${"bg-[#f5f5f5]"}`}>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <motion.div
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                      >
                        <h1>Ubicación</h1>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Ingresa ciudad"
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                        />
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.2 }}
                      >
                        <label
                          htmlFor="property-type"
                          className="text-sm font-medium"
                        >
                          Tipo de Propiedad
                        </label>
                        <select
                          id="property-type"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="block w-full mt-1 p-2 border border-gray-300 rounded transition-all duration-300 focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Cualquiera</option>
                          <option value="house">Casa</option>
                          <option value="apartment">Apartamento</option>
                          <option value="condo">Condominio</option>
                        </select>
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.2 }}
                      >
                        <label
                          htmlFor="bedrooms"
                          className="text-sm font-medium"
                        >
                          Habitaciones
                        </label>
                        <select
                          id="bedrooms"
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                          className="block w-full mt-1 p-2 border border-gray-300 rounded transition-all duration-300 focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Habitaciones</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.2 }}
                      >
                        <label
                          htmlFor="bathrooms"
                          className="text-sm font-medium"
                        >
                          Baños
                        </label>
                        <select
                          id="bathrooms"
                          value={bathrooms}
                          onChange={(e) => setBathrooms(e.target.value)}
                          className="block w-full mt-1 p-2 border border-gray-300 rounded transition-all duration-300 focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Baños</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </motion.div>
                    </div>

                    <motion.div
                      className="space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                    >
                      <div className="flex justify-between">
                        <label htmlFor="price" className="text-sm font-medium">
                          Rango de Precio
                        </label>
                        <div className="flex space-x-4">
                          <span>${priceRange[0].toLocaleString()}</span>
                          <span>${priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                      <Slider
                        defaultValue={[0, 1000000]}
                        max={1000000}
                        step={10000}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value)}
                        className="transition-all duration-300 bg-black"
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.2 }}
                    >
                      <label htmlFor="features" className="text-sm font-medium">
                        Características
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            state: hasPool,
                            setter: setHasPool,
                            label: "Piscina",
                          },
                          {
                            state: hasBalcony,
                            setter: setHasBalcony,
                            label: "Balcón",
                          },
                          {
                            state: hasServiceRoom,
                            setter: setHasServiceRoom,
                            label: "Cuarto de Servicio",
                          },
                          {
                            state: hasLaundryroom,
                            setter: setHasLaundryroom,
                            label: "Lavandería",
                          },
                          {
                            state: hasGarden,
                            setter: setHasGarden,
                            label: "Jardín",
                          },
                          {
                            state: hasParking,
                            setter: setHasParking,
                            label: "Estacionamiento",
                          },
                        ].map(({ state, setter, label }, index) => (
                          <motion.div
                            key={label}
                            className="flex items-center space-x-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                              delay: 0.4 + index * 0.05,
                              duration: 0.2,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={state}
                              onChange={() => setter(!state)}
                              className="rounded border-gray-300 text-primary focus:ring-primary transition-all duration-300"
                            />
                            <label className="text-sm">{label}</label>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex justify-between mt-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.2 }}
                    >
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        className="transition-all duration-300 hover:bg-primary hover:text-white"
                      >
                        Limpiar Filtros
                      </Button>
                      <Button className="transition-all duration-300 hover:bg-primary-dark">
                        Aplicar Filtros
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <PropertyMapComponent properties={filteredProperties} />
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.3 }}
          className="w-full py-8 md:py-16 lg:py-24 bg-gray-100"
        >
          <div className="container mx-auto px-4 md:px-6">
            <FeaturePosts
              properties={filteredProperties}
              urlTransformer={urlTransformer}
            />
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="w-full py-8 md:py-16 lg:py-24"
        >
          <div className="container mx-auto px-4 md:px-6">
            <RecentPosts
              urlTransformer={urlTransformer}
              properties={filteredProperties}
            />
          </div>
        </motion.section>
      </main>
    </div>
  );
}
