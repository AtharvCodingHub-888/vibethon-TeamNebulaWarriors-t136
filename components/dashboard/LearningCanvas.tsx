"use client";

import { useMemo, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { BrainCircuit, ChevronRight, Flame, Sigma, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { LearningModuleId } from "@/components/dashboard/LearningCanvasProgressContext";

type CanvasCard = {
    title: string;
    useCase: string;
    microText: string;
};

type CanvasModule = {
    id: LearningModuleId;
    title: string;
    icon: React.ReactNode;
    accent: string;
    introTitle: string;
    introText: string;
    cards: CanvasCard[];
    playgroundHref: string;
};

const moduleData: Record<LearningModuleId, CanvasModule> = {
    math: {
        id: "math",
        title: "Math Foundations",
        icon: <Sigma className="w-16 h-16 text-cyan-300" />,
        accent: "from-cyan-400 via-fuchsia-500 to-emerald-400",
        introTitle: "Vectors Power Intelligent Systems",
        introText:
            "Math is the control room behind every ML model. Linear algebra, calculus, and probability make predictions stable and explainable.",
        cards: [
            {
                title: "Linear Algebra for Vision",
                useCase: "Image recognition compresses pixels into vectors so a model can detect faces and objects quickly.",
                microText: "Matrices convert raw pixels into features.",
            },
            {
                title: "Probability for Risk",
                useCase: "Fraud detection assigns confidence scores to suspicious transactions before they are approved.",
                microText: "Uncertainty drives safe decisions.",
            },
            {
                title: "Calculus for Training",
                useCase: "Gradient descent tunes recommendation systems so users see more relevant products over time.",
                microText: "Derivatives show how to improve model loss.",
            },
        ],
        playgroundHref: "/learning/math",
    },
    "ai-core": {
        id: "ai-core",
        title: "AI Core Models",
        icon: <BrainCircuit className="w-16 h-16 text-fuchsia-300" />,
        accent: "from-fuchsia-400 via-cyan-400 to-emerald-400",
        introTitle: "From Rules to Reasoning",
        introText:
            "Core AI models convert patterns into actions. They classify, rank, and decide based on data instead of hand-written rules.",
        cards: [
            {
                title: "Regression for Forecasting",
                useCase: "Demand forecasting predicts store inventory needs before stock-outs happen.",
                microText: "Continuous output, real business impact.",
            },
            {
                title: "Classification for Safety",
                useCase: "Spam and abuse filters classify harmful content in milliseconds.",
                microText: "Fast binary decisions at scale.",
            },
            {
                title: "Tree Models for Explainability",
                useCase: "Banks use decision trees to explain why a loan is approved or rejected.",
                microText: "Human-readable decision paths.",
            },
        ],
        playgroundHref: "/learning/ai-core",
    },
    "ml-deep": {
        id: "ml-deep",
        title: "ML Deep Learning",
        icon: <Flame className="w-16 h-16 text-emerald-300" />,
        accent: "from-emerald-400 via-cyan-400 to-fuchsia-500",
        introTitle: "Neural Networks Learn Hierarchies",
        introText:
            "Deep learning stacks layers to extract complex signals from text, audio, and vision. It powers modern assistants and generative tools.",
        cards: [
            {
                title: "CNNs for Medical Imaging",
                useCase: "Hospitals use CNN models to highlight anomalies in X-rays for faster triage.",
                microText: "Spatial filters find subtle patterns.",
            },
            {
                title: "Transformers for Language",
                useCase: "Virtual assistants summarize meetings and answer questions from long documents.",
                microText: "Attention captures long context.",
            },
            {
                title: "Sequence Models for Forecasting",
                useCase: "Energy grids forecast demand spikes to avoid outages and optimize power usage.",
                microText: "Temporal patterns drive smarter planning.",
            },
        ],
        playgroundHref: "/learning/ml-deep",
    },
};

type LearningCanvasProps = {
    selectedModule: LearningModuleId | null;
    isCompleted: boolean;
    onClose: () => void;
    onComplete: (moduleId: LearningModuleId) => Promise<void>;
};

export default function LearningCanvas({
    selectedModule,
    isCompleted,
    onClose,
    onComplete,
}: LearningCanvasProps) {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const module = useMemo(
        () => (selectedModule ? moduleData[selectedModule] : null),
        [selectedModule]
    );

    const { scrollYProgress } = useScroll({ container: scrollRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.2 });

    const handleScroll = async () => {
        if (!module || !scrollRef.current || isCompleted) return;
        const node = scrollRef.current;
        const remaining = node.scrollHeight - (node.scrollTop + node.clientHeight);
        if (remaining <= 56) {
            await onComplete(module.id);
        }
    };

    return (
        <AnimatePresence>
            {module && (
                <motion.div
                    key={module.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[140] bg-[#02030d]/95 backdrop-blur-xl"
                >
                    <motion.div
                        className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${module.accent}`}
                        style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
                    />

                    <motion.button
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={onClose}
                        className="absolute top-5 right-5 z-20 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white/80 hover:text-white hover:border-white/40 transition-all"
                    >
                        <span className="flex items-center gap-2 text-sm font-semibold">
                            <X className="w-4 h-4" />
                            Close
                        </span>
                    </motion.button>

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 180 }}
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="h-screen overflow-y-auto px-4 md:px-10 py-10"
                    >
                        <div className="max-w-5xl mx-auto">
                            <section className="min-h-[72vh] grid place-items-center">
                                <div className="w-full rounded-3xl border border-cyan-400/30 bg-white/[0.02] p-8 md:p-12 shadow-[0_0_70px_rgba(6,182,212,0.15)]">
                                    <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-white/50 font-bold mb-6">
                                        <Sparkles className="w-4 h-4 text-cyan-300" />
                                        The Hook
                                    </div>
                                    <div className="mb-7">{module.icon}</div>
                                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4">
                                        {module.introTitle}
                                    </h2>
                                    <p className="text-white/70 text-base md:text-lg max-w-3xl leading-relaxed">
                                        {module.introText}
                                    </p>
                                </div>
                            </section>

                            <section className="py-8 md:py-14">
                                <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-white/50 font-bold mb-8">
                                    <ChevronRight className="w-4 h-4 text-fuchsia-300" />
                                    Interactive Scroll
                                </div>
                                <div className="space-y-6">
                                    {module.cards.map((card, index) => {
                                        const fromLeft = index % 2 === 0;
                                        return (
                                            <motion.article
                                                key={card.title}
                                                initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.5 }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="rounded-2xl border border-white/15 bg-black/30 p-6 md:p-7"
                                            >
                                                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                                                <p className="text-cyan-300/90 text-sm font-semibold mb-3">
                                                    {card.microText}
                                                </p>
                                                <p className="text-white/65 leading-relaxed text-sm md:text-base">
                                                    {card.useCase}
                                                </p>
                                            </motion.article>
                                        );
                                    })}
                                </div>
                            </section>

                            <section className="py-14 mb-20">
                                <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-8 md:p-10">
                                    <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-white/55 font-bold mb-5">
                                        <Sparkles className="w-4 h-4 text-emerald-300" />
                                        Prototype Bridge
                                    </div>
                                    <h3 className="text-2xl md:text-3xl text-white font-bold mb-3">
                                        {isCompleted
                                            ? "Module Completed. Launch your playground."
                                            : "Scroll to the end to complete this module."}
                                    </h3>
                                    <p className="text-white/60 mb-6">
                                        Completion is tracked automatically when you reach the bottom of this canvas.
                                    </p>
                                    <button
                                        onClick={() => router.push(module.playgroundHref)}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors"
                                    >
                                        Launch Playground
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
