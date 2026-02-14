"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/authContext";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Keep motion as it's used later
import { toast } from "sonner";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        toast.success("Çıkış yapıldı");
        router.push("/login");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-32 w-auto">
                        <img
                            src="/logo-wide.png"
                            alt="Xelan Sports"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                        Ana Sayfa
                    </Link>
                    <Link href="/rankings" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                        Sıralamalar
                    </Link>
                    <Link href="/planner" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                        İçerik Planlayıcı
                    </Link>
                    <Link href="/compare" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                        Karşılaştır
                    </Link>
                    <Link href="/players" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">
                        Oyuncular
                    </Link>
                    {user && (
                        <>
                            <Link href="/admin" className="text-sm font-medium text-yellow-400 transition-colors hover:text-yellow-300">
                                Admin
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                            >
                                Çıkış Yap
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-md text-gray-300 hover:text-white md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-b border-white/10 bg-black/90 backdrop-blur-xl md:hidden"
                >
                    <div className="flex flex-col gap-4 p-4">
                        <Link href="/" className="text-base font-medium text-gray-300 hover:text-white">
                            Ana Sayfa
                        </Link>
                        <Link href="/rankings" className="text-base font-medium text-gray-300 hover:text-white">
                            Sıralamalar
                        </Link>
                        <Link href="/planner" className="text-base font-medium text-gray-300 hover:text-white">
                            İçerik Planlayıcı
                        </Link>
                        <Link href="/compare" className="text-base font-medium text-gray-300 hover:text-white">
                            Karşılaştır
                        </Link>
                        <Link href="/players" className="text-base font-medium text-gray-300 hover:text-white">
                            Oyuncular
                        </Link>
                        {user && (
                            <>
                                <Link href="/admin" className="text-base font-medium text-yellow-400 hover:text-yellow-300">
                                    Admin
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                                >
                                    Çıkış Yap
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
