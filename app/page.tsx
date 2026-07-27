import { SlideShow } from "@/components/home/SlideShow";
import { HeroSection } from "@/components/home/HeroSection";
import { ValueProps } from "@/components/home/ValueProps";
import { BoxGrid } from "@/components/home/BoxGrid";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <SlideShow />
      <HeroSection />
      <BoxGrid />
      <ValueProps />
      <Process />
      <Testimonials />
    </>
  );
}
