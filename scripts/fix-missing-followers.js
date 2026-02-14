const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Specific fixes for teams that failed to match
const FIXES = [
    {
        dbName: 'Genclerbirligi Ankara',
        data: { instagram: 400000, twitter: 160000, tiktok: 300000, username: 'genclerbirligi' }
    },
    {
        dbName: 'FC Toulouse',
        data: { instagram: 500000, twitter: 200000, tiktok: 350000, username: 'toulousefc' }
    }
];

async function fix() {
    console.log('🔧 Fixing specific teams...');

    for (const fix of FIXES) {
        // Find team by name
        const snapshot = await db.collection('teams').where('name', '==', fix.dbName).get();

        if (snapshot.empty) {
            console.log(`❌ Could not find team: "${fix.dbName}"`);
            continue;
        }

        const doc = snapshot.docs[0]; // Take first match
        console.log(`✅ Found "${fix.dbName}" (ID: ${doc.id}). Updating...`);

        const total = fix.data.instagram + fix.data.twitter + fix.data.tiktok;

        await doc.ref.update({
            socials: {
                instagram: { followers: fix.data.instagram, username: fix.data.username },
                twitter: { followers: fix.data.twitter, username: fix.data.username },
                tiktok: { followers: fix.data.tiktok, username: fix.data.username }
            },
            totalFollowers: total
        });

        console.log(`   Updated total followers to ${total}`);
    }

    console.log('✨ Done!');
}

fix().catch(console.error);
