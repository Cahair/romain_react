"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Storytelling from "../components/Storytelling";
import ServicesBento from "../components/ServicesBento";
import Footer from "../components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <Storytelling />
      <div id="services">
        <ServicesBento />
      </div>
      <Footer />
    </main>
  );
}
