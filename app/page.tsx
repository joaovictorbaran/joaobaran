import type { Metadata } from "next";
import { Menu } from "@/components/menu";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Textos } from "@/components/textos";
import { Aparicoes } from "@/components/aparicoes";
import { Channels } from "@/components/channels";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { getPersonJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={getPersonJsonLd()} />
      <Menu />
      <main id="main-content">
        <Hero />
        <Experience />
        <Textos />
        <Aparicoes />
        <Channels />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
