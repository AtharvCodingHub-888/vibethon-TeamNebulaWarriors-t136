"use client";

import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit, ChevronLeft, Sparkles, Trophy } from "lucide-react";

type ModuleKey = "math" | "ai-core" | "ml-deep";

type ContentCard = {
    id: string;
    title: string;
    text: string;
    interaction?: "button" | "slider";
};

type ModuleContent = {
    key: ModuleKey;
    title: string;
    subtitle: string;
    cards: ContentCard[];
};

const modules: Record<ModuleKey, ModuleContent> = {
    math: {
        key: "math",
        title: "Math Foundations",
        subtitle: "Visual intuition for vectors, transformations, and optimization.",
        cards: [
            { id: "v1", title: "Vectors", text: "A vector has magnitude and direction. Models use vectors to encode words, images, and signals in numeric space." },
            { id: "v2", title: "Coordinate Space", text: "Axes define where data points live. Distances and angles help algorithms measure similarity." },
            { id: "v3", title: "Transformations", text: "Matrix transforms rotate, scale, and project vectors. This powers embedding compression and computer vision.", interaction: "slider" },
            { id: "v4", title: "Gradients", text: "Gradients show where loss increases fastest. Taking the opposite direction improves model performance." },
            { id: "v5", title: "Optimization", text: "Small gradient steps reduce error over time. Learning rate controls speed vs. stability." },
            { id: "v6", title: "Knowledge Check", text: "If a vector doubles in size, magnitude changes but direction can remain identical.", interaction: "button" },
        ],
    },
    "ai-core": {
        key: "ai-core",
        title: "ML Core Models",
        subtitle: "Follow how model decisions become explainable actions.",
        cards: [
            { id: "d1", title: "Decision Trees", text: "Trees split data by the most informative feature. Each split reduces uncertainty in predictions." },
            { id: "d2", title: "Root to Leaf Path", text: "Each branch is a conditional decision. The final leaf returns a class or value." },
            { id: "d3", title: "Split Strength", text: "Better splits produce cleaner groups and higher confidence outcomes.", interaction: "slider" },
            { id: "d4", title: "Model Explainability", text: "Teams trust trees because every decision path can be traced. This is crucial in finance and healthcare." },
            { id: "d5", title: "Overfitting Risk", text: "Very deep trees memorize data. Pruning improves generalization on unseen examples." },
            { id: "d6", title: "Knowledge Check", text: "Pruning removes weak branches and often improves test accuracy.", interaction: "button" },
        ],
    },
    "ml-deep": {
        key: "ml-deep",
        title: "Deep Learning",
        subtitle: "See signals flow through neural layers in real time.",
        cards: [
            { id: "n1", title: "Neural Layers", text: "Input, hidden, and output layers transform information step by step. Each layer learns richer representations." },
            { id: "n2", title: "Forward Propagation", text: "Values flow from input to output using weighted sums and activations. This creates predictions." },
            { id: "n3", title: "Weight Influence", text: "Higher weights amplify signal pathways. Lower weights dampen less relevant features.", interaction: "slider" },
            { id: "n4", title: "Nonlinearity", text: "Activation functions let networks model complex patterns. Without them, deep nets collapse to linear mappings." },
            { id: "n5", title: "Backpropagation", text: "Error gradients update weights to improve future predictions. This is the engine of learning." },
            { id: "n6", title: "Knowledge Check", text: "Forward propagation predicts first; backpropagation corrects after seeing error.", interaction: "button" },
        ],
    },
};

function VectorVisual({ intensity }: { intensity: number }) {
    return (
        <Canvas camera={{ position: [2.8, 2.2, 3.8], fov: 60 }}>
            <ambientLight intensity={0.8} />
            <pointLight position={[3, 3, 3]} intensity={1.2} />
            <mesh rotation={[0.2, intensity * 0.9, 0.2]}>
                <boxGeometry args={[0.08, 1.4 + intensity * 1.4, 0.08]} />
                <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.8 + intensity} />
            </mesh>
            <mesh position={[0, 1.2 + intensity * 0.6, 0]}>
                <coneGeometry args={[0.16, 0.35, 16]} />
                <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={1} />
            </mesh>
            <gridHelper args={[6, 10, "#1f2937", "#111827"]} />
        </Canvas>
    );
}

