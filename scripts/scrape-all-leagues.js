#!/usr/bin/env node

/**
 * Generic Transfermarkt Scraper for All Leagues
 * Scrapes player data for specified leagues
 * 
 * Usage: node scripts/scrape-all-leagues.js [league_code]
 * Example: node scripts/scrape-all-leagues.js GB1 (for Premier League)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// League Configs
const LEAGUES = {
    'GB1': { name: 'Premier League', url: 'https://www.transfermarkt.com/premier-league/startseite/wettbewerb/GB1' },
    'IT1': { name: 'Serie A', url: 'https://www.transfermarkt.com/serie-a/startseite/wettbewerb/IT1' },
    'L1': { name: 'Bundesliga', url: 'https://www.transfermarkt.com/bundesliga/startseite/wettbewerb/L1' },
    'FR1': { name: 'Ligue 1', url: 'https://www.transfermarkt.com/ligue-1/startseite/wettbewerb/FR1' },
    'TR1': { name: 'Süper Lig', url: 'https://www.transfermarkt.com/super-lig/startseite/wettbewerb/TR1' },
};

async function scrapeLeagueTeams(page, leagueUrl) {
    console.log(`\n🔍 Finding teams in league: ${leagueUrl}...`);
    await page.goto(leagueUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // Accept cookies if needed (Transfermarkt has a popup usually)
    try {
        const acceptBtn = await page.waitForSelector('button[title="Accept"]', { timeout: 5000 });
        if (acceptBtn) await acceptBtn.click();
    } catch (e) {
        // Ignore if no cookie banner
    }

    // Wait for the main table to load
    await page.waitForSelector('.responsive-table', { timeout: 30000 });

    const teamLinks = await page.evaluate(() => {
        // Select specifically from the standing table or club table
        // Usually id="yw1" or class="items" for the main table
        const table = document.querySelector('table.items') || document.querySelector('.responsive-table table');
        if (!table) return [];

        const links = Array.from(table.querySelectorAll('td.hauptlink.no-border-links a'));
        return links.map(link => ({
            name: link.textContent.trim(),
            url: link.href
        }))
            .filter(t => t.url.includes('/startseite/verein/')) // Ensure it's a team start page
            .filter((v, i, a) => a.findIndex(t => t.url === v.url) === i); // Deduplicate
    });

    console.log(`✓ Found ${teamLinks.length} teams.`);
    return teamLinks;
}

async function scrapeTeamSquad(page, teamUrl, teamName) {
    console.log(`\n🔍 Scraping ${teamName}...`);

    try {
        await page.goto(teamUrl, { waitUntil: 'networkidle2', timeout: 45000 });

        // Wait for squad table
        await page.waitForSelector('table.items', { timeout: 10000 });

        // Extract team logo
        const teamLogo = await page.evaluate(() => {
            const selectors = [
                '.data-header__profile-image',
                '.data-header__image',
                'meta[property="og:image"]'
            ];

            for (const s of selectors) {
                const el = document.querySelector(s);
                if (el) {
                    if (s.includes('meta')) return el.content;
                    return el.src || el.dataset.src;
                }
            }
            return '';
        });

        if (!teamLogo) console.log('⚠️ Logo not found for this team');
        else console.log('✓ Found logo');

        const players = await page.evaluate((teamName) => {
            // Usually #yw1 is the main squad table. Fallback to first table.items if needed.
            const table = document.querySelector('#yw1 table.items') || document.querySelector('table.items');
            if (!table) return [];

            // DEBUG: Print table headers
            if (teamName === 'AC Milan') {
                const headers = Array.from(table.querySelectorAll('th')).map(th => th.innerText.trim());
                console.log('DEBUG TABLE HEADERS:', headers);
                console.log('DEBUG TABLE HTML:', table.innerHTML.substring(0, 500));
            }

            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const playerData = [];

            rows.forEach(row => {
                if (row.classList.contains('thead')) return;

                try {
                    // Selectors might need adjustment based on Transfermarkt's layout changes
                    const numberCell = row.querySelector('div.rn_nummer');
                    const nameCell = row.querySelector('td.hauptlink a');
                    const positionCell = row.querySelectorAll('td')[1]; // usually position is 2nd td? check layout
                    // Actually Transfermarkt layout:
                    // TD 0: Number (div inside)
                    // TD 1: Photo & Name & Position (complex)
                    // Let's rely on specific classes

                    const nameElement = row.querySelector('td.hauptlink a');
                    const positionElement = row.querySelectorAll('td.zentriert')[0]; // Usage might vary

                    // Robust extraction attempts
                    const name = nameElement ? nameElement.textContent.trim() : '';
                    const photoElement = row.querySelector('img.bilderrahmen-fixed');
                    const photo = photoElement ? photoElement.getAttribute('data-src') || photoElement.src : '';

                    const marketValueCell = row.querySelector('td.rechts.hauptlink');
                    const marketValue = marketValueCell ? marketValueCell.textContent.trim() : '€0';

                    // Position is tricky, it's often in text inside a table cell or separate
                    // Let's get the row text content to be safe or try specific selector
                    // Usually rows[1] is position but better check
                    const allTds = row.querySelectorAll('td');
                    let position = 'Unknown';
                    // Try to find position text (GK, Centre-Back, etc.)
                    // Usually it's in the second column table inside the cell
                    const inlineTable = row.querySelector('table.inline-table');
                    if (inlineTable) {
                        const posRow = inlineTable.querySelectorAll('tr')[1];
                        if (posRow) position = posRow.textContent.trim();
                    }

                    // Nationality
                    const natImg = row.querySelector('img.flaggenrahmen');
                    const nationality = natImg ? natImg.title : 'Unknown';

                    // Age
                    const ageCell = row.querySelector('td.zentriert:nth-of-type(3)'); // checking structure
                    // Transfermarkt structure:
                    // td.zentriert (Age) is usually the 3rd or 4th column.
                    // Let's rely on text length or specific class if available.

                    if (name) {
                        playerData.push({
                            name,
                            position,
                            nationality,
                            marketValue,
                            photo
                        });
                    }
                } catch (err) { }
            });
            return playerData;
        }, teamName);

        console.log(`✓ Found ${players.length} players for ${teamName}`);
        return { players, logo: teamLogo };

    } catch (error) {
        console.error(`❌ Error scraping ${teamName}:`, error.message);
        return [];
    }
}

async function main() {
    const leagueCode = process.argv[2] || 'GB1'; // Default to PL
    const league = LEAGUES[leagueCode];

    if (!league) {
        console.error(`Invalid league code! Available: ${Object.keys(LEAGUES).join(', ')}`);
        process.exit(1);
    }

    console.log(`🚀 Starting Scraper for ${league.name} (${leagueCode})\n`);

    // Ensure data dir exists immediately
    const outputDir = path.join(__dirname, '../data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
        console.log(`Created directory: ${outputDir}`);
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Block images/css to speed up
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType()) && !req.url().includes('header')) {
                req.abort();
            } else {
                req.continue();
            }
        });

        // 1. Get Teams
        const teamLinks = await scrapeLeagueTeams(page, league.url);

        // 2. Scrape Each Team
        const leagueData = [];

        for (const team of teamLinks) {
            // Random delay to be polite
            await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

            const { players, logo } = await scrapeTeamSquad(page, team.url, team.name);
            leagueData.push({
                teamName: team.name,
                teamLogo: logo,
                url: team.url,
                players: players
            });
        }

        // 3. Save Data
        const outputDir = path.join(__dirname, '../data');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const fileName = `${league.name.toLowerCase().replace(/ /g, '-')}-players.json`;
        const outputPath = path.join(outputDir, fileName);

        fs.writeFileSync(outputPath, JSON.stringify(leagueData, null, 2));
        console.log(`\n✅ Saved data to ${outputPath}`);
        console.log(`Total Teams: ${leagueData.length}`);
        console.log(`Total Players: ${leagueData.reduce((acc, t) => acc + t.players.length, 0)}`);

    } catch (error) {
        console.error('Fatal Error:', error);
    } finally {
        await browser.close();
    }
}

main();
