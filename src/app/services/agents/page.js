import AgentsShowcase from "@/components/AgentsShowcase";
import ImplementationImpact from "@/components/ImplementationImpact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AgentsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-900 selection:text-white">
            <Navbar />

            <main className="pt-20 md:pt-32 pb-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
                </div>

                <div className="relative z-10">
                    <AgentsShowcase />
                    <ImplementationImpact />
                </div>
            </main>

            <Footer />
        </div>
    );
}
