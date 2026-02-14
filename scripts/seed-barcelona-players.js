/**
 * Script to seed Barcelona squad into Firestore
 * Run with: node scripts/seed-barcelona-players.js
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } = require("firebase/firestore");
require('dotenv').config({ path: '.env.local' });

// Barcelona squad data
const BARCELONA_SQUAD = [
    {
        name: "Lamine Yamal",
        position: "RW",
        nationality: "Spain",
        age: 18,
        marketValue: "€200M",
        instagramUsername: "lamineyamal",
        instagramFollowers: 18500000,
    },
    {
        name: "Pedri",
        position: "CM",
        nationality: "Spain",
        age: 23,
        marketValue: "€140M",
        instagramUsername: "pedri",
        instagramFollowers: 15200000,
    },
    {
        name: "Raphinha",
        position: "LW",
        nationality: "Brazil",
        age: 29,
        marketValue: "€90M",
        instagramUsername: "raphinha",
        instagramFollowers: 6800000,
    },
    {
        name: "Pau Cubarsí",
        position: "CB",
        nationality: "Spain",
        age: 19,
        marketValue: "€80M",
        instagramUsername: "paucubarsi",
        instagramFollowers: 2100000,
    },
    {
        name: "Jules Koundé",
        position: "RB",
        nationality: "France",
        age: 27,
        marketValue: "€65M",
        instagramUsername: "jkeey4",
        instagramFollowers: 4300000,
    },
    {
        name: "Dani Olmo",
        position: "AM",
        nationality: "Spain",
        age: 27,
        marketValue: "€60M",
        instagramUsername: "daniolmo7",
        instagramFollowers: 3200000,
    },
    {
        name: "Alejandro Balde",
        position: "LB",
        nationality: "Spain",
        age: 22,
        marketValue: "€60M",
        instagramUsername: "alejandrobalde",
        instagramFollowers: 2500000,
    },
    {
        name: "Ronald Araújo",
        position: "CB",
        nationality: "Uruguay",
        age: 26,
        marketValue: "€50M",
        instagramUsername: "ronaldaraujo",
        instagramFollowers: 5100000,
    },
    {
        name: "Ferran Torres",
        position: "CF",
        nationality: "Spain",
        age: 25,
        marketValue: "€50M",
        instagramUsername: "ferrantorres",
        instagramFollowers: 4700000,
    },
    {
        name: "Frenkie de Jong",
        position: "CM",
        nationality: "Netherlands",
        age: 28,
        marketValue: "€45M",
        instagramUsername: "frenkiedejong",
        instagramFollowers: 16800000,
    },
    {
        name: "Gavi",
        position: "CM",
        nationality: "Spain",
        age: 21,
        marketValue: "€40M",
        instagramUsername: "pablogavi",
        instagramFollowers: 18900000,
    },
    {
        name: "Fermín López",
        position: "AM",
        nationality: "Spain",
        age: 22,
        marketValue: "€30M",
        instagramUsername: "ferminlopez",
        instagramFollowers: 1800000,
    },
    {
        name: "Andreas Christensen",
        position: "CB",
        nationality: "Denmark",
        age: 29,
        marketValue: "€25M",
        instagramUsername: "andreaschristensen",
        instagramFollowers: 1200000,
    },
    {
        name: "Marc Casadó",
        position: "DM",
        nationality: "Spain",
        age: 22,
        marketValue: "€25M",
        instagramUsername: "marccasado",
        instagramFollowers: 950000,
    },
    {
        name: "Joan García",
        position: "GK",
        nationality: "Spain",
        age: 24,
        marketValue: "€25M",
        instagramUsername: "joangarcia13",
        instagramFollowers: 580000,
    },
    {
        name: "Eric García",
        position: "CB",
        nationality: "Spain",
        age: 25,
        marketValue: "€20M",
        instagramUsername: "ericgm3",
        instagramFollowers: 2100000,
    },
    {
        name: "Marc Bernal",
        position: "DM",
        nationality: "Spain",
        age: 18,
        marketValue: "€15M",
        instagramUsername: "marcbernal28",
        instagramFollowers: 420000,
    },
    {
        name: "Gerard Martín",
        position: "LB",
        nationality: "Spain",
        age: 23,
        marketValue: "€12M",
        instagramUsername: "gerardmartin24",
        instagramFollowers: 380000,
    },
    {
        name: "Robert Lewandowski",
        position: "ST",
        nationality: "Poland",
        age: 37,
        marketValue: "€9M",
        instagramUsername: "_rl9",
        instagramFollowers: 37500000,
    },
    {
        name: "Wojciech Szczęsny",
        position: "GK",
        nationality: "Poland",
        age: 35,
        marketValue: "€2M",
        instagramUsername: "wojciech.szczesny.1",
        instagramFollowers: 7200000,
    },
];

// Firebase config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedBarcelonaPlayers() {
    console.log("🔄 Starting Barcelona squad seeding...\n");

    // Step 1: Delete all existing players
    console.log("🗑️  Deleting existing players...");
    const playersRef = collection(db, "players");
    const snapshot = await getDocs(playersRef);

    let deletedCount = 0;
    for (const playerDoc of snapshot.docs) {
        await deleteDoc(doc(db, "players", playerDoc.id));
        deletedCount++;
    }
    console.log(`✅ Deleted ${deletedCount} existing players\n`);

    // Step 2: Get Barcelona team ID
    console.log("🔍 Finding Barcelona team...");
    const teamsRef = collection(db, "teams");
    const teamsSnapshot = await getDocs(teamsRef);

    let barcelonaTeam = null;
    for (const teamDoc of teamsSnapshot.docs) {
        const teamData = teamDoc.data();
        if (teamData.name === "FC Barcelona" || teamData.name === "Barcelona") {
            barcelonaTeam = { id: teamDoc.id, ...teamData };
            break;
        }
    }

    if (!barcelonaTeam) {
        console.error("❌ Barcelona team not found in database!");
        console.log("Please make sure Barcelona exists in the teams collection.");
        process.exit(1);
    }

    console.log(`✅ Found Barcelona: ${barcelonaTeam.name} (${barcelonaTeam.league})\n`);

    // Step 3: Add Barcelona players
    console.log("➕ Adding Barcelona players...");
    let addedCount = 0;

    for (const player of BARCELONA_SQUAD) {
        const playerData = {
            name: player.name,
            teamId: barcelonaTeam.id,
            teamName: barcelonaTeam.name,
            league: barcelonaTeam.league,
            position: player.position,
            nationality: player.nationality,
            age: player.age,
            marketValue: player.marketValue,
            socials: {
                instagram: {
                    username: player.instagramUsername || "",
                    url: player.instagramUsername ? `https://instagram.com/${player.instagramUsername}` : "",
                    followers: player.instagramFollowers || 0,
                },
                twitter: {
                    username: "",
                    url: "",
                    followers: 0,
                },
                tiktok: {
                    username: "",
                    url: "",
                    followers: 0,
                },
            },
            totalFollowers: player.instagramFollowers || 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await addDoc(playersRef, playerData);
        console.log(`  ✓ ${player.name} (${player.position}) - ${player.marketValue}`);
        addedCount++;
    }

    console.log(`\n✅ Successfully added ${addedCount} Barcelona players!`);
    console.log(`\n📊 Squad Summary:`);
    console.log(`   Total Players: ${addedCount}`);
    console.log(`   Team: ${barcelonaTeam.name}`);
    console.log(`   League: ${barcelonaTeam.league}`);
    console.log(`\n🎉 Barcelona squad seeding complete!`);
}

// Run the script
seedBarcelonaPlayers()
    .then(() => {
        console.log("\n✨ Script finished successfully");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Error seeding Barcelona players:", error);
        process.exit(1);
    });
