"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, ChevronRight, Check } from "lucide-react";

interface Module {
    id: string;
    title: string;
    icon: string;
    level: "beginner" | "intermediate" | "advanced";
    desc: string;
    color: string;
    prog: number;
    topics: string[];
    example: string;
    code: string;
    concept: string;
}

const modules: Module[] = [
    { id: "intro-ai", title: "What is AI?", icon: "🤖", level: "beginner", desc: "History, types, and applications of AI in everyday life.", color: "#7c6dfa", prog: 100, topics: ["Definition of AI", "Narrow vs General AI", "Real-world AI examples"], example: "Face recognition, voice assistants, recommendation engines", code: `# Simple AI decision rule\nweather = "sunny"\nif weather == "sunny":\n    print("Suggestion: Go outside!")\nelse:\n    print("Suggestion: Stay in and code!")`, concept: "Artificial Intelligence is the simulation of human intelligence by machines. It includes learning, reasoning, and self-correction." },
    { id: "ml-intro", title: "Intro to Machine Learning", icon: "⚙️", level: "beginner", desc: "How machines learn from data without explicit programming.", color: "#60a5fa", prog: 80, topics: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"], example: "Email spam filters, Netflix recommendations", code: `# Supervised Learning Example\nX_train = [1, 2, 3, 4, 5]  # Hours studied\ny_train = [50, 60, 70, 80, 90]  # Exam scores\n\ndef predict(hours):\n    slope = 10\n    intercept = 40\n    return slope * hours + intercept\n\nprint("Predicted score for 6 hrs:", predict(6))`, concept: "Machine Learning allows systems to learn and improve from experience. Instead of explicit rules, it finds patterns in data." },
    { id: "data-prep", title: "Data Preprocessing", icon: "🧹", level: "beginner", desc: "Cleaning, normalizing, and preparing data for ML models.", color: "#00e5b3", prog: 60, topics: ["Missing values", "Normalization", "Encoding categories"], example: "Preparing housing prices dataset for prediction", code: `# Data Cleaning Example\ndata = [23, None, 45, None, 67, 12, None, 89]\nvalid = [x for x in data if x is not None]\nmean_val = sum(valid) / len(valid)\ncleaned = [x if x is not None else mean_val for x in data]\nprint("Original:", data)\nprint("Cleaned: ", cleaned)`, concept: "Raw data is messy. Preprocessing involves handling missing values, removing outliers, and transforming features." },
    { id: "regression", title: "Linear Regression", icon: "📈", level: "beginner", desc: "Predict continuous values using mathematical relationships.", color: "#ffd166", prog: 40, topics: ["Line of best fit", "Cost function", "Gradient descent"], example: "House price prediction based on size", code: `# Linear Regression from scratch\ndef linear_regression(X, y, epochs=100, lr=0.01):\n    m, b = 0, 0\n    n = len(X)\n    for _ in range(epochs):\n        y_pred = [m * x + b for x in X]\n        dm = -2/n * sum((y[i]-y_pred[i])*X[i] for i in range(n))\n        db = -2/n * sum(y[i]-y_pred[i] for i in range(n))\n        m -= lr * dm\n        b -= lr * db\n    return m, b\n\nX = [1,2,3,4,5]\ny = [2,4,5,4,5]\nm, b = linear_regression(X, y)\nprint(f"y = {m:.2f}x + {b:.2f}")`, concept: "Linear regression finds the best straight line through data points to predict output values from input features." },
    { id: "classification", title: "Classification Algorithms", icon: "🏷️", level: "intermediate", desc: "Categorize data into classes using KNN, SVM, and more.", color: "#ff6b8a", prog: 30, topics: ["K-Nearest Neighbors", "Support Vector Machine", "Decision Boundaries"], example: "Classifying emails as spam or not spam", code: `# K-Nearest Neighbors\nimport math\ndef euclidean(a, b):\n    return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))\n\ndef knn_predict(train, labels, test_pt, k=3):\n    dists = [(euclidean(test_pt, tr), labels[i])\n             for i, tr in enumerate(train)]\n    dists.sort(key=lambda x: x[0])\n    k_labels = [d[1] for d in dists[:k]]\n    return max(set(k_labels), key=k_labels.count)\n\ntrain = [[1,1],[2,1],[3,3],[5,4]]\nlabels = ['A','A','B','B']\nprint("Predicted:", knn_predict(train, labels, [2,2]))`, concept: "Classification assigns input data to predefined categories. KNN finds the k nearest neighbors and votes for a class." },
    { id: "decision-trees", title: "Decision Trees", icon: "🌳", level: "intermediate", desc: "Tree-based models that make decisions using feature splits.", color: "#4ade80", prog: 20, topics: ["Node splitting", "Gini impurity", "Pruning"], example: "Medical diagnosis decision support", code: `# Decision Tree logic simulation\ndef classify_fruit(color, size, texture):\n    if color == "red":\n        if size == "small":\n            return "Cherry"\n        else:\n            return "Apple"\n    elif color == "yellow":\n        return "Banana"\n    else:\n        if texture == "smooth":\n            return "Grape"\n        else:\n            return "Kiwi"\n\nprint(classify_fruit("red", "large", "smooth"))\nprint(classify_fruit("yellow", "medium", "smooth"))`, concept: "Decision Trees split data based on feature values at each node, creating a tree structure to classify or regress." },
    { id: "neural-nets", title: "Neural Networks Basics", icon: "🧠", level: "intermediate", desc: "Layers of connected neurons that learn complex patterns.", color: "#f472b6", prog: 10, topics: ["Perceptron", "Activation functions", "Forward propagation"], example: "Handwritten digit recognition (MNIST)", code: `# Simple Neural Network - Forward Pass\nimport math\ndef sigmoid(x): return 1 / (1 + math.exp(-x))\n\ndef forward_pass(inputs, weights, bias):\n    z = sum(i * w for i, w in zip(inputs, weights)) + bias\n    return sigmoid(z)\n\ninputs  = [0.5, 0.8, 0.2]\nweights = [0.4, 0.3, 0.9]\nbias = 0.1\noutput = forward_pass(inputs, weights, bias)\nprint(f"Neuron output: {output:.4f}")`, concept: "Neural networks are inspired by the human brain. Neurons in layers transform input signals into predictions." },
    { id: "clustering", title: "Clustering & K-Means", icon: "🔵", level: "intermediate", desc: "Discover hidden patterns and group similar data points.", color: "#a78bfa", prog: 0, topics: ["K-Means algorithm", "Centroid update", "Elbow method"], example: "Customer segmentation for marketing", code: `# K-Means Clustering\nimport random, math\ndef kmeans(points, k=2, iters=10):\n    centroids = random.sample(points, k)\n    for _ in range(iters):\n        clusters = [[] for _ in range(k)]\n        for p in points:\n            dists = [math.sqrt((p[0]-c[0])**2+(p[1]-c[1])**2)\n                     for c in centroids]\n            clusters[dists.index(min(dists))].append(p)\n        centroids = [\n            [sum(p[0] for p in cl)/len(cl),\n             sum(p[1] for p in cl)/len(cl)]\n            if cl else centroids[i]\n            for i, cl in enumerate(clusters)\n        ]\n    return centroids`, concept: "Clustering groups similar data without labels. K-Means assigns points to k clusters by minimizing distances to centroids." },
    { id: "cnn", title: "Convolutional Neural Nets", icon: "🖼️", level: "advanced", desc: "Deep learning for image recognition and computer vision.", color: "#fb923c", prog: 0, topics: ["Convolution", "Pooling", "Feature maps"], example: "Object detection, face recognition", code: `# CNN Concept - Manual Convolution\ndef convolve2d(image, kernel):\n    k = len(kernel)\n    out_size = len(image) - k + 1\n    output = [[0]*out_size for _ in range(out_size)]\n    for i in range(out_size):\n        for j in range(out_size):\n            val = 0\n            for ki in range(k):\n                for kj in range(k):\n                    val += image[i+ki][j+kj] * kernel[ki][kj]\n            output[i][j] = val\n    return output\n\nimage = [[1,1,1,0,0],[1,1,1,0,0],[1,1,1,0,0],[0,0,0,0,0],[0,0,0,0,0]]\nkernel = [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]]\nresult = convolve2d(image, kernel)\nfor row in result: print([round(v) for v in row])`, concept: "CNNs use convolutional filters to automatically learn spatial hierarchies of features from images." },
    { id: "nlp", title: "NLP & Text Processing", icon: "💬", level: "advanced", desc: "Teaching machines to understand and generate human language.", color: "#22d3ee", prog: 0, topics: ["Tokenization", "TF-IDF", "Word embeddings"], example: "Chatbots, sentiment analysis, translation", code: `# TF-IDF from scratch\nimport math\ndef tf(term, doc):\n    words = doc.lower().split()\n    return words.count(term) / len(words)\n\ndef idf(term, docs):\n    n = sum(1 for d in docs if term in d.lower())\n    return math.log(len(docs) / (1 + n))\n\ndef tfidf(term, doc, docs):\n    return tf(term, doc) * idf(term, docs)\n\ndocs = ["machine learning is fun",\n        "deep learning needs data",\n        "machine learning uses math"]\nfor doc in docs:\n    score = tfidf("machine", doc, docs)\n    print(f"TF-IDF: {score:.4f} | {doc[:30]}")`, concept: "NLP enables computers to process text. TF-IDF measures how important a word is to a document relative to a corpus." },
    { id: "reinforcement", title: "Reinforcement Learning", icon: "🎯", level: "advanced", desc: "Agents learn through rewards and penalties in an environment.", color: "#e879f9", prog: 0, topics: ["Agent & Environment", "Reward function", "Q-Learning"], example: "Game-playing AI, robot navigation", code: `# Q-Learning simplified\nimport random\ngrid = [0, 0, 0, -1, 0, 0, 0, 0, 1]\nQ = [[0]*4 for _ in range(9)]\n\ndef step(state, action):\n    moves = [-1,1,-3,3]\n    ns = state + moves[action]\n    ns = max(0, min(8, ns))\n    r = grid[ns]\n    done = r != 0\n    return ns, r, done\n\nfor ep in range(100):\n    s = 0\n    for _ in range(20):\n        a = random.randint(0,3)\n        ns, r, done = step(s, a)\n        Q[s][a] += 0.1*(r + 0.9*max(Q[ns]) - Q[s][a])\n        s = ns\n        if done: break\n\nprint("Q-values:", ["%.2f"%v for v in Q[0]])`, concept: "Reinforcement Learning trains agents by rewarding good actions and penalizing bad ones through repeated trial and error." },
    { id: "model-eval", title: "Model Evaluation", icon: "📊", level: "advanced", desc: "Metrics and techniques to assess model performance.", color: "#34d399", prog: 0, topics: ["Accuracy, Precision, Recall", "Confusion Matrix", "Cross-validation"], example: "Evaluating a cancer detection model", code: `# Classification Metrics\ndef metrics(y_true, y_pred):\n    tp=fp=tn=fn=0\n    for t,p in zip(y_true, y_pred):\n        if t==1 and p==1: tp+=1\n        elif t==0 and p==1: fp+=1\n        elif t==0 and p==0: tn+=1\n        else: fn+=1\n    acc = (tp+tn)/len(y_true)\n    prec = tp/(tp+fp) if tp+fp else 0\n    rec = tp/(tp+fn) if tp+fn else 0\n    f1 = 2*prec*rec/(prec+rec) if prec+rec else 0\n    print(f"Accuracy: {acc:.2%}")\n    print(f"Precision: {prec:.2%}")\n    print(f"Recall: {rec:.2%}")\n    print(f"F1 Score: {f1:.2%}")\n\ny_true = [1,0,1,1,0,1,0,0,1,0]\ny_pred = [1,0,1,0,0,1,1,0,1,0]\nmetrics(y_true, y_pred)`, concept: "Evaluation metrics like accuracy, precision, and recall help us understand how well a model performs on unseen data." },
];

const levelColors = {
    beginner: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "🟢 Beginner" },
    intermediate: { bg: "bg-amber-500/15", text: "text-amber-400", label: "🟡 Intermediate" },
    advanced: { bg: "bg-red-500/15", text: "text-red-400", label: "🔴 Advanced" },
};

