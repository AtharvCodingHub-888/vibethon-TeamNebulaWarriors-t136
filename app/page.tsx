"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";

const LandingNav = dynamic(() => import("@/components/LandingNav"), { ssr: false });
const SplashScreen = dynamic(() => import("@/components/SplashScreen"), {
    ssr: false,
});

export default function HomePage() {
    return (
        <div className="min-h-screen relative overflow-x-hidden bg-[#030614]">
            {/* Splash intro video */}
            <SplashScreen />

            {/* Ambient background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="absolute top-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            {/* Top Navigation with hover menu */}
            <LandingNav />

            {/* Main Content */}
            <main className="relative z-10 pt-24 flex flex-col items-center">
                <HeroSection />
                <FeatureCards />
            </main>

            {/* Footer */}
            <footer className="relative z-10 max-w-5xl mx-auto px-8 pb-12 pt-8 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
                    <p className="text-xs">
                        © 2026 ELEARN ML — Premium Educational Experience
                    </p>
                    <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
                        <a href="#" className="hover:text-cyan-400 transition-colors">
                            Documentation
                        </a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">
                            Support
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
