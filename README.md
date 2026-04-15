<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Three.js-0183-black?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
</p>

<h1 align="center">🧠 Nebula AI - Learn AIML Easy and Fun </h1>

<p align="center">
  <strong>A next-generation, interactive e-learning platform that teaches Machine Learning through gamified challenges, visual sandboxes, and hands-on coding — built for engineering students who want to <em>understand</em>, not just memorize.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-getting-started">Setup</a> •
  <a href="#-pages--modules">Pages</a> •
  <a href="#-team">Team</a>
</p>

---

## 🎯 Problem Statement

Traditional ML courses are theory-heavy, text-dense, and lack visual engagement. Students memorize formulas without building intuition. **ELEARN ML** bridges this gap by providing:

- 🎮 **Gamified learning** — Earn XP, compete on leaderboards, and master concepts through arcade-style challenges
- 🖥️ **Interactive Code Lab** — Write, run, and test Python/ML code directly in the browser
- 📚 **Structured Learning Modules** — 12 progressive modules from "What is AI?" to "Reinforcement Learning"
- 🧪 **Visual Playground** — Experiment with data preprocessing tools like Missing Value Imputer and Outlier Sweeper
- 🎨 **Premium Dark UI** — Glassmorphism, smooth animations, and a stunning cyberpunk-inspired design

---

## ✨ Features

### 🏠 Landing Page
- Cinematic splash screen with animated intro
- Hero section with gradient text and ambient glow effects
- Feature cards showcasing platform capabilities
- Responsive navigation with hover effects

### 📊 Learning Dashboard
- **3 Course Tracks**: Math Foundations → Core ML Models → Deep Learning
- Interactive course cards with subtopic drill-down
- Scrolling **Learning Canvas** for immersive content
- Real-time progress tracking with XP and streak stats

### 🎮 Algorithm Arcade (Gamified)
- **Python Data Types Arcade** — Classify variables in a fast-paced challenge
- **Python Loops Arcade** — Debug and predict loop outputs
- **Dot Product Matrix** — Visualize and compute matrix operations
- Quick Quiz with instant feedback and scoring
- Real-World ML Simulation with tunable parameters (data volume, noise)
- Live Leaderboard with XP rankings

### 💻 Code Lab
- 8 coding challenges across Python, Data Science, Linear Algebra, ML, and Neural Networks
- Difficulty tiers: Easy (50 XP) → Medium (100-120 XP) → Hard (150-180 XP)
- Built-in code editor with syntax highlighting
- Hint system with progressive reveals
- Solution toggle for self-paced learning
- XP tracking per challenge

### 📚 Learning Modules
- **12 comprehensive modules** covering the full ML pipeline
- Beginner → Intermediate → Advanced progression
- Each module includes: Concept explanation, Key topics, Real-world examples, and runnable Code snippets
- Filterable by difficulty level
- Progress tracking per module
- Beautiful modal detail view

