"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllTeams, type FirestoreTeam } from "@/lib/teams-firestore";

// Display team type for compatibility
interface DisplayTeam {
    id: string;
    name: string;
    country: string;
    league: string;
    logo: string;
    platforms: {
        instagram: { followers: number };
        twitter: { followers: number };
        tiktok: { followers: number };
    };
    totalFollowers: number;
}

interface TeamSelectorProps {
    label: string;
    selectedTeam: DisplayTeam | null;
    onSelect: (team: DisplayTeam) => void;
    excludeTeamId?: string;
}

function convertToDisplayTeam(team: FirestoreTeam): DisplayTeam {
    return {
        id: team.id,
        name: team.name,
        country: team.country,
        league: team.league,
        logo: team.logo,
        platforms: {
            instagram: { followers: team.socials.instagram.followers },
            twitter: { followers: team.socials.twitter.followers },
            tiktok: { followers: team.socials.tiktok.followers },
        },
        totalFollowers: team.totalFollowers,
    };
}

export default function TeamSelectorFirestore({
    label,
    selectedTeam,
    onSelect,
    excludeTeamId,
}: TeamSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [teams, setTeams] = useState<DisplayTeam[]>([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch teams from Firestore
    useEffect(() => {
        async function fetchTeams() {
            try {
                const firestoreTeams = await getAllTeams();
                const displayTeams = firestoreTeams.map(convertToDisplayTeam);
                setTeams(displayTeams);
            } catch (error) {
                console.error("Error fetching teams:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredTeams = teams.filter(
        (team) =>
            team.id !== excludeTeamId &&
            team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative w-full max-w-sm" ref={dropdownRef}>
            <label className="mb-2 block text-sm font-medium text-gray-400">
                {label}
            </label>

            <div
                onClick={() => !loading && setIsOpen(!isOpen)}
                className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10",
                    isOpen && "border-blue-500/50 ring-2 ring-blue-500/20",
                    loading && "cursor-not-allowed opacity-50"
                )}
            >
                {loading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        <span className="text-gray-500">Loading teams...</span>
                    </div>
                ) : selectedTeam ? (
                    <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10 p-1">
                            <img
                                src={selectedTeam.logo}
                                alt={selectedTeam.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <span className="font-bold text-white">{selectedTeam.name}</span>
                    </div>
                ) : (
                    <span className="text-gray-500">Select a team...</span>
                )}
                <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform", isOpen && "rotate-180")} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl"
                    >
                        <div className="border-b border-white/10 p-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search teams..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border border-white/5 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto p-2">
                            {filteredTeams.length > 0 ? (
                                filteredTeams.map((team) => (
                                    <div
                                        key={team.id}
                                        onClick={() => {
                                            onSelect(team);
                                            setIsOpen(false);
                                            setSearchQuery("");
                                        }}
                                        className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/10"
                                    >
                                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10 p-1">
                                            <img
                                                src={team.logo}
                                                alt={team.name}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white">{team.name}</span>
                                            <span className="text-xs text-gray-500">{team.league}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500">
                                    No teams found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export type { DisplayTeam };
