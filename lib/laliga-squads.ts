/**
 * La Liga squad data for 2025-26 season
 * Top teams with key players and market values
 */

export interface LaLigaPlayer {
    name: string;
    position: string;
    nationality: string;
    age: number;
    marketValue: string;
    marketValueNumeric: number;
    instagramUsername?: string;
    instagramFollowers?: number;
}

export interface LaLigaTeamSquad {
    teamName: string;
    players: LaLigaPlayer[];
}

// Real Madrid Squad
export const REAL_MADRID_SQUAD: LaLigaPlayer[] = [
    { name: "Kylian Mbappé", position: "LW", nationality: "France", age: 26, marketValue: "€180M", marketValueNumeric: 180000000, instagramUsername: "k.mbappe", instagramFollowers: 123000000 },
    { name: "Vinicius Junior", position: "LW", nationality: "Brazil", age: 24, marketValue: "€170M", marketValueNumeric: 170000000, instagramUsername: "vinijr", instagramFollowers: 56000000 },
    { name: "Jude Bellingham", position: "CM", nationality: "England", age: 22, marketValue: "€180M", marketValueNumeric: 180000000, instagramUsername: "judebellingham", instagramFollowers: 37000000 },
    { name: "Rodrygo", position: "RW", nationality: "Brazil", age: 24, marketValue: "€110M", marketValueNumeric: 110000000, instagramUsername: "rodrygogoes", instagramFollowers: 19000000 },
    { name: "Federico Valverde", position: "CM", nationality: "Uruguay", age: 27, marketValue: "€130M", marketValueNumeric: 130000000, instagramUsername: "fedeevalverde", instagramFollowers: 13500000 },
    { name: "Eduardo Camavinga", position: "CM", nationality: "France", age: 22, marketValue: "€100M", marketValueNumeric: 100000000, instagramUsername: "camavinga", instagramFollowers: 11000000 },
    { name: "Aurélien Tchouaméni", position: "DM", nationality: "France", age: 25, marketValue: "€100M", marketValueNumeric: 100000000, instagramUsername: "aurelientchm", instagramFollowers: 6200000 },
    { name: "Antonio Rüdiger", position: "CB", nationality: "Germany", age: 32, marketValue: "€30M", marketValueNumeric: 30000000, instagramUsername: "toniruediger", instagramFollowers: 8700000 },
    { name: "Éder Militão", position: "CB", nationality: "Brazil", age: 27, marketValue: "€60M", marketValueNumeric: 60000000, instagramUsername: "edermilitao", instagramFollowers: 11000000 },
    { name: "Thibaut Courtois", position: "GK", nationality: "Belgium", age: 33, marketValue: "€25M", marketValueNumeric: 25000000, instagramUsername: "thibautcourtois", instagramFollowers: 13000000 },
];

// Atletico Madrid Squad
export const ATLETICO_MADRID_SQUAD: LaLigaPlayer[] = [
    { name: "Antoine Griezmann", position: "CF", nationality: "France", age: 34, marketValue: "€20M", marketValueNumeric: 20000000, instagramUsername: "antogriezmann", instagramFollowers: 47000000 },
    { name: "Julián Álvarez", position: "CF", nationality: "Argentina", age: 25, marketValue: "€90M", marketValueNumeric: 90000000, instagramUsername: "juliaanalvarez", instagramFollowers: 8500000 },
    { name: "João Félix", position: "AM", nationality: "Portugal", age: 25, marketValue: "€50M", marketValueNumeric: 50000000, instagramUsername: "joaofelix79", instagramFollowers: 11000000 },
    { name: "Rodrigo De Paul", position: "CM", nationality: "Argentina", age: 30, marketValue: "€25M", marketValueNumeric: 25000000, instagramUsername: "rodridepaul", instagramFollowers: 7800000 },
    { name: "Marcos Llorente", position: "CM", nationality: "Spain", age: 30, marketValue: "€35M", marketValueNumeric: 35000000, instagramUsername: "marcosllorente", instagramFollowers: 5200000 },
    { name: "Jan Oblak", position: "GK", nationality: "Slovenia", age: 32, marketValue: "€25M", marketValueNumeric: 25000000, instagramUsername: "oblakjan", instagramFollowers: 6500000 },
];

