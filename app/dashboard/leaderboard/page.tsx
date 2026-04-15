import { redirect } from "next/navigation";

export default function LeaderboardPage() {
    redirect("/dashboard/gamified?tab=leaderboard");
}
