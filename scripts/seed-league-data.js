
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load Service Account
const serviceAccountPath = path.resolve(__dirname, "../service-account.json");
if (!fs.existsSync(serviceAccountPath)) {
    console.error("Error: service-account.json not found!");
    process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const PLAYERS_COLLECTION = "players";
const TEAMS_COLLECTION = "teams";

const TEAM_MAPPINGS = {
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
    "Leicester City": "Leicester City",
    "Ipswich Town": "Ipswich Town",
    "Southampton FC": "Southampton",
    "Sunderland AFC": "Sunderland",
    "Leeds United": "Leeds United",
    "Wolverhampton Wanderers": "Wolverhampton Wanderers",

    // Serie A
    "Inter Milan": "Inter Milan",
    "AC Milan": "AC Milan",
    "Juventus FC": "Juventus",
    "Atalanta BC": "Atalanta BC",
    "Bologna FC 1909": "Bologna FC",
    "AS Roma": "AS Roma",
    "SS Lazio": "SS Lazio",
    "ACF Fiorentina": "ACF Fiorentina",
    "SSC Napoli": "SSC Napoli",
    "Torino FC": "Torino FC",
    "Genoa CFC": "Genoa CFC",
    "Udinese Calcio": "Udinese Calcio",
    "Hellas Verona": "Hellas Verona",
    "US Lecce": "US Lecce",
    "AC Monza": "AC Monza",
    "Cagliari Calcio": "Cagliari Calcio",
    "Empoli FC": "Empoli FC",
    "Como 1907": "Como 1907",
    "Venezia FC": "Venezia FC",
    "Parma Calcio 1913": "Parma Calcio",
    "Pisa Sporting Club": "Pisa SC",
    "US Cremonese": "US Cremonese", // Likely matches
    "US Sassuolo": "US Sassuolo",   // Likely matches

    // Bundesliga
    "Bayern Munich": "Bayern Munich",
    "Borussia Dortmund": "Borussia Dortmund",
    "Bayer 04 Leverkusen": "Bayer Leverkusen",
    "RB Leipzig": "RB Leipzig",
    "VfB Stuttgart": "VfB Stuttgart",
    "Eintracht Frankfurt": "Eintracht Frankfurt",
    "TSG 1899 Hoffenheim": "TSG Hoffenheim",
    "SC Freiburg": "SC Freiburg",
    "1.FC Heidenheim 1846": "1.FC Heidenheim",
    "SV Werder Bremen": "Werder Bremen",
    "FC Augsburg": "FC Augsburg",
    "VfL Wolfsburg": "VfL Wolfsburg",
    "1.FSV Mainz 05": "1.FSV Mainz 05",
    "Borussia Mönchengladbach": "Borussia Mönchengladbach",
    "1.FC Union Berlin": "1.FC Union Berlin",
    "VfL Bochum": "VfL Bochum",
    "FC St. Pauli": "FC St. Pauli",
    "Holstein Kiel": "Holstein Kiel",
    "Hamburger SV": "Hamburger SV", // Assuming potential match
    "1.FC Köln": "1. FC Köln",      // Assuming potential match

    // Ligue 1
    "Paris Saint-Germain": "Paris Saint-Germain",
    "Olympique Marseille": "Olympique de Marseille",
    "AS Monaco": "AS Monaco",
    "LOSC Lille": "LOSC Lille",
    "Olympique Lyon": "Olympique Lyonnais",
    "OGC Nice": "OGC Nice",
    "Stade Rennais FC": "Stade Rennais",
    "RC Lens": "RC Lens",

    // Süper Lig
    "Fenerbahce": "Fenerbahçe",
    "Galatasaray": "Galatasaray",
    "Besiktas JK": "Beşiktaş",
    "Trabzonspor": "Trabzonspor",
    "Basaksehir FK": "İstanbul Başakşehir",
    "Kasimpasa": "Kasımpaşa",
    "Caykur Rizespor": "Çaykur Rizespor",
    "Samsunspor": "Samsunspor",
    "Göztepe": "Göztepe",
    "Eyüpspor": "Eyüpspor",
};

function parseMarketValue(value) {
    if (!value || value === '-') return 0;
    const cleaned = value.replace('€', '').replace('m', '').replace('k', '');
    if (value.includes('m') || value.includes('M')) return parseFloat(cleaned) * 1_000_000;
    if (value.includes('k') || value.includes('K')) return parseFloat(cleaned) * 1_000;
    return parseFloat(cleaned) || 0;
}

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

    console.log(`\n🚀 Seeding data from ${path.basename(fullPath)}...\n`);

    const rawData = fs.readFileSync(fullPath, "utf-8");
    const leagueData = JSON.parse(rawData);

    // 1. Get Firestore Teams
    console.log("Fetching teams from Firestore...");
    const snap = await db.collection(TEAMS_COLLECTION).get();
    const dbTeams = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(`Loaded ${dbTeams.length} teams from Firestore.`);

    let totalPlayers = 0;
    let batch = db.batch();
    let batchCount = 0;
    const BATCH_SIZE = 400;

    for (const teamData of leagueData) {
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
            // Try to create team if we have logo
            if (teamData.teamLogo) {
                console.log(`🆕 Creating missing team: ${tmName}`);

                // Infer league from filename
                let leagueName = "Unknown League";
                const args = process.argv.join(' ');
                if (args.includes('premier-league')) leagueName = "Premier League";
                else if (args.includes('serie-a')) leagueName = "Serie A";
                else if (args.includes('bundesliga')) leagueName = "Bundesliga";
                else if (args.includes('ligue-1')) leagueName = "Ligue 1";
                else if (args.includes('super-lig')) leagueName = "Süper Lig";

                const newTeamRef = db.collection("teams").doc();
                // Simple sanitized ID for team? No, auto-ID is fine but deterministic is better for re-runs.
                // Let's use auto-ID and rely on name matching for future.
                // Or better: use sanitized name as ID?
                // For now, auto-ID is safer to avoid collisions if logic is weak.

                const newTeamData = {
                    name: tmName,
                    logo: teamData.teamLogo,
                    league: leagueName,
                    country: "Unknown",
                    socials: { instagram: { username: "", followers: 0 } },
                    totalFollowers: 0,
                    createdAt: admin.firestore.Timestamp.now(),
                    updatedAt: admin.firestore.Timestamp.now()
                };

                await newTeamRef.set(newTeamData);
                targetTeam = { id: newTeamRef.id, ...newTeamData };
            } else {
                console.warn(`⚠️  Skipping team: ${tmName} (No match in Firestore)`);
                continue;
            }
        }

        console.log(`✓ Processing ${targetTeam.name} (${teamData.players.length} raw players)...`);

        // Deduplicate players: Keep the one with most info
        const uniquePlayers = new Map();

        for (const p of teamData.players) {
            const existing = uniquePlayers.get(p.name);
            const score = (p.position !== "Unknown" ? 2 : 0) + (p.marketValue !== "€0" ? 1 : 0);

            if (!existing) {
                uniquePlayers.set(p.name, { ...p, score });
            } else {
                if (score > existing.score) {
                    uniquePlayers.set(p.name, { ...p, score });
                }
            }
        }

        const playersToSeed = Array.from(uniquePlayers.values());
        console.log(`   -> deduplicated to ${playersToSeed.length} players.`);

        for (const p of playersToSeed) {
            // Use Admin SDK doc creation
            const playerRef = db.collection(PLAYERS_COLLECTION).doc();

            const newPlayer = {
                name: p.name,
                teamId: targetTeam.id,
                teamName: targetTeam.name,
                league: targetTeam.league,
                position: p.position || "Unknown",
                nationality: p.nationality || "Unknown",
                marketValue: p.marketValue,
                marketValueNumeric: parseMarketValue(p.marketValue),
                photo: "", // Disable photo saving
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
