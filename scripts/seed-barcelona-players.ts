/**
 * Script to seed Barcelona squad into Firestore
 * Run with: npx ts-node scripts/seed-barcelona-players.ts
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { BARCELONA_SQUAD } from "../lib/barcelona-squad";

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

    let barcelonaTeam: any = null;
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
