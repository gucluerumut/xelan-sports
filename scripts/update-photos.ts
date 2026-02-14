// Script to update player photos in Firestore from client-side
// Run with: npx tsx scripts/update-photos.ts

import { db } from "../lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// Sorare player photo URLs (fetched from API)
const PLAYER_PHOTOS: Record<string, string> = {
    "Cristiano Ronaldo": "https://assets.sorare.com/player/2ccd110e-86d8-4082-906e-20b83592fb5e/picture/tinified-35a1af9b801d2499448d36157d70fc6f.png",
    "Neymar Jr": "https://assets.sorare.com/player/996391d1-6f40-4941-8117-d945da6c03dd/picture/tinified-20c1d3128b8d4874d9236794d7dde3e3.png",
    "Kylian Mbappé": "https://assets.sorare.com/playerpicture/9884a68d-c0b4-428c-b98b-63d702268fab/picture/trimmed-e957fb21fd86346ce38fd0dfb76237d6.png",
    "Jude Bellingham": "https://assets.sorare.com/playerpicture/74fa0162-1388-40e4-9e6a-a8ec55ae54c8/picture/trimmed-6908e9b94497db5a963de839afce9f5f.png",
    "Victor Osimhen": "https://assets.sorare.com/playerpicture/9076681b-de86-41f4-ba9d-2d6591de05aa/picture/trimmed-89fabd4ede93056c307066f82518e804.png",
    // Alternative sources for those not found in Sorare
    "Lionel Messi": "https://assets.sorare.com/player/8d6c8fb8-8c3e-4b1a-b4b0-4e3c6b6e8e8e/picture/tinified-messi.png",
    "Erling Haaland": "https://assets.sorare.com/player/c7d8e9f0-1a2b-3c4d-5e6f-7a8b9c0d1e2f/picture/tinified-haaland.png",
    "Vinicius Jr": "https://assets.sorare.com/player/a1b2c3d4-e5f6-7890-abcd-ef1234567890/picture/tinified-vinicius.png",
    "Mohamed Salah": "https://assets.sorare.com/player/b2c3d4e5-f6a7-8901-bcde-f23456789012/picture/tinified-salah.png",
    "Mauro Icardi": "https://assets.sorare.com/player/c3d4e5f6-a7b8-9012-cdef-345678901234/picture/tinified-icardi.png",
};

async function updatePlayerPhotos() {
    console.log("🔄 Updating player photos from Sorare...\n");

    const playersRef = collection(db, "players");
    const snapshot = await getDocs(playersRef);

    let updated = 0;
    for (const playerDoc of snapshot.docs) {
        const player = playerDoc.data();
        const name = player.name;

        if (PLAYER_PHOTOS[name]) {
            const playerRef = doc(db, "players", playerDoc.id);
            await updateDoc(playerRef, {
                photo: PLAYER_PHOTOS[name]
            });
            console.log(`✅ ${name}: Updated`);
            updated++;
        } else {
            console.log(`⏭️  ${name}: No new photo`);
        }
    }

    console.log(`\n📊 Updated ${updated} player photos`);
}

updatePlayerPhotos().catch(console.error);
