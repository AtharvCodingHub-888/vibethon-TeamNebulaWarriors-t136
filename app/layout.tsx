import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nebula AI — Master Machine Learning in 3D",
    description:
        "A structured, visual sandbox for engineering students. From math foundations to deep learning — learn ML through interactive 3D environments, gamified progression, and hands-on code.",
    keywords: [
        "machine learning",
        "deep learning",
        "3D learning",
        "interactive education",
        "gamified learning",
        "neural networks",
        "python",
        "engineering",
    ],
    openGraph: {
        title: "Nebula AI — Master Machine Learning in 3D",
        description:
            "A structured, visual sandbox for engineering students. From math foundations to deep learning.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen bg-[#030614] text-white antialiased">
                {children}
            </body>
        </html>
    );
}