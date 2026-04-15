import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ProgressStatus } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function toStartOfDay(value: Date): Date {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getUpdatedStreak(previousActivityDate: Date | null, currentStreak: number): number {
  if (!previousActivityDate) return 1;

  const today = toStartOfDay(new Date());
  const lastActivity = toStartOfDay(previousActivityDate);
  const diffDays = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return currentStreak;
  if (diffDays === 1) return currentStreak + 1;
  return 1;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const moduleName = typeof body?.moduleName === "string" ? body.moduleName.trim() : "";
  const rawStatus = typeof body?.status === "string" ? body.status : "IN_PROGRESS";
  const quizScore = typeof body?.quizScore === "number" ? Math.max(0, Math.floor(body.quizScore)) : 0;
  const status = rawStatus === "COMPLETED" ? ProgressStatus.COMPLETED : ProgressStatus.IN_PROGRESS;

  if (!moduleName) {
    return NextResponse.json({ error: "moduleName is required" }, { status: 400 });
  }

  const now = new Date();

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { streak: true },
    });

    const latestProgress = await tx.progress.findFirst({
      where: { userId },
      orderBy: { lastActivityDate: "desc" },
      select: { lastActivityDate: true },
    });

    const streak = getUpdatedStreak(latestProgress?.lastActivityDate ?? null, user?.streak ?? 0);

    const progress = await tx.progress.upsert({
      where: {
        userId_moduleName: {
          userId,
          moduleName,
        },
      },
      create: {
        userId,
        moduleName,
        status,
        quizScore,
        lastActivityDate: now,
      },
      update: {
        status,
        quizScore,
        lastActivityDate: now,
      },
    });

    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: { streak },
      select: { id: true, streak: true },
    });

    return { progress, user: updatedUser };
  });

  return NextResponse.json({
    ok: true,
    progress: {
      moduleName: result.progress.moduleName,
      status: result.progress.status,
      quizScore: result.progress.quizScore,
      lastActivityDate: result.progress.lastActivityDate,
    },
    user: result.user,
  });
}
