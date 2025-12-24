"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { MOCK_TEAMS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Calendar, Plus, Trash2, Tag, Clock, CheckCircle2, Lightbulb, PenTool, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPlannerItems, addPlannerItem, deletePlannerItem } from "@/lib/firestore";
import { toast } from "sonner";

type ContentStatus = "Fikir" | "Tasarım" | "Planda" | "Paylaşıldı";

interface ContentItem {
    id: string;
    date: string;
    title: string;
    content: string;
    teamId: string;
    status: ContentStatus;
}

const STATUS_CONFIG: Record<ContentStatus, { color: string; icon: any }> = {
    "Fikir": { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: Lightbulb },
    "Tasarım": { color: "text-purple-400 bg-purple-400/10 border-purple-400/20", icon: PenTool },
    "Planda": { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Clock },
    "Paylaşıldı": { color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle2 },
};

import { useTeamModal } from "@/context/TeamModalContext";

export default function PlannerPage() {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState<Partial<ContentItem>>({
        status: "Fikir",
        date: new Date().toISOString().split("T")[0],
        title: "",
    });
    const [showTagHistory, setShowTagHistory] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const { openModal } = useTeamModal();

    // Load items from Firestore on mount
    useEffect(() => {
        async function loadItems() {
            setLoading(true);
            const fetchedItems = await getPlannerItems();
            setItems(fetchedItems);
            setLoading(false);
        }
        loadItems();
    }, []);

    const handleAddItem = async () => {
        if (!newItem.date || !newItem.teamId || !newItem.title) return;

        const itemToAdd = {
            date: newItem.date,
            title: newItem.title,
            content: newItem.content || "",
            teamId: newItem.teamId,
            status: newItem.status as ContentStatus,
        };

        const docId = await addPlannerItem(itemToAdd);

        if (docId) {
            // Add to local state with the Firestore ID
            const newItemWithId: ContentItem = {
                id: docId,
                ...itemToAdd,
            };
            setItems((prev) => [...prev, newItemWithId].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
            toast.success("İçerik başarıyla eklendi!");
        } else {
            toast.error("İçerik eklenirken hata oluştu");
        }

        setNewItem({
            status: "Fikir",
            date: new Date().toISOString().split("T")[0],
            title: "",
            content: "",
            teamId: "",
        });
    };

    const handleDeleteItem = async (id: string) => {
        const success = await deletePlannerItem(id);
        if (success) {
            setItems((prev) => prev.filter((item) => item.id !== id));
            toast.success("İçerik silindi");
        } else {
            toast.error("Silme işlemi başarısız");
        }
    };

    const getTeam = (id: string) => MOCK_TEAMS.find((t) => t.id === id);

    // Group items by tag for history view
    const getTagHistory = () => {
        const grouped: Record<string, ContentItem[]> = {};
        items.forEach(item => {
            if (!grouped[item.teamId]) {
                grouped[item.teamId] = [];
            }
            grouped[item.teamId].push(item);
        });
        return grouped;
    };

    return (
        <main className="flex min-h-screen flex-col bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-24">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">İçerik Planlayıcı</h1>
                        <p className="text-gray-400">Sosyal medya içeriklerinizi planlayın ve takip edin</p>
                    </div>
                    <button
                        onClick={() => setShowTagHistory(true)}
                        className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-transform hover:bg-purple-500 active:scale-95"
                    >
                        <History className="h-4 w-4" />
                        Tag Geçmişi
                    </button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Input Form */}
                    <div className="lg:col-span-1">
                        <div id="content-form" className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                                <Plus className="h-5 w-5 text-blue-500" />
                                Yeni İçerik
                            </h2>

                            <div className="space-y-4">
                                {/* Date */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Tarih</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="date"
                                            value={newItem.date}
                                            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                                            className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Team or League Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Etiket (Takım veya Lig)</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="text"
                                            list="teams-leagues"
                                            placeholder="Takım veya lig ara..."
                                            value={newItem.teamId || ""}
                                            onChange={(e) => setNewItem({ ...newItem, teamId: e.target.value })}
                                            className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <datalist id="teams-leagues">
                                            {/* Leagues */}
                                            <option value="Premier League">League</option>
                                            <option value="La Liga">League</option>
                                            <option value="Bundesliga">League</option>
                                            <option value="Serie A">League</option>
                                            <option value="Ligue 1">League</option>
                                            <option value="Süper Lig">League</option>

                                            {/* Teams */}
                                            {MOCK_TEAMS.sort((a, b) => a.name.localeCompare(b.name)).map((team) => (
                                                <option key={team.id} value={team.name} />
                                            ))}
                                        </datalist>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Durum</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(Object.keys(STATUS_CONFIG) as ContentStatus[]).map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => setNewItem({ ...newItem, status })}
                                                className={cn(
                                                    "flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all active:scale-95",
                                                    newItem.status === status
                                                        ? STATUS_CONFIG[status].color
                                                        : "border-white/5 bg-white/5 text-gray-400 hover:bg-white/10"
                                                )}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Content Title */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">İçerik Başlığı</label>
                                    <input
                                        type="text"
                                        value={newItem.title || ""}
                                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                        placeholder="İçerik başlığını girin..."
                                        className="w-full rounded-lg border border-white/10 bg-black/50 py-2.5 px-4 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">İçerik Detayları</label>
                                    <textarea
                                        value={newItem.content || ""}
                                        onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                                        placeholder="İçerik fikrinizi açıklayın..."
                                        rows={4}
                                        className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    onClick={handleAddItem}
                                    disabled={!newItem.teamId || !newItem.title}
                                    className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-transform hover:bg-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Plana Ekle
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Calendar */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-xl font-semibold">
                                    <Calendar className="h-5 w-5 text-blue-500" />
                                    Takvim
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            const d = new Date(newItem.date || new Date());
                                            d.setMonth(d.getMonth() - 1);
                                            setNewItem({ ...newItem, date: d.toISOString().split('T')[0] });
                                        }}
                                        className="rounded-lg bg-white/5 p-2 hover:bg-white/10"
                                    >
                                        ←
                                    </button>
                                    <span className="font-medium">
                                        {new Date(newItem.date || new Date()).toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button
                                        onClick={() => {
                                            const d = new Date(newItem.date || new Date());
                                            d.setMonth(d.getMonth() + 1);
                                            setNewItem({ ...newItem, date: d.toISOString().split('T')[0] });
                                        }}
                                        className="rounded-lg bg-white/5 p-2 hover:bg-white/10"
                                    >
                                        →
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="bg-black/80 p-2 text-center text-xs font-medium text-gray-400">
                                        {day}
                                    </div>
                                ))}

                                {(() => {
                                    const currentDate = new Date(newItem.date || new Date());
                                    const year = currentDate.getFullYear();
                                    const month = currentDate.getMonth();
                                    const firstDay = new Date(year, month, 1).getDay();
                                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                                    const days = [];

                                    // Empty cells for previous month
                                    for (let i = 0; i < firstDay; i++) {
                                        days.push(<div key={`empty-${i}`} className="min-h-[100px] bg-black/40" />);
                                    }

                                    // Days of the month
                                    for (let d = 1; d <= daysInMonth; d++) {
                                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                                        const dayItems = items.filter(item => item.date === dateStr);
                                        const isToday = dateStr === new Date().toISOString().split('T')[0];
                                        const isSelected = dateStr === newItem.date;

                                        days.push(
                                            <div
                                                key={d}
                                                className={cn(
                                                    "group relative h-[100px] overflow-hidden border-t border-white/5 bg-black/40 p-1.5 transition-colors",
                                                    isSelected && "bg-white/5 ring-1 ring-inset ring-blue-500",
                                                    isToday && "bg-blue-500/5"
                                                )}
                                            >
                                                <div
                                                    onClick={() => setNewItem({ ...newItem, date: dateStr })}
                                                    className="cursor-pointer"
                                                >
                                                    <span className={cn(
                                                        "block text-xs font-medium mb-1",
                                                        isToday ? "text-blue-500" : "text-gray-400"
                                                    )}>
                                                        {d}
                                                    </span>
                                                </div>
                                                <div
                                                    className="space-y-0.5 cursor-pointer overflow-hidden"
                                                    onClick={() => dayItems.length > 0 && setSelectedDate(dateStr)}
                                                >
                                                    {dayItems.slice(0, 2).map(item => {
                                                        const team = getTeam(item.teamId);
                                                        const StatusIcon = STATUS_CONFIG[item.status].icon;
                                                        return (
                                                            <div key={item.id} className="flex items-center gap-1">
                                                                {team ? (
                                                                    <div
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            openModal(team);
                                                                        }}
                                                                        className="flex cursor-pointer items-center gap-0.5 rounded bg-white/10 px-1 py-0.5 text-[9px] font-medium text-white hover:bg-white/20 truncate max-w-[70%]"
                                                                    >
                                                                        <img src={team.logo} alt={team.name} className="h-2.5 w-2.5 object-contain flex-shrink-0" loading="lazy" />
                                                                        <span className="truncate">{team.name}</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-0.5 rounded bg-blue-500/10 px-1 py-0.5 text-[9px] font-medium text-blue-400 truncate max-w-[70%]">
                                                                        <Tag className="h-2 w-2 flex-shrink-0" />
                                                                        <span className="truncate">{item.teamId}</span>
                                                                    </div>
                                                                )}
                                                                <div className={cn("flex items-center rounded border px-1 py-0.5 text-[9px]", STATUS_CONFIG[item.status].color)}>
                                                                    <StatusIcon className="h-2 w-2" />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {dayItems.length > 2 && (
                                                        <div className="text-[9px] text-gray-500 font-medium">
                                                            +{dayItems.length - 2} daha...
                                                        </div>
                                                    )}
                                                </div>
                                                {dayItems.length > 0 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            dayItems.forEach(i => handleDeleteItem(i.id));
                                                        }}
                                                        className="absolute bottom-1 right-1 hidden rounded p-1 text-red-400 hover:bg-red-400/10 group-hover:block"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                )}
                                                {/* Add content button - visible on hover */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setNewItem({ ...newItem, date: dateStr });
                                                        document.getElementById('content-form')?.scrollIntoView({ behavior: 'smooth' });
                                                        toast.info(`${d} ${new Date(year, month).toLocaleString('tr', { month: 'long' })} için içerik ekleyin`);
                                                    }}
                                                    className="absolute top-1 right-1 hidden rounded p-1 text-blue-400 hover:bg-blue-400/10 group-hover:block"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        );
                                    }
                                    return days;
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tag History Modal */}
            <AnimatePresence>
                {showTagHistory && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowTagHistory(false)}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="pointer-events-auto relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl"
                            >
                                {/* Header */}
                                <div className="border-b border-white/10 bg-gradient-to-b from-purple-600/20 to-transparent p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Tag Geçmişi</h2>
                                            <p className="text-sm text-gray-400">Tüm tag'lere göre içerik geçmişiniz</p>
                                        </div>
                                        <button
                                            onClick={() => setShowTagHistory(false)}
                                            className="rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                                        >
                                            <Plus className="h-5 w-5 rotate-45" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(80vh - 100px)' }}>
                                    {Object.keys(getTagHistory()).length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <History className="mb-4 h-12 w-12 text-gray-600" />
                                            <p className="text-lg font-medium text-gray-400">Henüz içerik yok</p>
                                            <p className="text-sm text-gray-500">İçerik eklemeye başlayın</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {Object.entries(getTagHistory())
                                                .sort(([, a], [, b]) => b.length - a.length)
                                                .map(([tagId, tagItems]) => {
                                                    const team = getTeam(tagId);
                                                    const isLeague = !team;

                                                    return (
                                                        <div key={tagId} className="rounded-xl border border-white/10 bg-white/5 p-4">
                                                            {/* Tag Header */}
                                                            <div className="mb-4 flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    {team ? (
                                                                        <>
                                                                            <img src={team.logo} alt={team.name} className="h-10 w-10 rounded-lg object-contain" />
                                                                            <div>
                                                                                <h3 className="font-semibold text-white">{team.name}</h3>
                                                                                <p className="text-xs text-gray-400">{team.league}</p>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                                                                                <Tag className="h-5 w-5 text-blue-400" />
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold text-white">{tagId}</h3>
                                                                                <p className="text-xs text-gray-400">Lig</p>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <div className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-400">
                                                                    {tagItems.length} içerik
                                                                </div>
                                                            </div>

                                                            {/* Content List */}
                                                            <div className="space-y-2">
                                                                {tagItems.map((item) => {
                                                                    const StatusIcon = STATUS_CONFIG[item.status].icon;
                                                                    return (
                                                                        <div
                                                                            key={item.id}
                                                                            className="rounded-lg border border-white/5 bg-black/40 p-3 transition-colors hover:bg-white/5"
                                                                        >
                                                                            <div className="mb-2 flex items-center justify-between">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className={cn("flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", STATUS_CONFIG[item.status].color)}>
                                                                                        <StatusIcon className="h-3 w-3" />
                                                                                        {item.status}
                                                                                    </div>
                                                                                    <span className="text-xs text-gray-500">
                                                                                        {new Date(item.date).toLocaleDateString('tr-TR')}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <h4 className="mb-1 font-semibold text-white">{item.title}</h4>
                                                                            <p className="text-sm text-gray-400">{item.content}</p>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Day Content Modal */}
            <AnimatePresence>
                {selectedDate && (() => {
                    const dayItems = items.filter(item => item.date === selectedDate);
                    const formattedDate = new Date(selectedDate).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        weekday: 'long'
                    });

                    return (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedDate(null)}
                                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                            />
                            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    className="pointer-events-auto relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl"
                                >
                                    {/* Header */}
                                    <div className="border-b border-white/10 bg-gradient-to-b from-blue-600/20 to-transparent p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white capitalize">{formattedDate}</h2>
                                                <p className="text-sm text-gray-400">{dayItems.length} içerik planlandı</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedDate(null)}
                                                className="rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                                            >
                                                <Plus className="h-5 w-5 rotate-45" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(80vh - 100px)' }}>
                                        <div className="space-y-4">
                                            {dayItems.map((item) => {
                                                const team = getTeam(item.teamId);
                                                const StatusIcon = STATUS_CONFIG[item.status].icon;

                                                return (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
                                                    >
                                                        {/* Header */}
                                                        <div className="mb-4 flex items-start justify-between">
                                                            <div className="flex items-center gap-3">
                                                                {team ? (
                                                                    <div
                                                                        onClick={() => openModal(team)}
                                                                        className="flex cursor-pointer items-center gap-3 rounded-lg bg-white/10 px-3 py-2 transition-colors hover:bg-white/20"
                                                                    >
                                                                        <img src={team.logo} alt={team.name} className="h-8 w-8 object-contain" />
                                                                        <div>
                                                                            <p className="font-semibold text-white">{team.name}</p>
                                                                            <p className="text-xs text-gray-400">{team.league}</p>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-3 rounded-lg bg-blue-500/10 px-3 py-2">
                                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                                                                            <Tag className="h-4 w-4 text-blue-400" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-semibold text-white">{item.teamId}</p>
                                                                            <p className="text-xs text-gray-400">Lig</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className={cn("flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium", STATUS_CONFIG[item.status].color)}>
                                                                    <StatusIcon className="h-4 w-4" />
                                                                    {item.status}
                                                                </div>
                                                                <button
                                                                    onClick={() => handleDeleteItem(item.id)}
                                                                    className="rounded-full bg-red-500/10 p-2 text-red-400 opacity-0 transition-all hover:bg-red-500/20 group-hover:opacity-100"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="space-y-2">
                                                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                                            {item.content && (
                                                                <p className="text-sm leading-relaxed text-gray-300">{item.content}</p>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    );
                })()}
            </AnimatePresence>
        </main>
    );
}
