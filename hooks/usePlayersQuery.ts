/**
 * React Query hooks for Players data
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllPlayers,
    getTopPlayers,
    getPlayersByTeam,
    getPlayersByLeague,
    addPlayer,
    updatePlayer,
    deletePlayer,
    type Player,
    type NewPlayer,
} from "@/lib/players-firestore";

/**
 * Hook to fetch all players
 */
export function usePlayers() {
    return useQuery({
        queryKey: ["players"],
        queryFn: getAllPlayers,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Hook to fetch top N players by market value
 * Used for performance optimization
 */
export function useTopPlayers(limit = 50) {
    return useQuery({
        queryKey: ["players", "top", limit],
        queryFn: () => getTopPlayers(limit),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Hook to fetch players by team
 */
export function usePlayersByTeam(teamId: string) {
    return useQuery({
        queryKey: ["players", "team", teamId],
        queryFn: () => getPlayersByTeam(teamId),
        enabled: !!teamId,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook to fetch players by league
 */
export function usePlayersByLeague(league: string) {
    return useQuery({
        queryKey: ["players", "league", league],
        queryFn: () => getPlayersByLeague(league),
        enabled: !!league,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook to add a new player
 */
export function useAddPlayer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (player: NewPlayer) => addPlayer(player),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
        },
    });
}

/**
 * Hook to update a player
 */
export function useUpdatePlayer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<NewPlayer> }) =>
            updatePlayer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
        },
    });
}

/**
 * Hook to delete a player
 */
export function useDeletePlayer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deletePlayer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
        },
    });
}
