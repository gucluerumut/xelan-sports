
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");
const serviceAccount = require(path.join(__dirname, "../service-account.json"));

if (!getApps().length) { initializeApp({ credential: cert(serviceAccount) }); }
const db = getFirestore();

async function run() {
    console.log("🔍 Searching for teams in 'Unknown' league...");

    // We need to be careful with quotas. Let's try to limit if possible, or just run it.
    // Given we just hit quota, maybe we should wait or try a very specific delete if we knew the ID.
    // But we don't know the ID.
    // Let's try to get all teams and filter in memory if the query is the issue? 
    // No, getting all teams is worse for quota.
    // The query 'where league == Unknown' should be efficient if indexed, but quota error implies we ran out of reads/writes for the day?
    // Or maybe it's just a temporary glitch.

    try {
        const snap = await db.collection("teams").where("league", "==", "Unknown").get();
        console.log(`Found ${snap.size} teams in Unknown league`);

        if (snap.empty) {
            console.log("No teams found in 'Unknown' league.");
            return;
        }

        const batch = db.batch();
        let count = 0;

        for (const doc of snap.docs) {
            console.log(`- Deleting Team: ${doc.data().name} (${doc.id})`);

            // Delete team
            batch.delete(doc.ref);

            // Find and delete players for this team
            const playersSnap = await db.collection("players").where("teamId", "==", doc.id).get();
            console.log(`  - Found ${playersSnap.size} players to delete.`);
            playersSnap.forEach(p => {
                batch.delete(p.ref);
            });

            count++;
        }

        await batch.commit();
        console.log(`✅ Successfully deleted ${count} teams and their players.`);

    } catch (error) {
        console.error("Error:", error);
    }
}

run();
