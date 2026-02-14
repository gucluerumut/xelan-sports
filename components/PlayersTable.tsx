"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Instagram, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayersByLeague } from "@/hooks/usePlayersQuery";
import { useTeams } from "@/hooks/useTeamsQuery";
import { TableSkeleton } from "@/components/skeletons/Skeletons";
import type { Player } from "@/lib/players-firestore";

type SortField = "instagram" | "marketValue" | "name";

// Format follower count
function formatFollowers(count: number): string {
    if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1)}B`;
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
}

// Player Modal Component
function PlayerModal({ player, onClose }: { player: Player; onClose: () => void }) {
    const instagramUrl = player.socials?.instagram?.url;
    const instagramFollowers = player.socials?.instagram?.followers || 0;
    const marketValue = player.marketValue || "-";
    const transfermarktUrl = `https://www.transfermarkt.com/${player.name.toLowerCase().replace(/\s+/g, '-')}/profil/spieler`;

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="pointer-events-auto w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900 to-black p-6 shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        {player.photo ? (
                            <img
                                src={player.photo}
                                alt={player.name}
                                className="w-20 h-20 rounded-full object-cover bg-gray-800 border-2 border-pink-500/50"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                                {player.name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                            <p className="text-gray-400">{player.teamName || "Takımsız"}</p>
                            <p className="text-sm text-gray-500">
                                {player.nationality} • {player.position} • {player.age}y
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400">Piyasa Değeri</p>
                                <p className="text-2xl font-bold text-green-400">{marketValue}</p>
                            </div>
                            <div className="text-xs text-gray-500">Transfermarkt</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Instagram className="w-8 h-8 text-pink-500" />
                                <div>
                                    <p className="text-sm text-gray-400">Instagram</p>
                                    <p className="text-lg font-mono font-bold text-white">
                                        @{player.socials?.instagram?.username || "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                                    {formatFollowers(instagramFollowers)}
                                </p>
                                <p className="text-xs text-gray-500">takipçi</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {instagramUrl && (
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition-all active:scale-95"
                            >
                                <Instagram className="w-5 h-5" />
                                Instagram Profili
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                        <a
                            href={transfermarktUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-500 hover:to-emerald-500 transition-all active:scale-95"
                        >
                            Transfermarkt Profili
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default function PlayersTable() {
    const [sortField, setSortField] = useState<SortField>("marketValue");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [selectedLeague, setSelectedLeague] = useState<string>("La Liga");
    const [selectedTeam, setSelectedTeam] = useState<string>("all");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    // Fetch all players for the selected league
    const { data: players, isLoading, error } = usePlayersByLeague(selectedLeague);
    const { data: teams } = useTeams();

    const LEAGUES = ["La Liga", "Premier League", "Serie A", "Ligue 1", "Süper Lig"];

    // Get teams for selected league
    const leagueTeams = useMemo(() => {
        if (!teams) return [];
        return teams.filter(t => t.league === selectedLeague).sort((a, b) => a.name.localeCompare(b.name));
    }, [teams, selectedLeague]);

    // Handle sort
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    // Filter and sort players
    const sortedPlayers = useMemo(() => {
        if (!players) return [];

        let result = [...players];

        // Filter by team
        if (selectedTeam !== "all") {
            result = result.filter(p => p.teamId === selectedTeam);
        }

        // Sort
        result.sort((a, b) => {
            let aVal: number | string = 0;
            let bVal: number | string = 0;

            switch (sortField) {
                case "marketValue":
                    aVal = a.marketValueNumeric || 0;
                    bVal = b.marketValueNumeric || 0;
                    break;
                case "instagram":
                    aVal = a.socials?.instagram?.followers || 0;
                    bVal = b.socials?.instagram?.followers || 0;
                    break;
                case "name":
                    aVal = a.name;
                    bVal = b.name;
                    break;
            }

            if (typeof aVal === "string" && typeof bVal === "string") {
                return sortDirection === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            return sortDirection === "asc"
                ? (aVal as number) - (bVal as number)
                : (bVal as number) - (aVal as number);
        });

        return selectedTeam === "all" ? result.slice(0, 50) : result;
    }, [players, selectedTeam, sortField, sortDirection]);

    // Loading state
    if (isLoading) {
        return (
            <div className="w-full space-y-4">
                <TableSkeleton rows={15} />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full flex items-center justify-center py-20">
                <p className="text-red-400">Oyuncular yüklenemedi. Lütfen tekrar deneyin.</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Header with League Tabs */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold">
                        Oyuncu Sıralamaları
                        {selectedTeam === "all" && sortedPlayers.length >= 50 && (
                            <span className="ml-4 text-sm font-normal text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                                En Popüler 50
                            </span>
                        )}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {LEAGUES.map((league) => (
                            <button
                                key={league}
                                onClick={() => {
                                    setSelectedLeague(league);
                                    setSelectedTeam("all");
                                }}
                                className={cn(
                                    "rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95",
                                    selectedLeague === league
                                        ? "bg-pink-600 text-white"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {league}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Team Selector */}
                {leagueTeams.length > 0 && (
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-400">Takım:</label>
                        <select
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                            <option value="all">Tüm Takımlar</option>
                            {leagueTeams.map((team) => (
                                <option key={team.id} value={team.id} className="bg-gray-900">
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Results count */}
            <p className="text-gray-500 text-sm">{sortedPlayers.length} oyuncu</p>

            {/* Empty State */}
            {sortedPlayers.length === 0 && !isLoading && (
                <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5">
                    <p className="text-gray-400 text-lg mb-2">Bu lig için oyuncu bulunamadı</p>
                    <p className="text-gray-500 text-sm">Admin panelinden oyuncuları yükleyebilirsiniz</p>
                </div>
            )}

            {/* Table */}
            {sortedPlayers.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 text-left text-sm text-gray-400">
                                <th className="pb-4 pr-4 font-medium">Sıra</th>
                                <th
                                    className="cursor-pointer pb-4 pr-4 font-medium transition-colors hover:text-white"
                                    onClick={() => handleSort("name")}
                                >
                                    <div className="flex items-center gap-1">
                                        Oyuncu
                                        {sortField === "name" && (
                                            sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                                        )}
                                    </div>
                                </th>
                                <th className="pb-4 pr-4 font-medium">Takım</th>
                                <th
                                    className="cursor-pointer pb-4 pr-4 font-medium transition-colors hover:text-green-400"
                                    onClick={() => handleSort("marketValue")}
                                >
                                    <div className="flex items-center gap-1">
                                        Piyasa Değeri
                                        {sortField === "marketValue" && (
                                            sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                                        )}
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer pb-4 font-medium transition-colors hover:text-pink-500"
                                    onClick={() => handleSort("instagram")}
                                >
                                    <div className="flex items-center justify-end gap-1">
                                        <Instagram className="h-4 w-4 text-pink-500" />
                                        Instagram
                                        {sortField === "instagram" && (
                                            sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                                        )}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPlayers.map((player, index) => (
                                <motion.tr
                                    key={`${selectedLeague}-${selectedTeam}-${sortField}-${player.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: Math.min(index * 0.01, 0.5) }}
                                    onClick={() => setSelectedPlayer(player)}
                                    className="group cursor-pointer border-b border-white/5 transition-colors hover:bg-white/5"
                                >
                                    {/* Rank */}
                                    <td className="py-4 pr-4 text-center">
                                        <span className={cn(
                                            "font-mono text-lg font-bold",
                                            index === 0 && "text-yellow-500",
                                            index === 1 && "text-gray-400",
                                            index === 2 && "text-amber-600",
                                            index > 2 && "text-gray-500 group-hover:text-white"
                                        )}>
                                            {index + 1}
                                        </span>
                                    </td>

                                    {/* Player */}
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-3">
                                            {player.photo ? (
                                                <img
                                                    src={player.photo}
                                                    alt={player.name}
                                                    className="w-10 h-10 rounded-full object-cover bg-gray-800"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    {player.name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <span className="font-semibold text-white">{player.name}</span>
                                                <p className="text-xs text-gray-500">
                                                    {player.nationality} • {player.position}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Team */}
                                    <td className="py-4 pr-4 text-sm text-gray-400">
                                        {player.teamName || "-"}
                                    </td>

                                    {/* Market Value */}
                                    <td className="py-4 pr-4">
                                        <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                            {player.marketValue || "-"}
                                        </span>
                                    </td>

                                    {/* Instagram */}
                                    <td className="py-4 text-right">
                                        <span className="font-mono text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                                            {formatFollowers(player.socials?.instagram?.followers || 0)}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Player Modal */}
            <AnimatePresence>
                {selectedPlayer && (
                    <PlayerModal
                        player={selectedPlayer}
                        onClose={() => setSelectedPlayer(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
