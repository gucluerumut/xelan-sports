"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeamModal } from "@/context/TeamModalContext";
import { TableSkeleton } from "@/components/skeletons/Skeletons";
import { useTeams } from "@/hooks/useTeamsQuery";
import type { FirestoreTeam } from "@/lib/teams-firestore";

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

// Convert FirestoreTeam to display format
interface DisplayTeam {
    id: string;
    name: string;
    country: string;
    league: string;
    logo: string;
    platforms: {
        instagram: { followers: number; username: string };
        twitter: { followers: number; username: string };
        tiktok: { followers: number; username: string };
    };
    totalFollowers: number;
}

function convertToDisplayTeam(team: FirestoreTeam): DisplayTeam {
    return {
        id: team.id,
        name: team.name,
        country: team.country,
        league: team.league,
        logo: team.logo,
        platforms: {
            instagram: { followers: team.socials?.instagram?.followers || 0, username: team.socials?.instagram?.username || "" },
            twitter: { followers: team.socials?.twitter?.followers || 0, username: team.socials?.twitter?.username || "" },
            tiktok: { followers: team.socials?.tiktok?.followers || 0, username: team.socials?.tiktok?.username || "" },
        },
        totalFollowers: team.totalFollowers,
    };
}

export default function RankingsTableFirestore() {
    const [sortField, setSortField] = useState<SortField>("total");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [selectedLeague, setSelectedLeague] = useState<string>("All");
    const { openModal } = useTeamModal();

    // Use React Query for data fetching with caching
    const { data: firestoreTeams, isLoading: loading, error } = useTeams();

    // Convert Firestore teams to display format
    const teams = useMemo(() => {
        if (!firestoreTeams) return [];
        return firestoreTeams.map(convertToDisplayTeam);
    }, [firestoreTeams]);

    const leagues = useMemo(() => {
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
        let filtered = teams;
        if (selectedLeague !== "All") {
            filtered = teams.filter(team => team.league === selectedLeague);
        }

        return [...filtered].sort((a, b) => {
            let valA = 0;
            let valB = 0;

            try {
                switch (sortField) {
                    case "total":
                        valA = a.totalFollowers || 0;
                        valB = b.totalFollowers || 0;
                        break;
                    case "instagram":
                        valA = a.platforms?.instagram?.followers || 0;
                        valB = b.platforms?.instagram?.followers || 0;
                        break;
                    case "twitter":
                        valA = a.platforms?.twitter?.followers || 0;
                        valB = b.platforms?.twitter?.followers || 0;
                        break;
                    case "tiktok":
                        valA = a.platforms?.tiktok?.followers || 0;
                        valB = b.platforms?.tiktok?.followers || 0;
                        break;
                }
            } catch (error) {
                console.error("Sorting error:", error);
                return 0;
            }

            return sortDirection === "asc" ? valA - valB : valB - valA;
        });
    }, [sortField, sortDirection, selectedLeague, teams]);

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };

    if (loading) {
        return <TableSkeleton rows={15} />;
    }

    if (error) {
        return (
            <div className="w-full flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-red-400">Failed to load teams</p>
                    <p className="text-gray-500 text-sm">{error instanceof Error ? error.message : 'Please try again'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Küresel Sıralamalar</h2>
                <div className="flex flex-wrap gap-2">
                    {leagues.map((league) => (
                        <button
                            key={league}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLeague(league);
                            }}
                            className={cn(
                                "rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95",
                                selectedLeague === league
                                    ? "bg-blue-600 text-white"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            {league === "All" ? "Tümü" : league}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 text-left text-sm text-gray-400">
                            <th className="pb-4 pr-4 font-medium">Sıra</th>
                            <th className="pb-4 pr-4 font-medium">Takım</th>
                            <th className="pb-4 pr-4 font-medium">Lig</th>
                            <th
                                className="cursor-pointer pb-4 pr-4 font-medium transition-colors hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSort("total");
                                }}
                            >
                                <div className="flex items-center gap-1">
                                    Toplam Takipçi
                                    {sortField === "total" && (
                                        sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer pb-4 pr-4 font-medium transition-colors hover:text-[#E1306C]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSort("instagram");
                                }}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    <Instagram className="h-4 w-4" />
                                    {sortField === "instagram" && (
                                        sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer pb-4 pr-4 font-medium transition-colors hover:text-[#1DA1F2]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSort("twitter");
                                }}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    <Twitter className="h-4 w-4" />
                                    {sortField === "twitter" && (
                                        sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                                    )}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer pb-4 font-medium transition-colors hover:text-[#00f2ea]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSort("tiktok");
                                }}
                            >
                                <div className="flex items-center justify-end gap-1">
                                    <TikTokIcon className="h-4 w-4" />
                                    {sortField === "tiktok" && (
                                        sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTeams.map((team, index) => (
                            <motion.tr
                                key={`${selectedLeague}-${sortField}-${team.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.02 }}
                                onClick={() => openModal(team as any)}
                                className="group cursor-pointer border-b border-white/5 transition-colors hover:bg-white/5"
                            >
                                {/* Rank */}
                                <td className="py-4 pr-4 text-center font-mono text-lg font-bold text-gray-500 group-hover:text-white">
                                    {index + 1}
                                </td>

                                {/* Team */}
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-3">
                                        <img src={team.logo} alt={team.name} className="h-8 w-8 rounded-lg object-contain" loading="lazy" />
                                        <span className="font-semibold text-white">{team.name}</span>
                                    </div>
                                </td>

                                {/* League */}
                                <td className="py-4 pr-4 text-sm text-gray-400">{team.league}</td>

                                {/* Total */}
                                <td className="py-4 pr-4 font-mono text-lg font-bold text-white">
                                    {formatNumber(team.totalFollowers)}
                                </td>

                                {/* Instagram */}
                                <td className="py-4 pr-4 text-right font-mono text-sm text-gray-400">
                                    <span className={cn(sortField === "instagram" && "text-[#E1306C] font-bold")}>
                                        {formatNumber(team.platforms.instagram.followers)}
                                    </span>
                                </td>

                                {/* Twitter */}
                                <td className="py-4 pr-4 text-right font-mono text-sm text-gray-400">
                                    <span className={cn(sortField === "twitter" && "text-[#1DA1F2] font-bold")}>
                                        {formatNumber(team.platforms.twitter.followers)}
                                    </span>
                                </td>

                                {/* TikTok */}
                                <td className="py-4 text-right font-mono text-sm text-gray-400">
                                    <span className={cn(sortField === "tiktok" && "text-[#00f2ea] font-bold")}>
                                        {formatNumber(team.platforms.tiktok.followers)}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
