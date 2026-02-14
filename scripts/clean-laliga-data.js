#!/usr/bin/env node

/**
 * Clean and convert scraped La Liga data to TypeScript format
 */

const fs = require('fs');

// Read the scraped data
const rawData = JSON.parse(fs.readFileSync('./scripts/laliga-real-data.json', 'utf8'));

// Clean and deduplicate the data
const cleanedData = rawData.map(team => {
    // Remove duplicate players (every player appears twice in the scraped data)
    const uniquePlayers = [];
    const seenNames = new Set();

    team.players.forEach(player => {
        if (!seenNames.has(player.name) && player.marketValue !== '€0') {
            // Clean position - extract just the position name
            let position = player.position;
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
            else position = 'MF'; // Default

            uniquePlayers.push({
                name: player.name,
                position: position,
                nationality: player.nationality,
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

// Generate TypeScript file
let tsContent = `/**
 * Real La Liga Squad Data from Transfermarkt
 * Scraped on: ${new Date().toISOString().split('T')[0]}
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

export const LA_LIGA_REAL_SQUADS: TeamSquad[] = ${JSON.stringify(cleanedData, null, 4)};
`;

// Save to file
fs.writeFileSync('./lib/laliga-real-squads.ts', tsContent);

console.log('✅ Cleaned data saved to lib/laliga-real-squads.ts');
console.log(`\nTotal teams: ${cleanedData.length}`);
console.log(`Total players: ${cleanedData.reduce((sum, team) => sum + team.players.length, 0)}`);

// Show Real Madrid sample
const realMadrid = cleanedData.find(t => t.teamName === 'Real Madrid');
if (realMadrid) {
    console.log('\n📊 Real Madrid squad (sample):');
    realMadrid.players.slice(0, 10).forEach(p => {
        console.log(`  ${p.name} - ${p.position} - ${p.age}y - ${p.marketValue}`);
    });
}
