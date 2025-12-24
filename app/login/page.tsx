"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loginWithEmail } from "@/lib/auth";
import { Mail, Lock, ArrowRight, Sparkles, TrendingUp, Calendar, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { user, error: loginError } = await loginWithEmail(email, password);

        if (loginError) {
            setError("Giriş başarısız. Email veya şifre hatalı.");
            toast.error("Giriş başarısız!");
            setLoading(false);
        } else if (user) {
            toast.success("Hoş geldiniz!");
            router.push("/");
        }
    };

    const features = [
        {
            icon: TrendingUp,
            title: "Gerçek Zamanlı Sıralamalar",
            description: "Dünya genelindeki spor kulüplerinin sosyal medya performansını anlık takip edin"
        },
        {
            icon: Calendar,
            title: "İçerik Planlayıcı",
            description: "Sosyal medya içeriklerinizi planlayın ve organize edin"
        },
        {
            icon: BarChart3,
            title: "Detaylı Analiz",
            description: "Takımları karşılaştırın ve veri odaklı kararlar alın"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
            </div>

            <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
                {/* Logo and Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <div className="mb-4 flex justify-center">
                        <img src="/logo-wide.png" alt="Xelan Sports" className="h-16 w-auto" />
                    </div>
                    <h1 className="mb-2 text-4xl font-bold text-white">
                        Sosyal Medya Sıralamalarında
                    </h1>
                    <p className="text-xl text-gray-400">Lider Platform</p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 grid max-w-4xl gap-6 md:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-blue-500/50 hover:bg-white/10"
                        >
                            <feature.icon className="mb-4 h-8 w-8 text-blue-500 transition-transform group-hover:scale-110" />
                            <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                        <div className="mb-6 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-blue-500" />
                            <h2 className="text-2xl font-bold text-white">Giriş Yap</h2>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@xelansports.com"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-black/50 py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Şifre</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-black/50 py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-3 text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-8 text-sm text-gray-500"
                >
                    © 2025 Xelan Sports. Tüm hakları saklıdır.
                </motion.p>
            </div>
        </div>
    );
}