// Athletic Bilbao Squad
export const ATHLETIC_BILBAO_SQUAD: LaLigaPlayer[] = [
    { name: "Nico Williams", position: "LW", nationality: "Spain", age: 23, marketValue: "€70M", marketValueNumeric: 70000000, instagramUsername: "nicolas.williams10", instagramFollowers: 3800000 },
    { name: "Iñaki Williams", position: "RW", nationality: "Ghana", age: 31, marketValue: "€30M", marketValueNumeric: 30000000, instagramUsername: "inkiwilliams", instagramFollowers: 2100000 },
    { name: "Oihan Sancet", position: "AM", nationality: "Spain", age: 25, marketValue: "€35M", marketValueNumeric: 35000000, instagramUsername: "oihansancet", instagramFollowers: 450000 },
    { name: "Unai Simón", position: "GK", nationality: "Spain", age: 28, marketValue: "€30M", marketValueNumeric: 30000000, instagramUsername: "unai_simon", instagramFollowers: 850000 },
];

// Villarreal Squad
export const VILLARREAL_SQUAD: LaLigaPlayer[] = [
    { name: "Ayoze Pérez", position: "LW", nationality: "Spain", age: 32, marketValue: "€12M", marketValueNumeric: 12000000, instagramUsername: "ayoze_perez", instagramFollowers: 380000 },
    { name: "Álex Baena", position: "LW", nationality: "Spain", age: 24, marketValue: "€40M", marketValueNumeric: 40000000, instagramUsername: "alexbaena19", instagramFollowers: 520000 },
    { name: "Santi Comesaña", position: "CM", nationality: "Spain", age: 30, marketValue: "€8M", marketValueNumeric: 8000000, instagramUsername: "santicomesana", instagramFollowers: 180000 },
];

// Real Sociedad Squad
export const REAL_SOCIEDAD_SQUAD: LaLigaPlayer[] = [
    { name: "Mikel Oyarzabal", position: "LW", nationality: "Spain", age: 28, marketValue: "€40M", marketValueNumeric: 40000000, instagramUsername: "oyarzabal", instagramFollowers: 1200000 },
    { name: "Takefusa Kubo", position: "RW", nationality: "Japan", age: 24, marketValue: "€60M", marketValueNumeric: 60000000, instagramUsername: "takefusa.kubo", instagramFollowers: 3500000 },
    { name: "Martín Zubimendi", position: "DM", nationality: "Spain", age: 26, marketValue: "€60M", marketValueNumeric: 60000000, instagramUsername: "mzubimendi", instagramFollowers: 680000 },
];

// Real Betis Squad
export const REAL_BETIS_SQUAD: LaLigaPlayer[] = [
    { name: "Isco", position: "AM", nationality: "Spain", age: 33, marketValue: "€8M", marketValueNumeric: 8000000, instagramUsername: "isco_alarcon", instagramFollowers: 17000000 },
    { name: "Giovani Lo Celso", position: "AM", nationality: "Argentina", age: 29, marketValue: "€18M", marketValueNumeric: 18000000, instagramUsername: "glocelso", instagramFollowers: 2800000 },
    { name: "Nabil Fekir", position: "AM", nationality: "France", age: 32, marketValue: "€10M", marketValueNumeric: 10000000, instagramUsername: "nabilfekir", instagramFollowers: 5600000 },
];

export const LA_LIGA_SQUADS: LaLigaTeamSquad[] = [
    { teamName: "Real Madrid", players: REAL_MADRID_SQUAD },
    { teamName: "Atletico Madrid", players: ATLETICO_MADRID_SQUAD },
    { teamName: "Athletic Bilbao", players: ATHLETIC_BILBAO_SQUAD },
    { teamName: "Villarreal", players: VILLARREAL_SQUAD },
    { teamName: "Real Sociedad", players: REAL_SOCIEDAD_SQUAD },
    { teamName: "Real Betis", players: REAL_BETIS_SQUAD },
];
