/**
 * Custom React Query hooks for Firestore data
 * Provides caching and automatic refetching
 */

import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { getAllTeams, getTeamsByLeague, type FirestoreTeam } from "@/lib/teams-firestore";

/**
 * Hook to fetch all teams with caching
 * Cache key: ['teams']
 * Stale time: 5 minutes
 */
export function useTeams(options?: Omit<UseQueryOptions<FirestoreTeam[]>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["teams"],
        queryFn: getAllTeams,
        ...options,
    });
}

/**
 * Hook to fetch teams by league with caching
 * Cache key: ['teams', league]
 * Stale time: 5 minutes
 */
export function useTeamsByLeague(
    league: string,
    options?: Omit<UseQueryOptions<FirestoreTeam[]>, "queryKey" | "queryFn">
) {
    return useQuery({
        queryKey: ["teams", league],
        queryFn: () => getTeamsByLeague(league),
        enabled: !!league,
        ...options,
    });
}

/**
 * Hook to prefetch teams data
 * Useful for preloading data before navigation
 */
export function usePrefetchTeams() {
    const { data } = useTeams();
    return data;
}

/**
 * Hook to invalidate teams cache
 * Call this after updating team data
 */
export function useInvalidateTeams() {
    const queryClient = useQueryClient();

    const invalidateTeams = () => {
        queryClient.invalidateQueries({ queryKey: ["teams"] });
    };

    return invalidateTeams;
}
