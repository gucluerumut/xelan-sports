#!/usr/bin/env node

/**
 * Real Transfermarkt Data Scraper for La Liga
 * Uses Puppeteer to scrape actual player data
 * 
 * Usage: node scripts/scrape-laliga-real.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

// 20 La Liga teams from mock-data.ts (takım sıralama sekmesindeki takımlar)
const LA_LIGA_TEAMS = [
    { name: "FC Barcelona", url: "https://www.transfermarkt.com/fc-barcelona/startseite/verein/131" },
    { name: "Real Madrid", url: "https://www.transfermarkt.com/real-madrid/startseite/verein/418" },
    { name: "Atletico Madrid", url: "https://www.transfermarkt.com/atletico-madrid/startseite/verein/13" },
    { name: "Villarreal", url: "https://www.transfermarkt.com/fc-villarreal/startseite/verein/1050" },
    { name: "Espanyol", url: "https://www.transfermarkt.com/espanyol-barcelona/startseite/verein/714" },
    { name: "Real Betis", url: "https://www.transfermarkt.com/real-betis-sevilla/startseite/verein/150" },
    { name: "Celta Vigo", url: "https://www.transfermarkt.com/celta-vigo/startseite/verein/940" },
    { name: "Athletic Bilbao", url: "https://www.transfermarkt.com/athletic-bilbao/startseite/verein/621" },
    { name: "Elche", url: "https://www.transfermarkt.com/fc-elche/startseite/verein/1531" },
    { name: "Sevilla", url: "https://www.transfermarkt.com/fc-sevilla/startseite/verein/368" },
    { name: "Getafe", url: "https://www.transfermarkt.com/getafe-cf/startseite/verein/3709" },
    { name: "Osasuna", url: "https://www.transfermarkt.com/ca-osasuna/startseite/verein/331" },
    { name: "RCD Mallorca", url: "https://www.transfermarkt.com/rcd-mallorca/startseite/verein/237" },
    { name: "Deportivo Alaves", url: "https://www.transfermarkt.com/deportivo-alaves/startseite/verein/1108" },
    { name: "Rayo Vallecano", url: "https://www.transfermarkt.com/rayo-vallecano/startseite/verein/367" },
    { name: "Real Sociedad", url: "https://www.transfermarkt.com/real-sociedad-san-sebastian/startseite/verein/681" },
    { name: "Valencia", url: "https://www.transfermarkt.com/fc-valencia/startseite/verein/1049" },
    { name: "Girona", url: "https://www.transfermarkt.com/fc-girona/startseite/verein/12321" },
    { name: "Real Oviedo", url: "https://www.transfermarkt.com/real-oviedo/startseite/verein/331" },
    { name: "Levante", url: "https://www.transfermarkt.com/levante-ud/startseite/verein/3368" },
];

async function scrapeTeamSquad(page, teamUrl, teamName) {
    console.log(`\n🔍 Scraping ${teamName}...`);

    try {
        await page.goto(teamUrl, { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for squad table to load
        await page.waitForSelector('table.items', { timeout: 10000 });

        // Extract player data
        const players = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table.items tbody tr'));
            const playerData = [];

            rows.forEach(row => {
                // Skip header rows
                if (row.classList.contains('thead')) return;

                try {
                    const nameCell = row.querySelector('td.hauptlink a');
                    const positionCell = row.querySelectorAll('td')[1];
                    const ageCell = row.querySelector('td.zentriert:nth-of-type(3)');
                    const nationalityImg = row.querySelector('td.zentriert img.flaggenrahmen');
                    const marketValueCell = row.querySelector('td.rechts.hauptlink');

                    if (!nameCell) return;

                    const name = nameCell.textContent.trim();
                    const position = positionCell?.textContent.trim() || '';
                    const age = parseInt(ageCell?.textContent.trim()) || 0;
                    const nationality = nationalityImg?.getAttribute('title') || '';
                    const marketValue = marketValueCell?.textContent.trim() || '€0';

                    playerData.push({
                        name,
                        position,
                        nationality,
                        age,
                        marketValue
                    });
                } catch (err) {
                    console.error('Error parsing player row:', err);
                }
            });

            return playerData;
        });

        console.log(`✓ Found ${players.length} players for ${teamName}`);
        return players;

    } catch (error) {
        console.error(`❌ Error scraping ${teamName}:`, error.message);
        return [];
    }
}

async function main() {
    console.log('🚀 Starting La Liga Real Data Scraper\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

    const allTeamsData = [];

    for (const team of LA_LIGA_TEAMS) {
        const players = await scrapeTeamSquad(page, team.url, team.name);

        if (players.length > 0) {
            allTeamsData.push({
                teamName: team.name,
                players: players
            });
        }

        // Wait between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    await browser.close();

    // Save to file
    const outputPath = './scripts/laliga-real-data.json';
    fs.writeFileSync(outputPath, JSON.stringify(allTeamsData, null, 2));

    console.log(`\n✅ Scraping complete!`);
    console.log(`📝 Data saved to: ${outputPath}`);
    console.log(`\nTotal teams: ${allTeamsData.length}`);
    console.log(`Total players: ${allTeamsData.reduce((sum, team) => sum + team.players.length, 0)}`);

    // Show sample data
    console.log('\n📊 Sample data (Real Madrid):');
    const realMadrid = allTeamsData.find(t => t.teamName === 'Real Madrid');
    if (realMadrid) {
        realMadrid.players.slice(0, 5).forEach(p => {
            console.log(`  - ${p.name} (${p.position}, ${p.age}y, ${p.marketValue})`);
        });
    }
}

main().catch(console.error);
