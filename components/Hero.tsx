"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Globe } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[100px]" />
            <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-600/20 blur-[80px]" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl space-y-8"
            >
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-400 backdrop-blur-sm">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                    Canlı Küresel Sıralamalar 2025
                </div>

                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
                    Dijital Sporun <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        Nabzı
                    </span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl">
                    Dünyanın en iyi spor takımlarının gerçek zamanlı sosyal medya büyümesini, etkileşimini ve etkisini takip edin.
                    Modern çağ için veri odaklı içgörüler.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/rankings"
                        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 font-bold text-black transition-all hover:bg-gray-200"
                    >
                        Sıralamaları Keşfet
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Stats Preview */}
                <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { label: "Takip Edilen Takımlar", value: "500+", icon: Globe },
                        { label: "Veri Noktaları", value: "1M+", icon: TrendingUp },
                        { label: "Toplam Takipçi", value: "2.5B", icon: Users },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                        >
                            <stat.icon className="mb-2 h-6 w-6 text-blue-400" />
                            <span className="text-2xl font-bold text-white">{stat.value}</span>
                            <span className="text-sm text-gray-400">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
