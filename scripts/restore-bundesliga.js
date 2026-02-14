const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const BUNDESLIGA_DATA = [
    { id: 'bayern-munich', name: 'Bayern Munich', instagram: 42000000, twitter: 7000000, tiktok: 20000000 },
    { id: 'dortmund', name: 'Borussia Dortmund', instagram: 20000000, twitter: 5000000, tiktok: 8000000 },
    { id: 'leverkusen', name: 'Bayer 04 Leverkusen', instagram: 4500000, twitter: 1000000, tiktok: 3000000 },
    { id: 'leipzig', name: 'RB Leipzig', instagram: 2500000, twitter: 800000, tiktok: 4000000 },
    { id: 'stuttgart', name: 'VfB Stuttgart', instagram: 1200000, twitter: 600000, tiktok: 800000 },
    { id: 'frankfurt', name: 'Eintracht Frankfurt', instagram: 1500000, twitter: 700000, tiktok: 1000000 },
    { id: 'wolfsburg', name: 'VfL Wolfsburg', instagram: 800000, twitter: 400000, tiktok: 2000000 },
    { id: 'freiburg', name: 'SC Freiburg', instagram: 600000, twitter: 300000, tiktok: 400000 },
    { id: 'mainz', name: '1.FSV Mainz 05', instagram: 400000, twitter: 200000, tiktok: 300000 },
    { id: 'augsburg', name: 'FC Augsburg', instagram: 350000, twitter: 150000, tiktok: 250000 },
    { id: 'hoffenheim', name: 'TSG 1899 Hoffenheim', instagram: 300000, twitter: 120000, tiktok: 200000 },
    { id: 'werder-bremen', name: 'SV Werder Bremen', instagram: 700000, twitter: 500000, tiktok: 600000 },
    { id: 'union-berlin', name: '1.FC Union Berlin', instagram: 500000, twitter: 200000, tiktok: 300000 },
    { id: 'monchengladbach', name: 'Borussia Mönchengladbach', instagram: 1000000, twitter: 600000, tiktok: 500000 },
    { id: 'heidenheim', name: '1.FC Heidenheim 1846', instagram: 200000, twitter: 80000, tiktok: 150000 },
    { id: 'st-pauli', name: 'FC St. Pauli', instagram: 400000, twitter: 250000, tiktok: 300000 },
    { id: 'koln', name: '1.FC Köln', instagram: 1100000, twitter: 600000, tiktok: 500000 },
    { id: 'hamburger', name: 'Hamburger SV', instagram: 800000, twitter: 400000, tiktok: 400000 },
];

async function restore() {
    console.log('🇩🇪 Restoring Bundesliga Data...');

    // We need to match by Name because ID might be different in DB?
    // Let's create a map of Name -> Data

    const teamsSnap = await db.collection('teams').where('league', '==', 'Bundesliga').get();
    console.log(`Found ${teamsSnap.size} Bundesliga teams in DB.`);

    const updates = [];

    for (const doc of teamsSnap.docs) {
        const t = doc.data();
        const Match = BUNDESLIGA_DATA.find(d => d.name === t.name || t.name.includes(d.name) || d.name.includes(t.name));

        if (Match) {
            console.log(`Updating ${t.name} (Matched: ${Match.name})...`);
            updates.push(doc.ref.update({
                socials: {
                    instagram: { followers: Match.instagram, username: Match.name.replace(/\s/g, '').toLowerCase() },
                    twitter: { followers: Match.twitter, username: Match.name.replace(/\s/g, '') },
                    tiktok: { followers: Match.tiktok, username: Match.name.replace(/\s/g, '').toLowerCase() }
                },
                totalFollowers: Match.instagram + Match.twitter + Match.tiktok
            }));
        } else {
            console.log(`⚠️ No match for ${t.name}`);
        }
    }

    await Promise.all(updates);
    console.log('✅ Bundesliga Restoration Complete!');
}

restore().catch(console.error);
