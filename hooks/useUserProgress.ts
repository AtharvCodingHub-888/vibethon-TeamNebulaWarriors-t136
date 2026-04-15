"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type ProgressItem = {
  id: string;
  moduleName: string;
  status: "IN_PROGRESS" | "COMPLETED";
  quizScore: number;
  lastActivityDate: string;
};

type UserProgressResponse = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    streak: number;
  } | null;
  stats: {
    totalModules: number;
    completedModules: number;
    averageQuizScore: number;
    streak: number;
  };
  progress: ProgressItem[];
};

export function useUserProgress() {
  const { status } = useSession();
  const [data, setData] = useState<UserProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (status === "unauthenticated") {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/progress", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to load progress");
      }
      const payload = (await response.json()) as UserProgressResponse;
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch progress");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    user: data?.user ?? null,
    stats: data?.stats ?? null,
    progress: data?.progress ?? [],
    loading,
    error,
    refresh,
  };
}
