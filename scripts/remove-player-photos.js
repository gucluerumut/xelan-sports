
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
const PLAYERS_COLLECTION = "players";

async function removeBiosAndPhotos() {
    console.log("🔍 Fetching all players to remove photos...");
    const snap = await db.collection(PLAYERS_COLLECTION).get();

    if (snap.empty) {
        console.log("No players found.");
        return;
    }

    console.log(`Processing ${snap.size} players...`);

    let batch = db.batch();
    let batchCount = 0;
    let updatedCount = 0;
    const batchSize = 400;

    snap.docs.forEach(doc => {
        const data = doc.data();
        if (data.photo !== "") { // Only update if needed
            batch.update(doc.ref, {
                photo: "" // Clear photo
            });
            batchCount++;
            updatedCount++;
        }

        if (batchCount >= batchSize) {
            batch.commit();
            console.log(`   - Committed batch clear...`);
            batch = db.batch();
            batchCount = 0;
        }
    });

    if (batchCount > 0) {
        await batch.commit();
    }

    console.log(`\n✅ Removed photos from ${updatedCount} players.`);
}

removeBiosAndPhotos().catch(console.error);
