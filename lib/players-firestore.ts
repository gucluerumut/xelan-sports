/**
 * Firestore functions for Players collection
 */

import { db } from "./firebase";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    Timestamp,
} from "firebase/firestore";

export interface PlayerSocials {
    instagram: {
        username: string;
        url: string;
        followers: number;
    };
    twitter: {
        username: string;
        url: string;
        followers: number;
    };
    tiktok: {
        username: string;
        url: string;
        followers: number;
    };
}

export interface Player {
    id: string;
    name: string;
    teamId: string;
    teamName: string;
    league: string;
    position: string;
    nationality: string;
    jerseyNumber?: number;
    age?: number;
    photo?: string | null;
    socials: PlayerSocials;
    totalFollowers: number;
    // Transfermarkt data
    marketValue?: string | null; // e.g., "€80M"
    marketValueNumeric?: number; // For sorting
    transfermarktId?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export type NewPlayer = Omit<Player, "id" | "createdAt" | "updatedAt">;

const PLAYERS_COLLECTION = "players";

/**
 * Get all players
 */
export async function getAllPlayers(): Promise<Player[]> {
    const playersRef = collection(db, PLAYERS_COLLECTION);
    const snapshot = await getDocs(playersRef);

    const players = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Player[];

    // Sort client-side to avoid Firestore index requirement
    return players.sort((a, b) => (b.totalFollowers || 0) - (a.totalFollowers || 0));
}

/**
 * Get top N players by market value
 * Used for performance optimization - only load most valuable players
 */
export async function getTopPlayers(limit = 50): Promise<Player[]> {
    const playersRef = collection(db, PLAYERS_COLLECTION);
    const snapshot = await getDocs(playersRef);

    const players = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Player[];

    // Sort by market value (numeric) descending
    return players
        .sort((a, b) => (b.marketValueNumeric || 0) - (a.marketValueNumeric || 0))
        .slice(0, limit);
}

/**
 * Get players by team
 */
export async function getPlayersByTeam(teamId: string): Promise<Player[]> {
    const playersRef = collection(db, PLAYERS_COLLECTION);
    const q = query(
        playersRef,
        where("teamId", "==", teamId)
    );
    const snapshot = await getDocs(q);

    const players = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Player[];

    return players.sort((a, b) => (b.totalFollowers || 0) - (a.totalFollowers || 0));
}

/**
 * Get players by league
 */
export async function getPlayersByLeague(league: string): Promise<Player[]> {
    const playersRef = collection(db, PLAYERS_COLLECTION);
    const q = query(
        playersRef,
        where("league", "==", league)
    );
    const snapshot = await getDocs(q);

    const players = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Player[];

    return players.sort((a, b) => (b.totalFollowers || 0) - (a.totalFollowers || 0));
}

/**
 * Get single player by ID
 */
export async function getPlayerById(id: string): Promise<Player | null> {
    const docRef = doc(db, PLAYERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data(),
        } as Player;
    }
    return null;
}

/**
 * Helper to format follower count
 */
export function formatFollowerCount(count: number): string {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + "M";
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
}

/**
 * Delete all players
 */
export async function deleteAllPlayers(): Promise<number> {
    const playersRef = collection(db, PLAYERS_COLLECTION);
    const snapshot = await getDocs(playersRef);

    let deletedCount = 0;
    for (const playerDoc of snapshot.docs) {
        await deleteDoc(doc(db, PLAYERS_COLLECTION, playerDoc.id));
        deletedCount++;
    }

    return deletedCount;
}

/**
 * Seed La Liga squads
 */
export async function seedLaLigaSquads(): Promise<{ totalPlayers: number; teams: string[] }> {
    const { LA_LIGA_SQUADS } = await import("./laliga-squads");
    const { getAllTeams } = await import("./teams-firestore");

    const allTeams = await getAllTeams();
    const playersRef = collection(db, PLAYERS_COLLECTION);

    let totalPlayers = 0;
    const loadedTeams: string[] = [];

    for (const squadData of LA_LIGA_SQUADS) {
        // Find matching team in Firestore
        const team = allTeams.find(
            (t) => t.name.toLowerCase().includes(squadData.teamName.toLowerCase()) ||
                squadData.teamName.toLowerCase().includes(t.name.toLowerCase())
        );

        if (!team) {
            console.warn(`Team not found: ${squadData.teamName}`);
            continue;
        }

        // Add players for this team
        for (const player of squadData.players) {
            const playerData = {
                name: player.name,
                teamId: team.id,
                teamName: team.name,
                league: team.league,
                position: player.position,
                nationality: player.nationality,
                age: player.age,
                marketValue: player.marketValue,
                socials: {
                    instagram: {
                        username: player.instagramUsername || "",
                        url: player.instagramUsername ? `https://instagram.com/${player.instagramUsername}` : "",
                        followers: player.instagramFollowers || 0,
                    },
                    twitter: {
                        username: "",
                        url: "",
                        followers: 0,
                    },
                    tiktok: {
                        username: "",
                        url: "",
                        followers: 0,
                    },
                },
                totalFollowers: player.instagramFollowers || 0,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };

            await addDoc(playersRef, playerData);
            totalPlayers++;
        }

        loadedTeams.push(team.name);
    }

    return { totalPlayers, teams: loadedTeams };
}

