import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// Sorare player photo URLs (fetched from Sorare GraphQL API)
const PLAYER_PHOTOS: Record<string, string> = {
    "Cristiano Ronaldo": "https://assets.sorare.com/player/2ccd110e-86d8-4082-906e-20b83592fb5e/picture/tinified-35a1af9b801d2499448d36157d70fc6f.png",
    "Neymar Jr": "https://assets.sorare.com/player/996391d1-6f40-4941-8117-d945da6c03dd/picture/tinified-20c1d3128b8d4874d9236794d7dde3e3.png",
    "Kylian Mbappé": "https://assets.sorare.com/playerpicture/9884a68d-c0b4-428c-b98b-63d702268fab/picture/trimmed-e957fb21fd86346ce38fd0dfb76237d6.png",
    "Jude Bellingham": "https://assets.sorare.com/playerpicture/74fa0162-1388-40e4-9e6a-a8ec55ae54c8/picture/trimmed-6908e9b94497db5a963de839afce9f5f.png",
    "Victor Osimhen": "https://assets.sorare.com/playerpicture/9076681b-de86-41f4-ba9d-2d6591de05aa/picture/trimmed-89fabd4ede93056c307066f82518e804.png",
    // Fallback Wikipedia images for players not found in Sorare
    "Lionel Messi": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg",
    "Erling Haaland": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Erling_Haaland_2022-09-14_1.jpg/220px-Erling_Haaland_2022-09-14_1.jpg",
    "Vinicius Jr": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vin%C3%ADcius_J%C3%BAnior_2024.jpg/220px-Vin%C3%ADcius_J%C3%BAnior_2024.jpg",
    "Mohamed Salah": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/220px-Mohamed_Salah_2018.jpg",
    "Mauro Icardi": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Mauro_Icardi_2019_%28cropped%29.jpg/220px-Mauro_Icardi_2019_%28cropped%29.jpg",
};

/**
 * POST /api/update-player-photos
 * Updates all player photos with Sorare images
 */
export async function POST(req: NextRequest) {
    try {
        const playersRef = collection(db, "players");
        const snapshot = await getDocs(playersRef);

        let updated = 0;
        const results: { name: string; success: boolean }[] = [];

        for (const playerDoc of snapshot.docs) {
            const player = playerDoc.data();
            const name = player.name;

            if (PLAYER_PHOTOS[name]) {
                const playerRef = doc(db, "players", playerDoc.id);
                await updateDoc(playerRef, {
                    photo: PLAYER_PHOTOS[name]
                });
                results.push({ name, success: true });
                updated++;
            } else {
                results.push({ name, success: false });
            }
        }

        return NextResponse.json({
            success: true,
            updated,
            total: snapshot.docs.length,
            results
        });
    } catch (error) {
        console.error("Error updating player photos:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update photos" },
            { status: 500 }
        );
    }
}
