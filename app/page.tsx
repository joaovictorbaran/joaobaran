import { Menu } from "@/components/menu";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Textos } from "@/components/textos";

export default function HomePage() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <Hero />
        <Experience />
        <Textos />
      </main>
    </>
  );
}
