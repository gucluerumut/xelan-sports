"use client";

import { useTeamModal } from "@/context/TeamModalContext";
import { AnimatePresence, motion } from "framer-motion";
import { X, Instagram, Twitter, ExternalLink } from "lucide-react";
import { TikTokIcon } from "./RankingsTable";
import { getCountryFlag } from "@/lib/barcelona-squad";
import { usePlayersByTeam } from "@/hooks/usePlayersQuery";

export default function TeamModal() {
    const { isOpen, selectedTeam, closeModal } = useTeamModal();

    // Load players dynamically for the selected team
    const { data: players, isLoading: playersLoading } = usePlayersByTeam(selectedTeam?.id || "");

    if (!isOpen || !selectedTeam) return null;

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

    // Sort players by market value
    const squadData = players
        ? [...players].sort((a, b) => (b.marketValueNumeric || 0) - (a.marketValueNumeric || 0))
        : [];

    const hasSquadData = squadData.length > 0;

    // Use specific type for flexibility
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const teamData = selectedTeam as any;
    const socials = teamData.platforms || teamData.socials || {};

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`pointer-events-auto relative w-full ${hasSquadData ? "max-w-6xl" : "max-w-lg"
                                } overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl my-8`}
                        >
                            {/* Header Background */}
                            <div className="absolute inset-0 h-32 bg-gradient-to-b from-blue-600/20 to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white/70 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className={`relative ${hasSquadData ? "grid grid-cols-1 lg:grid-cols-[350px_1fr]" : ""}`}>
                                {/* Left Side - Team Info */}
                                <div className="px-8 pt-12 pb-8 border-r border-white/10">
                                    {/* Team Identity */}
                                    <div className="mb-8 flex flex-col items-center text-center">
                                        <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-[#0A0A0A] bg-white/10 p-2 shadow-xl transition-transform hover:scale-105">
                                            <img
                                                src={selectedTeam.logo}
                                                alt={selectedTeam.name}
                                                loading="lazy"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">{selectedTeam.name}</h2>
                                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                                            <span>{selectedTeam.country}</span>
                                            <span>•</span>
                                            <span>{selectedTeam.league}</span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="space-y-3">
                                        {/* Instagram */}
                                        <a
                                            href={`https://instagram.com/${socials?.instagram?.username || selectedTeam.id.replace(/-/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Instagram className="h-5 w-5 text-[#E1306C]" />
                                                <span className="text-sm text-gray-400">Instagram</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-white">
                                                    {formatNumber(socials?.instagram?.followers || 0)}
                                                </div>
                                            </div>
                                        </a>

                                        {/* Twitter */}
                                        <a
                                            href={`https://twitter.com/${socials?.twitter?.username || selectedTeam.id.replace(/-/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                                                <span className="text-sm text-gray-400">Twitter</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-white">
                                                    {formatNumber(socials?.twitter?.followers || 0)}
                                                </div>
                                            </div>
                                        </a>

                                        {/* TikTok */}
                                        <a
                                            href={`https://tiktok.com/@${socials?.tiktok?.username || selectedTeam.id.replace(/-/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
                                        >
                                            <div className="flex items-center gap-3">
                                                <TikTokIcon className="h-5 w-5 text-[#00f2ea]" />
                                                <span className="text-sm text-gray-400">TikTok</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-white">
                                                    {formatNumber(socials?.tiktok?.followers || 0)}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                {hasSquadData && (
                                    <div className="px-8 pt-12 pb-8 max-h-[600px] overflow-y-auto">
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white mb-1">
                                                SQUAD LIST
                                            </h3>
                                            <p className="text-sm text-gray-500">{squadData.length} players</p>
                                        </div>

                                        {playersLoading ? (
                                            <div className="flex items-center justify-center py-12">
                                                <div className="text-gray-400">Loading players...</div>
                                            </div>
                                        ) : squadData.length === 0 ? (
                                            <div className="flex items-center justify-center py-12">
                                                <div className="text-gray-400">No players found</div>
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="border-b border-white/10 text-left text-sm text-gray-400">
                                                            <th className="pb-4 pr-4 font-medium text-center w-12">#</th>
                                                            <th className="pb-4 pr-4 font-medium">Player</th>
                                                            <th className="pb-4 pr-4 font-medium">Position</th>
                                                            <th className="pb-4 pr-4 font-medium">Nationality</th>
                                                            <th className="pb-4 pr-4 font-medium text-right w-32">Market Value</th>
                                                            <th className="pb-4 font-medium text-right w-32">Instagram</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {squadData.map((player, index) => (
                                                            <motion.tr
                                                                key={player.id}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ duration: 0.2, delay: index * 0.02 }}
                                                                className="group border-b border-white/5 transition-colors hover:bg-white/5"
                                                            >
                                                                {/* Rank */}
                                                                <td className="py-4 pr-4 text-center">
                                                                    <span className="font-mono text-sm text-gray-500 group-hover:text-white">
                                                                        {index + 1}
                                                                    </span>
                                                                </td>

                                                                {/* Player Name */}
                                                                <td className="py-4 pr-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-semibold text-white">{player.name}</span>
                                                                        <span>{getCountryFlag(player.nationality)}</span>
                                                                    </div>
                                                                </td>

                                                                {/* Position */}
                                                                <td className="py-4 pr-4">
                                                                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-xs">
                                                                        {player.position}
                                                                    </span>
                                                                </td>

                                                                {/* Nationality */}
                                                                <td className="py-4 pr-4 text-sm text-gray-400">
                                                                    {player.nationality}
                                                                </td>

                                                                {/* Market Value */}
                                                                <td className="py-4 pr-4 text-right">
                                                                    <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                                                        {player.marketValue || "-"}
                                                                    </span>
                                                                </td>

                                                                {/* Instagram Followers */}
                                                                <td className="py-4 text-right">
                                                                    {player.socials?.instagram?.followers ? (
                                                                        <a
                                                                            href={player.socials.instagram.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="font-mono text-sm font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent hover:from-pink-300 hover:to-purple-400 transition-all"
                                                                        >
                                                                            {formatNumber(player.socials.instagram.followers)}
                                                                        </a>
                                                                    ) : (
                                                                        <span className="text-gray-600 text-sm">-</span>
                                                                    )}
                                                                </td>
                                                            </motion.tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div >
                </>
            )}
        </AnimatePresence>
    );
}
