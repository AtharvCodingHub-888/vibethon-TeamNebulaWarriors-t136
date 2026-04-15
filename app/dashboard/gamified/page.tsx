"use client";

import { motion } from "framer-motion";
import { Gamepad2, Zap, Trophy, Target } from "lucide-react";
import dynamic from "next/dynamic";

const PythonDataTypesArcade = dynamic(
    () => import("@/components/PythonDataTypesArcade"),
    { ssr: false }
);
const PythonLoopsArcade = dynamic(
    () => import("@/components/PythonLoopsArcade"),
    { ssr: false }
);
const DotProductMatrix = dynamic(
    () => import("@/components/DotProductMatrix"),
    { ssr: false }
);

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const challenges = [
    {
        title: "Python Data Types",
        description:
            "Master Python's core data types through a fast-paced arcade challenge. Classify variables like a pro.",
        icon: Zap,
        color: "cyan",
        xp: 150,
        component: "datatypes",
    },
    {
        title: "Python Loops",
        description:
            "Debug loop outputs, predict iterations, and prove your control-flow mastery.",
        icon: Target,
        color: "purple",
        xp: 200,
        component: "loops",
    },
    {
        title: "Dot Product Matrix",
        description:
            "Visualize and compute matrix dot products. Master the fundamental linear algebra operation.",
        icon: Trophy,
        color: "pink",
        xp: 250,
        component: "dotproduct",
    },
];

const colorMap: Record<string, { border: string; glow: string; icon: string; badge: string }> = {
    cyan: {
        border: "border-cyan-500/30 hover:border-cyan-400/60",
        glow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]",
        icon: "text-cyan-400 bg-cyan-400/10",
        badge: "bg-cyan-900/50 text-cyan-300",
    },
    purple: {
        border: "border-purple-500/30 hover:border-purple-400/60",
        glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
        icon: "text-purple-400 bg-purple-400/10",
        badge: "bg-purple-900/50 text-purple-300",
    },
    pink: {
        border: "border-pink-500/30 hover:border-pink-400/60",
        glow: "hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]",
        icon: "text-pink-400 bg-pink-400/10",
        badge: "bg-pink-900/50 text-pink-300",
    },
};

export default function GamifiedPage() {
    return (
        <div className="p-8 pt-10 max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className="mb-10"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Gamepad2 className="w-5 h-5 text-purple-400" />
                    <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-bold">
                        Gamified Track
                    </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Algorithm{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Arcade
                    </span>
                </h1>
                <p className="text-white/40 text-sm max-w-lg">
                    Sharpen your ML skills through interactive challenges. Earn XP, beat
                    your scores, and level up.
                </p>
            </motion.div>

            {/* Challenge Cards */}
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
            >
                {challenges.map((challenge) => {
                    const colors = colorMap[challenge.color];
                    return (
                        <motion.div
                            key={challenge.title}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className={`p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border transition-all duration-300 cursor-pointer ${colors.border} ${colors.glow}`}
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}
                            >
                                <challenge.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {challenge.title}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed mb-4">
                                {challenge.description}
                            </p>
                            <span
                                className={`text-xs px-2.5 py-1 rounded-full font-bold ${colors.badge}`}
                            >
                                +{challenge.xp} XP
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Interactive Components */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <PythonDataTypesArcade />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <PythonLoopsArcade />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                >
                    <DotProductMatrix />
                </motion.div>
            </div>
        </div>
    );
}
