import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const moduleId = typeof body?.module === "string" ? body.module : null;

    if (!moduleId) {
        return NextResponse.json({ ok: false, error: "Missing module" }, { status: 400 });
    }

    const result = {
        ok: true,
        module: moduleId,
        prismaUpdated: false,
        supabaseUpdated: false,
    };

    // Prisma is intentionally skipped in this setup (Firebase-ready flow).

    // Reliable fallback storage path currently used by this project.
    try {
        const supabase = createServerClient();
        if (supabase) {
            await supabase.from("learning_canvas_progress").upsert(
                {
                    module_id: moduleId,
                    completed: true,
                    completed_at: new Date().toISOString(),
                },
                { onConflict: "module_id" }
            );
            result.supabaseUpdated = true;
        }
    } catch {
        // Non-blocking fallback failure.
    }

    return NextResponse.json(result);
}
