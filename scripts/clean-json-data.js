const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

function clean() {
    console.log('🧹 Cleaning Local JSON Data...');

    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        const filePath = path.join(DATA_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        try {
            const data = JSON.parse(content);

            if (!Array.isArray(data)) {
                console.log(`⚠️  Skipping ${file}: Root is not an array.`);
                return;
            }

            let totalRemoved = 0;
            let totalPlayers = 0;

            const cleanedData = data.map(team => {
                if (!team.players || !Array.isArray(team.players)) return team;

                const uniquePlayers = [];
                const seenKeys = new Set();

                team.players.forEach(p => {
                    // Filter out explicit "Unknown" duplicates if they have name "Unknown" OR position/nationality "Unknown" 
                    // BUT be careful: some real players might have unknown fields.
                    // The bug pattern observed was:
                    // { name: "X", ... valid ... }
                    // { name: "X", position: "Unknown", ... }

                    // Logic: If position AND nationality are Unknown, skip it.
                    if (p.position === 'Unknown' && p.nationality === 'Unknown') {
                        totalRemoved++;
                        return;
                    }

                    // Deduplicate by name
                    if (seenKeys.has(p.name)) {
                        // If we already have this player, skip (or maybe merge?)
                        // likely the first one was good?
                        // verify the first one wasn't the bad one?
                        // calculated heuristic: keep the one with NO unknown fields over one WITH unknown fields.

                        // actually, the bad ones are filtered above.
                        // check if exact duplicate
                        // totalRemoved++; // effectively distinct logic
                        return;
                    }

                    seenKeys.add(p.name);
                    uniquePlayers.push(p);
                });

                totalPlayers += uniquePlayers.length;
                return { ...team, players: uniquePlayers };
            });

            fs.writeFileSync(filePath, JSON.stringify(cleanedData, null, 2));
            console.log(`✅ Cleaned ${file}: Removed ${totalRemoved} bad entries. Remaining: ${totalPlayers} players.`);

        } catch (e) {
            console.error(`❌ Error processing ${file}: ${e.message}`);
        }
    });
}

clean();
