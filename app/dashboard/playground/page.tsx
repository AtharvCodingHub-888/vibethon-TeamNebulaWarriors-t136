"use client";

import { motion } from "framer-motion";
import { PlayCircle, Terminal, Eye } from "lucide-react";
import dynamic from "next/dynamic";

const MissingValueImputer = dynamic(
    () => import("@/components/MissingValueImputer"),
    { ssr: false }
);
const OutlierSweeper = dynamic(
    () => import("@/components/OutlierSweeper"),
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

export default function PlaygroundPage() {
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
                    <PlayCircle className="w-5 h-5 text-pink-400" />
                    <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-bold">
                        Visual Sandbox
                    </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Code{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                        Playground
                    </span>
                </h1>
                <p className="text-white/40 text-sm max-w-lg">
                    Experiment with data preprocessing tools. Clean, impute, and
                    transform datasets in real-time visual environments.
                </p>
            </motion.div>

            {/* Tool Cards */}
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-pink-500/20 hover:border-pink-400/40 transition-all"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-400/10 flex items-center justify-center">
                            <Terminal className="w-5 h-5 text-pink-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Missing Value Imputer</h3>
                            <p className="text-xs text-white/30">Handle NaN values with different strategies</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-orange-500/20 hover:border-orange-400/40 transition-all"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Outlier Sweeper</h3>
                            <p className="text-xs text-white/30">Detect and remove statistical outliers visually</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Interactive Components */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <MissingValueImputer />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <OutlierSweeper />
                </motion.div>
            </div>
        </div>
    );
}
