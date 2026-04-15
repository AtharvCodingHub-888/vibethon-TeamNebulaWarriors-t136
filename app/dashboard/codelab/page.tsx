"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Play,
    RotateCcw,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Copy,
    Sparkles,
    Code2,
    Zap,
} from "lucide-react";

/* ── Challenge data ──────────────────────────────────────────────── */
interface Challenge {
    id: string;
    title: string;
    difficulty: "easy" | "medium" | "hard";
    xp: number;
    description: string;
    starterCode: string;
    solution: string;
    expectedOutput: string;
    hints: string[];
    topic: string;
}

const challenges: Challenge[] = [
    {
        id: "list-comp",
        title: "List Comprehension",
        difficulty: "easy",
        xp: 50,
        topic: "Python Basics",
        description:
            "Create a list of squares of even numbers from 1 to 20 using list comprehension. Store the result in a variable called 'squares'.",
        starterCode: `# Create squares of even numbers from 1 to 20\n# Use list comprehension\nsquares = `,
        solution: `squares = [x**2 for x in range(1, 21) if x % 2 == 0]`,
        expectedOutput: "[4, 16, 36, 64, 100, 144, 196, 256, 324, 400]",
        hints: [
            "Use range(1, 21) to generate numbers 1-20",
            "Filter with 'if x % 2 == 0'",
            "Square with x**2",
        ],
    },
    {
        id: "dict-ops",
        title: "Dictionary Operations",
        difficulty: "easy",
        xp: 50,
        topic: "Python Basics",
        description:
            "Given a dictionary of student scores, find the student with the highest score. Store the name in 'top_student' and the score in 'top_score'.",
        starterCode: `scores = {"Alice": 92, "Bob": 87, "Charlie": 95, "Diana": 88}\n\n# Find the student with the highest score\ntop_student = \ntop_score = `,
        solution: `scores = {"Alice": 92, "Bob": 87, "Charlie": 95, "Diana": 88}\ntop_student = max(scores, key=scores.get)\ntop_score = scores[top_student]`,
        expectedOutput: "Charlie, 95",
        hints: [
            "Use the max() function with a key parameter",
            "scores.get can be used as the key function",
            "Access the value using scores[top_student]",
        ],
    },
    {
        id: "numpy-basics",
        title: "NumPy Array Magic",
        difficulty: "medium",
        xp: 100,
        topic: "Data Science",
        description:
            "Create a 3x3 identity matrix using NumPy, then multiply it by 5. Store the result in 'scaled_identity'.",
        starterCode: `import numpy as np\n\n# Create a 3x3 identity matrix scaled by 5\nscaled_identity = `,
        solution: `import numpy as np\nscaled_identity = np.eye(3) * 5`,
        expectedOutput: "[[5. 0. 0.]\n [0. 5. 0.]\n [0. 0. 5.]]",
        hints: [
            "Use np.eye(3) to create the identity matrix",
            "Multiply the result by 5",
            "NumPy supports element-wise multiplication with scalars",
        ],
    },
    {
        id: "gradient-desc",
        title: "Gradient Descent Step",
        difficulty: "medium",
        xp: 120,
        topic: "Machine Learning",
        description:
            "Implement one step of gradient descent for a simple linear function f(x) = x². Start at x=10, use learning_rate=0.1. Store the new x in 'new_x'.",
        starterCode: `# Gradient descent for f(x) = x²\n# Derivative: f'(x) = 2x\nx = 10\nlearning_rate = 0.1\n\n# Compute gradient and update x\ngradient = \nnew_x = `,
        solution: `x = 10\nlearning_rate = 0.1\ngradient = 2 * x\nnew_x = x - learning_rate * gradient`,
        expectedOutput: "8.0",
        hints: [
            "The derivative of x² is 2x",
            "new_x = x - learning_rate * gradient",
            "gradient = 2 * 10 = 20, so new_x = 10 - 0.1 * 20",
        ],
    },
    {
        id: "matrix-mult",
        title: "Matrix Multiplication",
        difficulty: "medium",
        xp: 100,
        topic: "Linear Algebra",
        description:
            "Implement matrix multiplication from scratch (no NumPy). Multiply A (2x3) by B (3x2). Store result in 'result'.",
        starterCode: `A = [[1, 2, 3],\n     [4, 5, 6]]\nB = [[7, 8],\n     [9, 10],\n     [11, 12]]\n\n# Multiply A x B without NumPy\nresult = `,
        solution: `A = [[1, 2, 3], [4, 5, 6]]\nB = [[7, 8], [9, 10], [11, 12]]\nresult = [[sum(A[i][k]*B[k][j] for k in range(len(B))) for j in range(len(B[0]))] for i in range(len(A))]`,
        expectedOutput: "[[58, 64], [139, 154]]",
        hints: [
            "Result will be 2x2 (rows of A × cols of B)",
            "result[i][j] = sum of A[i][k] * B[k][j]",
            "Use nested list comprehension or loops",
        ],
    },
    {
        id: "sigmoid",
        title: "Sigmoid Activation",
        difficulty: "hard",
        xp: 150,
        topic: "Neural Networks",
        description:
            "Implement the sigmoid function and its derivative. Compute sigmoid(2.0) and sigmoid_derivative(2.0). Store results in 'sig' and 'sig_deriv'.",
        starterCode: `import math\n\ndef sigmoid(x):\n    # Implement sigmoid: 1 / (1 + e^(-x))\n    pass\n\ndef sigmoid_derivative(x):\n    # Implement: sigmoid(x) * (1 - sigmoid(x))\n    pass\n\nsig = sigmoid(2.0)\nsig_deriv = sigmoid_derivative(2.0)`,
        solution: `import math\ndef sigmoid(x): return 1 / (1 + math.exp(-x))\ndef sigmoid_derivative(x): return sigmoid(x) * (1 - sigmoid(x))\nsig = sigmoid(2.0)\nsig_deriv = sigmoid_derivative(2.0)`,
        expectedOutput: "sig ≈ 0.8808, sig_deriv ≈ 0.1050",
        hints: [
            "sigmoid(x) = 1 / (1 + math.exp(-x))",
            "derivative = sigmoid(x) * (1 - sigmoid(x))",
            "math.exp(-x) computes e^(-x)",
        ],
    },
    {
        id: "knn-distance",
        title: "KNN Distance Calc",
        difficulty: "hard",
        xp: 180,
        topic: "Machine Learning",
        description:
            "Implement Euclidean distance calculation and find the 3 nearest neighbors from a dataset. Return the indices of 3 nearest points to query_point.",
        starterCode: `import math\n\ndataset = [[1,2], [3,4], [5,6], [7,8], [2,3], [6,1]]\nquery_point = [4, 5]\n\ndef euclidean_distance(a, b):\n    # Implement Euclidean distance\n    pass\n\n# Find indices of 3 nearest neighbors\nnearest_3 = `,
        solution: `import math\ndataset = [[1,2],[3,4],[5,6],[7,8],[2,3],[6,1]]\nquery_point = [4,5]\ndef euclidean_distance(a,b): return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))\ndists = [(i, euclidean_distance(p, query_point)) for i,p in enumerate(dataset)]\ndists.sort(key=lambda x: x[1])\nnearest_3 = [d[0] for d in dists[:3]]`,
        expectedOutput: "[1, 2, 4]  (indices of [3,4], [5,6], [2,3])",
        hints: [
            "Euclidean distance = sqrt(Σ(a_i - b_i)²)",
            "Compute distances from query to all points",
            "Sort by distance and take first 3 indices",
        ],
    },
    {
        id: "loss-func",
        title: "MSE Loss Function",
        difficulty: "hard",
        xp: 150,
        topic: "Machine Learning",
        description:
            "Implement Mean Squared Error (MSE) loss function from scratch. Compute MSE between predictions and actual values.",
        starterCode: `y_true = [3, -0.5, 2, 7]\ny_pred = [2.5, 0.0, 2, 8]\n\ndef mse_loss(y_true, y_pred):\n    # MSE = (1/n) * Σ(y_true - y_pred)²\n    pass\n\nmse = mse_loss(y_true, y_pred)`,
        solution: `y_true = [3, -0.5, 2, 7]\ny_pred = [2.5, 0.0, 2, 8]\ndef mse_loss(y_true, y_pred): return sum((t-p)**2 for t,p in zip(y_true,y_pred)) / len(y_true)\nmse = mse_loss(y_true, y_pred)`,
        expectedOutput: "0.375",
        hints: [
            "MSE = (1/n) * sum of (y_true_i - y_pred_i)²",
            "Use zip() to iterate over pairs",
            "Don't forget to divide by n (number of samples)",
        ],
    },
];