function TreeVisual({ activeIndex }: { activeIndex: number }) {
    const activePath = Math.min(2, Math.max(0, Math.floor(activeIndex / 2)));
    return (
        <div className="h-full grid place-items-center">
            <svg viewBox="0 0 520 340" className="w-full h-[85%]">
                <line x1="260" y1="50" x2="160" y2="145" stroke={activePath === 0 ? "#22d3ee" : "#334155"} strokeWidth="5" />
                <line x1="260" y1="50" x2="360" y2="145" stroke={activePath === 1 ? "#d946ef" : "#334155"} strokeWidth="5" />
                <line x1="160" y1="145" x2="110" y2="245" stroke={activePath === 0 ? "#22d3ee" : "#334155"} strokeWidth="4" />
                <line x1="160" y1="145" x2="210" y2="245" stroke={activePath === 0 ? "#22d3ee" : "#334155"} strokeWidth="4" />
                <line x1="360" y1="145" x2="310" y2="245" stroke={activePath === 1 ? "#d946ef" : "#334155"} strokeWidth="4" />
                <line x1="360" y1="145" x2="410" y2="245" stroke={activePath === 1 ? "#d946ef" : "#334155"} strokeWidth="4" />
                {[{ x: 260, y: 50 }, { x: 160, y: 145 }, { x: 360, y: 145 }, { x: 110, y: 245 }, { x: 210, y: 245 }, { x: 310, y: 245 }, { x: 410, y: 245 }].map((n, i) => (
                    <circle key={i} cx={n.x} cy={n.y} r="18" fill={i % 2 === activePath ? "#22d3ee" : "#1e293b"} />
                ))}
            </svg>
        </div>
    );
}

function NeuralVisual({ pulse }: { pulse: number }) {
    const glow = 0.45 + pulse * 0.9;
    return (
        <div className="h-full grid place-items-center">
            <svg viewBox="0 0 560 360" className="w-full h-[90%]">
                {[100, 180, 260].map((y, i) => [220, 300, 380].map((yy, j) => (
                    <line key={`l-${i}-${j}`} x1="140" y1={y} x2="280" y2={yy} stroke={`rgba(34,211,238,${glow})`} strokeWidth="3" />
                )))}
                {[220, 300, 380].map((y, i) => [160, 240, 320].map((yy, j) => (
                    <line key={`r-${i}-${j}`} x1="280" y1={y} x2="430" y2={yy} stroke={`rgba(217,70,239,${glow})`} strokeWidth="3" />
                )))}
                {[100, 180, 260].map((y, i) => <circle key={`in-${i}`} cx="120" cy={y} r="15" fill="#22d3ee" />)}
                {[220, 300, 380].map((y, i) => <circle key={`hid-${i}`} cx="280" cy={y} r="15" fill="#a855f7" />)}
                {[160, 240, 320].map((y, i) => <circle key={`out-${i}`} cx="440" cy={y} r="15" fill="#34d399" />)}
            </svg>
        </div>
    );
}

