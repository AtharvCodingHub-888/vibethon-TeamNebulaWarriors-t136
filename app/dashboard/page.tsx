"use client";

import { motion } from "framer-motion";
import { Atom, Code, Database, BrainCircuit, Sigma, Lock, Sparkles } from "lucide-react";
import CourseCard from "@/components/dashboard/CourseCard";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function DashboardPage() {
    return (
        <div className="p-8 pt-10 max-w-6xl mx-auto">
            {/* Dashboard Header */}
            <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className="mb-10"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-bold">
                        My Journey
                    </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Learning{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Dashboard
                    </span>
                </h1>
                <p className="text-white/40 text-sm max-w-lg">
                    Your structured path from mathematical foundations to production ML models.
                    Each phase builds on the last.
                </p>
            </motion.div>

            {/* Course Cards Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
                <CourseCard
                    title="Math Foundations"
                    color="blue"
                    progress={45}
                    subtopics={[
                        {
                            title: "Linear Algebra & Vectors",
                            icon: Sigma,
                            href: "/dashboard/playground",
                        },
                        {
                            title: "Statistics & Probability",
                            icon: Atom,
                            href: "/dashboard/playground",
                        },
                        {
                            title: "Calculus for ML",
                            icon: Code,
                            isLocked: true,
                        },
                    ]}
                />

                <CourseCard
                    title="Core ML Models"
                    color="green"
                    progress={20}
                    subtopics={[
                        {
                            title: "Linear Regression",
                            icon: Database,
                            href: "/dashboard/playground",
                        },
                        {
                            title: "Classification & Trees",
                            icon: BrainCircuit,
                            href: "/dashboard/playground",
                        },
                        {
                            title: "Ensemble Methods",
                            icon: Atom,
                            isLocked: true,
                        },
                    ]}
                />

                <CourseCard
                    title="Deep Learning"
                    color="purple"
                    progress={0}
                    subtopics={[
                        {
                            title: "Neural Network Basics",
                            icon: BrainCircuit,
                            isLocked: true,
                        },
                        {
                            title: "CNNs & Vision",
                            icon: Atom,
                            isLocked: true,
                        },
                        {
                            title: "Transformers & NLP",
                            icon: Sparkles,
                            isLocked: true,
                        },
                    ]}
                />
            </motion.div>

            {/* Quick Stats Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { label: "Courses Active", value: "3", color: "text-cyan-400" },
                    { label: "XP Earned", value: "1,250", color: "text-yellow-400" },
                    { label: "Phases Completed", value: "7", color: "text-green-400" },
                    { label: "Current Streak", value: "5 days", color: "text-purple-400" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <p className={`text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                        </p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mt-1">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
