import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";
import ServicesMarquee from "../components/home/ServicesMarquee";
import Manifesto from "../components/home/Manifesto";
import ServicesList from "../components/sections/ServicesList";
import FeaturedProject from "../components/sections/FeaturedProject";
import ProcessScroller from "../components/sections/ProcessScroller";
import ContactCta from "../components/sections/ContactCta";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ServicesMarquee />
                <ServicesList />
                <Manifesto />
                <FeaturedProject />
                <ProcessScroller tone="invert" />
                <ContactCta />
            </main>
            <Footer />
        </>
    );
}
