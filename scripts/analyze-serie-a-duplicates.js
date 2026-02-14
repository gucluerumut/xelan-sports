
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/serie-a-players.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const leagueData = JSON.parse(rawData);

let totalPlayers = 0;
let duplicateCount = 0;

console.log(`Analyzing ${leagueData.length} teams in Serie A...`);

leagueData.forEach(team => {
    const playerMap = new Map();
    team.players.forEach(player => {
        totalPlayers++;
        if (playerMap.has(player.name)) {
            duplicateCount++;
            // console.log(`Duplicate found: ${player.name} in ${team.teamName}`);
        } else {
            playerMap.set(player.name, 1);
        }
    });

    if (team.players.length !== playerMap.size) {
        console.log(`\n${team.teamName}: ${team.players.length} total, ${playerMap.size} unique.`);
    }
});

console.log(`\nTotal Players: ${totalPlayers}`);
console.log(`Total Duplicates: ${duplicateCount}`);
