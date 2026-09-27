import { Menu } from "@/components/menu";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";

export default function HomePage() {
  return (
    <>
      <Menu />
      <main id="main-content">
        <Hero />
        <Experience />
      </main>
    </>
  );
}
