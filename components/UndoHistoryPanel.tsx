"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Undo2, Trash2, X, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    getLocalHistory,
    getRecentHistory,
    clearHistory,
    formatHistoryValue,
    type EditHistory
} from "@/lib/edit-history";
import { updateTeam } from "@/lib/teams-firestore";
import { updatePlayer } from "@/lib/players-firestore";

interface UndoHistoryPanelProps {
    className?: string;
    onUndo?: () => void;
}

export function UndoHistoryPanel({ className, onUndo }: UndoHistoryPanelProps) {
    const [history, setHistory] = useState<EditHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [undoing, setUndoing] = useState<string | null>(null);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        setLoading(true);
        try {
            // Try Firestore first, fallback to localStorage
            const firestoreHistory = await getRecentHistory(20);
            if (firestoreHistory.length > 0) {
                setHistory(firestoreHistory);
            } else {
                setHistory(getLocalHistory());
            }
        } catch (error) {
            setHistory(getLocalHistory());
        }
        setLoading(false);
    };

    const handleUndo = async (entry: EditHistory) => {
        const entryId = entry.id || `${entry.entityId}-${entry.field}`;
        setUndoing(entryId);

        try {
            if (entry.entityType === "team") {
                // Restore old value for team
                const updateData: any = {};
                const field = entry.field;

                // Handle nested social fields
                if (field.startsWith("socials.")) {
                    const [, platform, property] = field.split(".");
                    updateData.socials = {
                        [platform]: {
                            [property]: entry.oldValue
                        }
                    };
                } else {
                    updateData[field] = entry.oldValue;
                }

                await updateTeam(entry.entityId, updateData);
            } else if (entry.entityType === "player") {
                // Restore old value for player
                const updateData: any = {};
                const field = entry.field;

                if (field.startsWith("socials.")) {
                    const [, platform, property] = field.split(".");
                    updateData[`socials.${platform}.${property}`] = entry.oldValue;
                } else {
                    updateData[field] = entry.oldValue;
                }

                await updatePlayer(entry.entityId, updateData);
            }

            toast.success(`${entry.entityName}: "${entry.field}" geri alındı`);
            loadHistory();
            onUndo?.();
        } catch (error) {
            console.error("Undo failed:", error);
            toast.error("Geri alma başarısız oldu");
        } finally {
            setUndoing(null);
        }
    };

    const handleClearHistory = async () => {
        if (!confirm("Tüm düzenleme geçmişini silmek istediğinize emin misiniz?")) {
            return;
        }

        await clearHistory();
        setHistory([]);
        toast.success("Geçmiş temizlendi");
    };

    const formatDate = (date: any) => {
        if (!date) return "";
        const d = date.toDate ? date.toDate() : new Date(date);
        return d.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className={cn("rounded-2xl border border-white/10 bg-white/5", className)}>
            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-purple-400" />
                    <span className="font-semibold">Düzenleme Geçmişi</span>
                    {history.length > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                            {history.length}
                        </span>
                    )}
                </div>
                {expanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </button>

            {/* Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10"
                    >
                        {loading ? (
                            <div className="p-4 text-center text-gray-400">
                                <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
                                Yükleniyor...
                            </div>
                        ) : history.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                Henüz düzenleme yapılmamış.
                            </div>
                        ) : (
                            <div className="p-2">
                                {/* Actions */}
                                <div className="flex justify-end mb-2 px-2">
                                    <button
                                        onClick={handleClearHistory}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                        Geçmişi Temizle
                                    </button>
                                </div>

                                {/* History List */}
                                <div className="max-h-64 overflow-y-auto space-y-1">
                                    {history.map((entry, index) => {
                                        const entryId = entry.id || `${entry.entityId}-${entry.field}-${index}`;
                                        return (
                                            <div
                                                key={entryId}
                                                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={cn(
                                                                "text-xs px-1.5 py-0.5 rounded",
                                                                entry.entityType === "team"
                                                                    ? "bg-blue-500/20 text-blue-400"
                                                                    : "bg-pink-500/20 text-pink-400"
                                                            )}>
                                                                {entry.entityType === "team" ? "Takım" : "Oyuncu"}
                                                            </span>
                                                            <span className="text-sm font-medium text-white truncate">
                                                                {entry.entityName}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-500 mb-1">
                                                            {entry.field}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <span className="text-red-400 line-through">
                                                                {formatHistoryValue(entry.oldValue)}
                                                            </span>
                                                            <span className="text-gray-600">→</span>
                                                            <span className="text-green-400">
                                                                {formatHistoryValue(entry.newValue)}
                                                            </span>
                                                        </div>
                                                        <div className="text-xs text-gray-600 mt-1">
                                                            {formatDate(entry.editedAt)}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleUndo(entry)}
                                                        disabled={undoing === entryId}
                                                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 disabled:opacity-50 transition-colors"
                                                    >
                                                        {undoing === entryId ? (
                                                            <RefreshCw className="h-3 w-3 animate-spin" />
                                                        ) : (
                                                            <Undo2 className="h-3 w-3" />
                                                        )}
                                                        Geri Al
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
