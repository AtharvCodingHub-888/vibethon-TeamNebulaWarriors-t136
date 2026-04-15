import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ProgressStatus } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user, progress] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, streak: true, name: true, email: true },
    }),
    prisma.progress.findMany({
      where: { userId },
      orderBy: { lastActivityDate: "desc" },
      select: {
        id: true,
        moduleName: true,
        status: true,
        quizScore: true,
        lastActivityDate: true,
      },
    }),
  ]);

  const completedModules = progress.filter((item) => item.status === ProgressStatus.COMPLETED).length;
  const averageQuizScore =
    progress.length > 0
      ? Math.round(progress.reduce((sum, item) => sum + item.quizScore, 0) / progress.length)
      : 0;

  return NextResponse.json({
    user,
    stats: {
      totalModules: progress.length,
      completedModules,
      averageQuizScore,
      streak: user?.streak ?? 0,
    },
    progress,
  });
}

export async function POST(req: NextRequest) {
  // Alias endpoint for convenience with minimal payload expectations.
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const moduleName = typeof body?.moduleName === "string" ? body.moduleName.trim() : "";
  const rawStatus = typeof body?.status === "string" ? body.status : "IN_PROGRESS";
  const status = rawStatus === "COMPLETED" ? ProgressStatus.COMPLETED : ProgressStatus.IN_PROGRESS;
  const quizScore = typeof body?.quizScore === "number" ? Math.max(0, Math.floor(body.quizScore)) : 0;

  if (!moduleName) {
    return NextResponse.json({ error: "moduleName is required" }, { status: 400 });
  }

  const progress = await prisma.progress.upsert({
    where: { userId_moduleName: { userId, moduleName } },
    create: { userId, moduleName, status, quizScore, lastActivityDate: new Date() },
    update: { status, quizScore, lastActivityDate: new Date() },
  });

  return NextResponse.json({ ok: true, progress });
}
