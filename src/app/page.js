"use client";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Storytelling from "../components/Storytelling";
import WebDevCallout from "../components/WebDevCallout";
import Footer from "../components/Footer";
import StatsBar from "../components/StatsBar";
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
      <HeroSection />
      <StatsBar />
      <Storytelling />
      <WebDevCallout />
      <Footer />
    </main>
  );
}
