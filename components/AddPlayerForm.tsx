"use client";

import { useState, useEffect } from "react";
import { X, Plus, Save, RefreshCw, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getAllTeams, FirestoreTeam } from "@/lib/teams-firestore";
import {
    addPlayer,
    getAllPlayers,
    deletePlayer,
    calculateTotalFollowers,
    getSocialUrl,
    type Player,
    type NewPlayer
} from "@/lib/players-firestore";

interface AddPlayerFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export function AddPlayerForm({ onClose, onSuccess }: AddPlayerFormProps) {
    const [teams, setTeams] = useState<FirestoreTeam[]>([]);
    const [loading, setLoading] = useState(false);
    const [teamsLoading, setTeamsLoading] = useState(true);

    // Form state
    const [name, setName] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState("");
    const [position, setPosition] = useState("FW");
    const [nationality, setNationality] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState<number | undefined>();
    const [instagramUsername, setInstagramUsername] = useState("");
    const [instagramFollowers, setInstagramFollowers] = useState(0);

    const POSITIONS = [
        { value: "GK", label: "Kaleci" },
        { value: "DF", label: "Defans" },
        { value: "MF", label: "Orta Saha" },
        { value: "FW", label: "Forvet" },
    ];

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = async () => {
        setTeamsLoading(true);
        const allTeams = await getAllTeams();
        // Sort by league then by name
        allTeams.sort((a, b) => {
            if (a.league !== b.league) return a.league.localeCompare(b.league);
            return a.name.localeCompare(b.name);
        });
        setTeams(allTeams);
        setTeamsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !selectedTeamId || !instagramUsername.trim()) {
            toast.error("Lütfen gerekli alanları doldurun");
            return;
        }

        setLoading(true);

        const selectedTeam = teams.find(t => t.id === selectedTeamId);

        const socials = {
            instagram: {
                username: instagramUsername,
                url: getSocialUrl("instagram", instagramUsername),
                followers: instagramFollowers,
            },
            twitter: { username: "", url: "", followers: 0 },
            tiktok: { username: "", url: "", followers: 0 },
        };

        const newPlayer: NewPlayer = {
            name: name.trim(),
            teamId: selectedTeamId,
            teamName: selectedTeam?.name || "",
            league: selectedTeam?.league || "",
            position,
            nationality: nationality.trim(),
            jerseyNumber,
            socials,
            totalFollowers: calculateTotalFollowers(socials),
        };

        try {
            await addPlayer(newPlayer);
            toast.success(`${name} başarıyla eklendi!`);
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Oyuncu eklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    // Group teams by league for dropdown
    const teamsByLeague = teams.reduce((acc, team) => {
        if (!acc[team.league]) acc[team.league] = [];
        acc[team.league].push(team);
        return acc;
    }, {} as Record<string, FirestoreTeam[]>);

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pointer-events-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0A0A] p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Yeni Oyuncu Ekle</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Oyuncu Adı *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="örn: Lionel Messi"
                                className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 px-3 text-white placeholder-gray-600"
                                required
                            />
                        </div>

                        {/* Team */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Takım *
                            </label>
                            {teamsLoading ? (
                                <div className="flex items-center gap-2 text-gray-500">
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Takımlar yükleniyor...
                                </div>
                            ) : (
                                <select
                                    value={selectedTeamId}
                                    onChange={(e) => setSelectedTeamId(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 px-3 text-white"
                                    required
                                >
                                    <option value="">Takım seçin...</option>
                                    {Object.entries(teamsByLeague).map(([league, leagueTeams]) => (
                                        <optgroup key={league} label={league}>
                                            {leagueTeams.map((team) => (
                                                <option key={team.id} value={team.id}>
                                                    {team.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Position & Nationality */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Pozisyon
                                </label>
                                <select
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 px-3 text-white"
                                >
                                    {POSITIONS.map((pos) => (
                                        <option key={pos.value} value={pos.value}>
                                            {pos.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Uyruk
                                </label>
                                <input
                                    type="text"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                    placeholder="örn: Argentina"
                                    className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 px-3 text-white placeholder-gray-600"
                                />
                            </div>
                        </div>

                        {/* Instagram */}
                        <div className="p-3 rounded-lg border border-pink-500/30 bg-pink-500/5">
                            <label className="block text-sm font-medium text-pink-400 mb-2">
                                Instagram *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-xs text-gray-500">Username</span>
                                    <input
                                        type="text"
                                        value={instagramUsername}
                                        onChange={(e) => setInstagramUsername(e.target.value.replace("@", ""))}
                                        placeholder="leomessi"
                                        className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500">Takipçi Sayısı</span>
                                    <input
                                        type="number"
                                        value={instagramFollowers || ""}
                                        onChange={(e) => setInstagramFollowers(parseInt(e.target.value) || 0)}
                                        placeholder="500000000"
                                        className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-pink-600 py-2.5 text-sm font-medium text-white hover:bg-pink-500 disabled:opacity-50"
                            >
                                {loading ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Plus className="h-4 w-4" />
                                )}
                                {loading ? "Ekleniyor..." : "Oyuncu Ekle"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    );
}