export default function LearnPage() {
    const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
    const [selected, setSelected] = useState<Module | null>(null);

    const filtered = filter === "all" ? modules : modules.filter((m) => m.level === filter);

    return (
        <div className="p-8 pt-10 max-w-6xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-bold">Structured Learning</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                    Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Modules</span>
                </h1>
                <p className="text-white/40 text-sm">12 modules from beginner to advanced. Click any module to explore concepts, code, and examples.</p>
            </motion.div>

            {/* Level Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {(["all", "beginner", "intermediate", "advanced"] as const).map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() => setFilter(lvl)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${filter === lvl ? "border-cyan-400/60 text-cyan-400 bg-cyan-400/10" : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"}`}
                    >
                        {lvl === "all" ? "All" : levelColors[lvl].label}
                    </button>
                ))}
                <span className="ml-auto text-xs text-white/30 font-mono self-center">{filtered.length} Modules</span>
            </div>

            {/* Module Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((m, i) => {
                    const lc = levelColors[m.level];
                    return (
                        <motion.div
                            key={m.id}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4, scale: 1.01 }}
                            onClick={() => setSelected(m)}
                            className="relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/25 hover:shadow-[0_0_30px_rgba(124,109,250,0.1)] transition-all group"
                        >
                            <div className="h-[2px] w-full" style={{ background: m.color }} />
                            <div className="p-5">
                                <div className="text-2xl mb-3">{m.icon}</div>
                                <h3 className="text-white font-semibold text-sm mb-1">{m.title}</h3>
                                <p className="text-white/35 text-xs leading-relaxed mb-3">{m.desc}</p>
                                <div className="flex gap-2 mb-3 flex-wrap">
                                    <span className={`${lc.bg} ${lc.text} text-[10px] px-2 py-0.5 rounded font-bold`}>{m.level.toUpperCase()}</span>
                                    {m.prog === 100 && <span className="bg-emerald-500/15 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold">✓ DONE</span>}
                                    {m.prog > 0 && m.prog < 100 && <span className="bg-cyan-500/15 text-cyan-400 text-[10px] px-2 py-0.5 rounded font-bold">IN PROGRESS</span>}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all" style={{ width: `${m.prog}%` }} />
                                    </div>
                                    <span className="text-[10px] text-white/30 font-mono">{m.prog}%</span>
                                </div>
                            </div>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
                                <ChevronRight className="w-5 h-5 text-white" />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
                        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-[#0d0d22] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6 border-b border-white/10 flex justify-between items-start sticky top-0 bg-[#0d0d22] z-10">
                                <div>
                                    <span className="text-2xl">{selected.icon}</span>
                                    <h2 className="text-xl font-bold text-white mt-1">{selected.title}</h2>
                                </div>
                                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                                    <X className="w-4 h-4 text-white/60" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-emerald-400 font-mono tracking-wider mb-2">🧩 CONCEPT</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">{selected.concept}</p>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-emerald-400 font-mono tracking-wider mb-2">📌 KEY TOPICS</h4>
                                    {selected.topics.map((t) => (
                                        <p key={t} className="text-white/50 text-sm mb-1">• {t}</p>
                                    ))}
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-emerald-400 font-mono tracking-wider mb-2">🌍 REAL-WORLD EXAMPLE</h4>
                                    <p className="text-white/50 text-sm">{selected.example}</p>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                                    <h4 className="text-xs font-bold text-emerald-400 font-mono tracking-wider mb-2">💻 CODE EXAMPLE</h4>
                                    <pre className="bg-[#080818] border border-white/10 rounded-lg p-4 text-xs text-emerald-300 font-mono leading-relaxed overflow-x-auto">{selected.code}</pre>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    <button className="px-5 py-2.5 bg-cyan-400 text-black font-bold text-sm rounded-xl hover:bg-cyan-300 transition-all flex items-center gap-2 cursor-pointer">
                                        <Check className="w-4 h-4" /> Mark Complete (+30 XP)
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
