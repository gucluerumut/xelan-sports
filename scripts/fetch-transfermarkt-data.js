#!/usr/bin/env node

/**
 * Transfermarkt Scraper for Barcelona Squad
 * Fetches accurate market values and player data
 * 
 * Usage: node scripts/fetch-transfermarkt-data.js
 */

const https = require('https');
const fs = require('fs');

const BARCELONA_TRANSFERMARKT_URL = 'https://www.transfermarkt.com/fc-barcelona/startseite/verein/131';
const BARCELONA_SQUAD_URL = 'https://www.transfermarkt.com/fc-barcelona/kader/verein/131/saison_id/2025';

/**
 * Fetch HTML from Transfermarkt
 */
function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

/**
 * Parse player data from Transfermarkt HTML
 * This is a simplified parser - for production use a proper HTML parser
 */
function parseSquadData(html) {
    const players = [];

    // Extract player rows from the squad table
    // Note: This is a basic regex approach - consider using cheerio or jsdom for production
    const playerRegex = /<tr[^>]*class="[^"]*odd|even[^"]*"[^>]*>[\s\S]*?<td[^>]*class="[^"]*posrela[^"]*"[^>]*>[\s\S]*?<a[^>]*title="([^"]+)"[\s\S]*?<td[^>]*class="[^"]*zentriert[^"]*"[^>]*>(\d+)<\/td>[\s\S]*?<td[^>]*class="[^"]*zentriert[^"]*"[^>]*>([^<]+)<\/td>[\s\S]*?<td[^>]*class="[^"]*rechts[^"]*hauptlink"[^>]*>([^<]+)<\/td>/g;

    let match;
    while ((match = playerRegex.exec(html)) !== null) {
        const [_, name, jerseyNumber, position, marketValue] = match;
        players.push({
            name: name.trim(),
            jerseyNumber: parseInt(jerseyNumber),
            position: position.trim(),
            marketValue: marketValue.trim()
        });
    }

    return players;
}

/**
 * Main function
 */
async function main() {
    console.log('🔍 Fetching Barcelona squad data from Transfermarkt...\n');

    try {
        const html = await fetchHTML(BARCELONA_SQUAD_URL);
        const players = parseSquadData(html);

        console.log(`✅ Found ${players.length} players\n`);

        // Output as JSON
        const output = {
            team: 'FC Barcelona',
            season: '2025-26',
            fetchedAt: new Date().toISOString(),
            players: players
        };

        // Save to file
        const outputPath = './scripts/barcelona-transfermarkt-data.json';
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

        console.log(`📝 Data saved to: ${outputPath}`);
        console.log('\nSample players:');
        players.slice(0, 5).forEach(p => {
            console.log(`  - ${p.name} (${p.position}): ${p.marketValue}`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