/**
 * Seed complete La Liga squads (all 20 teams)
 * Uses batch writes for optimal performance (~50x faster)
 * Data source: Real Transfermarkt scraping
 */
export async function seedLaLigaFullSquads(): Promise<{ totalPlayers: number; teams: string[] }> {
    const { LA_LIGA_REAL_SQUADS } = await import('./laliga-real-squads');
    const { getTeamsByLeague } = await import('./teams-firestore');
    const { writeBatch } = await import('firebase/firestore');

    const laLigaTeams = await getTeamsByLeague("La Liga");
    const teamMap = new Map(laLigaTeams.map(t => [t.name, t.id]));

    // Fix specific team name mismatches
    const TEAM_NAME_FIXES: Record<string, string> = {
        "Levante": "Levante UD",
        "Elche": "Elche CF"
    };

    let totalPlayers = 0;
    const loadedTeams: string[] = [];
    let batch = writeBatch(db);
    let batchCount = 0;
    const BATCH_SIZE = 50; // Firestore batch limit (reduced for debugging)

    console.log(`Starting seed process for ${LA_LIGA_REAL_SQUADS.length} teams...`);

    for (const squad of LA_LIGA_REAL_SQUADS) {
        console.log(`Processing ${squad.teamName}: ${squad.players.length} players in source.`);

        // Use mapped name if exists, otherwise use squad name
        const searchName = TEAM_NAME_FIXES[squad.teamName] || squad.teamName;
        const teamId = teamMap.get(searchName);

        if (!teamId) {
            console.warn(`Team not found: ${squad.teamName} (searched as: ${searchName})`);
            continue;
        }

        for (const playerData of squad.players) {
            const instagramFollowers = playerData.instagramFollowers || 0;

            // Parse market value to numeric for sorting
            const parseMarketValue = (value: string): number => {
                if (!value) return 0;
                // Remove € and spaces
                const cleaned = value.replace(/€|,/g, '').trim();
                // Check for millions (m) or billions (bn)
                if (cleaned.toLowerCase().includes('m')) {
                    return parseFloat(cleaned) * 1_000_000;
                } else if (cleaned.toLowerCase().includes('bn')) {
                    return parseFloat(cleaned) * 1_000_000_000;
                } else if (cleaned.toLowerCase().includes('k')) {
                    return parseFloat(cleaned) * 1_000;
                }
                return parseFloat(cleaned) || 0;
            };

            const player: Omit<Player, 'id'> = {
                name: playerData.name,
                position: playerData.position,
                nationality: playerData.nationality,
                marketValue: playerData.marketValue,
                marketValueNumeric: parseMarketValue(playerData.marketValue || ''),
                teamId: teamId,
                teamName: squad.teamName,
                league: "La Liga",
                socials: {
                    instagram: {
                        username: playerData.instagramUsername || '',
                        url: playerData.instagramUsername ? `https://instagram.com/${playerData.instagramUsername}` : '',
                        followers: instagramFollowers,
                    },
                    twitter: {
                        username: '',
                        url: '',
                        followers: 0,
                    },
                    tiktok: {
                        username: '',
                        url: '',
                        followers: 0,
                    },
                },
                totalFollowers: instagramFollowers,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };

            // Add to batch instead of individual write
            const playerRef = doc(collection(db, 'players'));
            batch.set(playerRef, player);
            batchCount++;
            totalPlayers++;

            // Commit batch when reaching limit
            if (batchCount >= BATCH_SIZE) {
                try {
                    await batch.commit();
                    console.log(`✓ Batch committed: ${totalPlayers} players loaded...`);
                } catch (error) {
                    console.error(`ERROR committing batch at ${totalPlayers} players:`, error);
                }
                batch = writeBatch(db);
                batchCount = 0;
            }
        }

        loadedTeams.push(squad.teamName);
        console.log(`✓ ${squad.teamName}: ${squad.players.length} players added`);
    }

    // Commit remaining players
    if (batchCount > 0) {
        await batch.commit();
        console.log(`✓ Final batch: ${totalPlayers} total players loaded`);
    }

    return { totalPlayers, teams: loadedTeams };
}