const difficultyConfig = {
    easy: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "Easy", dot: "bg-emerald-400" },
    medium: { bg: "bg-amber-500/15", text: "text-amber-400", label: "Medium", dot: "bg-amber-400" },
    hard: { bg: "bg-red-500/15", text: "text-red-400", label: "Hard", dot: "bg-red-400" },
};

/* ── Component ──────────────────────────────────────────────────── */
export default function CodeLabPage() {
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
    const [code, setCode] = useState(challenges[0].starterCode);
    const [output, setOutput] = useState("");
    const [showHint, setShowHint] = useState(-1);
    const [showSolution, setShowSolution] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [passed, setPassed] = useState<Record<string, boolean>>({});

    const selectChallenge = useCallback((c: Challenge) => {
        setSelectedChallenge(c);
        setCode(c.starterCode);
        setOutput("");
        setShowHint(-1);
        setShowSolution(false);
    }, []);

    const runCode = useCallback(() => {
        setIsRunning(true);
        setOutput("");
        // Simulate code execution
        setTimeout(() => {
            // Simple heuristic: check if the code contains key parts of the solution
            const sol = selectedChallenge.solution.toLowerCase();
            const userCode = code.toLowerCase().replace(/\s/g, "");
            const solCode = sol.replace(/\s/g, "");

            // Check for key patterns
            const hasKey = solCode
                .split("\n")
                .filter((l) => l.trim().length > 10)
                .some((line) => {
                    const cleaned = line.replace(/\s/g, "");
                    return userCode.includes(cleaned);
                });

            if (hasKey || userCode.length > solCode.length * 0.6) {
                setOutput(
                    `✅ Output:\n${selectedChallenge.expectedOutput}\n\n🎉 Challenge Passed! +${selectedChallenge.xp} XP`
                );
                setPassed((prev) => ({ ...prev, [selectedChallenge.id]: true }));
            } else {
                setOutput(
                    `⚠️ Your code doesn't seem complete yet.\n\nExpected output: ${selectedChallenge.expectedOutput}\n\n💡 Tip: Try using the hints or check the solution for guidance.`
                );
            }
            setIsRunning(false);
        }, 800 + Math.random() * 500);
    }, [code, selectedChallenge]);

    const resetCode = () => {
        setCode(selectedChallenge.starterCode);
        setOutput("");
        setShowHint(-1);
        setShowSolution(false);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
    };

    const totalXP = Object.keys(passed).reduce((sum, id) => {
        const ch = challenges.find((c) => c.id === id);
        return sum + (ch?.xp || 0);
    }, 0);

    return (
        <div className="p-8 pt-10 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-bold">
                        Interactive Lab
                    </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Code{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Lab
                    </span>
                </h1>
                <p className="text-white/40 text-sm max-w-lg">
                    Practice Python &amp; ML coding challenges. Write code, run it, and earn XP.
                </p>
                {/* XP Badge */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-bold text-yellow-400">{totalXP} XP</span>
                    </div>
                    <span className="text-xs text-white/30">
                        {Object.keys(passed).length}/{challenges.length} Solved
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* ── Challenge Selector (Left Panel) ── */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-3 space-y-2"
                >
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">
                        Challenges
                    </h3>
                    {challenges.map((c) => {
                        const diff = difficultyConfig[c.difficulty];
                        const isActive = selectedChallenge.id === c.id;
                        const isPassed = passed[c.id];
                        return (
                            <motion.button
                                key={c.id}
                                whileHover={{ x: 4 }}
                                onClick={() => selectChallenge(c)}
                                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer group ${
                                    isActive
                                        ? "border-emerald-400/40 bg-emerald-400/5"
                                        : "border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03]"
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    {isPassed ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    ) : (
                                        <div className={`w-2 h-2 rounded-full ${diff.dot} shrink-0`} />
                                    )}
                                    <span
                                        className={`text-sm font-medium truncate ${
                                            isActive ? "text-white" : "text-white/60 group-hover:text-white/80"
                                        }`}
                                    >
                                        {c.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 ml-5">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${diff.bg} ${diff.text} font-bold`}>
                                        {diff.label}
                                    </span>
                                    <span className="text-[10px] text-white/25 font-mono">+{c.xp} XP</span>
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* ── Code Editor (Center) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-6 flex flex-col"
                >
                    {/* Challenge Description */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 mb-4">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <span className="text-[10px] text-emerald-400/70 uppercase tracking-widest font-bold">
                                    {selectedChallenge.topic}
                                </span>
                                <h2 className="text-lg font-bold text-white mt-1">
                                    {selectedChallenge.title}
                                </h2>
                            </div>
                            <span
                                className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                                    difficultyConfig[selectedChallenge.difficulty].bg
                                } ${difficultyConfig[selectedChallenge.difficulty].text}`}
                            >
                                {difficultyConfig[selectedChallenge.difficulty].label} • +{selectedChallenge.xp} XP
                            </span>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed">
                            {selectedChallenge.description}
                        </p>
                    </div>

                    {/* Editor */}
                    <div className="bg-[#0a0a1a] border border-white/10 rounded-2xl overflow-hidden flex-1 flex flex-col">
                        {/* Editor Toolbar */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs text-white/40 font-mono">solution.py</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyCode}
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                                    title="Copy code"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={resetCode}
                                    className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                                    title="Reset code"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Code Textarea */}
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="flex-1 min-h-[280px] w-full bg-transparent text-emerald-300 font-mono text-sm p-5 resize-none focus:outline-none leading-relaxed placeholder:text-white/15"
                            placeholder="Write your Python code here..."
                        />

                        {/* Run Bar */}
                        <div className="border-t border-white/5 px-4 py-3 flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={runCode}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {isRunning ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <Sparkles className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    <Play className="w-4 h-4" />
                                )}
                                {isRunning ? "Running..." : "Run Code"}
                            </motion.button>
                            <button
                                onClick={() => setShowSolution(!showSolution)}
                                className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-white/5"
                            >
                                {showSolution ? "Hide Solution" : "Show Solution"}
                            </button>
                        </div>
                    </div>

                    {/* Solution (collapsible) */}
                    <AnimatePresence>
                        {showSolution && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-3 bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4">
                                    <h4 className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-widest">
                                        💡 Solution
                                    </h4>
                                    <pre className="text-xs text-purple-300/80 font-mono whitespace-pre-wrap leading-relaxed">
                                        {selectedChallenge.solution}
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── Output & Hints (Right Panel) ── */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-3 space-y-4"
                >
                    {/* Output */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-white/40" />
                            <span className="text-xs text-white/40 font-mono">Output</span>
                        </div>
                        <div className="p-4 min-h-[120px]">
                            {output ? (
                                <motion.pre
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`text-xs font-mono whitespace-pre-wrap leading-relaxed ${
                                        output.includes("✅") ? "text-emerald-400" : "text-amber-400"
                                    }`}
                                >
                                    {output}
                                </motion.pre>
                            ) : (
                                <p className="text-xs text-white/20 italic">
                                    Run your code to see output...
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Expected Output */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
                        <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">
                            Expected Output
                        </h4>
                        <pre className="text-xs text-white/40 font-mono whitespace-pre-wrap">
                            {selectedChallenge.expectedOutput}
                        </pre>
                    </div>

                    {/* Hints */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
                        <h4 className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-3">
                            💡 Hints
                        </h4>
                        <div className="space-y-2">
                            {selectedChallenge.hints.map((hint, i) => (
                                <div key={i}>
                                    <button
                                        onClick={() => setShowHint(showHint === i ? -1 : i)}
                                        className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer w-full text-left"
                                    >
                                        <ChevronRight
                                            className={`w-3 h-3 transition-transform ${
                                                showHint === i ? "rotate-90 text-yellow-400" : ""
                                            }`}
                                        />
                                        Hint {i + 1}
                                    </button>
                                    <AnimatePresence>
                                        {showHint === i && (
                                            <motion.p
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="text-xs text-yellow-400/60 ml-5 mt-1 leading-relaxed overflow-hidden"
                                            >
                                                {hint}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
