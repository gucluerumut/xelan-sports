
import * as fs from 'fs';
import * as path from 'path';
import { LA_LIGA_SQUADS } from '../lib/laliga-squads';

// Define path to source JSON (scraped data)
const REAL_DATA_PATH = path.join(__dirname, 'laliga-real-data.json');
// Define path to output TS file
const OUTPUT_PATH = path.join(__dirname, '../lib/laliga-real-squads.ts');

async function restoreInstagram() {
    console.log('🔄 Starting Instagram data restoration...');

    // 1. Read real data
    if (!fs.existsSync(REAL_DATA_PATH)) {
        console.error('❌ Real data JSON not found:', REAL_DATA_PATH);
        process.exit(1);
    }
    const realDataRaw = fs.readFileSync(REAL_DATA_PATH, 'utf-8');
    const realSquads = JSON.parse(realDataRaw);
    console.log(`✓ Loaded ${realSquads.length} real squads.`);

    // 2. Map legacy data for quick lookup
    const legacyPlayerMap = new Map<string, any>();

    LA_LIGA_SQUADS.forEach(squad => {
        squad.players.forEach(player => {
            // Create a key based on normalized name
            const key = player.name.toLowerCase().trim();
            legacyPlayerMap.set(key, {
                username: player.instagramUsername,
                followers: player.instagramFollowers
            });
        });
    });
    console.log(`✓ Indexed ${legacyPlayerMap.size} legacy players with Instagram data.`);

    // 3. Merge data
    let matchCount = 0;
    const mergedSquads = realSquads.map((team: any) => {
        const updatedPlayers = team.players.map((player: any) => {
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