export default function LearningModulePage() {
    const params = useParams<{ module: string }>();
    const router = useRouter();
    const moduleParam = (params?.module || "math") as ModuleKey;
    const moduleContent = modules[moduleParam] ?? modules.math;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const [activeCard, setActiveCard] = useState(0);
    const [weight, setWeight] = useState(50);
    const [knowledgeOk, setKnowledgeOk] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [confettiOn, setConfettiOn] = useState(false);

    const visualIntensity = useMemo(() => Math.min(1, activeCard / Math.max(1, moduleContent.cards.length - 1)) + weight / 180, [activeCard, moduleContent.cards.length, weight]);

    useEffect(() => {
        let completed = false;
        const unsubscribe = scrollYProgress.on("change", async (v) => {
            if (completed || isCompleted) return;
            if (v >= 0.985) {
                completed = true;
                setIsCompleted(true);
                setConfettiOn(true);
                try {
                    await fetch("/api/journey/complete", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ module: moduleContent.key }),
                    });
                } catch {
                    // Keep completion purely client-side on API failure.
                }
                try {
                    const raw = window.localStorage.getItem("learning-canvas-progress-v1");
                    const parsed = raw ? JSON.parse(raw) : {};
                    window.localStorage.setItem("learning-canvas-progress-v1", JSON.stringify({ ...parsed, [moduleContent.key]: true }));
                } catch {
                    // Ignore local storage failures.
                }
                window.setTimeout(() => setConfettiOn(false), 1800);
            }
        });
        return () => unsubscribe();
    }, [isCompleted, moduleContent.key, scrollYProgress]);

    const visual = moduleContent.key === "math"
        ? <VectorVisual intensity={visualIntensity} />
        : moduleContent.key === "ai-core"
            ? <TreeVisual activeIndex={activeCard} />
            : <NeuralVisual pulse={visualIntensity} />;

    return (
        <div className="min-h-screen bg-[#030614] text-white">
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
                <motion.div className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400" style={{ width: progressWidth }} />
            </div>

            {confettiOn && (
                <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
                    {Array.from({ length: 28 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -40, x: `${(i / 28) * 100}%`, rotate: 0, opacity: 1 }}
                            animate={{ y: "110vh", rotate: 320, opacity: 0.9 }}
                            transition={{ duration: 1.3 + (i % 5) * 0.15, ease: "easeOut" }}
                            className="absolute top-0 text-xl"
                        >
                            {i % 2 === 0 ? "🎉" : "✨"}
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-20">
                <button onClick={() => router.push("/dashboard")} className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Journey Dashboard
                </button>

                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 font-bold">Learning Module</p>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2">{moduleContent.title}</h1>
                    <p className="text-white/60 mt-2 max-w-3xl">{moduleContent.subtitle}</p>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-5">
                        {moduleContent.cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 26 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.65, once: false }}
                                onViewportEnter={() => setActiveCard(index)}
                                className="rounded-2xl border border-white/15 bg-white/[0.03] p-5"
                            >
                                <h3 className="font-semibold text-lg text-cyan-200">{card.title}</h3>
                                <p className="text-white/70 text-sm mt-2 leading-relaxed">{card.text}</p>

                                {card.interaction === "slider" && (
                                    <div className="mt-4">
                                        <label className="text-xs text-white/50">Drag the Weight: {weight}</label>
                                        <input
                                            type="range"
                                            min={10}
                                            max={100}
                                            value={weight}
                                            onChange={(e) => setWeight(Number(e.target.value))}
                                            className="w-full mt-2"
                                        />
                                    </div>
                                )}

                                {card.interaction === "button" && (
                                    <button
                                        onClick={() => {
                                            setKnowledgeOk(true);
                                            setWeight((w) => Math.min(100, w + 8));
                                        }}
                                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-400 text-black px-4 py-2 text-sm font-semibold hover:bg-cyan-300 transition-colors"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Test your Knowledge
                                    </button>
                                )}
                            </motion.div>
                        ))}

                        {isCompleted && (
                            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4">
                                <p className="text-emerald-300 font-semibold inline-flex items-center gap-2">
                                    <Trophy className="w-4 h-4" />
                                    Module Completed
                                </p>
                                <p className="text-white/65 text-sm mt-1">Progress has been synced to your Journey state.</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-3 sticky top-20">
                        <div className="h-[72vh] rounded-3xl border border-cyan-400/30 bg-black/40 backdrop-blur-md p-4">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 font-bold">Live Visual</p>
                                <p className="text-xs text-white/50 inline-flex items-center gap-1">
                                    <BrainCircuit className="w-3.5 h-3.5" />
                                    Card {activeCard + 1}/{moduleContent.cards.length}
                                </p>
                            </div>
                            <div className="h-[calc(100%-28px)] rounded-2xl bg-[#030614] border border-white/10 overflow-hidden">
                                {visual}
                            </div>
                        </div>
                        {knowledgeOk && (
                            <p className="text-xs text-emerald-300 mt-2">Micro interaction completed. Visual intensity updated.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
