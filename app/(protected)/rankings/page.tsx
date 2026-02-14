import Navbar from "@/components/Navbar";
import RankingsTableFirestore from "@/components/RankingsTableFirestore";

export default function RankingsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-24">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">Sıralamalar</h1>
                    <p className="text-gray-400">Instagram, Twitter ve TikTok'tan canlı veri</p>
                </div>

                <RankingsTableFirestore />
            </div>
        </main>
    );
}
