import Hero from "@/components/hero/Hero";
import Marquee from "@/components/home/Marquee";
import About from "@/components/home/About";
import ProjectsSection from "@/components/home/ProjectsSection";
import TechSection from "@/components/home/TechSection";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Impact from "@/components/home/Impact";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <ProjectsSection />
      <TechSection />
      <Services />
      <Process />
      <Impact />
      <Contact />
    </>
  );
}
