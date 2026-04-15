"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    GraduationCap,
    Code2,
    Gamepad2,
    BrainCircuit,
    Globe,
    BarChart3,
} from "lucide-react";

interface FeatureCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    tag: string;
    color: "cyan" | "pink" | "purple" | "amber" | "blue" | "violet";
    href?: string;
}

const cards: FeatureCard[] = [
    {
        icon: <GraduationCap className="w-8 h-8 text-cyan-400" />,
        title: "Structured Learning",
        description:
            "Beginner → Intermediate → Advanced modules with concept explanations, examples, and visual aids.",
        tag: "📚 12 Modules",
        color: "cyan",
        href: "/dashboard",
    },
    {
        icon: <Code2 className="w-8 h-8 text-emerald-400" />,
        title: "Coding Playground",
        description:
            "Write Python, run algorithms, and experiment with sample ML scripts — all in-browser.",
        tag: "💻 Sandbox",
        color: "pink",
        href: "/dashboard/playground",
    },
    {
        icon: <Gamepad2 className="w-8 h-8 text-rose-400" />,
        title: "Concept Games",
        description:
            "Decision trees, classification, and neural network games that make learning visual and fun.",
        tag: "🎮 3 Games",
        color: "pink",
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-amber-400" />,
        title: "Quiz & Assessment",
        description:
            "MCQs and code-based questions with instant feedback, scoring, and badges.",
        tag: "🧠 30+ Questions",
        color: "amber",
    },
    {
        icon: <Globe className="w-8 h-8 text-blue-400" />,
        title: "Real-World Simulations",
        description:
            "Spam detection, sentiment analysis, and image classification demos with live interaction.",
        tag: "🌐 3 Demos",
        color: "blue",
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-violet-400" />,
        title: "Progress Dashboard",
        description:
            "Track modules, scores, streaks, badges, and your overall learning journey.",
        tag: "📊 Analytics",
        color: "violet",
        href: "/dashboard",
    },
];

const colorMap = {
    cyan: {
        border: "border-cyan-400/30",
        hoverBorder: "hover:border-cyan-400",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
        tagBg: "bg-cyan-900/50",
        tagText: "text-cyan-300",
        accentBar: "bg-cyan-400",
    },
    pink: {
        border: "border-pink-500/30",
        hoverBorder: "hover:border-pink-500",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]",
        tagBg: "bg-pink-900/50",
        tagText: "text-pink-300",
        accentBar: "bg-pink-500",
    },
    purple: {
        border: "border-purple-500/30",
        hoverBorder: "hover:border-purple-500",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
        tagBg: "bg-purple-900/50",
        tagText: "text-purple-300",
        accentBar: "bg-purple-500",
    },
    amber: {
        border: "border-amber-400/30",
        hoverBorder: "hover:border-amber-400",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(251,191,36,0.25)]",
        tagBg: "bg-amber-900/50",
        tagText: "text-amber-300",
        accentBar: "bg-amber-400",
    },
    blue: {
        border: "border-blue-400/30",
        hoverBorder: "hover:border-blue-400",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(96,165,250,0.25)]",
        tagBg: "bg-blue-900/50",
        tagText: "text-blue-300",
        accentBar: "bg-blue-400",
    },
    violet: {
        border: "border-violet-400/30",
        hoverBorder: "hover:border-violet-400",
        hoverShadow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.25)]",
        tagBg: "bg-violet-900/50",
        tagText: "text-violet-300",
        accentBar: "bg-violet-400",
    },
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 1.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

export default function FeatureCards() {
    return (
        <section className="mt-20 px-8 max-w-6xl w-full pb-16">
            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-center gap-3 mb-8"
            >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                    Platform Features
                </h2>
            </motion.div>

            {/* Cards grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
                {cards.map((card) => {
                    const colors = colorMap[card.color];
                    const Wrapper = card.href ? Link : "div";
                    const wrapperProps = card.href ? { href: card.href } : {};
                    return (
                        <motion.div
                            key={card.title}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="cursor-pointer h-full"
                        >
                            <Wrapper
                                {...(wrapperProps as any)}
                                className="block h-full"
                            >
                                <div
                                    className={`relative w-full h-full flex flex-col bg-[#0a0a1a]/80 backdrop-blur-xl rounded-2xl overflow-hidden text-left transition-all duration-300 border ${colors.border} ${colors.hoverBorder} ${colors.hoverShadow}`}
                                >
                                    {/* Top accent bar */}
                                    <div
                                        className={`h-[2px] w-full ${colors.accentBar}`}
                                    />

                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Icon */}
                                        <div className="mb-4">{card.icon}</div>

                                        {/* Title */}
                                        <h3 className="text-white font-semibold text-base mb-2">
                                            {card.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                                            {card.description}
                                        </p>

                                        {/* Tag */}
                                        <div className="mt-auto">
                                            <span
                                                className={`${colors.tagBg} ${colors.tagText} text-xs px-3 py-1 rounded-md font-semibold inline-block tracking-wide`}
                                            >
                                                {card.tag}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Wrapper>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
