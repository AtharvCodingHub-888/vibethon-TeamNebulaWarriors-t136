"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030614] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(34,211,238,0.08),transparent)]" />
                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-md mx-4"
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-10">
                    <GraduationCap className="w-10 h-10 text-cyan-400" />
                    <span className="text-2xl font-bold tracking-tight text-white">
                        ELEARN ML
                    </span>
                </div>

                {/* Card */}
                <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10">
                    <h1 className="text-2xl font-bold text-white mb-1 text-center">
                        Welcome back
                    </h1>
                    <p className="text-sm text-white/40 mb-8 text-center">
                        Sign in to continue your learning journey
                    </p>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-xs text-white/50 font-bold uppercase tracking-wider mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@university.edu"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-xs text-white/50 font-bold uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                        />
                    </div>

                    {/* Sign In Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-cyan-400 text-black font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:bg-cyan-300 transition-all cursor-pointer text-sm"
                    >
                        Sign In
                    </motion.button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                            or
                        </span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* OAuth */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white/5 border border-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer text-sm"
                    >
                        Continue with Google
                    </motion.button>

                    {/* Footer Links */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-white/30">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/dashboard"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            >
                                Start Learning Free
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
