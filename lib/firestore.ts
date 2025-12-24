import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp,
    updateDoc
} from "firebase/firestore";
import { db } from "./firebase";

export interface ContentItem {
    id: string;
    date: string;
    title: string;
    content: string;
    teamId: string;
    status: "Fikir" | "Tasarım" | "Planda" | "Paylaşıldı";
    createdAt?: Date;
}

const COLLECTION_NAME = "planner-items";

// Get all items
export async function getPlannerItems(): Promise<ContentItem[]> {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                date: data.date,
                title: data.title,
                content: data.content || "",
                teamId: data.teamId,
                status: data.status,
                createdAt: data.createdAt?.toDate(),
            };
        });
    } catch (error) {
        console.error("Error getting planner items:", error);
        return [];
    }
}

// Add new item
export async function addPlannerItem(item: Omit<ContentItem, "id" | "createdAt">): Promise<string | null> {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...item,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding planner item:", error);
        return null;
    }
}

// Update existing item
export async function updatePlannerItem(
    id: string,
    updates: Partial<Omit<ContentItem, "id" | "createdAt">>
): Promise<boolean> {
    try {
        await updateDoc(doc(db, COLLECTION_NAME, id), updates);
        return true;
    } catch (error) {
        console.error("Error updating planner item:", error);
        return false;
    }
}

// Delete item
export async function deletePlannerItem(id: string): Promise<boolean> {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        return true;
    } catch (error) {
        console.error("Error deleting planner item:", error);
        return false;
    }
}
