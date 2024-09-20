import { SanityImageSource } from "@sanity/image-url/lib/types/types";

enum PropetyType {
  HOUSE = "Casa",
  APARTMENT = "Apartamento",
  CONDO = "Condominio",
  LAND = "Terreno",
  COMMERCIAL = "Plaza Comercial",
}

export type Property = {
  title: string;
  promotionalText: string;
  propertyType: string;
  isFeatured: boolean;
  rooms: number;
  price: number | string;
  bathrooms: number;
  restrooms: number;
  squareMeters: number;
  parkingSpots: number;
  floor: number | string;
  hasPool: boolean;
  hasBalcony: boolean;
  hasServiceRoom: boolean;
  hasLaundryroom: boolean;
  hasGarden: boolean;
  hasParking: boolean;
  mainImage: SanityImageSource;
  propertyImages: SanityImageSource[];
  isGasIncluded: boolean;
  isElectricityIncluded: boolean;
  isWaterIncluded: boolean;
  latitude: number;
  longitude: number;
  address: string;
  zipCode: number;
  _id: string;
};