/**
 * Seed Barcelona squad
 */
export async function seedBarcelonaSquad(barcelonaTeamId: string, barcelonaTeamName: string, league: string): Promise<number> {
    const BARCELONA_SQUAD = [
        { name: "Lamine Yamal", position: "RW", nationality: "Spain", age: 18, marketValue: "€200M", instagramUsername: "lamineyamal", instagramFollowers: 18500000 },
        { name: "Pedri", position: "CM", nationality: "Spain", age: 23, marketValue: "€140M", instagramUsername: "pedri", instagramFollowers: 15200000 },
        { name: "Raphinha", position: "LW", nationality: "Brazil", age: 29, marketValue: "€90M", instagramUsername: "raphinha", instagramFollowers: 6800000 },
        { name: "Pau Cubarsí", position: "CB", nationality: "Spain", age: 19, marketValue: "€80M", instagramUsername: "paucubarsi", instagramFollowers: 2100000 },
        { name: "Jules Koundé", position: "RB", nationality: "France", age: 27, marketValue: "€65M", instagramUsername: "jkeey4", instagramFollowers: 4300000 },
        { name: "Dani Olmo", position: "AM", nationality: "Spain", age: 27, marketValue: "€60M", instagramUsername: "daniolmo7", instagramFollowers: 3200000 },
        { name: "Alejandro Balde", position: "LB", nationality: "Spain", age: 22, marketValue: "€60M", instagramUsername: "alejandrobalde", instagramFollowers: 2500000 },
        { name: "Ronald Araújo", position: "CB", nationality: "Uruguay", age: 26, marketValue: "€50M", instagramUsername: "ronaldaraujo", instagramFollowers: 5100000 },
        { name: "Ferran Torres", position: "CF", nationality: "Spain", age: 25, marketValue: "€50M", instagramUsername: "ferrantorres", instagramFollowers: 4700000 },
        { name: "Frenkie de Jong", position: "CM", nationality: "Netherlands", age: 28, marketValue: "€45M", instagramUsername: "frenkiedejong", instagramFollowers: 16800000 },
        { name: "Gavi", position: "CM", nationality: "Spain", age: 21, marketValue: "€40M", instagramUsername: "pablogavi", instagramFollowers: 18900000 },
        { name: "Fermín López", position: "AM", nationality: "Spain", age: 22, marketValue: "€30M", instagramUsername: "ferminlopez", instagramFollowers: 1800000 },
        { name: "Andreas Christensen", position: "CB", nationality: "Denmark", age: 29, marketValue: "€25M", instagramUsername: "andreaschristensen", instagramFollowers: 1200000 },
        { name: "Marc Casadó", position: "DM", nationality: "Spain", age: 22, marketValue: "€25M", instagramUsername: "marccasado", instagramFollowers: 950000 },
        { name: "Joan García", position: "GK", nationality: "Spain", age: 24, marketValue: "€25M", instagramUsername: "joangarcia13", instagramFollowers: 580000 },
        { name: "Eric García", position: "CB", nationality: "Spain", age: 25, marketValue: "€20M", instagramUsername: "ericgm3", instagramFollowers: 2100000 },
        { name: "Marc Bernal", position: "DM", nationality: "Spain", age: 18, marketValue: "€15M", instagramUsername: "marcbernal28", instagramFollowers: 420000 },
        { name: "Gerard Martín", position: "LB", nationality: "Spain", age: 23, marketValue: "€12M", instagramUsername: "gerardmartin24", instagramFollowers: 380000 },
        { name: "Robert Lewandowski", position: "ST", nationality: "Poland", age: 37, marketValue: "€9M", instagramUsername: "_rl9", instagramFollowers: 37500000 },
        { name: "Wojciech Szczęsny", position: "GK", nationality: "Poland", age: 35, marketValue: "€2M", instagramUsername: "wojciech.szczesny.1", instagramFollowers: 7200000 },
    ];

    const playersRef = collection(db, PLAYERS_COLLECTION);
    let addedCount = 0;

    for (const player of BARCELONA_SQUAD) {
        const playerData = {
            name: player.name,
            teamId: barcelonaTeamId,
            teamName: barcelonaTeamName,
            league: league,
            position: player.position,
            nationality: player.nationality,
            age: player.age,
            marketValue: player.marketValue,
            socials: {
                instagram: {
                    username: player.instagramUsername || "",
                    url: player.instagramUsername ? `https://instagram.com/${player.instagramUsername}` : "",
                    followers: player.instagramFollowers || 0,
                },
                twitter: {
                    username: "",
                    url: "",
                    followers: 0,
                },
                tiktok: {
                    username: "",
                    url: "",
                    followers: 0,
                },
            },
            totalFollowers: player.instagramFollowers || 0,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        await addDoc(playersRef, playerData);
        addedCount++;
    }

    return addedCount;
}

/**
 * Add new player
 */
export async function addPlayer(player: NewPlayer): Promise<string> {
    const playersRef = collection(db, PLAYERS_COLLECTION);

    const docRef = await addDoc(playersRef, {
        ...player,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });

    return docRef.id;
}

/**
 * Update player and aggregate team stats
 */
export async function updatePlayer(
    id: string,
    data: Partial<NewPlayer>
): Promise<void> {
    const docRef = doc(db, PLAYERS_COLLECTION, id);

    // 1. Update player
    await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
    });

    // 2. Aggregate team stats
    // We need to fetch the player first to get teamId if not provided in data
    // Or we assume data has teamId if it changed.
    // If only followers changed, we need teamId.

    try {
        const playerSnap = await getDoc(docRef);
        if (playerSnap.exists()) {
            const player = playerSnap.data() as Player;
            const teamId = player.teamId;

            if (teamId) {
                // Calculate totals for the team
                const q = query(collection(db, PLAYERS_COLLECTION), where("teamId", "==", teamId));
                const querySnapshot = await getDocs(q);

                let totalFollowers = 0;
                let instagramFollowers = 0;
                let twitterFollowers = 0;
                let tiktokFollowers = 0;

                querySnapshot.forEach((doc) => {
                    const p = doc.data() as Player;
                    totalFollowers += p.totalFollowers || 0;
                    instagramFollowers += p.socials?.instagram?.followers || 0;
                    twitterFollowers += p.socials?.twitter?.followers || 0;
                    tiktokFollowers += p.socials?.tiktok?.followers || 0;
                });

                // Update team document
                // Note: We need to import 'teams' collection reference or use generic doc
                const teamRef = doc(db, "teams", teamId);
                await updateDoc(teamRef, {
                    totalFollowers,
                    "socials.instagram.followers": instagramFollowers,
                    "socials.twitter.followers": twitterFollowers,
                    "socials.tiktok.followers": tiktokFollowers,
                    updatedAt: Timestamp.now()
                });
                console.log(`Updated aggregates for team ${teamId}: ${totalFollowers}`);
            }
        }
    } catch (error) {
        console.error("Error aggregating team stats:", error);
    }
}

