
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

async function cleanDuplicates() {
    console.log("🔍 Fetching all players to check for duplicates...");
    const snap = await db.collection(PLAYERS_COLLECTION).get();

    if (snap.empty) {
        console.log("No players found.");
        return;
    }

    const players = [];
    snap.forEach(doc => {
        players.push({ id: doc.id, ...doc.data() });
    });

    console.log(`Checking ${players.length} players...`);

    // Group by Team + Name (normalized)
    const groups = {};

    players.forEach(p => {
        if (!p.teamId || !p.name) return;
        const key = `${p.teamId}_${p.name.toLowerCase().trim()}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
    });

    let deletedCount = 0;
    const batchSize = 400;
    let batch = db.batch();
    let batchCount = 0;

    for (const key in groups) {
        const group = groups[key];
        if (group.length > 1) {
            // Sort to find the best candidate to KEEP
            // Priority: Has Photo > Higher Market Value > Has Socials > Newer
            group.sort((a, b) => {
                const aPhoto = a.photo && a.photo.length > 0 ? 1 : 0;
                const bPhoto = b.photo && b.photo.length > 0 ? 1 : 0;
                if (aPhoto !== bPhoto) return bPhoto - aPhoto; // Keep photo

                const aVal = a.marketValueNumeric || 0;
                const bVal = b.marketValueNumeric || 0;
                if (aVal !== bVal) return bVal - aVal; // Keep higher value

                // Determine "best" ID (e.g. deterministic one vs auto-generated)
                // Deterministic ID contains underscore usually (teamId_name)
                const aIsDeterm = a.id.includes('_');
                const bIsDeterm = b.id.includes('_');
                if (aIsDeterm !== bIsDeterm) return bIsDeterm ? 1 : -1; // Keep deterministic

                return 0;
            });

            // Keep index 0, delete the rest
            const toKeep = group[0];
            const toDelete = group.slice(1);

            console.log(`Duplicate found for ${toKeep.name} (${toKeep.teamName}): Keeping ${toKeep.id}, deleting ${toDelete.length} others.`);

            for (const p of toDelete) {
                batch.delete(db.collection(PLAYERS_COLLECTION).doc(p.id));
                batchCount++;
                deletedCount++;

                if (batchCount >= batchSize) {
                    await batch.commit();
                    console.log(`   - Committed batch delete...`);
                    batch = db.batch();
                    batchCount = 0;
                }
            }
        }
    }

    if (batchCount > 0) {
        await batch.commit();
    }

    console.log(`\n✅ Cleanup complete! Removed ${deletedCount} duplicate players.`);
}

cleanDuplicates().catch(console.error);
