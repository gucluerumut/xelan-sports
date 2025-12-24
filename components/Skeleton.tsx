"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-white/10",
                className
            )}
        />
    );
}

export function TableRowSkeleton() {
    return (
        <tr className="border-b border-white/5">
            <td className="py-4 pr-4 text-center">
                <Skeleton className="h-6 w-8 mx-auto" />
            </td>
            <td className="py-4 pr-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </td>
            <td className="py-4 pr-4">
                <Skeleton className="h-4 w-24" />
            </td>
            <td className="py-4 pr-4">
                <Skeleton className="h-5 w-16" />
            </td>
            <td className="py-4 pr-4 text-right">
                <Skeleton className="h-4 w-12 ml-auto" />
            </td>
            <td className="py-4 pr-4 text-right">
                <Skeleton className="h-4 w-12 ml-auto" />
            </td>
            <td className="py-4 text-right">
                <Skeleton className="h-4 w-12 ml-auto" />
            </td>
        </tr>
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    );
}

export function CalendarDaySkeleton() {
    return (
        <div className="min-h-[100px] bg-black/40 p-2 animate-pulse">
            <Skeleton className="h-4 w-6 mb-2" />
            <div className="space-y-1">
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-3/4 rounded" />
            </div>
        </div>
    );
}
