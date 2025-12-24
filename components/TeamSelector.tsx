"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import { MOCK_TEAMS, Team } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface TeamSelectorProps {
    label: string;
    selectedTeam: Team | null;
    onSelect: (team: Team) => void;
    excludeTeamId?: string;
}

export default function TeamSelector({
    label,
    selectedTeam,
    onSelect,
    excludeTeamId,
}: TeamSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const filteredTeams = MOCK_TEAMS.filter(
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
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10",
                    isOpen && "border-blue-500/50 ring-2 ring-blue-500/20"
                )}
            >
                {selectedTeam ? (
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
                                            <span className="text-xs text-gray-500">{team.country}</span>
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
