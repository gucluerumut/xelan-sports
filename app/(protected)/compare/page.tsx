"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TeamSelector from "@/components/TeamSelector";
import ComparisonView from "@/components/ComparisonView";
import { MOCK_TEAMS, Team } from "@/lib/mock-data";

export default function ComparePage() {
    const [teamA, setTeamA] = useState<Team | null>(MOCK_TEAMS[0]);
    const [teamB, setTeamB] = useState<Team | null>(MOCK_TEAMS[1]);

    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />

            <div className="container mx-auto flex flex-col items-center px-4 py-24">
                <h1 className="mb-2 text-4xl font-bold text-white">Head-to-Head</h1>
                <p className="mb-12 text-gray-400">Compare social media performance of any two teams</p>

                {/* Selectors */}
                <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <TeamSelector
                        label="Team A"
                        selectedTeam={teamA}
                        onSelect={setTeamA}
                        excludeTeamId={teamB?.id}
                    />

                    <div className="hidden text-2xl font-bold text-gray-600 md:block">VS</div>

                    <TeamSelector
                        label="Team B"
                        selectedTeam={teamB}
                        onSelect={setTeamB}
                        excludeTeamId={teamA?.id}
                    />
                </div>

                {/* Comparison View */}
                {teamA && teamB ? (
                    <ComparisonView teamA={teamA} teamB={teamB} />
                ) : (
                    <div className="mt-12 flex h-64 w-full max-w-4xl items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-gray-500">
                        Select two teams to start comparison
                    </div>
                )}
            </div>
        </main>
    );
}
