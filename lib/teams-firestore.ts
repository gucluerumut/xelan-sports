import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

export interface TeamSocial {
    username: string;
    followers: number;
}

export interface FirestoreTeam {
    id: string;
    name: string;
    country: string;
    league: string;
    logo: string;
    socials: {
        instagram: TeamSocial;
        twitter: TeamSocial;
        tiktok: TeamSocial;
    };
    totalFollowers: number;
    updatedAt?: Date;
}

const COLLECTION_NAME = "teams";

// Get ALL teams (no filter)
export async function getAllTeams(): Promise<FirestoreTeam[]> {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

        const teams = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                country: data.country,
                league: data.league,
                logo: data.logo,
                socials: data.socials,
                totalFollowers: data.totalFollowers,
                updatedAt: data.updatedAt?.toDate(),
            };
        });

        return teams.sort((a, b) => b.totalFollowers - a.totalFollowers);
    } catch (error) {
        console.error("Error getting all teams:", error);
        return [];
    }
}

// Get all teams by league
export async function getTeamsByLeague(league: string): Promise<FirestoreTeam[]> {
    try {
        // Simple query without composite index requirement
        const q = query(
            collection(db, COLLECTION_NAME),
            where("league", "==", league)
        );
        const querySnapshot = await getDocs(q);

        const teams = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                country: data.country,
                league: data.league,
                logo: data.logo,
                socials: data.socials,
                totalFollowers: data.totalFollowers,
                updatedAt: data.updatedAt?.toDate(),
            };
        });

        // Sort client-side by totalFollowers desc
        return teams.sort((a, b) => b.totalFollowers - a.totalFollowers);
    } catch (error) {
        console.error("Error getting teams:", error);
        return [];
    }
}

// Get single team
export async function getTeam(id: string): Promise<FirestoreTeam | null> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                name: data.name,
                country: data.country,
                league: data.league,
                logo: data.logo,
                socials: data.socials,
                totalFollowers: data.totalFollowers,
                updatedAt: data.updatedAt?.toDate(),
            };
        }
        return null;
    } catch (error) {
        console.error("Error getting team:", error);
        return null;
    }
}

// Update team
export async function updateTeam(
    id: string,
    updates: Partial<Omit<FirestoreTeam, "id" | "updatedAt">>
): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);

        // Calculate new totalFollowers if socials updated
        let totalFollowers = updates.totalFollowers;
        if (updates.socials) {
            totalFollowers =
                (updates.socials.instagram?.followers || 0) +
                (updates.socials.twitter?.followers || 0) +
                (updates.socials.tiktok?.followers || 0);
        }

        await updateDoc(docRef, {
            ...updates,
            totalFollowers,
            updatedAt: Timestamp.now(),
        });
        return true;
    } catch (error) {
        console.error("Error updating team:", error);
        return false;
    }
}

// Seed a single team to Firestore
export async function seedTeam(team: Omit<FirestoreTeam, "updatedAt">): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, team.id);
        await setDoc(docRef, {
            ...team,
            updatedAt: Timestamp.now(),
        });
        return true;
    } catch (error) {
        console.error("Error seeding team:", error);
        return false;
    }
}

