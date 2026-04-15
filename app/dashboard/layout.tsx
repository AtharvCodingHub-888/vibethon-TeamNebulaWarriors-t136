"use client";

import dynamic from "next/dynamic";
import { SidebarProvider, useSidebar } from "@/components/SidebarContext";

const UniversalSidebar = dynamic(
    () => import("@/components/UniversalSidebar"),
    { ssr: false }
);

function DashboardContent({ children }: { children: React.ReactNode }) {
    const { expanded } = useSidebar();
    return (
        <div
            className="transition-all duration-300 min-h-screen"
            style={{ marginLeft: expanded ? "256px" : "80px" }}
        >
            {children}
        </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-[#030614]">
                {/* Ambient background */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(34,211,238,0.06),transparent)]" />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                <UniversalSidebar />
                <DashboardContent>{children}</DashboardContent>
            </div>
        </SidebarProvider>
    );
}
