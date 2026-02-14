"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Instagram, Twitter } from "lucide-react";
import { useTeams } from "@/hooks/useTeamsQuery";
import { cn } from "@/lib/utils";
import { useTeamModal } from "@/context/TeamModalContext";

// Custom TikTok Icon
export const TikTokIcon = ({ className }: { className?: string }) => (
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

type SortField = "total" | "instagram" | "twitter" | "tiktok";

export default function RankingsTable() {
    const { data: teams, isLoading } = useTeams();
    const [sortField, setSortField] = useState<SortField>("total");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [selectedLeague, setSelectedLeague] = useState<string>("All");
    const { openModal } = useTeamModal();

    const leagues = useMemo(() => {
        if (!teams) return ["All"];
        const uniqueLeagues = Array.from(new Set(teams.map(team => team.league))).filter(Boolean).sort();
        return ["All", ...uniqueLeagues];
    }, [teams]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const sortedTeams = useMemo(() => {
        if (!teams) return [];
        let filtered = teams;
        if (selectedLeague !== "All") {
            filtered = teams.filter(team => team.league === selectedLeague);
        }

        return [...filtered].sort((a, b) => {
            let aValue = 0;
            let bValue = 0;

            switch (sortField) {
                case "total":
                    aValue = a.totalFollowers || 0;
                    bValue = b.totalFollowers || 0;
                    break;
                case "instagram":
                    aValue = a.socials?.instagram?.followers || 0;
                    bValue = b.socials?.instagram?.followers || 0;
                    break;
                case "twitter":
                    aValue = a.socials?.twitter?.followers || 0;
                    bValue = b.socials?.twitter?.followers || 0;
                    break;
                case "tiktok":
                    aValue = a.socials?.tiktok?.followers || 0;
                    bValue = b.socials?.tiktok?.followers || 0;
                    break;
            }

            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        });
    }, [teams, selectedLeague, sortField, sortDirection]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 w-full rounded-xl bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* League Filters */}
            <div className="flex flex-wrap gap-2">
                {leagues.map((league) => (
                    <button
                        key={league}
                        onClick={() => setSelectedLeague(league)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            selectedLeague === league
                                ? "bg-white text-black shadow-lg shadow-white/10 scale-105"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {league === "All" ? "Tüm Ligler" : league}
                    </button>
                ))}
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-4 pl-2">Takım</div>
                <div className="col-span-2 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("total")}>
                    <div className="flex items-center justify-end gap-1">
                        Toplam
                        {sortField === "total" && (sortDirection === "desc" ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                    </div>
                </div>
                <div className="col-span-5 grid grid-cols-3 gap-2">
                    <div className="text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("instagram")}>
                        <div className="flex items-center justify-end gap-1">
                            <Instagram size={14} />
                            {sortField === "instagram" && (sortDirection === "desc" ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                        </div>
                    </div>
                    <div className="text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("twitter")}>
                        <div className="flex items-center justify-end gap-1">
                            <Twitter size={14} />
                            {sortField === "twitter" && (sortDirection === "desc" ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                        </div>
                    </div>
                    <div className="text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("tiktok")}>
                        <div className="flex items-center justify-end gap-1">
                            <TikTokIcon className="text-sm" />
                            {sortField === "tiktok" && (sortDirection === "desc" ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Teams List */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {sortedTeams.map((team, index) => (
                        <motion.div
                            layout
                            key={team.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => openModal(team)}
                            className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl p-4 transition-all duration-300 cursor-pointer"
                        >
                            {/* Mobile Layout */}
                            <div className="md:hidden flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className={cn(
                                        "text-lg font-bold w-6 text-center",
                                        index < 3 ? "text-yellow-400" : "text-white/40"
                                    )}>
                                        {index + 1}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/10 p-2 overflow-hidden relative">
                                            {team.logo ? (
                                                <img
                                                    src={team.logo}
                                                    alt={team.name}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-xs', 'font-bold');
                                                        target.parentElement!.innerText = team.name.substring(0, 2).toUpperCase();
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                                                    {team.name.substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {team.name}
                                            </h3>
                                            <p className="text-xs text-white/40">{team.league}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-white">
                                        {(team.totalFollowers / 1000000).toFixed(1)}M
                                    </div>
                                    <div className="text-xs text-white/40">Takipçi</div>
                                </div>
                            </div>

                            {/* Desktop Layout */}
                            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                                <div className={cn(
                                    "col-span-1 text-center font-bold text-lg",
                                    index < 3 ? "text-yellow-400" : "text-white/40"
                                )}>
                                    {index + 1}
                                </div>
                                <div className="col-span-4 flex items-center gap-4 pl-2">
                                    <div className="w-10 h-10 rounded-full bg-white/5 p-2 overflow-hidden relative group-hover:scale-110 transition-transform duration-300">
                                        {team.logo ? (
                                            <img
                                                src={team.logo}
                                                alt={team.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-xs', 'font-bold');
                                                    target.parentElement!.innerText = team.name.substring(0, 2).toUpperCase();
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                                                {team.name.substring(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {team.name}
                                    </span>
                                </div>
                                <div className="col-span-2 text-right font-bold text-white text-lg">
                                    {(team.totalFollowers / 1000000).toFixed(1)}M
                                </div>
                                <div className="col-span-5 grid grid-cols-3 gap-2 text-right text-sm text-white/60">
                                    <div className="group-hover:text-pink-400 transition-colors">
                                        {(team.socials?.instagram?.followers / 1000000).toFixed(1)}M
                                    </div>
                                    <div className="group-hover:text-blue-400 transition-colors">
                                        {(team.socials?.twitter?.followers / 1000000).toFixed(1)}M
                                    </div>
                                    <div className="group-hover:text-purple-400 transition-colors">
                                        {(team.socials?.tiktok?.followers / 1000000).toFixed(1)}M
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
