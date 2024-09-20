import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meta Inmobiliaria",
  description: `
Meta Inmobiliaria es una plataforma inmobiliaria moderna diseñada para facilitar la compra, venta y alquiler de propiedades de manera simple y accesible. Nos especializamos en ofrecer una amplia cartera de propiedades de alta calidad, que incluye desde viviendas residenciales hasta espacios comerciales. Con un enfoque en la transparencia, la innovación y la satisfacción del cliente, empoderamos a nuestros usuarios para que tomen decisiones informadas con facilidad. Nuestro sitio web intuitivo permite navegar por los listados, obtener información detallada de las propiedades y utilizar funciones interactivas como la integración de mapas para ayudarte a encontrar el espacio ideal. Ya sea que busques invertir, vender o alquilar, Meta Inmobiliaria está aquí para acompañarte en cada paso del camino`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Head>
        {/* Standard Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Meta Inmobiliaria" />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metainmobiliaria.com" />
        <meta property="og:image" content="assets/meta-big-logo-dark.png" />
        <meta
          property="og:image:alt"
          content="assets/meta-big-logo-light.png"
        />
        <meta property="og:locale" content="es_ES" />
        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meta Inmobiliaria" />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="assets/meta-big-logo-dark.png" />
        <meta
          name="twitter:image:alt"
          content="assets/meta-big-logo-dark.png"
        />

        {/* Favicon and Icons */}
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