/**
 * Delete player
 */
export async function deletePlayer(id: string): Promise<void> {
    const docRef = doc(db, PLAYERS_COLLECTION, id);

    // Get teamId before delete for aggregation
    let teamId: string | undefined;
    try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            teamId = snap.data().teamId;
        }
    } catch (e) { console.error(e); }

    await deleteDoc(docRef);

    if (teamId) {
        // Trigger aggregation (duplicate code, should be refactored to helper but inline for now is safe)
        try {
            const q = query(collection(db, PLAYERS_COLLECTION), where("teamId", "==", teamId));
            const querySnapshot = await getDocs(q);
            let total = 0;
            querySnapshot.forEach(doc => total += (doc.data() as Player).totalFollowers || 0);
            await updateDoc(doc(db, "teams", teamId), { totalFollowers: total });
        } catch (e) { console.error(e); }
    }
}

/**
 * Transfer player to another team
 */
export async function transferPlayer(
    playerId: string,
    newTeamId: string,
    newTeamName: string,
    newLeague: string
): Promise<boolean> {
    try {
        const docRef = doc(db, PLAYERS_COLLECTION, playerId);

        await updateDoc(docRef, {
            teamId: newTeamId,
            teamName: newTeamName,
            league: newLeague,
            updatedAt: Timestamp.now(),
        });

        return true;
    } catch (error) {
        console.error("Error transferring player:", error);
        return false;
    }
}

/**
 * Calculate total followers from socials
 */
export function calculateTotalFollowers(socials: PlayerSocials): number {
    return (
        (socials.instagram?.followers || 0) +
        (socials.twitter?.followers || 0) +
        (socials.tiktok?.followers || 0)
    );
}

/**
 * Generate social media URL
 */
export function getSocialUrl(platform: "instagram" | "twitter" | "tiktok", username: string): string {
    const baseUrls = {
        instagram: "https://instagram.com/",
        twitter: "https://x.com/",
        tiktok: "https://tiktok.com/@",
    };
    return `${baseUrls[platform]}${username}`;
}
