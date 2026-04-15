"use client";

import Link from "next/link";
import { GraduationCap, Menu, Map, Gamepad2, PlayCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const menuLinks = [
    { name: "My Journey", href: "/dashboard", icon: Map, color: "text-cyan-400" },
    { name: "Gamified Algorithm", href: "/dashboard/gamified", icon: Gamepad2, color: "text-purple-400" },
    { name: "Code Playground", href: "/dashboard/playground", icon: PlayCircle, color: "text-pink-400" },
    { name: "About Us", href: "/about", icon: Info, color: "text-yellow-400" },
];

export default function LandingNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* ── Top Navigation Bar ─────────────────────────── */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-black/10 backdrop-blur-md border-b border-white/10"
            >
                {/* Left: Menu Button + Logo */}
                <div className="flex items-center gap-4">
                    <div
                        onMouseEnter={() => setMenuOpen(true)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <Menu className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
                    </div>

                    <Link href="/" className="flex items-center gap-2.5 group">
                        <GraduationCap className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <span className="text-white font-bold text-lg tracking-wider group-hover:text-cyan-100 transition-colors">
                            Nebula AI
                        </span>
                    </Link>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        Curriculum
                    </Link>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        My Journey
                    </Link>
                    <Link href="/dashboard/gamified" className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        Gamified Algorithm
                    </Link>
                    <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        About
                    </Link>
                </div>

                {/* Right: Auth */}
                <div className="flex items-center gap-5">
                    <Link href="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                        Sign In
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-cyan-400 text-black px-5 py-2 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:bg-cyan-300 transition-all inline-block"
                    >
                        Get Started
                    </Link>
                </div>
            </motion.nav>

            {/* ── Hover Sidebar Menu ─────────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: -280, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -280, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}
                        className="fixed left-0 top-0 h-full w-72 z-[60] bg-[#060610]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col"
                    >
                        {/* Sidebar Header */}
                        <div className="p-6 pb-4 flex items-center gap-3 border-b border-white/5">
                            <GraduationCap className="w-8 h-8 text-cyan-400 shrink-0" />
                            <span className="text-xl font-bold tracking-tight text-white">
                                Nebula AI
                            </span>
                        </div>

                        {/* Sidebar Links */}
                        <nav className="flex flex-col gap-1 px-3 mt-6">
                            {menuLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-3 py-3 px-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200 group"
                                >
                                    <link.icon className={`w-5 h-5 shrink-0 ${link.color} group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all`} />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Bottom Card */}
                        <div className="mt-auto p-4">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                <p className="text-xs text-white/40 mb-2">Get Started</p>
                                <Link
                                    href="/dashboard"
                                    className="block w-full text-center bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold text-xs hover:bg-cyan-300 transition-all"
                                >
                                    Explore Curriculum 🚀
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
