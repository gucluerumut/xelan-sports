
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const serviceAccountPath = path.resolve(__dirname, "../service-account.json");
if (!fs.existsSync(serviceAccountPath)) {
    console.error("Error: service-account.json not found!");
    process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function listTeams() {
    const snap = await db.collection("teams").get();
    console.log(`Found ${snap.size} teams.`);
    const teams = snap.docs.map(d => d.data());

    // Group by League
    const grouped = {};
    teams.forEach(t => {
        const l = t.league || "Unknown";
        if (!grouped[l]) grouped[l] = [];
        grouped[l].push(t.name);
    });

    for (const [league, names] of Object.entries(grouped)) {
        console.log(`\n=== ${league} ===`);
        names.sort().forEach(n => console.log(n));
    }
}

listTeams().catch(console.error);
