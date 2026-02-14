
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = path.join(__dirname, '../lib/laliga-real-squads.ts');

// Helper to extract JSON from TS file content
function extractData(content) {
    // Regex to capture the array content assigned to the constant
    // Looking for: export const LA_LIGA_REAL_SQUADS: TeamSquad[] = [...];
    const match = content.match(/export const LA_LIGA_REAL_SQUADS: TeamSquad\[\] = ([\s\S]*?);/);

    if (!match || !match[1]) return null;

    const jsonStr = match[1].trim();

    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to parse existing data as JSON:", e.message);
        return null;
    }
}

async function cleanDuplicates() {
    console.log('🧹 Cleaning duplicate players...');

    if (!fs.existsSync(OUTPUT_PATH)) {
        console.error('❌ File not found:', OUTPUT_PATH);
        process.exit(1);
    }

    const content = fs.readFileSync(OUTPUT_PATH, 'utf-8');
    const squads = extractData(content);

    if (!squads) {
        console.error('❌ Could not parse squads data. Check regex match.');
        process.exit(1);
    }

    let removedCount = 0;
    const cleanSquads = squads.map(team => {
        const uniquePlayers = new Map();

        team.players.forEach(player => {
            const key = player.name.toLowerCase().trim();

            if (!uniquePlayers.has(key)) {
                uniquePlayers.set(key, player);
            } else {
                // Determine which one to keep
                const existing = uniquePlayers.get(key);

                // Prefer the one with market value != €0
                const existingHasValue = existing.marketValue && existing.marketValue !== '€0';
                const currentHasValue = player.marketValue && player.marketValue !== '€0';

                if (!existingHasValue && currentHasValue) {
                    uniquePlayers.set(key, player); // Replace with better one
                    // Preserve instagram if lost
                    if (existing.instagramUsername && !player.instagramUsername) {
                        player.instagramUsername = existing.instagramUsername;
                        player.instagramFollowers = existing.instagramFollowers;
                    }
                } else if (existingHasValue && !currentHasValue) {
                    // Keep existing, but verify instagram
                    if (!existing.instagramUsername && player.instagramUsername) {
                        existing.instagramUsername = player.instagramUsername;
                        existing.instagramFollowers = player.instagramFollowers;
                    }
                } else {
                    // Both have value or both don't.
                    // Prefer the one with Instagram data
                    if (!existing.instagramUsername && player.instagramUsername) {
                        uniquePlayers.set(key, player);
                    } else if (existing.instagramUsername && !player.instagramUsername) {
                        // Keep existing
                    } else {
                        // Prefer cleaner position string
                        if (player.position.length < existing.position.length) {
                            uniquePlayers.set(key, player);
                        }
                    }
                }
                removedCount++;
            }
        });

        return {
            ...team,
            players: Array.from(uniquePlayers.values())
        };
    });

    console.log(`✓ Removing ${removedCount} duplicate players.`);

    // Generate TS file content
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

export const LA_LIGA_REAL_SQUADS: TeamSquad[] = ${JSON.stringify(cleanSquads, null, 4)};
`;

    fs.writeFileSync(OUTPUT_PATH, fileContent);
    console.log(`✅ Successfully cleaned data in ${OUTPUT_PATH}`);
}

cleanDuplicates().catch(console.error);
