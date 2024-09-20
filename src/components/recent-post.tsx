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
import { MapPin, BedDouble, DollarSign, Bath } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import Link from "next/link";

export default function RecentPosts({
  properties,
  urlTransformer,
}: {
  properties: Property[] | null;
  urlTransformer: (source: SanityImageSource) => ImageUrlBuilder;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const recentProperties = properties?.slice(0, 10) || [];

  if (recentProperties.length === 0) {
    return <div>No recent properties available.</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
        Publicaciones Recientes
      </h2>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent ref={emblaRef}>
            {recentProperties.map((property, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <Card className={`flex flex-col h-[25em] ${"bg-[#f5f5f5]"}`}>
                  <CardHeader className="p-0 h-48">
                    <img
                      alt="Property Image"
                      className="w-full h-full object-cover"
                      src={urlTransformer(property.mainImage).url()}
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-4 overflow-hidden">
                    <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                      {property.title}
                    </CardTitle>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{property.address}</span>
                      </div>
                      <div className="flex items-center">
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
                  <Link href={`/property/${property._id}`} className="w-full">
                    <CardFooter className="p-4">
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
        <div className="py-2 text-center">
          {recentProperties.map((_, index) => (
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
