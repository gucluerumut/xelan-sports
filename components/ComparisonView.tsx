"use client";

import { motion } from "framer-motion";
import { Team } from "@/lib/mock-data";
import { Instagram, Twitter, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        className={className}
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

interface ComparisonViewProps {
    teamA: Team;
    teamB: Team;
}

export default function ComparisonView({ teamA, teamB }: ComparisonViewProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

    const calculatePercentage = (valA: number, valB: number) => {
        const total = valA + valB;
        if (total === 0) return 50;
        return (valA / total) * 100;
    };

    const StatRow = ({
        label,
        valA,
        valB,
        icon: Icon,
        colorClass,
    }: {
        label: string;
        valA: number;
        valB: number;
        icon?: any;
        colorClass: string;
    }) => {
        const percentA = calculatePercentage(valA, valB);
        const percentB = 100 - percentA;
        const winner = valA > valB ? "A" : valB > valA ? "B" : "Tie";

        return (
            <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-400">
                    <div className={cn("flex items-center gap-2", winner === "A" && "text-white font-bold")}>
                        {Icon && <Icon className={cn("h-4 w-4", colorClass)} />}
                        {formatNumber(valA)}
                    </div>
                    <span className="uppercase tracking-wider">{label}</span>
                    <div className={cn("flex items-center gap-2", winner === "B" && "text-white font-bold")}>
                        {formatNumber(valB)}
                        {Icon && <Icon className={cn("h-4 w-4", colorClass)} />}
                    </div>
                </div>

                <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/5">
                    {/* Team A Bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentA}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("absolute left-0 top-0 h-full", colorClass, "opacity-80")}
                    />

                    {/* Team B Bar (Background is effectively Team B if we just fill from left, but for two colors we need another div or background color) */}
                    {/* Actually, let's make it a split bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentB}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("absolute right-0 top-0 h-full bg-gray-600 opacity-50")}
                    />

                    {/* Center Marker */}
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-black/50" />
                </div>
            </div>
        );
    };

    return (
        <div className="mt-12 w-full max-w-4xl rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-md">
            {/* Header VS */}
            <div className="mb-12 flex items-center justify-between">
                {/* Team A */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white/10 p-2 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
                        <img src={teamA.logo} alt={teamA.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">{teamA.name}</h2>
                        <p className="text-sm text-gray-500">{teamA.country}</p>
                    </div>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-2xl font-black italic text-white/20">
                        VS
                    </span>
                </div>

                {/* Team B */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white/10 p-2 shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]">
                        <img src={teamB.logo} alt={teamB.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">{teamB.name}</h2>
                        <p className="text-sm text-gray-500">{teamB.country}</p>
                    </div>
                </div>
            </div>

            {/* Stats Comparison */}
            <div className="space-y-6">
                <StatRow
                    label="Total Followers"
                    valA={teamA.totalFollowers}
                    valB={teamB.totalFollowers}
                    colorClass="bg-blue-500 text-blue-500"
                    icon={Trophy}
                />

                <StatRow
                    label="Instagram"
                    valA={teamA.platforms.instagram.followers}
                    valB={teamB.platforms.instagram.followers}
                    colorClass="bg-[#E1306C] text-[#E1306C]"
                    icon={Instagram}
                />

                <StatRow
                    label="Twitter"
                    valA={teamA.platforms.twitter.followers}
                    valB={teamB.platforms.twitter.followers}
                    colorClass="bg-[#1DA1F2] text-[#1DA1F2]"
                    icon={Twitter}
                />

                <StatRow
                    label="TikTok"
                    valA={teamA.platforms.tiktok.followers}
                    valB={teamB.platforms.tiktok.followers}
                    colorClass="bg-[#00f2ea] text-[#00f2ea]"
                    icon={TikTokIcon}
                />
            </div>
        </div>
    );
}
