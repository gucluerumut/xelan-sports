"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FirestoreTeam } from "@/lib/teams-firestore";

interface TeamModalContextType {
    isOpen: boolean;
    selectedTeam: FirestoreTeam | null;
    openModal: (team: FirestoreTeam) => void;
    closeModal: () => void;
}

const TeamModalContext = createContext<TeamModalContextType | undefined>(undefined);

export function TeamModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<FirestoreTeam | null>(null);

    const openModal = (team: FirestoreTeam) => {
        setSelectedTeam(team);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedTeam(null);
    };

    return (
        <TeamModalContext.Provider value={{ isOpen, selectedTeam, openModal, closeModal }}>
            {children}
        </TeamModalContext.Provider>
    );
}

export function useTeamModal() {
    const context = useContext(TeamModalContext);
    if (context === undefined) {
        throw new Error("useTeamModal must be used within a TeamModalProvider");
    }
    return context;
}
