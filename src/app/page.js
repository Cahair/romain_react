"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Storytelling from "../components/Storytelling";
import ServicesBento from "../components/ServicesBento";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Romain Kantzer',
    url: 'https://romain-kantzer.com',
    jobTitle: 'Expert en Automatisation IA & Développement Web',
    description: 'Expert Senior en Next.js et solutions d\'IA pour l\'automatisation des entreprises.',
    sameAs: [
      'https://www.linkedin.com/in/romain-kantzer', // Remplacer par le vrai lien si différent
      'https://github.com/romainkantzer' // Remplacer par le vrai lien si différent
    ]
  };

  return (
    <main className="relative">
      <JsonLd data={structuredData} />
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
