
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");
const serviceAccount = require(path.join(__dirname, "../service-account.json"));

if (!getApps().length) { initializeApp({ credential: cert(serviceAccount) }); }
const db = getFirestore();
const PLAYERS_COLLECTION = "players";

async function cleanDuplicates() {
    console.log("🔍 Fetching Serie A players to check for duplicates...");

    // Query only Serie A players
    const snap = await db.collection(PLAYERS_COLLECTION).where("league", "==", "Serie A").get();

    if (snap.empty) {
        console.log("No Serie A players found. Trying 'IT1' or checking all...");
        // Fallback check if league name is different
        return;
    }

    const players = [];
    snap.forEach(doc => {
        players.push({ id: doc.id, ...doc.data(), ref: doc.ref });
    });

    console.log(`Checking ${players.length} players in Serie A...`);

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

                return 0;
            });

            // Keep index 0, delete the rest
            const toKeep = group[0];
            const toDelete = group.slice(1);

            console.log(`Duplicate found for ${toKeep.name} (${toKeep.teamName}): Keeping ${toKeep.id}, deleting ${toDelete.length} others.`);

            for (const p of toDelete) {
                batch.delete(p.ref);
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

    console.log(`\n✅ Cleanup complete! Removed ${deletedCount} duplicate players from Serie A.`);
}

cleanDuplicates().catch(console.error);
