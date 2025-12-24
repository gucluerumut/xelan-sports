"use client";

import { useTeamModal } from "@/context/TeamModalContext";
import { AnimatePresence, motion } from "framer-motion";
import { X, Instagram, Twitter, ExternalLink } from "lucide-react";
import { TikTokIcon } from "./RankingsTable";

export default function TeamModal() {
    const { isOpen, selectedTeam, closeModal } = useTeamModal();

    if (!isOpen || !selectedTeam) return null;

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

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
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl"
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

                            <div className="relative px-8 pt-12 pb-8">
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
                                <div className="mb-8 grid grid-cols-3 gap-4">
                                    {/* Instagram */}
                                    <a
                                        href={`https://instagram.com/${selectedTeam.id.replace(/-/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl border border-white/5 bg-white/5 p-4 text-center transition-colors hover:bg-white/10 block"
                                    >
                                        <Instagram className="mx-auto mb-2 h-5 w-5 text-[#E1306C]" />
                                        <div className="text-lg font-bold text-white">
                                            {formatNumber(selectedTeam.platforms.instagram.followers)}
                                        </div>
                                        <div className="text-xs text-gray-500">Followers</div>
                                    </a>

                                    {/* Twitter */}
                                    <a
                                        href={`https://twitter.com/${selectedTeam.id.replace(/-/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl border border-white/5 bg-white/5 p-4 text-center transition-colors hover:bg-white/10 block"
                                    >
                                        <Twitter className="mx-auto mb-2 h-5 w-5 text-[#1DA1F2]" />
                                        <div className="text-lg font-bold text-white">
                                            {formatNumber(selectedTeam.platforms.twitter.followers)}
                                        </div>
                                        <div className="text-xs text-gray-500">Followers</div>
                                    </a>

                                    {/* TikTok */}
                                    <a
                                        href={`https://tiktok.com/@${selectedTeam.id.replace(/-/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl border border-white/5 bg-white/5 p-4 text-center transition-colors hover:bg-white/10 block"
                                    >
                                        <TikTokIcon className="mx-auto mb-2 h-5 w-5 text-[#00f2ea]" />
                                        <div className="text-lg font-bold text-white">
                                            {formatNumber(selectedTeam.platforms.tiktok.followers)}
                                        </div>
                                        <div className="text-xs text-gray-500">Followers</div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