// Premier League Teams Data (for initial seeding)
export const PREMIER_LEAGUE_TEAMS: Omit<FirestoreTeam, "updatedAt">[] = [
    {
        id: "manchester-city",
        name: "Manchester City",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
        socials: {
            instagram: { username: "mancity", followers: 56252141 },
            twitter: { username: "ManCity", followers: 22500856 },
            tiktok: { username: "mancity", followers: 33234800 },
        },
        totalFollowers: 111987797,
    },
    {
        id: "manchester-united",
        name: "Manchester United",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
        socials: {
            instagram: { username: "manchesterunited", followers: 65407773 },
            twitter: { username: "ManUtd", followers: 26163109 },
            tiktok: { username: "manutd", followers: 19622331 },
        },
        totalFollowers: 111193213,
    },
    {
        id: "liverpool",
        name: "Liverpool",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png",
        socials: {
            instagram: { username: "liverpoolfc", followers: 49091287 },
            twitter: { username: "LFC", followers: 19636514 },
            tiktok: { username: "liverpoolfc", followers: 28045590 },
        },
        totalFollowers: 96773391,
    },
    {
        id: "chelsea",
        name: "Chelsea",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
        socials: {
            instagram: { username: "chelseafc", followers: 44156443 },
            twitter: { username: "ChelseaFC", followers: 17662577 },
            tiktok: { username: "chelseafc", followers: 21241304 },
        },
        totalFollowers: 83060324,
    },
    {
        id: "tottenham-hotspur",
        name: "Tottenham Hotspur",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
        socials: {
            instagram: { username: "spursofficial", followers: 17537051 },
            twitter: { username: "SpursOfficial", followers: 7014820 },
            tiktok: { username: "spursofficial", followers: 43061739 },
        },
        totalFollowers: 67613610,
    },
    {
        id: "arsenal",
        name: "Arsenal",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
        socials: {
            instagram: { username: "arsenal", followers: 31458542 },
            twitter: { username: "Arsenal", followers: 12583416 },
            tiktok: { username: "arsenal", followers: 10751513 },
        },
        totalFollowers: 54793471,
    },
    {
        id: "leicester-city",
        name: "Leicester City",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t13.png",
        socials: {
            instagram: { username: "lcfc", followers: 7813888 },
            twitter: { username: "LCFC", followers: 3500000 },
            tiktok: { username: "lcfc", followers: 1969721 },
        },
        totalFollowers: 13283609,
    },
    {
        id: "west-ham-united",
        name: "West Ham United",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t21.png",
        socials: {
            instagram: { username: "westham", followers: 4480151 },
            twitter: { username: "WestHam", followers: 1792060 },
            tiktok: { username: "westham", followers: 6942348 },
        },
        totalFollowers: 13214559,
    },
    {
        id: "newcastle-united",
        name: "Newcastle United",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t4.png",
        socials: {
            instagram: { username: "nuabornewest", followers: 3365911 },
            twitter: { username: "NUFC", followers: 1346364 },
            tiktok: { username: "nufc", followers: 7174196 },
        },
        totalFollowers: 11886471,
    },
    {
        id: "aston-villa",
        name: "Aston Villa",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png",
        socials: {
            instagram: { username: "avlofficiel", followers: 4385173 },
            twitter: { username: "AVFCOfficial", followers: 1754069 },
            tiktok: { username: "avfcofficial", followers: 4453352 },
        },
        totalFollowers: 10592594,
    },
    {
        id: "everton",
        name: "Everton",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png",
        socials: {
            instagram: { username: "everton", followers: 3800000 },
            twitter: { username: "Everton", followers: 1520000 },
            tiktok: { username: "everton", followers: 2500000 },
        },
        totalFollowers: 7820000,
    },
    {
        id: "brighton",
        name: "Brighton & Hove Albion",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t36.png",
        socials: {
            instagram: { username: "officialbhafc", followers: 1200000 },
            twitter: { username: "OfficialBHAFC", followers: 480000 },
            tiktok: { username: "officialbhafc", followers: 800000 },
        },
        totalFollowers: 2480000,
    },
    {
        id: "wolverhampton",
        name: "Wolverhampton Wanderers",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png",
        socials: {
            instagram: { username: "wolves", followers: 2100000 },
            twitter: { username: "Wolves", followers: 840000 },
            tiktok: { username: "wolves", followers: 1500000 },
        },
        totalFollowers: 4440000,
    },
    {
        id: "crystal-palace",
        name: "Crystal Palace",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t31.png",
        socials: {
            instagram: { username: "cpfc", followers: 1100000 },
            twitter: { username: "CPFC", followers: 440000 },
            tiktok: { username: "cpfc", followers: 600000 },
        },
        totalFollowers: 2140000,
    },
    {
        id: "brentford",
        name: "Brentford",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t94.png",
        socials: {
            instagram: { username: "brentfordfc", followers: 600000 },
            twitter: { username: "BrentfordFC", followers: 240000 },
            tiktok: { username: "brentfordfc", followers: 400000 },
        },
        totalFollowers: 1240000,
    },
    {
        id: "fulham",
        name: "Fulham",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t54.png",
        socials: {
            instagram: { username: "fulhamfc", followers: 900000 },
            twitter: { username: "FulhamFC", followers: 360000 },
            tiktok: { username: "fulhamfc", followers: 500000 },
        },
        totalFollowers: 1760000,
    },
    {
        id: "bournemouth",
        name: "AFC Bournemouth",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t91.png",
        socials: {
            instagram: { username: "afcb", followers: 700000 },
            twitter: { username: "AFCBournemouth", followers: 280000 },
            tiktok: { username: "afcb", followers: 450000 },
        },
        totalFollowers: 1430000,
    },
    {
        id: "nottingham-forest",
        name: "Nottingham Forest",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t17.png",
        socials: {
            instagram: { username: "naborneforest", followers: 1000000 },
            twitter: { username: "NFFC", followers: 400000 },
            tiktok: { username: "nffc", followers: 600000 },
        },
        totalFollowers: 2000000,
    },
    {
        id: "ipswich-town",
        name: "Ipswich Town",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t40.png",
        socials: {
            instagram: { username: "ipswichtown", followers: 300000 },
            twitter: { username: "IpswichTown", followers: 120000 },
            tiktok: { username: "ipswichtown", followers: 200000 },
        },
        totalFollowers: 620000,
    },
    {
        id: "southampton",
        name: "Southampton",
        country: "England",
        league: "Premier League",
        logo: "https://resources.premierleague.com/premierleague/badges/50/t20.png",
        socials: {
            instagram: { username: "southamptonfc", followers: 1500000 },
            twitter: { username: "SouthamptonFC", followers: 600000 },
            tiktok: { username: "southamptonfc", followers: 400000 },
        },
        totalFollowers: 2500000,
    },
];

// Seed all Premier League teams
export async function seedPremierLeagueTeams(): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const team of PREMIER_LEAGUE_TEAMS) {
        const result = await seedTeam(team);
        if (result) {
            success++;
        } else {
            failed++;
        }
    }

    return { success, failed };
}
