import { Menu } from "@/components/menu";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Textos } from "@/components/textos";
import { Channels } from "@/components/channels";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <Hero />
        <Experience />
        <Textos />
        <Channels />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
