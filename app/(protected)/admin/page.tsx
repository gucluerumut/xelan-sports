"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Settings, Save, RefreshCw, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
    getTeamsByLeague,
    updateTeam,
    seedPremierLeagueTeams,
    FirestoreTeam
} from "@/lib/teams-firestore";
import { UndoHistoryPanel } from "@/components/UndoHistoryPanel";
import { saveToHistory } from "@/lib/edit-history";
import { useInvalidateTeams } from "@/hooks/useTeamsQuery";
import { PlayerManagementPanel } from "@/components/PlayerManagementPanel";

export default function AdminPage() {
    const [teams, setTeams] = useState<FirestoreTeam[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const [editingTeam, setEditingTeam] = useState<FirestoreTeam | null>(null);
    const [saving, setSaving] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState("Premier League");
    const [activeTab, setActiveTab] = useState<"teams" | "players">("teams");
    const invalidateTeams = useInvalidateTeams();

    const LEAGUES = ["Premier League", "La Liga", "Serie A", "Ligue 1", "Süper Lig"];

    // Load teams when league changes
    useEffect(() => {
        loadTeams();
    }, [selectedLeague]);

    const loadTeams = async () => {
        setLoading(true);
        const fetchedTeams = await getTeamsByLeague(selectedLeague);
        setTeams(fetchedTeams);
        setLoading(false);
    };

    const handleSeedTeams = async () => {
        setSeeding(true);
        const result = await seedPremierLeagueTeams();
        if (result.success > 0) {
            toast.success(`${result.success} takım başarıyla yüklendi!`);
            await loadTeams();
        }
        if (result.failed > 0) {
            toast.error(`${result.failed} takım yüklenemedi`);
        }
        setSeeding(false);
    };

    const handleSaveTeam = async () => {
        if (!editingTeam) return;

        // Find original team data for history
        const originalTeam = teams.find(t => t.id === editingTeam.id);

        setSaving(true);
        const success = await updateTeam(editingTeam.id, {
            socials: editingTeam.socials,
            logo: editingTeam.logo,
        });

        if (success) {
            // Save to history for undo
            if (originalTeam) {
                // Save Instagram changes
                if (originalTeam.socials.instagram.followers !== editingTeam.socials.instagram.followers) {
                    await saveToHistory(
                        "team",
                        editingTeam.id,
                        editingTeam.name,
                        "socials.instagram.followers",
                        originalTeam.socials.instagram.followers,
                        editingTeam.socials.instagram.followers
                    );
                }
                if (originalTeam.socials.instagram.username !== editingTeam.socials.instagram.username) {
                    await saveToHistory(
                        "team",
                        editingTeam.id,
                        editingTeam.name,
                        "socials.instagram.username",
                        originalTeam.socials.instagram.username,
                        editingTeam.socials.instagram.username
                    );
                }
                // Save Twitter changes
                if (originalTeam.socials.twitter.followers !== editingTeam.socials.twitter.followers) {
                    await saveToHistory(
                        "team",
                        editingTeam.id,
                        editingTeam.name,
                        "socials.twitter.followers",
                        originalTeam.socials.twitter.followers,
                        editingTeam.socials.twitter.followers
                    );
                }
            }
            toast.success("Takım güncellendi!");
            await loadTeams();
            invalidateTeams(); // Clear React Query cache so rankings page gets fresh data
            setEditingTeam(null);
        } else {
            toast.error("Güncelleme başarısız!");
        }
        setSaving(false);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

    return (
        <main className="flex min-h-screen flex-col bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-24">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Settings className="h-8 w-8 text-blue-500" />
                            Admin Panel
                        </h1>
                        <p className="text-gray-400">
                            {activeTab === "teams" ? "Tüm liglerdeki takım verilerini yönetin" : "Oyuncu verilerini yönetin"}
                        </p>
                    </div>

                    {teams.length === 0 && !loading && (
                        <button
                            onClick={handleSeedTeams}
                            disabled={seeding}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-500 active:scale-95 disabled:opacity-50"
                        >
                            <RefreshCw className={cn("h-4 w-4", seeding && "animate-spin")} />
                            {seeding ? "Yükleniyor..." : "Verileri Yükle"}
                        </button>
                    )}
                </div>

                {/* Tab Selector */}
                <div className="mb-6 flex gap-2">
                    <button
                        onClick={() => setActiveTab("teams")}
                        className={cn(
                            "px-6 py-3 rounded-lg font-semibold transition-all active:scale-95",
                            activeTab === "teams"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        )}
                    >
                        Takımlar
                    </button>
                    <button
                        onClick={() => setActiveTab("players")}
                        className={cn(
                            "px-6 py-3 rounded-lg font-semibold transition-all active:scale-95",
                            activeTab === "players"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        )}
                    >
                        Oyuncular
                    </button>
                </div>

                {/* Teams Tab */}
                {activeTab === "teams" && (
                    <>
                        {/* League Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Lig Seçin
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {LEAGUES.map((league) => (
                                    <button
                                        key={league}
                                        onClick={() => setSelectedLeague(league)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg font-medium transition-all active:scale-95",
                                            selectedLeague === league
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                        )}
                                    >
                                        {league}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
                                <p className="text-gray-400">Takımlar yükleniyor...</p>
                            </div>
                        ) : teams.length === 0 ? (
                            <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/5">
                                <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                                <h2 className="text-xl font-bold mb-2">Henüz veri yok</h2>
                                <p className="text-gray-400 mb-4">Premier League verilerini yüklemek için butona tıklayın</p>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/5">
                                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">Takım</th>
                                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">Instagram</th>
                                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">Twitter</th>
                                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-400">TikTok</th>
                                            <th className="py-4 px-4 text-right text-sm font-medium text-gray-400">Toplam</th>
                                            <th className="py-4 px-4 text-center text-sm font-medium text-gray-400">İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teams.map((team) => (
                                            <motion.tr
                                                key={team.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="border-b border-white/5 hover:bg-white/5"
                                            >
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={team.logo} alt={team.name} className="h-8 w-8 object-contain" />
                                                        <span className="font-medium">{team.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="text-sm">
                                                        <span className="text-gray-400">@</span>
                                                        <span className="text-[#E1306C]">{team.socials.instagram.username}</span>
                                                        <div className="text-xs text-gray-500">{formatNumber(team.socials.instagram.followers)}</div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="text-sm">
                                                        <span className="text-gray-400">@</span>
                                                        <span className="text-[#1DA1F2]">{team.socials.twitter.username}</span>
                                                        <div className="text-xs text-gray-500">{formatNumber(team.socials.twitter.followers)}</div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="text-sm">
                                                        <span className="text-gray-400">@</span>
                                                        <span className="text-[#00f2ea]">{team.socials.tiktok.username}</span>
                                                        <div className="text-xs text-gray-500">{formatNumber(team.socials.tiktok.followers)}</div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-right font-mono font-bold">
                                                    {formatNumber(team.totalFollowers)}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <button
                                                        onClick={() => setEditingTeam(team)}
                                                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 active:scale-95"
                                                    >
                                                        Düzenle
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>

                                {teams.length > 0 && teams[0].updatedAt && (
                                    <div className="px-4 py-3 bg-white/5 border-t border-white/10 text-sm text-gray-500">
                                        Son güncelleme: {new Date(teams[0].updatedAt).toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Player Management Section */}
                        <PlayerManagementPanel />

                        {/* Undo History Panel */}
                        <UndoHistoryPanel className="mt-8" onUndo={loadTeams} />
                    </>
                )}

                {/* Players Tab */}
                {activeTab === "players" && (
                    <PlayerManagementPanel />
                )}
            </div>

            {/* Edit Modal */}
            {editingTeam && (
                <>
                    <div
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={() => setEditingTeam(null)}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="pointer-events-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#0A0A0A] p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <img src={editingTeam.logo} alt={editingTeam.name} className="h-12 w-12 object-contain" />
                                <h2 className="text-xl font-bold">{editingTeam.name}</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Instagram */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#E1306C]">Instagram</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <span className="text-xs text-gray-500">Username</span>
                                            <input
                                                type="text"
                                                value={editingTeam.socials.instagram.username}
                                                onChange={(e) => setEditingTeam({
                                                    ...editingTeam,
                                                    socials: {
                                                        ...editingTeam.socials,
                                                        instagram: { ...editingTeam.socials.instagram, username: e.target.value }
                                                    }
                                                })}
                                                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500">Takipçi</span>
                                            <input
                                                type="number"
                                                value={editingTeam.socials.instagram.followers}
                                                onChange={(e) => setEditingTeam({
                                                    ...editingTeam,
                                                    socials: {
                                                        ...editingTeam.socials,
                                                        instagram: { ...editingTeam.socials.instagram, followers: parseInt(e.target.value) || 0 }
                                                    }
                                                })}
                                                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Twitter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#1DA1F2]">Twitter</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <span className="text-xs text-gray-500">Username</span>
                                            <input
                                                type="text"
                                                value={editingTeam.socials.twitter.username}
                                                onChange={(e) => setEditingTeam({
                                                    ...editingTeam,
                                                    socials: {
                                                        ...editingTeam.socials,
                                                        twitter: { ...editingTeam.socials.twitter, username: e.target.value }
                                                    }
                                                })}
                                                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500">Takipçi</span>
                                            <input
                                                type="number"
                                                value={editingTeam.socials.twitter.followers}
                                                onChange={(e) => setEditingTeam({
                                                    ...editingTeam,
                                                    socials: {
                                                        ...editingTeam.socials,
                                                        twitter: { ...editingTeam.socials.twitter, followers: parseInt(e.target.value) || 0 }
                                                    }
                                                })}
                                                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* TikTok */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#00f2ea]">TikTok</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <span className="text-xs text-gray-500">Username</span>
                                            <input
                                                type="text"
                                                value={editingTeam.socials.tiktok.username}
                                                onChange={(e) => setEditingTeam({
                                                    ...editingTeam,
                                                    socials: {
                                                        ...editingTeam.socials,
                                                        tiktok: { ...editingTeam.socials.tiktok, username: e.target.value }
                                                    }
                                                })}
                                                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                            />
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500">Takipçi</span>
                                            <input
                                                type="number"
                                                value={editingTeam.socials.tiktok.followers}
                                                onChange={(e) => setEditingTeam({
                                                    ...editingTeam,
                                                    socials: {
                                                        ...editingTeam.socials,
                                                        tiktok: { ...editingTeam.socials.tiktok, followers: parseInt(e.target.value) || 0 }
                                                    }
                                                })}
                                                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 px-3 text-sm text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setEditingTeam(null)}
                                    className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleSaveTeam}
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    {saving ? "Kaydediliyor..." : "Kaydet"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </main>
    );
}
