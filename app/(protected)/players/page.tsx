"use client";

import PlayersTable from "@/components/PlayersTable";
import Navbar from "@/components/Navbar";

export default function PlayersPage() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 pt-16">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Oyuncu Sıralamaları
                    </h1>
                    <p className="text-gray-400">
                        Liglere göre futbolcu sosyal medya ve piyasa değeri sıralamaları
                    </p>
                </div>

                <PlayersTable />
            </main>
        </div>
    );
}
