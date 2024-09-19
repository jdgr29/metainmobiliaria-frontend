"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

import useSWR from "swr";
import { Skeleton } from "./ui-skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Navbar() {
  const { data: rates, error } = useSWR(
    "https://api.exchangerate-api.com/v4/latest/DOP",
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
    }
  );

  const formatRate = (rate: number) => (rate ? rate.toFixed(4) : "-");

  const CurrencyDisplay = ({
    currency,
    flag,
    rate,
  }: {
    currency: string;
    flag: string;
    rate: number;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1 cursor-help">
            <span className="text-lg">{flag}</span>
            <span>{formatRate(rate)}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            1 DOP = {currency} {formatRate(rate)}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <Image
              src={"/assets/meta-logo-dark.png"}
              width={64}
              height={64}
              alt="Meta Inmobiliaria Logo"
            />
            <span className="font-bold text-foreground">Meta Inmobiliaria</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                href="/aboutus"
              >
                Sobre nosotros
              </Link>
              <Link
                className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                href="/contact"
              >
                Contáctanos
              </Link>
              <Link
                className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                href="/tokenization"
              >
                ¿Tokenización?
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-2 text-sm">
              {error ? (
                <span className="text-red-500">Error loading rates</span>
              ) : !rates ? (
                <>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </>
              ) : (
                <>
                  <CurrencyDisplay
                    currency="USD"
                    flag="🇺🇸"
                    rate={1 / rates.rates.USD}
                  />
                  <CurrencyDisplay
                    currency="EUR"
                    flag="🇪🇺"
                    rate={1 / rates.rates.EUR}
                  />
                </>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <Link
                    className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                    href="/aboutus"
                  >
                    Sobre nosotros
                  </Link>
                  <Link
                    className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                    href="/contact"
                  >
                    Contactanos
                  </Link>
                  <Link
                    className="text-sm font-medium text-foreground hover:text-primary-foreground transition-colors"
                    href="/tokenization"
                  >
                    ¿Tokenización?
                  </Link>
                </nav>
                <div className="mt-8 flex flex-col items-center space-y-4">
                  <Image
                    src={"/assets/meta-big-logo-dark.png"}
                    width={224}
                    height={224}
                    alt="Meta Inmobiliaria Large Logo"
                    className="object-contain"
                  />
                  {error ? (
                    <span className="text-red-500">Error loading rates</span>
                  ) : !rates ? (
                    <Skeleton className="h-6 w-32" />
                  ) : (
                    <div className="text-sm space-y-2">
                      <CurrencyDisplay
                        currency="USD"
                        flag="🇺🇸"
                        rate={1 / rates.rates.USD}
                      />
                      <CurrencyDisplay
                        currency="EUR"
                        flag="🇪🇺"
                        rate={1 / rates.rates.EUR}
                      />
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
