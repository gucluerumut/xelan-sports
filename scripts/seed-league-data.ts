
import * as fs from "fs";
import * as path from "path";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

// Load environment variables
const envPath = path.resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

// Initialize Firebase Admin
// We need to use require for the JSON file because of ESM/TS strictness usually, 
// or we can read it as file. Let's read it as file to be safe with TS/ESM interop if needed,
// but usually require works if allowSyntheticDefaultImports is on. 
// Given previous scripts used require for service account, let's try that or read file.
// Taking hint from scripts/restore-bundesliga.js which used require.
// But this is a .ts file run with tsx.

const serviceAccountPath = path.resolve(__dirname, "../service-account.json");
if (!fs.existsSync(serviceAccountPath)) {
    console.error("❌ service-account.json not found in root directory!");
    process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const PLAYERS_COLLECTION = "players";
const TEAMS_COLLECTION = "teams";

async function main() {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error("Please provide a JSON file path.");
        process.exit(1);
    }

    const fullPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`);
        process.exit(1);
    }

    console.log(`\n🚀 Seeding data from ${path.basename(fullPath)} using Admin SDK...\n`);

    const rawData = fs.readFileSync(fullPath, "utf-8");
    const leagueData = JSON.parse(rawData);

    // Helper to get all teams
    async function getAllTeams() {
        const snap = await db.collection(TEAMS_COLLECTION).get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as any));
    }

    // Mappings for tricky team names (Transfermarkt -> Firestore)
    const TEAM_MAPPINGS: Record<string, string> = {
        "Arsenal FC": "Arsenal",
        "Aston Villa": "Aston Villa",
        "Chelsea FC": "Chelsea",
        "Liverpool FC": "Liverpool",
        "Manchester City": "Manchester City",
        "Manchester United": "Manchester United",
        "Newcastle United": "Newcastle United",
        "Tottenham Hotspur": "Tottenham Hotspur",
        "West Ham United": "West Ham United",
        "Wolverhampton Wanderers": "Wolverhampton Wanderers",
        "Brighton & Hove Albion": "Brighton",
        "Crystal Palace": "Crystal Palace",
        "Everton FC": "Everton",
        "Fulham FC": "Fulham",
        "Brentford FC": "Brentford",
        "Nottingham Forest": "Nottingham Forest",
        "AFC Bournemouth": "AFC Bournemouth",
        "Burnley FC": "Burnley",
        "Sheffield United": "Sheffield United",
        "Luton Town": "Luton Town",
        "Leicester City": "Leicester City", // If promoted
        "Ipswich Town": "Ipswich Town",   // If promoted
        "Southampton FC": "Southampton",  // If promoted
        // Bundesliga
        "Bayern Munich": "Bayern Munich",
        "Borussia Dortmund": "Borussia Dortmund",
        "Bayer 04 Leverkusen": "Bayer Leverkusen",
        "RB Leipzig": "RB Leipzig",
        "VfB Stuttgart": "Vfb Stuttgart",
        // Süper Lig
        "Galatasaray": "Galatasaray",
        "Fenerbahce": "Fenerbahce",
        "Besiktas JK": "Besiktas",
        "Trabzonspor": "Trabzonspor",
        // Ligue 1
        "Paris Saint-Germain": "Paris Saint-Germain",
        "AS Monaco": "Monaco",
        "Olympique Marseille": "Marseille",
        "Olympique Lyon": "Lyon",
        // Serie A
        "Inter Milan": "Inter",
        "AC Milan": "Milan",
        "Juventus FC": "Juventus",
        "SSC Napoli": "Napoli",
        "AS Roma": "Roma"
    };

    // 1. Get Firestore Teams
    const dbTeams = await getAllTeams();
    console.log(`Loaded ${dbTeams.length} teams from Firestore.`);

    let totalPlayers = 0;
    let batch = db.batch();
    let batchCount = 0;
    const BATCH_SIZE = 400;

    function parseMarketValue(value: string): number {
        if (!value || value === '-') return 0;
        const cleaned = value.replace('€', '').replace('m', '').replace('k', '');
        if (value.includes('m') || value.includes('M')) return parseFloat(cleaned) * 1_000_000;
        if (value.includes('k') || value.includes('K')) return parseFloat(cleaned) * 1_000;
        return parseFloat(cleaned) || 0;
    }

    for (const teamData of leagueData) {
        // Fix: Use teamName from JSON
        const tmName = teamData.teamName;

        // Find matching team
        let targetTeam = dbTeams.find(t => t.name.toLowerCase() === tmName.toLowerCase());

        // Try mapping if exact match fails
        if (!targetTeam && TEAM_MAPPINGS[tmName]) {
            targetTeam = dbTeams.find(t => t.name === TEAM_MAPPINGS[tmName]);
        }

        // Fuzzy / Partial match attempt (careful!)
        if (!targetTeam) {
            targetTeam = dbTeams.find(t => t.name.toLowerCase().includes(tmName.toLowerCase()) || tmName.toLowerCase().includes(t.name.toLowerCase()));
        }

        if (!targetTeam) {
            console.warn(`⚠️  Skipping team: ${tmName} (No match in Firestore)`);
            continue;
        }

        console.log(`✓ Processing ${targetTeam.name} (${teamData.players.length} players)...`);

        // DELETE existing players for this team to avoid duplicates
        // Note: Admin SDK syntax for query
        const snapshot = await db.collection(PLAYERS_COLLECTION).where("teamId", "==", targetTeam.id).get();

        if (!snapshot.empty) {
            console.log(`  - Deleting ${snapshot.size} existing players...`);
            const deleteBatch = db.batch();
            snapshot.docs.forEach(doc => deleteBatch.delete(doc.ref));
            await deleteBatch.commit();
        }

        for (const p of teamData.players) {
            const playerRef = db.collection(PLAYERS_COLLECTION).doc(); // Auto-ID

            const newPlayer = {
                name: p.name,
                teamId: targetTeam.id,
                teamName: targetTeam.name,
                league: targetTeam.league,
                position: p.position || "Unknown",
                nationality: p.nationality || "Unknown",
                marketValue: p.marketValue,
                marketValueNumeric: parseMarketValue(p.marketValue),
                photo: p.photo,
                socials: {
                    instagram: { username: "", url: "", followers: 0 },
                    twitter: { username: "", url: "", followers: 0 },
                    tiktok: { username: "", url: "", followers: 0 }
                },
                totalFollowers: 0,
                createdAt: admin.firestore.Timestamp.now(),
                updatedAt: admin.firestore.Timestamp.now()
            };

            batch.set(playerRef, newPlayer);
            batchCount++;
            totalPlayers++;

            if (batchCount >= BATCH_SIZE) {
                await batch.commit();
                console.log(`   - Committed batch of ${batchCount} players...`);
                batch = db.batch();
                batchCount = 0;
            }
        }
    }

    if (batchCount > 0) {
        await batch.commit();
    }

    console.log(`\n✅ Database seeding complete! Added ${totalPlayers} players.`);
}

main().catch(console.error);
