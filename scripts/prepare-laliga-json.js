
const fs = require('fs');
const path = require('path');

// Read raw data
const rawPath = path.resolve(__dirname, 'laliga-real-data.json');
const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

// Clean data logic adapted from clean-laliga-data.js
const cleanedData = rawData.map(team => {
    // Remove duplicate players
    const uniquePlayers = [];
    const seenNames = new Set();

    team.players.forEach(player => {
        // Basic filtering
        if (!seenNames.has(player.name) && player.marketValue !== '€0') {

            // Clean position
            let position = player.position;
            // The raw position often contains the name + newlines + real position
            // We need to extract the real position.
            // Example: "Joan García            \n        \n    \n    \n        \n            Goalkeeper"

            // Simple mapping based on includes
            if (position.includes('Goalkeeper')) position = 'GK';
            else if (position.includes('Centre-Back')) position = 'CB';
            else if (position.includes('Left-Back')) position = 'LB';
            else if (position.includes('Right-Back')) position = 'RB';
            else if (position.includes('Defensive Midfield')) position = 'DM';
            else if (position.includes('Central Midfield')) position = 'CM';
            else if (position.includes('Attacking Midfield')) position = 'AM';
            else if (position.includes('Left Winger')) position = 'LW';
            else if (position.includes('Right Winger')) position = 'RW';
            else if (position.includes('Centre-Forward')) position = 'CF';
            else if (position.includes('Second Striker')) position = 'SS';
            else position = 'MF'; // Fallback

            uniquePlayers.push({
                name: player.name,
                position: position,
                nationality: player.nationality || "Unknown",
                age: player.age,
                marketValue: player.marketValue
            });

            seenNames.add(player.name);
        }
    });

    return {
        teamName: team.teamName,
        players: uniquePlayers
    };
});

// Write to data/laliga-players.json
const outPath = path.resolve(__dirname, '../data/laliga-players.json');
fs.writeFileSync(outPath, JSON.stringify(cleanedData, null, 2));

console.log(`✅ Cleaned La Liga data saved to ${outPath}`);
console.log(`Total Teams: ${cleanedData.length}`);
console.log(`Total Players: ${cleanedData.reduce((acc, t) => acc + t.players.length, 0)}`);
