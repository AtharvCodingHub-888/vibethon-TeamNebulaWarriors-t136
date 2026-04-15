import { redirect } from "next/navigation";

export default function QuizArenaPage() {
    redirect("/dashboard/gamified?tab=quiz-arena");
}
