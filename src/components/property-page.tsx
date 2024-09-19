"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Home,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  Square,
  Menu,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Number",
};

export function PropertyPageComponent() {
  const [activeImage, setActiveImage] = useState(0);

  const propertyImages = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link className="flex items-center justify-center" href="#">
            <Home className="h-6 w-6 mr-2" />
            <span className="font-bold">Meta Inmobiliaria</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Home
            </Link>
            {/* <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Properties
            </Link> */}
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Contact
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Home
                </Link>
                {/* <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Properties
                </Link> */}
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  About
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Luxury Beachfront Villa</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  // src={propertyImages[activeImage]}
                  src={
                    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={`Property image ${activeImage + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {propertyImages.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                      <div className="p-1">
                        <img
                          // src={image}
                          src={
                            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          }
                          alt={`Property thumbnail ${index + 1}`}
                          className={`rounded-md cursor-pointer ${
                            index === activeImage ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setActiveImage(index)}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Property Details
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">$5,000,000</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Malibu, California</span>
                    </div>
                    <div className="flex items-center">
                      <BedDouble className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>5 Bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>4 Bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>5,000 sq ft</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground">
                    This stunning beachfront villa offers breathtaking ocean
                    views and luxurious living spaces. With its modern
                    architecture, high-end finishes, and private beach access,
                    this property is the epitome of coastal elegance. Enjoy
                    sunset views from the expansive terrace, relax in the
                    infinity pool, or entertain guests in the spacious open-plan
                    living area.
                  </p>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Contact Agent</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>(123) 456-7890</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>agent@dreamhomerealty.com</span>
                    </div>
                    <Button className="w-full">Schedule a Viewing</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-center sm:text-left text-gray-500">
              © 2024 Meta Inmobiliaria. All rights reserved.
            </p>
            <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
