
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../service-account.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function checkData() {
    console.log('🔍 Checking Firestore Data...');

    // Count Teams
    const teamsSnap = await db.collection('teams').get();
    console.log(`✅ Total Teams: ${teamsSnap.size}`);

    // Count Players
    const playersSnap = await db.collection('players').get();
    console.log(`✅ Total Players: ${playersSnap.size}`);

    // Group Players by Team
    const playersByTeam = {};
    playersSnap.forEach(doc => {
        const p = doc.data();
        const teamName = p.teamName || 'Unknown';
        if (!playersByTeam[teamName]) playersByTeam[teamName] = 0;
        playersByTeam[teamName]++;
    });

    console.log('\n📊 Players per Team:');
    const outliers = [];
    const allTeams = [];

    Object.entries(playersByTeam).forEach(([team, count]) => {
        console.log(`${team.padEnd(25)}: ${count}`);
        allTeams.push(team);
        if (count < 15 || count > 40) {
            outliers.push({ team, count });
        }
    });

    console.log('\n⚠️  Outliers (Suspicious Counts):');
    if (outliers.length === 0) console.log("None! All teams have 15-40 players.");
    else outliers.forEach(o => console.log(`- ${o.team}: ${o.count} players`));

    console.log('\n📊 Team Followers Check:');
    const zeroFollowers = [];
    teamsSnap.forEach(doc => {
        const t = doc.data();
        // console.log(`${t.name.padEnd(25)}: ${t.totalFollowers}`);
        if (!t.totalFollowers || t.totalFollowers === 0) {
            zeroFollowers.push({ name: t.name, id: doc.id });
        }
    });

    if (zeroFollowers.length > 0) {
        console.log(`\n⚠️  ${zeroFollowers.length} teams have 0 followers:`);
        zeroFollowers.slice(0, 50).forEach(t => console.log(`- ${t.name} (ID: ${t.id})`));
        if (zeroFollowers.length > 50) console.log(`... and ${zeroFollowers.length - 50} more`);
    } else {
        console.log('\n✅ All teams have follower data.');
    }

    // Random check of 3 teams
    console.log('\n🕵️  Random Squad Check:');
    const randomTeams = allTeams.sort(() => 0.5 - Math.random()).slice(0, 3);

    for (const team of randomTeams) {
        console.log(`\nSquad for ${team}:`);
        const teamPlayers = playersSnap.docs
            .map(d => d.data())
            .filter(p => p.teamName === team)
            .map(p => `${p.name} (${p.position}, ${p.marketValue})`);

        teamPlayers.slice(0, 10).forEach(p => console.log(`  - ${p}`));
        if (teamPlayers.length > 10) console.log(`  ... and ${teamPlayers.length - 10} more`);
    }

    // Check for Real Madrid specifically
    const realMadridPlayers = playersSnap.docs.filter(d => d.data().teamName === 'Real Madrid');
    console.log(`\nℹ️ Real Madrid Players: ${realMadridPlayers.length}`);
    if (realMadridPlayers.length < 5 && realMadridPlayers.length > 0) {
        console.log('Sample names:', realMadridPlayers.map(p => p.data().name).join(', '));
    }

    // Debug AC Milan
    console.log('\n🕵️  AC Milan Debug:');
    const milanTeams = teamsSnap.docs.filter(d => d.data().name === 'AC Milan');
    console.log(`Found ${milanTeams.length} teams named "AC Milan":`);
    milanTeams.forEach(t => console.log(`- ID: ${t.id}, League: ${t.data()?.league || 'Unknown'}`));

    const milanPlayers = playersSnap.docs.filter(d => d.data().teamName === 'AC Milan');
    console.log(`Listing AC Milan Players (IDs and TeamIDs):`);
    milanPlayers.slice(0, 50).forEach(p => {
        const data = p.data();
        console.log(`- ${data.name} (ID: ${p.id}, TeamID: ${data.teamId})`);
    });
}

checkData().catch(console.error);