### 🧪 Code Playground
- **Missing Value Imputer** — Handle NaN values with different strategies (mean, median, mode, drop)
- **Outlier Sweeper** — Detect and remove statistical outliers with visual feedback
- Real-time data transformation previews

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) with Turbopack |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) |
| **3D Graphics** | [Three.js](https://threejs.org/) + React Three Fiber |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) (Dialog, Tooltip, Dropdown) |
| **AI Integration** | [Google Generative AI](https://ai.google.dev/) |
| **Auth** | [NextAuth.js](https://next-auth.js.org/) |
| **Database** | [Supabase](https://supabase.com/) |
| **Typography** | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |

---

## 📁 Project Structure

```
elearn-ml/
├── app/
│   ├── page.tsx                    # Landing page with splash, hero, features
│   ├── layout.tsx                  # Root layout with metadata & fonts
│   ├── globals.css                 # Global styles & design tokens
│   ├── login/                      # Authentication page
│   ├── about/                      # About page
│   └── dashboard/
│       ├── page.tsx                # Main dashboard with course cards
│       ├── layout.tsx              # Dashboard layout with sidebar
│       ├── codelab/page.tsx        # Interactive coding challenges
│       ├── gamified/page.tsx       # Algorithm Arcade with games & quizzes
│       ├── learn/page.tsx          # 12 structured learning modules
│       └── playground/page.tsx     # Data preprocessing sandbox
├── components/
│   ├── HeroSection.tsx             # Landing page hero
│   ├── FeatureCards.tsx            # Feature showcase cards
│   ├── LandingNav.tsx             # Top navigation bar
│   ├── SplashScreen.tsx           # Animated intro screen
│   ├── UniversalSidebar.tsx       # Dashboard sidebar navigation
│   ├── PythonDataTypesArcade.tsx  # Data types game component
│   ├── PythonLoopsArcade.tsx      # Loops challenge component
│   ├── DotProductMatrix.tsx       # Matrix visualization
│   ├── MissingValueImputer.tsx    # NaN handling tool
│   ├── OutlierSweeper.tsx         # Outlier detection tool
│   └── dashboard/
│       ├── CourseCard.tsx          # Course track card
│       ├── LearningCanvas.tsx     # Scrollable learning content
│       └── LearningCanvasProgressContext.tsx  # Progress state
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn/pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AtharvCodingHub-888/vibethon-TeamNebulaWarriors-t136.git
cd vibethon-TeamNebulaWarriors-t136

# 2. Install dependencies
npm install

# 3. Start the development server (with Turbopack)
npm run dev

# 4. Open in your browser
# → http://localhost:3000
```

### Environment Variables (Auth + Prisma + Progress)

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-strong-random-secret"

GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Existing Supabase variables can stay if you still use Supabase features elsewhere
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

Initialize Prisma after setting `DATABASE_URL`:

```bash
npx prisma generate
npx prisma migrate dev --name init_auth_progress
```

For Credentials login (`email/password`), users must have a `passwordHash` in the `User` table.
Example hash generation:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📄 Pages & Modules

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Cinematic intro, hero section, feature cards |
| `/login` | Login | User authentication |
| `/about` | About | Platform information |
| `/dashboard` | Dashboard | Course tracks, progress stats, learning canvas |
| `/dashboard/codelab` | Code Lab | 8 Python/ML coding challenges with XP |
| `/dashboard/gamified` | Algorithm Arcade | Games, quiz, simulation, leaderboard |
| `/dashboard/learn` | Learning Modules | 12 structured modules (beginner → advanced) |
| `/dashboard/playground` | Playground | Missing Value Imputer & Outlier Sweeper |

---

## 🎓 Learning Modules (12 Total)

| # | Module | Level | Topics |
|---|--------|-------|--------|
| 1 | What is AI? | 🟢 Beginner | AI types, real-world applications |
| 2 | Intro to Machine Learning | 🟢 Beginner | Supervised, unsupervised, reinforcement |
| 3 | Data Preprocessing | 🟢 Beginner | Missing values, normalization, encoding |
| 4 | Linear Regression | 🟢 Beginner | Line of best fit, cost function, gradient descent |
| 5 | Classification Algorithms | 🟡 Intermediate | KNN, SVM, decision boundaries |
| 6 | Decision Trees | 🟡 Intermediate | Node splitting, Gini impurity, pruning |
| 7 | Neural Networks Basics | 🟡 Intermediate | Perceptron, activation functions, forward prop |
| 8 | Clustering & K-Means | 🟡 Intermediate | K-Means, centroids, elbow method |
| 9 | Convolutional Neural Nets | 🔴 Advanced | Convolution, pooling, feature maps |
| 10 | NLP & Text Processing | 🔴 Advanced | Tokenization, TF-IDF, word embeddings |
| 11 | Reinforcement Learning | 🔴 Advanced | Agent-environment, rewards, Q-Learning |
| 12 | Model Evaluation | 🔴 Advanced | Accuracy, precision, recall, F1, confusion matrix |

---

## 🎨 Design Philosophy

- **Dark mode first** — Deep space-inspired color palette (`#030614` base)
- **Glassmorphism** — Frosted glass cards with subtle borders
- **Micro-animations** — Framer Motion for smooth transitions and hover effects
- **Gradient accents** — Cyan, purple, pink, and emerald gradients
- **Typography** — Inter font family with carefully weighted hierarchy
- **Responsive** — Mobile-first design that scales to all screen sizes

---

## 👥 Team

### Team Nebula Warriors

| Member | Role |
|--------|------|
| **Atharv** | Full-Stack Developer & Team Lead |

> Built with 💙 for **Vibethon 2026** — Hackathon Track T136

---

## 📜 License

This project was built for the **Vibethon 2026 Hackathon**. All rights reserved by Team Nebula Warriors.

---

<p align="center">
  <strong>⭐ If you found this project useful, give it a star!</strong>
</p>
