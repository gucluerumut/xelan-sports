"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
    getAllPlayers,
    getPlayersByTeam,
    updatePlayer,
    deletePlayer,
    transferPlayer,
    deleteAllPlayers,
    seedLaLigaFullSquads,
    calculateTotalFollowers,
    Player,
} from "@/lib/players-firestore";
import { getTeamsByLeague, getAllTeams, FirestoreTeam } from "@/lib/teams-firestore";
import {
    Search,
    Edit,
    Trash2,
    ArrowRightLeft,
    Plus,
    RefreshCw,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AddPlayerForm } from "@/components/AddPlayerForm";

import { useQueryClient } from "@tanstack/react-query";

export function PlayerManagementPanel() {
    const queryClient = useQueryClient();
    const [players, setPlayers] = useState<Player[]>([]);
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
    const [teams, setTeams] = useState<FirestoreTeam[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
    const [deletingPlayer, setDeletingPlayer] = useState<Player | null>(null);
    const [transferringPlayer, setTransferringPlayer] = useState<Player | null>(null);
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const [seedingLaLiga, setSeedingLaLiga] = useState(false);


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        let filtered = players;
        if (selectedTeam !== "all") {
            filtered = filtered.filter((p) => p.teamId === selectedTeam);
        }
        if (searchQuery) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredPlayers(filtered);
    }, [players, selectedTeam, searchQuery]);

    const loadData = async () => {
        setLoading(true);
        let playersData: Player[] = [];
        try {
            const [fetchedPlayers, premierTeams, laLigaTeams, serieATeams, ligue1Teams, superLigTeams] = await Promise.all([
                getAllPlayers(),
                getTeamsByLeague("Premier League"),
                getTeamsByLeague("La Liga"),
                getTeamsByLeague("Serie A"),
                getTeamsByLeague("Ligue 1"),
                getTeamsByLeague("Süper Lig"),
            ]);
            playersData = fetchedPlayers;
            setPlayers(playersData);
            setTeams([...premierTeams, ...laLigaTeams, ...serieATeams, ...ligue1Teams, ...superLigTeams]);
        } catch (error) {
            console.error("Error loading data:", error);
            toast.error("Veri yüklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const handleSeedLaLiga = async () => {
        setSeedingLaLiga(true);
        try {
            // Delete all existing players first
            const deletedCount = await deleteAllPlayers();
            if (deletedCount > 0) {
                toast.success(`${deletedCount} eski oyuncu silindi`);
            }

            // Seed complete La Liga squads (all 20 teams)
            const result = await seedLaLigaFullSquads();
            toast.success(`✅ ${result.totalPlayers} oyuncu eklendi! ${result.teams.length} takım yüklendi.`);

            // Reload data
            await loadData();
        } catch (error) {
            console.error("Error seeding La Liga:", error);
            toast.error("La Liga kadroları yüklenirken hata oluştu");
        } finally {
            setSeedingLaLiga(false);
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

    const handleDeletePlayer = async (player: Player) => {
        try {
            await deletePlayer(player.id);
            toast.success("Oyuncu silindi");
            setDeletingPlayer(null);

            // Invalidate queries for sync
            queryClient.invalidateQueries({ queryKey: ["players"] });
            queryClient.invalidateQueries({ queryKey: ["teams"] });

            loadData();
        } catch (error) {
            console.error("Error deleting player:", error);
            toast.error("Silme işlemi başarısız");
        }
    };

    const handleTransferPlayer = async (player: Player, newTeamId: string) => {
        const newTeam = teams.find((t) => t.id === newTeamId);
        if (!newTeam) return;

        try {
            const success = await transferPlayer(
                player.id,
                newTeam.id,
                newTeam.name,
                newTeam.league
            );

            if (success) {
                toast.success(`${player.name} ${newTeam.name}'e transfer edildi`);
                await loadData();
                setTransferringPlayer(null);
            } else {
                toast.error("Transfer işlemi başarısız");
            }
        } catch (error) {
            console.error("Error transferring player:", error);
            toast.error("Transfer işlemi başarısız");
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
                <p className="text-gray-400">Oyuncular yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="h-6 w-6 text-blue-500" />
                        Oyuncu Yönetimi
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {filteredPlayers.length} oyuncu
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSeedLaLiga}
                        disabled={seedingLaLiga}
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-red-500 hover:to-blue-500 active:scale-95 disabled:opacity-50"
                    >
                        {seedingLaLiga ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="h-4 w-4" />
                        )}
                        {seedingLaLiga ? "Yükleniyor..." : "La Liga Kadroları Yükle"}
                    </button>
                    <button
                        onClick={() => setShowAddPlayerModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-500 active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        Yeni Oyuncu
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                {/* Team Filter */}
                <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">Tüm Takımlar</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name} ({team.league})
                        </option>
                    ))}
                </select>

                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Oyuncu ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg bg-gray-800 border border-white/10 pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Players Table */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                                Oyuncu
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                                Takım
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                                Pozisyon
                            </th>

                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                                Piyasa Değeri
                            </th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">
                                Instagram
                            </th>
                            <th className="py-4 px-4 text-center text-sm font-medium text-gray-400">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-12 text-center text-gray-400">
                                    Oyuncu bulunamadı
                                </td>
                            </tr>
                        ) : (
                            filteredPlayers.map((player) => (
                                <motion.tr
                                    key={player.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-b border-white/5 hover:bg-white/5"
                                >
                                    {/* Player Name */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {player.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">
                                                    {player.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {player.nationality}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Team */}
                                    <td className="py-4 px-4">
                                        <div className="text-sm text-white">
                                            {player.teamName}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {player.league}
                                        </div>
                                    </td>

                                    {/* Position */}
                                    <td className="py-4 px-4">
                                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono">
                                            {player.position}
                                        </span>
                                    </td>

                                    {/* Age */}


                                    {/* Market Value */}
                                    <td className="py-4 px-4">
                                        <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                            {player.marketValue || "-"}
                                        </span>
                                    </td>

                                    {/* Instagram */}
                                    <td className="py-4 px-4 text-sm text-gray-300">
                                        {player.socials?.instagram?.followers
                                            ? formatNumber(player.socials.instagram.followers)
                                            : "-"}
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => setEditingPlayer(player)}
                                                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                                                title="Düzenle"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setTransferringPlayer(player)}
                                                className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all"
                                                title="Transfer"
                                            >
                                                <ArrowRightLeft className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeletingPlayer(player)}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                                                title="Sil"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {deletingPlayer && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-2xl border border-white/10 p-6 max-w-md w-full mx-4"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">
                            Oyuncuyu Sil
                        </h3>
                        <p className="text-gray-400 mb-6">
                            <span className="font-semibold text-white">
                                {deletingPlayer.name}
                            </span>{" "}
                            oyuncusunu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeletingPlayer(null)}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
                            >
                                İptal
                            </button>
                            <button
                                onClick={() => handleDeletePlayer(deletingPlayer)}
                                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-all"
                            >
                                Sil
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Transfer Modal */}
            {transferringPlayer && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-2xl border border-white/10 p-6 max-w-md w-full mx-4"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">
                            Oyuncu Transferi
                        </h3>
                        <div className="mb-6">
                            <p className="text-gray-400 mb-2">
                                <span className="font-semibold text-white">
                                    {transferringPlayer.name}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Mevcut Takım: {transferringPlayer.teamName}
                            </p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Hedef Takım
                            </label>
                            <select
                                id="transfer-team"
                                className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Takım seçin...</option>
                                {teams
                                    .filter((t) => t.id !== transferringPlayer.teamId)
                                    .map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name} ({team.league})
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setTransferringPlayer(null)}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
                            >
                                İptal
                            </button>
                            <button
                                onClick={() => {
                                    const select = document.getElementById(
                                        "transfer-team"
                                    ) as HTMLSelectElement;
                                    if (select.value) {
                                        handleTransferPlayer(transferringPlayer, select.value);
                                    }
                                }}
                                className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-all"
                            >
                                Transfer Et
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Edit Player Modal */}
            {editingPlayer && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-2xl border border-white/10 p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                    >
                        <h3 className="text-xl font-bold text-white mb-6">
                            Oyuncu Düzenle
                        </h3>

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Oyuncu Adı
                                </label>
                                <input
                                    type="text"
                                    value={editingPlayer.name}
                                    onChange={(e) =>
                                        setEditingPlayer({ ...editingPlayer, name: e.target.value })
                                    }
                                    className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Position */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Pozisyon
                                </label>
                                <select
                                    value={editingPlayer.position}
                                    onChange={(e) =>
                                        setEditingPlayer({ ...editingPlayer, position: e.target.value })
                                    }
                                    className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="GK">GK - Kaleci</option>
                                    <option value="DEF">DEF - Defans</option>
                                    <option value="MID">MID - Orta Saha</option>
                                    <option value="FWD">FWD - Forvet</option>
                                </select>
                            </div>



                            {/* Market Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Piyasa Değeri (örn: €80M)
                                </label>
                                <input
                                    type="text"
                                    value={editingPlayer.marketValue || ""}
                                    onChange={(e) =>
                                        setEditingPlayer({
                                            ...editingPlayer,
                                            marketValue: e.target.value,
                                        })
                                    }
                                    placeholder="€80M"
                                    className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Instagram Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Instagram Kullanıcı Adı
                                </label>
                                <input
                                    type="text"
                                    value={editingPlayer.socials?.instagram?.username || ""}
                                    onChange={(e) =>
                                        setEditingPlayer({
                                            ...editingPlayer,
                                            socials: {
                                                ...editingPlayer.socials,
                                                instagram: {
                                                    ...editingPlayer.socials?.instagram,
                                                    username: e.target.value,
                                                    followers: editingPlayer.socials?.instagram?.followers || 0,
                                                },
                                            },
                                        })
                                    }
                                    placeholder="username"
                                    className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Instagram Followers */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Instagram Takipçi Sayısı
                                </label>
                                <input
                                    type="number"
                                    value={editingPlayer.socials?.instagram?.followers || ""}
                                    onChange={(e) =>
                                        setEditingPlayer({
                                            ...editingPlayer,
                                            socials: {
                                                ...editingPlayer.socials,
                                                instagram: {
                                                    ...editingPlayer.socials?.instagram,
                                                    username: editingPlayer.socials?.instagram?.username || "",
                                                    followers: parseInt(e.target.value) || 0,
                                                },
                                            },
                                        })
                                    }
                                    className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Fotoğraf URL
                                </label>
                                <input
                                    type="text"
                                    value={editingPlayer.photo || ""}
                                    onChange={(e) =>
                                        setEditingPlayer({
                                            ...editingPlayer,
                                            photo: e.target.value,
                                        })
                                    }
                                    placeholder="https://..."
                                    className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setEditingPlayer(null)}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
                            >
                                İptal
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        // Calculate new total followers
                                        const newTotalFollowers = calculateTotalFollowers(editingPlayer.socials || {});

                                        // Sanitize fields to avoid "undefined" in Firestore
                                        await updatePlayer(editingPlayer.id, {
                                            name: editingPlayer.name,
                                            position: editingPlayer.position,

                                            marketValue: editingPlayer.marketValue ?? null,
                                            photo: editingPlayer.photo ?? null,
                                            socials: editingPlayer.socials,
                                            totalFollowers: newTotalFollowers
                                        });

                                        // Invalidate queries for sync
                                        queryClient.invalidateQueries({ queryKey: ["players"] });
                                        queryClient.invalidateQueries({ queryKey: ["teams"] });

                                        toast.success(`${editingPlayer.name} güncellendi`);
                                        await loadData();
                                        setEditingPlayer(null);
                                    } catch (error) {
                                        console.error("Error updating player:", error);
                                        toast.error("Güncelleme başarısız");
                                    }
                                }}
                                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all"
                            >
                                Kaydet
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Add Player Modal */}
            {showAddPlayerModal && (
                <AddPlayerForm
                    onClose={() => setShowAddPlayerModal(false)}
                    onSuccess={loadData}
                />
            )}
        </div>
    );
}
