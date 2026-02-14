
const fs = require('fs');
const path = require('path');

// Define paths
const REAL_DATA_PATH = path.join(__dirname, 'laliga-real-data.json');
const LALIGA_SQUADS_PATH = path.join(__dirname, '../lib/laliga-squads.ts');
const OUTPUT_PATH = path.join(__dirname, '../lib/laliga-real-squads.ts');

async function restoreInstagram() {
    console.log('🔄 Starting Instagram data restoration (JS Regex Mode)...');

    // 1. Read real data
    if (!fs.existsSync(REAL_DATA_PATH)) {
        console.error('❌ Real data JSON not found:', REAL_DATA_PATH);
        process.exit(1);
    }
    const realDataRaw = fs.readFileSync(REAL_DATA_PATH, 'utf-8');
    const realSquads = JSON.parse(realDataRaw);
    console.log(`✓ Loaded ${realSquads.length} real squads from JSON.`);

    // 2. Read legacy TS file and extract data via regex
    if (!fs.existsSync(LALIGA_SQUADS_PATH)) {
        console.error('❌ Legacy squads TS file not found:', LALIGA_SQUADS_PATH);
        process.exit(1);
    }
    const legacyContent = fs.readFileSync(LALIGA_SQUADS_PATH, 'utf-8');

    // Regex to find all player objects with instagram data
    // Matches: { name: "Name", ..., instagramUsername: "user", instagramFollowers: 123 }
    const playerRegex = /{[\s\S]*?name:\s*"([^"]+)"[\s\S]*?instagramUsername:\s*"([^"]+)"[\s\S]*?instagramFollowers:\s*(\d+)[\s\S]*?}/g;

    const legacyPlayerMap = new Map();
    let match;
    let extractedCount = 0;

    while ((match = playerRegex.exec(legacyContent)) !== null) {
        const name = match[1];
        const username = match[2];
        const followers = parseInt(match[3]);

        legacyPlayerMap.set(name.toLowerCase().trim(), {
            username,
            followers
        });
        extractedCount++;
    }

    console.log(`✓ Extracted ${extractedCount} players with Instagram data from legacy file.`);

    // 3. Merge data
    let matchCount = 0;
    const mergedSquads = realSquads.map(team => {
        const updatedPlayers = team.players.map(player => {
            const key = player.name.toLowerCase().trim();
            const legacyData = legacyPlayerMap.get(key);

            if (legacyData && legacyData.username) {
                matchCount++;
                return {
                    ...player,
                    instagramUsername: legacyData.username,
                    instagramFollowers: legacyData.followers
                };
            }
            return player;
        });

        return {
            ...team,
            players: updatedPlayers
        };
    });

    console.log(`✓ Merged Instagram data for ${matchCount} players.`);

    // 4. Generate TS file content
    const fileContent = `/**
 * Real La Liga Squad Data from Transfermarkt & Legacy Instagram Data
 * Restored on: ${new Date().toISOString().split('T')[0]}
 */

export interface PlayerData {
    name: string;
    position: string;
    nationality: string;
    age: number;
    marketValue: string;
    instagramUsername?: string;
    instagramFollowers?: number;
}

export interface TeamSquad {
    teamName: string;
    players: PlayerData[];
}

export const LA_LIGA_REAL_SQUADS: TeamSquad[] = ${JSON.stringify(mergedSquads, null, 4)};
`;

    // 5. Write to file
    fs.writeFileSync(OUTPUT_PATH, fileContent);
    console.log(`✅ Successfully wrote updated data to ${OUTPUT_PATH}`);
}

restoreInstagram().catch(console.error);
