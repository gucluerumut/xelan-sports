/**
 * Barcelona squad data for 2025-26 season
 * Accurate market values from Transfermarkt (December 2025 update)
 * Total squad value: €1.11B+
 */

export interface BarcelonaPlayer {
    name: string;
    position: string;
    nationality: string;
    age: number;
    marketValue: string;
    marketValueNumeric: number;
    instagramUsername?: string;
    instagramFollowers?: number;
}

export const BARCELONA_SQUAD: BarcelonaPlayer[] = [
    {
        name: "Lamine Yamal",
        position: "RW",
        nationality: "Spain",
        age: 18,
        marketValue: "€200M",
        marketValueNumeric: 200000000,
        instagramUsername: "lamineyamal",
        instagramFollowers: 18500000,
    },
    {
        name: "Pedri",
        position: "CM",
        nationality: "Spain",
        age: 23,
        marketValue: "€140M",
        marketValueNumeric: 140000000,
        instagramUsername: "pedri",
        instagramFollowers: 15200000,
    },
    {
        name: "Raphinha",
        position: "LW",
        nationality: "Brazil",
        age: 29,
        marketValue: "€90M",
        marketValueNumeric: 90000000,
        instagramUsername: "raphinha",
        instagramFollowers: 6800000,
    },
    {
        name: "Pau Cubarsí",
        position: "CB",
        nationality: "Spain",
        age: 19,
        marketValue: "€80M",
        marketValueNumeric: 80000000,
        instagramUsername: "paucubarsi",
        instagramFollowers: 2100000,
    },
    {
        name: "Jules Koundé",
        position: "RB",
        nationality: "France",
        age: 27,
        marketValue: "€65M",
        marketValueNumeric: 65000000,
        instagramUsername: "jkeey4",
        instagramFollowers: 4300000,
    },
    {
        name: "Dani Olmo",
        position: "AM",
        nationality: "Spain",
        age: 27,
        marketValue: "€60M",
        marketValueNumeric: 60000000,
        instagramUsername: "daniolmo7",
        instagramFollowers: 3200000,
    },
    {
        name: "Alejandro Balde",
        position: "LB",
        nationality: "Spain",
        age: 22,
        marketValue: "€60M",
        marketValueNumeric: 60000000,
        instagramUsername: "alejandrobalde",
        instagramFollowers: 2500000,
    },
    {
        name: "Ronald Araújo",
        position: "CB",
        nationality: "Uruguay",
        age: 26,
        marketValue: "€50M",
        marketValueNumeric: 50000000,
        instagramUsername: "ronaldaraujo",
        instagramFollowers: 5100000,
    },
    {
        name: "Ferran Torres",
        position: "CF",
        nationality: "Spain",
        age: 25,
        marketValue: "€50M",
        marketValueNumeric: 50000000,
        instagramUsername: "ferrantorres",
        instagramFollowers: 4700000,
    },
    {
        name: "Frenkie de Jong",
        position: "CM",
        nationality: "Netherlands",
        age: 28,
        marketValue: "€45M",
        marketValueNumeric: 45000000,
        instagramUsername: "frenkiedejong",
        instagramFollowers: 16800000,
    },
    {
        name: "Gavi",
        position: "CM",
        nationality: "Spain",
        age: 21,
        marketValue: "€40M",
        marketValueNumeric: 40000000,
        instagramUsername: "pablogavi",
        instagramFollowers: 18900000,
    },
    {
        name: "Fermín López",
        position: "AM",
        nationality: "Spain",
        age: 22,
        marketValue: "€30M",
        marketValueNumeric: 30000000,
        instagramUsername: "ferminlopez",
        instagramFollowers: 1800000,
    },
    {
        name: "Andreas Christensen",
        position: "CB",
        nationality: "Denmark",
        age: 29,
        marketValue: "€25M",
        marketValueNumeric: 25000000,
        instagramUsername: "andreaschristensen",
        instagramFollowers: 1200000,
    },
    {
        name: "Marc Casadó",
        position: "DM",
        nationality: "Spain",
        age: 22,
        marketValue: "€25M",
        marketValueNumeric: 25000000,
        instagramUsername: "marccasado",
        instagramFollowers: 950000,
    },
    {
        name: "Joan García",
        position: "GK",
        nationality: "Spain",
        age: 24,
        marketValue: "€25M",
        marketValueNumeric: 25000000,
        instagramUsername: "joangarcia13",
        instagramFollowers: 580000,
    },
    {
        name: "Eric García",
        position: "CB",
        nationality: "Spain",
        age: 25,
        marketValue: "€20M",
        marketValueNumeric: 20000000,
        instagramUsername: "ericgm3",
        instagramFollowers: 2100000,
    },
    {
        name: "Marc Bernal",
        position: "DM",
        nationality: "Spain",
        age: 18,
        marketValue: "€15M",
        marketValueNumeric: 15000000,
        instagramUsername: "marcbernal28",
        instagramFollowers: 420000,
    },
    {
        name: "Gerard Martín",
        position: "LB",
        nationality: "Spain",
        age: 23,
        marketValue: "€12M",
        marketValueNumeric: 12000000,
        instagramUsername: "gerardmartin24",
        instagramFollowers: 380000,
    },
    {
        name: "Robert Lewandowski",
        position: "ST",
        nationality: "Poland",
        age: 37,
        marketValue: "€9M",
        marketValueNumeric: 9000000,
        instagramUsername: "_rl9",
        instagramFollowers: 37500000,
    },
    {
        name: "Wojciech Szczęsny",
        position: "GK",
        nationality: "Poland",
        age: 35,
        marketValue: "€2M",
        marketValueNumeric: 2000000,
        instagramUsername: "wojciech.szczesny.1",
        instagramFollowers: 7200000,
    },
];

// Helper to get country flag emoji
export function getCountryFlag(nationality: string): string {
    const flagMap: Record<string, string> = {
        "Spain": "🇪🇸",
        "Netherlands": "🇳🇱",
        "Uruguay": "🇺🇾",
        "Germany": "🇩🇪",
        "Poland": "🇵🇱",
        "France": "🇫🇷",
        "Brazil": "🇧🇷",
        "Portugal": "🇵🇹",
        "Argentina": "🇦🇷",
        "Belgium": "🇧🇪",
        "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "Italy": "🇮🇹",
        "Croatia": "🇭🇷",
        "Morocco": "🇲🇦",
        "Senegal": "🇸🇳",
        "Denmark": "🇩🇰",
        "Sweden": "🇸🇪",
    };
    return flagMap[nationality] || "🌍";
}

// Helper to format market value for display
export function formatMarketValue(value: string): string {
    return value; // Already formatted like "€90M"
}
