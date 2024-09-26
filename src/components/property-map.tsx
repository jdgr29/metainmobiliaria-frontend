"use client";
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BedDouble, Bath, Square } from "lucide-react";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { Property } from "@/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export function PropertyMapComponent({
  properties,
}: {
  properties: Property[] | null;
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const builder = imageUrlBuilder(sanityClient);

  function urlTransformer(source: SanityImageSource): ImageUrlBuilder {
    return builder.image(source);
  }

  useEffect(() => {
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/jdaniel96/cm0zjgcjt00g301nq6bxx1ffk",
        center: [-71.2552393, 19.0446996], // Central coordinates
        zoom: 7,
        maxZoom: 15,
        minZoom: 7,
      });

      map.current.on("load", () => {
        if (properties) {
          properties.forEach((property) => {
            const el = document.createElement("img");
            el.style.width = "4em";
            el.style.height = "4em";
            el.style.objectFit = "cover";
            el.style.borderRadius = "50%";
            (el.src = window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "/assets/meta-logo-light.png"
              : "/assets/meta-logo-dark.png"),
              el.addEventListener("mouseenter", () =>
                setSelectedProperty(property)
              );

            el.addEventListener("click", () => setSelectedProperty(property));

            new mapboxgl.Marker(el)
              .setLngLat([
                Number(property.longitude),
                Number(property.latitude),
              ])
              .addTo(map.current!);
          });
        } else {
          console.log("No valid properties array");
        }
      });
    }
  }, [properties]);

  console.log("uh?", properties);

  return (
    <div className="rounded-xl h-[600px] w-full relative">
      <div ref={mapContainer} className="h-full w-full rounded-xl" />
      {selectedProperty && (
        <Card className="absolute bottom-4 left-4 w-72 bg-white shadow-lg">
          <CardHeader>
            <button
              style={{
                color: "red",
                fontSize: 16,
              }}
              onClick={() => setSelectedProperty(null)}
            >
              CERRAR
            </button>
            <CardTitle>{selectedProperty.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={urlTransformer(selectedProperty.mainImage).url()}
              alt={selectedProperty.title}
              className="w-full h-24 object-cover mb-2 rounded"
            />
            <p className="font-bold text-lg mb-2">
              ${selectedProperty.price.toLocaleString()}
            </p>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center">
                <BedDouble className="w-4 h-4 mr-1" /> {selectedProperty.rooms}
              </span>
              <span className="flex items-center">
                <Bath className="w-4 h-4 mr-1" /> {selectedProperty.bathrooms}
              </span>
              <span className="flex items-center">
                <Square className="w-4 h-4 mr-1" />{" "}
                {selectedProperty.squareMeters} sqft
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/property/${selectedProperty._id}`} passHref>
              <Button className="w-full bg-[#121212] text-white">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
