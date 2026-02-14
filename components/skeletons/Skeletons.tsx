import React from "react";
import { cn } from "@/lib/utils";

export function TableSkeleton({ rows = 10 }: { rows?: number }) {
    return (
        <div className="w-full space-y-4 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-white/10 rounded-lg" />
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 w-20 bg-white/10 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="space-y-2">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/5 p-4">
                        <div className="h-4 w-8 bg-white/10 rounded" />
                        <div className="h-8 w-8 bg-white/10 rounded-lg" />
                        <div className="h-4 flex-1 bg-white/10 rounded" />
                        <div className="h-4 w-24 bg-white/10 rounded" />
                        <div className="h-4 w-20 bg-white/10 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 h-6 w-32 bg-white/10 rounded" />
            <div className="space-y-3">
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-3/4 bg-white/10 rounded" />
                <div className="h-4 w-1/2 bg-white/10 rounded" />
            </div>
        </div>
    );
}

export function TeamSelectorSkeleton() {
    return (
        <div className="w-full max-w-sm space-y-2 animate-pulse">
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-12 w-full bg-white/10 rounded-xl" />
        </div>
    );
}

export function CalendarSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="h-6 w-32 bg-white/10 rounded" />
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-white/10 rounded-lg" />
                    <div className="h-8 w-32 bg-white/10 rounded-lg" />
                    <div className="h-8 w-8 bg-white/10 rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="h-24 bg-white/10 rounded-lg" />
                ))}
            </div>
        </div>
    );
}
