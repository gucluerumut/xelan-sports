/**
 * Undo/Redo history system for admin edits
 * Stores previous states in localStorage and Firestore
 */

import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";

export interface EditHistory {
    id?: string;
    entityType: "team" | "player";
    entityId: string;
    entityName: string;
    field: string;
    oldValue: any;
    newValue: any;
    editedAt: Timestamp | Date;
    editedBy?: string;
}

const HISTORY_COLLECTION = "edit-history";
const MAX_LOCAL_HISTORY = 50;
const LOCAL_STORAGE_KEY = "xelan-edit-history";

/**
 * Save edit to history (both localStorage and Firestore)
 */
export async function saveToHistory(
    entityType: "team" | "player",
    entityId: string,
    entityName: string,
    field: string,
    oldValue: any,
    newValue: any
): Promise<void> {
    const historyEntry: EditHistory = {
        entityType,
        entityId,
        entityName,
        field,
        oldValue,
        newValue,
        editedAt: new Date(),
    };

    // Save to localStorage for quick access
    saveToLocalStorage(historyEntry);

    // Save to Firestore for persistence
    try {
        await addDoc(collection(db, HISTORY_COLLECTION), {
            ...historyEntry,
            editedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Failed to save history to Firestore:", error);
        // Local storage still has the backup
    }
}

/**
 * Save to localStorage
 */
function saveToLocalStorage(entry: EditHistory): void {
    try {
        const existing = getLocalHistory();
        existing.unshift(entry);

        // Keep only last MAX_LOCAL_HISTORY entries
        const trimmed = existing.slice(0, MAX_LOCAL_HISTORY);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trimmed));
    } catch (error) {
        console.error("Failed to save to localStorage:", error);
    }
}

/**
 * Get history from localStorage
 */
export function getLocalHistory(): EditHistory[] {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Failed to read localStorage:", error);
    }
    return [];
}

/**
 * Get recent history from Firestore
 */
export async function getRecentHistory(limitCount: number = 20): Promise<EditHistory[]> {
    try {
        const q = query(
            collection(db, HISTORY_COLLECTION),
            orderBy("editedAt", "desc"),
            limit(limitCount)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as EditHistory));
    } catch (error) {
        console.error("Failed to fetch history from Firestore:", error);
        // Fallback to localStorage
        return getLocalHistory();
    }
}

/**
 * Clear all history
 */
export async function clearHistory(): Promise<void> {
    // Clear localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    // Clear Firestore (delete all documents)
    try {
        const snapshot = await getDocs(collection(db, HISTORY_COLLECTION));
        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Failed to clear Firestore history:", error);
    }
}

/**
 * Format old/new value for display
 */
export function formatHistoryValue(value: any): string {
    if (value === null || value === undefined) {
        return "—";
    }
    if (typeof value === "object") {
        // For social links, show username and followers
        if (value.username) {
            return `@${value.username} (${formatNumber(value.followers || 0)})`;
        }
        return JSON.stringify(value);
    }
    if (typeof value === "number") {
        return formatNumber(value);
    }
    return String(value);
}

function formatNumber(num: number): string {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
}
