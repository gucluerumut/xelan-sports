const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function analyze() {
    console.log('🌍 Analyzing Player Nationalities...');

    // Get all players
    const snapshot = await db.collection('players').get();
    const players = [];
    snapshot.forEach(doc => players.push(doc.data()));

    // Group by League -> Nationality -> Count
    const stats = {};
    const suspicious = [];

    players.forEach(p => {
        if (!stats[p.league]) stats[p.league] = {};
        if (!stats[p.league][p.nationality]) stats[p.league][p.nationality] = 0;
        stats[p.league][p.nationality]++;

        // Check for suspicious identical team/player nationality (heuristic)
        // This is normal for many players, but if 100% of a team is same nationality, that's weird for top leagues.
    });

    // Check for teams with 100% same nationality
    const teamHasForeigners = {};
    const teamPlayerCounts = {};

    players.forEach(p => {
        if (!teamPlayerCounts[p.teamName]) teamPlayerCounts[p.teamName] = 0;
        teamPlayerCounts[p.teamName]++;

        // Simple heuristic: if nationality is different from team country (we don't have team country here easily without joining, 
        // but we can guess or just look at diversity).
        // Let's just list diversity per team.
    });

    const teamNationalities = {};
    players.forEach(p => {
        if (!teamNationalities[p.teamName]) teamNationalities[p.teamName] = new Set();
        teamNationalities[p.teamName].add(p.nationality);
    });

    console.log('\n📊 Nationality Diversity per Team (Teams with < 3 unique nationalities are suspicious):');
    for (const [team, constellation] of Object.entries(teamNationalities)) {
        if (constellation.size < 3 && teamPlayerCounts[team] > 10) {
            console.log(`⚠️  ${team}: Only ${constellation.size} unique nationalities (${Array.from(constellation).join(', ')}) - Players: ${teamPlayerCounts[team]}`);
        }
    }

    console.log('\n📊 Top Nationalities per League:');
    for (const [league, counts] of Object.entries(stats)) {
        console.log(`\n🏆 ${league}:`);
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        sorted.forEach(([nat, count]) => console.log(`  - ${nat}: ${count}`));
    }
}

analyze().catch(console.error);
