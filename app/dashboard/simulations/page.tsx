import { redirect } from "next/navigation";

export default function SimulationsPage() {
    redirect("/dashboard/gamified?tab=simulations");
}
