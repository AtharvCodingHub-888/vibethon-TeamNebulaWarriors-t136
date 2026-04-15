import { redirect } from "next/navigation";

export default function ConceptGamesPage() {
    redirect("/dashboard/gamified?tab=concept-games");
}
