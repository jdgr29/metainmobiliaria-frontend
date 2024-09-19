"use client";

import React from "react";
import { Property } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, DollarSign, Bath, Star } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function FeaturePosts({
  properties,
  urlTransformer,
}: {
  properties: Property[] | null;
  urlTransformer: Function;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay()]
  );

  const featureProperties =
    properties?.filter((property: Property) => property.isFeatured) || [];

  // const { theme } = useTheme();

  if (featureProperties.length === 0) {
    return <div>No featured properties available.</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
        Destacados
      </h2>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent ref={emblaRef}>
            {featureProperties.map((property, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className={`flex flex-col h-[30em] ${"bg-[#f5f5f5]"}`}>
                  <CardHeader className="p-0 h-64 relative">
                    <img
                      alt={property.title}
                      className="w-full h-full object-cover"
                      src={urlTransformer(property.mainImage)}
                    />
                    {property.isFeatured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-black font-semibold py-1 px-3 rounded-full flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow p-4 overflow-hidden">
                    <CardTitle className="text-xl font-semibold mb-3 line-clamp-2">
                      {property.title}
                    </CardTitle>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{property.address}</span>
                      </div>
                      <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                        <DollarSign className="mr-1 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {property.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BedDouble className="mr-1 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {property.rooms} Bedrooms
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="mr-1 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {property.bathrooms} Bathrooms
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link href={`/property/${property._id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
        <div className="py-2 text-center">
          {featureProperties.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-2 h-2 p-0 rounded-full mx-1"
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
