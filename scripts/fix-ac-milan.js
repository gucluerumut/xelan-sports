
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load Service Account
const serviceAccountPath = path.resolve(__dirname, "../service-account.json");
if (!fs.existsSync(serviceAccountPath)) {
    console.error("Error: service-account.json not found!");
    process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();

async function fixMilan() {
    console.log("🕵️  Fixing AC Milan Data...");

    // Get all players for AC Milan
    const snapshot = await db.collection("players").where("teamName", "==", "AC Milan").get();
    console.log(`Found ${snapshot.size} players for AC Milan.`);

    const batch = db.batch();
    let deleteCount = 0;

    snapshot.forEach(doc => {
        const id = doc.id;
        // Check if ID is deterministic (starts with ac-milan_ or similar, or just check format)
        // Deterministic IDs are usually 'teamId_player_name'
        // Random IDs are mixed case alphanumeric

        // Actually, seed-league-data.js uses `${targetTeam.id}_${sanitizedName}`
        // AC Milan ID is 'ac-milan' (from list-teams.js)
        // So ID should start with 'ac-milan_' or 'ac-milan-'? 
        // Let's check the separator in seed-league-data.js: `${targetTeam.id}_${sanitizedName}` (Line 128 of original file?)
        // In Step 2145 (view seed-league): `const docId = ${targetTeam.id}_${sanitizedName};`

        // So valid IDs start with `ac-milan_`.
        // However, looking at invalid IDs: `1hkPL4zXZosn5Xdaz1uW` (length 20).

        if (!id.startsWith("ac-milan_")) {
            console.log(`Deleting invalid player: ${doc.data().name} (ID: ${id})`);
            batch.delete(doc.ref);
            deleteCount++;
        }
    });

    if (deleteCount > 0) {
        await batch.commit();
        console.log(`✅ Successfully deleted ${deleteCount} invalid players.`);
    } else {
        console.log("✅ No invalid players found.");
    }
}

fixMilan().catch(console.error);
