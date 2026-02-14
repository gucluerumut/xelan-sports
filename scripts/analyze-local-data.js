const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

function analyze() {
    console.log('🌍 Analyzing Local JSON Data...');

    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        console.log(`\n📂 File: ${file}`);
        const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
        try {
            const data = JSON.parse(content);
            const players = data.players || []; // Adjust based on actual structure

            if (!Array.isArray(players) || players.length === 0) {
                // Try if the root is the array or object with team keys
                // Let's inspect the structure of one item
                // actually, let's look at the file content first in the tool output if this fails, but let's try to be robust.
                // based on previous usage "npx tsx scripts/seed-league-data.ts data/premier-league-players.json"
                // it likely contains an array of players or an object with players.
            }

            // Let's assume it might be { "players": [...] } or [...] or { "teamName": [...] }
            // Actually, based on previous context, let's just dump the first item keys to be sure, 
            // but for now let's try to count nationalities.

            let allPlayers = [];
            if (Array.isArray(data)) {
                // Check if items are teams (have 'players' array) or players
                if (data.length > 0 && data[0].players) {
                    data.forEach(team => {
                        if (team.players && Array.isArray(team.players)) {
                            allPlayers.push(...team.players);
                        }
                    });
                } else {
                    allPlayers = data;
                }
            } else if (data.players && Array.isArray(data.players)) {
                allPlayers = data.players;
            } else {
                // maybe it's team-based?
                Object.values(data).forEach(val => {
                    if (Array.isArray(val)) allPlayers.push(...val);
                });
            }

            if (allPlayers.length > 0) {
                console.log('   First player sample:', JSON.stringify(allPlayers[0], null, 2));
            }

            const natCounts = {};
            const teamNationalities = {};
            const teamCounts = {};

            allPlayers.forEach(p => {
                const nat = p.nationality || 'Unknown';
                const team = p.teamName || 'Unknown';

                natCounts[nat] = (natCounts[nat] || 0) + 1;

                if (!teamNationalities[team]) teamNationalities[team] = new Set();
                teamNationalities[team].add(nat);

                teamCounts[team] = (teamCounts[team] || 0) + 1;
            });

            console.log(`   Total Players: ${allPlayers.length}`);
            console.log('   Top 5 Nationalities:');
            Object.entries(natCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .forEach(([n, c]) => console.log(`     - ${n}: ${c}`));

            // Check for low diversity
            console.log('   ⚠️  Teams with < 3 unique nationalities:');
            let suspiciousFound = false;
            Object.entries(teamNationalities).forEach(([team, nats]) => {
                if (nats.size < 3 && teamCounts[team] > 10) {
                    console.log(`     - ${team}: ${nats.size} unique (${Array.from(nats).join(', ')})`);
                    suspiciousFound = true;
                }
            });
            if (!suspiciousFound) console.log('     None found.');

        } catch (e) {
            console.error(`   ❌ Error reading ${file}: ${e.message}`);
        }
    });
}

analyze();
