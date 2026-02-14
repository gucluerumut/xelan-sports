"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, writeBatch, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LA_LIGA_REAL_SQUADS } from "@/lib/laliga-real-squads";

export default function DebugPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const [seedProgress, setSeedProgress] = useState("");

    const fetchStats = async () => {
        try {
            const playersSnap = await getDocs(collection(db, "players"));
            const teamsSnap = await getDocs(collection(db, "teams"));

            const playersByLeague: Record<string, Record<string, number>> = {};

            playersSnap.forEach((doc) => {
                const p = doc.data();
                const tName = p.teamName || "Unknown";
                const league = p.league || "Unknown League";

                if (!playersByLeague[league]) playersByLeague[league] = {};
                playersByLeague[league][tName] = (playersByLeague[league][tName] || 0) + 1;
            });

            setStats({
                totalPlayers: playersSnap.size,
                totalTeams: teamsSnap.size,
                playersByLeague,
                dbTeamNames: teamsSnap.docs.filter(d => d.data().league === "La Liga").map(d => d.data().name)
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSeed = async () => {
        if (!confirm("Tüm oyuncular silinip La Liga tekrar yüklenecek. Emin misiniz?")) return;
        setSeeding(true);
        setSeedProgress("Başlıyor...");

        try {
            // 1. Delete All Players
            setSeedProgress("Mevcut oyuncular siliniyor...");
            const playersRef = collection(db, "players");
            const snapshot = await getDocs(playersRef);
            let deleted = 0;
            const deleteBatchSize = 100;
            let batch = writeBatch(db);

            for (const d of snapshot.docs) {
                batch.delete(doc(db, "players", d.id));
                deleted++;
                if (deleted % deleteBatchSize === 0) {
                    await batch.commit();
                    batch = writeBatch(db);
                    setSeedProgress(`${deleted} oyuncu silindi...`);
                }
            }
            if (deleted % deleteBatchSize !== 0) await batch.commit();
            setSeedProgress("Tüm oyuncular silindi.");

            // 2. Load Teams Mapping
            setSeedProgress("Takımlar yükleniyor...");
            const teamsSnap = await getDocs(collection(db, "teams"));
            const teamMap = new Map();
            teamsSnap.forEach(d => {
                const data = d.data();
                if (data.league === "La Liga") teamMap.set(data.name, d.id);
            });

            const TEAM_NAME_FIXES: Record<string, string> = {
                "Levante": "Levante UD",
                "Elche": "Elche CF",
                "Atletico Madrid": "Atlético Madrid",
                "Villarreal": "Villarreal CF",
                "Espanyol": "RCD Espanyol",
                "Celta Vigo": "RC Celta",
                "Athletic Bilbao": "Athletic Club",
                "Sevilla": "Sevilla FC",
                "Getafe": "Getafe CF",
                "Osasuna": "CA Osasuna",
                "Deportivo Alaves": "Deportivo Alavés",
                "Valencia": "Valencia CF",
                "Girona": "Girona FC",
                "Real Betis": "Real Betis",
                "Rayo Vallecano": "Rayo Vallecano",
                "Real Valladolid": "Real Valladolid CF",
                "Leganes": "CD Leganés",
                "Las Palmas": "UD Las Palmas",
                "Mallorca": "RCD Mallorca",
                "Real Sociedad": "Real Sociedad"
            };

            // 3. Seed Players
            let totalAdded = 0;
            let batchWrite = writeBatch(db);
            let opCount = 0;

            for (const squad of LA_LIGA_REAL_SQUADS) {
                setSeedProgress(`${squad.teamName} yükleniyor...`);
                const searchName = TEAM_NAME_FIXES[squad.teamName] || squad.teamName;
                const teamId = teamMap.get(searchName);

                if (!teamId) {
                    console.warn(`Team not found: ${squad.teamName}`);
                    continue;
                }

                for (const player of squad.players) {
                    const playerRef = doc(collection(db, "players"));

                    // Simple parse market value
                    let mv = 0;
                    if (player.marketValue) {
                        const cl = player.marketValue.replace(/€|,/g, '').trim();
                        if (cl.toLowerCase().includes('m')) mv = parseFloat(cl) * 1000000;
                        else if (cl.toLowerCase().includes('k')) mv = parseFloat(cl) * 1000;
                    }

                    batchWrite.set(playerRef, {
                        name: player.name,
                        position: player.position?.trim().split('\n').pop()?.trim() || "Unknown",
                        nationality: player.nationality,
                        age: player.age,
                        marketValue: player.marketValue,
                        marketValueNumeric: mv,
                        teamId: teamId,
                        teamName: squad.teamName,
                        league: "La Liga",
                        socials: {
                            instagram: { username: player.instagramUsername || "", followers: player.instagramFollowers || 0 },
                            twitter: { username: "", followers: 0 },
                            tiktok: { username: "", followers: 0 }
                        },
                        totalFollowers: player.instagramFollowers || 0,
                        createdAt: Timestamp.now(),
                        updatedAt: Timestamp.now()
                    });

                    opCount++;
                    totalAdded++;

                    if (opCount >= 100) {
                        await batchWrite.commit();
                        batchWrite = writeBatch(db);
                        opCount = 0;
                        setSeedProgress(`${totalAdded} oyuncu eklendi...`);
                    }
                }
            }
            if (opCount > 0) await batchWrite.commit();

            setSeedProgress(`Tamamlandı! Toplam ${totalAdded} oyuncu.`);
            await fetchStats();

        } catch (e: any) {
            setSeedProgress(`Hata: ${e.message}`);
            console.error(e);
        } finally {
            setSeeding(false);
        }
    };

    if (loading) return <div className="p-10 text-white">Loading stats...</div>;

    return (
        <div className="p-10 text-white font-mono bg-black min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Firestore Debug & Repair</h1>
                <button
                    onClick={handleSeed}
                    disabled={seeding}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-bold disabled:opacity-50"
                >
                    {seeding ? "İşlem Yapılıyor..." : "RESET & SEED LA LIGA"}
                </button>
            </div>

            {seedProgress && (
                <div className="mb-6 p-4 bg-gray-800 border-l-4 border-blue-500 text-blue-400">
                    STATUS: {seedProgress}
                </div>
            )}

            <div className="grid grid-cols-2 gap-8">
                <div className="border p-4 rounded bg-gray-900">
                    <h2 className="text-xl text-blue-400 mb-2">Overview</h2>
                    <p>Total Players: <span className="text-green-400 font-bold">{stats.totalPlayers}</span></p>
                    <p>Total Teams: <span className="text-green-400 font-bold">{stats.totalTeams}</span></p>
                </div>

                <div className="border p-4 rounded bg-gray-900">
                    <h2 className="text-xl text-yellow-400 mb-2">Players by Team & League</h2>
                    <div className="h-96 overflow-y-auto text-sm space-y-4">
                        {stats.playersByLeague && Object.entries(stats.playersByLeague).map(([league, teams]: [string, any]) => (
                            <div key={league}>
                                <h3 className="font-bold text-white mb-1 border-b border-gray-700">{league}</h3>
                                {Object.entries(teams).sort(([, a], [, b]) => (b as number) - (a as number)).map(([name, count]) => (
                                    <div key={name} className="flex justify-between py-1 px-2 hover:bg-white/5 rounded">
                                        <span className="text-gray-300">{name}</span>
                                        <span className={(count as number) < 15 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>{count as number}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border p-4 rounded bg-gray-900 col-span-2">
                    <h2 className="text-xl text-red-400 mb-2">Missing / Mismatched Teams (La Liga Only)</h2>
                    <div className="text-sm space-y-2">
                        {(() => {
                            if (!stats || !stats.totalTeams) return null;

                            // Check for matches
                            const dbTeams = stats.dbTeamNames || [];
                            const missingTeams: string[] = [];

                            const TEAM_NAME_FIXES: Record<string, string> = {
                                "Levante": "Levante UD",
                                "Elche": "Elche CF",
                                "Atletico Madrid": "Atlético Madrid",
                                "Villarreal": "Villarreal CF",
                                "Espanyol": "RCD Espanyol",
                                "Celta Vigo": "RC Celta",
                                "Athletic Bilbao": "Athletic Club",
                                "Sevilla": "Sevilla FC",
                                "Getafe": "Getafe CF",
                                "Osasuna": "CA Osasuna",
                                "Deportivo Alaves": "Deportivo Alavés",
                                "Valencia": "Valencia CF",
                                "Girona": "Girona FC",
                                "Real Betis": "Real Betis",
                                "Rayo Vallecano": "Rayo Vallecano",
                                "Real Valladolid": "Real Valladolid CF",
                                "Leganes": "CD Leganés",
                                "Las Palmas": "UD Las Palmas",
                                "Mallorca": "RCD Mallorca",
                                "Real Sociedad": "Real Sociedad"
                            };

                            LA_LIGA_REAL_SQUADS.forEach(squad => {
                                const searchName = TEAM_NAME_FIXES[squad.teamName] || squad.teamName;
                                if (!dbTeams.includes(searchName)) {
                                    missingTeams.push(`${squad.teamName} (Searched: ${searchName})`);
                                }
                            });

                            if (missingTeams.length === 0) return <div className="text-green-500">All 20 teams matched!</div>;

                            return (
                                <div>
                                    <p className="text-red-300 mb-2 font-bold">{missingTeams.length} teams not found in DB:</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {missingTeams.map(name => (
                                            <div key={name} className="bg-red-900/40 p-2 rounded text-red-200">
                                                ❌ {name}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 text-xs text-gray-500">
                                        Last Check: {new Date().toLocaleTimeString()}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}
