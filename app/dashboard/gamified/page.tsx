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

type ArenaSection = "concept-games" | "quiz-arena" | "simulations" | "leaderboard";

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

const quizQuestions = [
    {
        question: "Which concept helps optimize model parameters during training?",
        options: ["One-hot encoding", "Gradient descent", "Tokenization", "Dropout"],
        answer: 1,
        explanation: "Gradient descent updates model weights to minimize loss.",
    },
    {
        question: "In real-world fraud detection, what is most important?",
        options: ["Only accuracy", "Low recall", "Fast latency + strong recall", "Large UI buttons"],
        answer: 2,
        explanation: "Fraud systems need strong recall while keeping inference fast.",
    },
    {
        question: "CNNs are strongest for which task?",
        options: ["Matrix inversion", "Image feature extraction", "Sorting arrays", "SQL joins"],
        answer: 1,
        explanation: "CNNs are designed to extract spatial visual features from images.",
    },
];

const quizByTopic = {
    "ml-basics": [
        {
            question: "What does ML stand for?",
            options: ["Machine Logic", "Machine Learning", "Model Learning", "Mechanical Logic"],
            answer: 1,
            explanation: "ML stands for Machine Learning.",
        },
        {
            question: "Which of these is a supervised learning task?",
            options: ["Clustering customers", "Finding anomalies", "Predicting house prices", "Discovering hidden patterns"],
            answer: 2,
            explanation: "Predicting house prices uses labeled data.",
        },
        {
            question: "Which algorithm learns without labeled data?",
            options: ["Linear Regression", "Decision Tree", "K-Means Clustering", "Logistic Regression"],
            answer: 2,
            explanation: "K-Means is unsupervised.",
        },
    ],
    "neural-nets": [
        {
            question: "What is the role of an activation function?",
            options: ["Store weights", "Introduce non-linearity", "Calculate loss", "Normalize inputs"],
            answer: 1,
            explanation: "Activation functions enable complex non-linear learning.",
        },
        {
            question: "Which activation outputs values between 0 and 1?",
            options: ["ReLU", "Tanh", "Sigmoid", "Softmax"],
            answer: 2,
            explanation: "Sigmoid maps values to (0,1).",
        },
        {
            question: "Backpropagation computes:",
            options: ["Forward predictions", "Gradients of loss", "New training data", "Activation thresholds"],
            answer: 1,
            explanation: "Backprop computes gradients for parameter updates.",
        },
    ],
    "data-science": [
        {
            question: "What does feature engineering mean?",
            options: ["Building useful model inputs", "Engineering hardware", "Removing all features", "Adding random noise"],
            answer: 0,
            explanation: "It transforms raw data into meaningful model features.",
        },
        {
            question: "Which measure is most robust to outliers?",
            options: ["Mean", "Standard Deviation", "Median", "Variance"],
            answer: 2,
            explanation: "Median is less affected by extreme values.",
        },
        {
            question: "Train-test split is mainly for:",
            options: ["Speed up training", "Evaluate unseen data", "Reduce dataset size", "Create more features"],
            answer: 1,
            explanation: "It provides an honest estimate of real performance.",
        },
    ],
} as const;

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
    const [activeArena, setActiveArena] = useState<ArenaSection>("concept-games");
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizCorrectCount, setQuizCorrectCount] = useState(0);
    const [quizTopic, setQuizTopic] = useState<keyof typeof quizByTopic>("ml-basics");
    const [quizStarted, setQuizStarted] = useState(false);
    const [spamText, setSpamText] = useState("");
    const [spamResult, setSpamResult] = useState<{ label: string; confidence: number; tone: "good" | "bad" } | null>(null);
    const [sentimentText, setSentimentText] = useState("");
    const [sentimentResult, setSentimentResult] = useState<{ label: string; confidence: number; tone: "good" | "bad" } | null>(null);
    const [iris, setIris] = useState({ sepalL: 5, sepalW: 3.5, petalL: 1.4, petalW: 0.2 });
    const [irisResult, setIrisResult] = useState<{ label: string; confidence: number } | null>(null);
    const [simulationDataSize, setSimulationDataSize] = useState(10000);
    const [simulationNoise, setSimulationNoise] = useState(12);
    const [xp, setXp] = useState(0);

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

    useEffect(() => {
        const tab = new URLSearchParams(window.location.search).get("tab");
        if (
            tab === "concept-games" ||
            tab === "quiz-arena" ||
            tab === "simulations" ||
            tab === "leaderboard"
        ) {
            setActiveArena(tab);
        }
    }, []);

    const activeQuizSet = quizStarted ? quizByTopic[quizTopic] : quizQuestions;
    const currentQuiz = activeQuizSet[quizIndex];

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
        if (quizIndex >= activeQuizSet.length - 1) return;
        setQuizIndex((prev) => prev + 1);
        setQuizAnswer(null);
        setQuizSubmitted(false);
    };

    const runSimulation = () => {
        setXp((prev) => prev + 60);
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setQuizIndex(0);
        setQuizAnswer(null);
        setQuizSubmitted(false);
        setQuizCorrectCount(0);
    };

    const detectSpam = () => {
        const words = spamText.toLowerCase().split(/\s+/).filter(Boolean);
        if (words.length === 0) return;
        const spamSignals = ["free", "win", "offer", "cash", "urgent", "lottery", "discount"];
        const hits = words.filter((word) => spamSignals.some((signal) => word.includes(signal))).length;
        const confidence = Math.min(96, Math.max(52, Math.round(50 + hits * 12)));
        const isSpam = hits >= 2;
        setSpamResult({
            label: isSpam ? "SPAM DETECTED" : "LEGITIMATE EMAIL",
            confidence,
            tone: isSpam ? "bad" : "good",
        });
        setXp((prev) => prev + 5);
    };

    const analyzeSentiment = () => {
        const words = sentimentText.toLowerCase().split(/\s+/).filter(Boolean);
        if (words.length === 0) return;
        const positive = ["great", "amazing", "excellent", "love", "best", "good"];
        const negative = ["terrible", "awful", "bad", "hate", "worst", "boring"];
        const pos = words.filter((word) => positive.some((token) => word.includes(token))).length;
        const neg = words.filter((word) => negative.some((token) => word.includes(token))).length;
        const isPositive = pos >= neg;
        const confidence = Math.min(95, Math.max(52, Math.round(55 + Math.abs(pos - neg) * 10)));
        setSentimentResult({
            label: isPositive ? "POSITIVE SENTIMENT" : "NEGATIVE SENTIMENT",
            confidence,
            tone: isPositive ? "good" : "bad",
        });
        setXp((prev) => prev + 5);
    };

    const classifyIris = () => {
        let label = "Iris Setosa";
        if (iris.petalL < 2.5) {
            label = "Iris Setosa";
        } else if (iris.petalL < 5 && iris.petalW < 1.8) {
            label = "Iris Versicolor";
        } else {
            label = "Iris Virginica";
        }
        setIrisResult({
            label,
            confidence: Math.min(96, Math.max(76, Math.round(84 + (iris.petalL > 4 ? 8 : 0)))),
        });
        setXp((prev) => prev + 5);
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

            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={() => setActiveArena("concept-games")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeArena === "concept-games"
                            ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/50"
                            : "bg-white/[0.03] text-white/70 border border-white/15 hover:text-white"
                    }`}
                >
                    Concept Games
                </button>
                <button
                    onClick={() => setActiveArena("quiz-arena")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeArena === "quiz-arena"
                            ? "bg-fuchsia-400/20 text-fuchsia-200 border border-fuchsia-400/50"
                            : "bg-white/[0.03] text-white/70 border border-white/15 hover:text-white"
                    }`}
                >
                    Quiz Arena
                </button>
                <button
                    onClick={() => setActiveArena("simulations")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeArena === "simulations"
                            ? "bg-emerald-400/20 text-emerald-200 border border-emerald-400/50"
                            : "bg-white/[0.03] text-white/70 border border-white/15 hover:text-white"
                    }`}
                >
                    Simulations
                </button>
                <button
                    onClick={() => setActiveArena("leaderboard")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeArena === "leaderboard"
                            ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/50"
                            : "bg-white/[0.03] text-white/70 border border-white/15 hover:text-white"
                    }`}
                >
                    Leaderboard
                </button>
            </div>

            {activeArena === "concept-games" && (
                <>
                    <h2 className="text-lg font-semibold text-white mb-4">Concept Games</h2>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        {renderSelectedGame()}
                    </motion.div>
                </>
            )}

            {activeArena === "quiz-arena" && (
                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-fuchsia-400/30 bg-white/[0.02] p-5 mt-2"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-fuchsia-300" />
                        <h3 className="font-bold text-white">Quiz Arena</h3>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                        <button onClick={() => setQuizTopic("ml-basics")} className={`rounded-md px-3 py-1 text-xs border ${quizTopic === "ml-basics" ? "border-fuchsia-300 text-fuchsia-200 bg-fuchsia-300/10" : "border-white/15 text-white/60"}`}>ML Basics</button>
                        <button onClick={() => setQuizTopic("neural-nets")} className={`rounded-md px-3 py-1 text-xs border ${quizTopic === "neural-nets" ? "border-fuchsia-300 text-fuchsia-200 bg-fuchsia-300/10" : "border-white/15 text-white/60"}`}>Neural Networks</button>
                        <button onClick={() => setQuizTopic("data-science")} className={`rounded-md px-3 py-1 text-xs border ${quizTopic === "data-science" ? "border-fuchsia-300 text-fuchsia-200 bg-fuchsia-300/10" : "border-white/15 text-white/60"}`}>Data Science</button>
                    </div>
                    {!quizStarted ? (
                        <div className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-500/5 p-8 text-center">
                            <div className="text-4xl mb-2">🧠</div>
                            <h4 className="text-white font-bold text-xl">Ready to test your knowledge?</h4>
                            <p className="text-white/50 text-sm mt-2">MCQs + code-based style questions · Instant feedback · Earn badges</p>
                            <button onClick={startQuiz} className="mt-5 rounded-lg bg-fuchsia-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-fuchsia-400 transition-colors">Start Quiz</button>
                        </div>
                    ) : (
                        <>
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
                                    disabled={quizIndex === activeQuizSet.length - 1}
                                    className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70 disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                            {quizSubmitted && <p className="mt-3 text-xs text-white/50">{currentQuiz.explanation}</p>}
                            <p className="mt-3 text-xs text-white/50">
                                Score: {quizCorrectCount}/{activeQuizSet.length}
                            </p>
                        </>
                    )}
                </motion.section>
            )}

            {activeArena === "simulations" && (
                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-emerald-400/30 bg-white/[0.02] p-5 mt-2"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-emerald-300" />
                        <h3 className="font-bold text-white">Real-World Simulations</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                            <h4 className="text-white font-semibold mb-2">Spam Detector</h4>
                            <textarea value={spamText} onChange={(e) => setSpamText(e.target.value)} className="w-full h-24 rounded-lg bg-black/20 border border-white/10 p-2 text-sm text-white" placeholder="Type your email message..." />
                            <button onClick={detectSpam} className="mt-3 w-full rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-black">Analyze Email</button>
                            {spamResult && <p className={`mt-2 text-xs font-semibold ${spamResult.tone === "good" ? "text-emerald-300" : "text-rose-300"}`}>{spamResult.label} · {spamResult.confidence}%</p>}
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                            <h4 className="text-white font-semibold mb-2">Sentiment Analyzer</h4>
                            <textarea value={sentimentText} onChange={(e) => setSentimentText(e.target.value)} className="w-full h-24 rounded-lg bg-black/20 border border-white/10 p-2 text-sm text-white" placeholder="Enter text to analyze..." />
                            <button onClick={analyzeSentiment} className="mt-3 w-full rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-black">Analyze Sentiment</button>
                            {sentimentResult && <p className={`mt-2 text-xs font-semibold ${sentimentResult.tone === "good" ? "text-emerald-300" : "text-rose-300"}`}>{sentimentResult.label} · {sentimentResult.confidence}%</p>}
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                            <h4 className="text-white font-semibold mb-2">Iris Classifier</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <input value={iris.sepalL} onChange={(e) => setIris((prev) => ({ ...prev, sepalL: Number(e.target.value) }))} className="rounded bg-black/20 border border-white/10 px-2 py-1 text-xs text-white" />
                                <input value={iris.sepalW} onChange={(e) => setIris((prev) => ({ ...prev, sepalW: Number(e.target.value) }))} className="rounded bg-black/20 border border-white/10 px-2 py-1 text-xs text-white" />
                                <input value={iris.petalL} onChange={(e) => setIris((prev) => ({ ...prev, petalL: Number(e.target.value) }))} className="rounded bg-black/20 border border-white/10 px-2 py-1 text-xs text-white" />
                                <input value={iris.petalW} onChange={(e) => setIris((prev) => ({ ...prev, petalW: Number(e.target.value) }))} className="rounded bg-black/20 border border-white/10 px-2 py-1 text-xs text-white" />
                            </div>
                            <button onClick={classifyIris} className="mt-3 w-full rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-black">Classify Flower</button>
                            {irisResult && <p className="mt-2 text-xs font-semibold text-emerald-300">{irisResult.label} · {irisResult.confidence}%</p>}
                        </div>
                    </div>
                    <div className="mt-4 rounded-lg bg-white/5 p-3">
                        <p className="text-xs text-white/50 mb-2">Performance Sandbox</p>
                        <label className="block text-xs text-white/50 mb-1">Data volume: {simulationDataSize}</label>
                        <input type="range" min={2000} max={50000} step={1000} value={simulationDataSize} onChange={(e) => setSimulationDataSize(Number(e.target.value))} className="w-full mb-2" />
                        <label className="block text-xs text-white/50 mb-1">Noise level: {simulationNoise}%</label>
                        <input type="range" min={0} max={40} value={simulationNoise} onChange={(e) => setSimulationNoise(Number(e.target.value))} className="w-full mb-2" />
                        <p className="text-xs text-cyan-300">Throughput {simScore.throughput}/s · Quality {simScore.quality}% · Latency {simScore.latencyMs}ms</p>
                        <button onClick={runSimulation} className="mt-2 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black">Run Benchmark (+60 XP)</button>
                    </div>
                </motion.section>
            )}

            {activeArena === "leaderboard" && (
                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-cyan-400/30 bg-white/[0.02] p-5 mt-2"
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
                    <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.01] p-3">
                        <p className="text-xs text-white/40">Your Position</p>
                        <p className="text-lg font-bold text-yellow-300 mt-1">#{Math.max(1, leaderboard.findIndex((row) => row.name === "You") + 1)}</p>
                        <p className="text-xs text-white/60">Keep playing quizzes, games, and simulations to climb faster.</p>
                    </div>
                    <p className="text-xs text-white/45 mt-3">
                        Complete games, quiz, and simulations to climb rank.
                    </p>
                </motion.section>
            )}
        </div>
    );
}
