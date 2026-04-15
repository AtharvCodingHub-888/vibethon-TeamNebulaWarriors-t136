"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type LearningModuleId = "math" | "ai-core" | "ml-deep";

type CompletionMap = Record<LearningModuleId, boolean>;

type LearningCanvasProgressContextValue = {
    completedModules: CompletionMap;
    markModuleCompleted: (moduleId: LearningModuleId) => Promise<void>;
};

const STORAGE_KEY = "learning-canvas-progress-v1";

const defaultCompletion: CompletionMap = {
    math: false,
    "ai-core": false,
    "ml-deep": false,
};

const LearningCanvasProgressContext = createContext<LearningCanvasProgressContextValue | null>(null);

export function LearningCanvasProgressProvider({ children }: { children: React.ReactNode }) {
    const [completedModules, setCompletedModules] = useState<CompletionMap>(defaultCompletion);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw) as Partial<CompletionMap>;
            setCompletedModules({
                math: Boolean(parsed.math),
                "ai-core": Boolean(parsed["ai-core"]),
                "ml-deep": Boolean(parsed["ml-deep"]),
            });
        } catch {
            setCompletedModules(defaultCompletion);
        }
    }, []);

    const persistToLocalStorage = useCallback((next: CompletionMap) => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
            // Ignore storage failures and keep in-memory state.
        }
    }, []);

    const persistToDatabase = useCallback(async (moduleId: LearningModuleId) => {
        if (!isSupabaseConfigured() || !supabase) return;
        try {
            await supabase.from("learning_canvas_progress").upsert(
                {
                    module_id: moduleId,
                    completed: true,
                    completed_at: new Date().toISOString(),
                },
                { onConflict: "module_id" }
            );
        } catch {
            // Keep UI responsive even if table is not yet provisioned.
        }
    }, []);

    const markModuleCompleted = useCallback(
        async (moduleId: LearningModuleId) => {
            let shouldPersist = false;
            setCompletedModules((prev) => {
                if (prev[moduleId]) return prev;
                const next = { ...prev, [moduleId]: true };
                shouldPersist = true;
                persistToLocalStorage(next);
                return next;
            });
            if (shouldPersist) {
                await persistToDatabase(moduleId);
            }
        },
        [persistToDatabase, persistToLocalStorage]
    );

    const value = useMemo(
        () => ({
            completedModules,
            markModuleCompleted,
        }),
        [completedModules, markModuleCompleted]
    );

    return (
        <LearningCanvasProgressContext.Provider value={value}>
            {children}
        </LearningCanvasProgressContext.Provider>
    );
}

export function useLearningCanvasProgress() {
    const context = useContext(LearningCanvasProgressContext);
    if (!context) {
        throw new Error("useLearningCanvasProgress must be used within LearningCanvasProgressProvider");
    }
    return context;
}
