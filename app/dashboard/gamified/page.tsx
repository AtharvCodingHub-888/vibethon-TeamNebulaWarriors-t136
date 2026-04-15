"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Gamepad2, Sparkles, Target, Trophy, Users, XCircle, Zap } from "lucide-react";
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
    const [selectedGame, setSelectedGame] = useState<string>("datatypes");
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizCorrectCount, setQuizCorrectCount] = useState(0);
    const [simulationDataSize, setSimulationDataSize] = useState(10000);
    const [simulationNoise, setSimulationNoise] = useState(12);
    const [xp, setXp] = useState(0);

    const quizQuestions = [
        {
            question: "Which concept helps optimize model parameters during training?",
            options: ["One-hot encoding", "Gradient descent", "Tokenization", "Dropout"],
            answer: 1,
        },
        {
            question: "In real-world fraud detection, what is most important?",
            options: ["Only accuracy", "Low recall", "Fast latency + strong recall", "Large UI buttons"],
            answer: 2,
        },
        {
            question: "CNNs are strongest for which task?",
            options: ["Matrix inversion", "Image feature extraction", "Sorting arrays", "SQL joins"],
            answer: 1,
        },
    ];

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem("gamified-xp-v1");
            if (!raw) return;
            const parsed = Number(raw);
            if (!Number.isNaN(parsed)) setXp(parsed);
        } catch {
            // Ignore storage issues.
        }
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem("gamified-xp-v1", String(xp));
        } catch {
            // Ignore storage issues.
        }
    }, [xp]);

    const currentQuiz = quizQuestions[quizIndex];

    const simScore = useMemo(() => {
        const throughput = Math.round(simulationDataSize / (1 + simulationNoise / 20));
        const quality = Math.max(65, Math.round(100 - simulationNoise * 1.7));
        const latencyMs = Math.max(28, Math.round(220 - simulationDataSize / 90 + simulationNoise * 1.8));
        return { throughput, quality, latencyMs };
    }, [simulationDataSize, simulationNoise]);

    const leaderboard = useMemo(
        () =>
            [
                { name: "Nova", xp: 1420 },
                { name: "Orion", xp: 1310 },
                { name: "You", xp: 1000 + xp },
                { name: "Vega", xp: 980 },
                { name: "Astra", xp: 910 },
            ].sort((a, b) => b.xp - a.xp),
        [xp]
    );

    const submitQuizAnswer = () => {
        if (quizAnswer === null || quizSubmitted) return;
        setQuizSubmitted(true);
        if (quizAnswer === currentQuiz.answer) {
            setQuizCorrectCount((prev) => prev + 1);
            setXp((prev) => prev + 80);
        }
    };

    const nextQuiz = () => {
        if (quizIndex >= quizQuestions.length - 1) return;
        setQuizIndex((prev) => prev + 1);
        setQuizAnswer(null);
        setQuizSubmitted(false);
    };

    const runSimulation = () => {
        setXp((prev) => prev + 60);
    };

    const renderSelectedGame = () => {
        if (selectedGame === "datatypes") return <PythonDataTypesArcade />;
        if (selectedGame === "loops") return <PythonLoopsArcade />;
        return <DotProductMatrix />;
    };

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
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-bold text-cyan-200">{xp} XP Earned</span>
                </div>
            </motion.div>

            {/* Concept Games */}
            <h2 className="text-lg font-semibold text-white mb-4">Concept Games</h2>
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
                            onClick={() => setSelectedGame(challenge.component)}
                            className={`p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border transition-all duration-300 cursor-pointer ${colors.border} ${colors.glow} ${
                                selectedGame === challenge.component ? "ring-2 ring-cyan-400/50" : ""
                            }`}
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
                    {renderSelectedGame()}
                </motion.div>
            </div>

            {/* Quiz + Simulation + Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-fuchsia-400/30 bg-white/[0.02] p-5"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-fuchsia-300" />
                        <h3 className="font-bold text-white">Quick Quiz</h3>
                    </div>
                    <p className="text-white/80 text-sm mb-3">{currentQuiz.question}</p>
                    <div className="space-y-2">
                        {currentQuiz.options.map((opt, idx) => {
                            const isCorrect = idx === currentQuiz.answer;
                            const isSelected = quizAnswer === idx;
                            return (
                                <button
                                    key={opt}
                                    onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                                    className={`w-full text-left rounded-lg border px-3 py-2 text-sm transition-all ${
                                        isSelected
                                            ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200"
                                            : "border-white/15 text-white/70 hover:border-white/30"
                                    }`}
                                >
                                    <span className="flex items-center justify-between">
                                        {opt}
                                        {quizSubmitted && isSelected && (
                                            isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={submitQuizAnswer}
                            className="rounded-lg bg-fuchsia-500 px-3 py-2 text-sm font-bold text-black hover:bg-fuchsia-400 transition-colors"
                        >
                            Submit
                        </button>
                        <button
                            onClick={nextQuiz}
                            disabled={quizIndex === quizQuestions.length - 1}
                            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70 disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                    <p className="mt-3 text-xs text-white/50">
                        Score: {quizCorrectCount}/{quizQuestions.length}
                    </p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="rounded-2xl border border-emerald-400/30 bg-white/[0.02] p-5"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-emerald-300" />
                        <h3 className="font-bold text-white">Real-World Simulation</h3>
                    </div>
                    <label className="block text-xs text-white/50 mb-1">Data volume: {simulationDataSize}</label>
                    <input
                        type="range"
                        min={2000}
                        max={50000}
                        step={1000}
                        value={simulationDataSize}
                        onChange={(e) => setSimulationDataSize(Number(e.target.value))}
                        className="w-full mb-3"
                    />
                    <label className="block text-xs text-white/50 mb-1">Noise level: {simulationNoise}%</label>
                    <input
                        type="range"
                        min={0}
                        max={40}
                        value={simulationNoise}
                        onChange={(e) => setSimulationNoise(Number(e.target.value))}
                        className="w-full mb-4"
                    />
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-white/40">Throughput</p>
                            <p className="text-cyan-300 font-bold">{simScore.throughput}/s</p>
                        </div>
                        <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-white/40">Quality</p>
                            <p className="text-emerald-300 font-bold">{simScore.quality}%</p>
                        </div>
                        <div className="rounded-lg bg-white/5 p-2">
                            <p className="text-white/40">Latency</p>
                            <p className="text-fuchsia-300 font-bold">{simScore.latencyMs}ms</p>
                        </div>
                    </div>
                    <button
                        onClick={runSimulation}
                        className="mt-4 w-full rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-black hover:bg-emerald-400 transition-colors"
                    >
                        Run Simulation (+60 XP)
                    </button>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl border border-cyan-400/30 bg-white/[0.02] p-5"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-cyan-300" />
                        <h3 className="font-bold text-white">Leaderboard</h3>
                    </div>
                    <div className="space-y-2">
                        {leaderboard.map((row, idx) => (
                            <div
                                key={row.name}
                                className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                                    row.name === "You"
                                        ? "border-cyan-400/40 bg-cyan-400/10"
                                        : "border-white/10 bg-white/[0.01]"
                                }`}
                            >
                                <span className="text-sm text-white/80">#{idx + 1} {row.name}</span>
                                <span className="text-sm font-bold text-yellow-300">{row.xp} XP</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-white/45 mt-3">
                        Complete games, quiz, and simulations to climb rank.
                    </p>
                </motion.section>
            </div>
        </div>
    );
}
