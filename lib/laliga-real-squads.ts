/**
 * Real La Liga Squad Data from Transfermarkt & Legacy Instagram Data
 * Restored on: 2026-02-10
 */

export interface PlayerData {
    name: string;
    position: string;
    nationality: string;
    age: number;
    marketValue: string;
    instagramUsername?: string;
    instagramFollowers?: number;
}

export interface TeamSquad {
    teamName: string;
    players: PlayerData[];
}

export const LA_LIGA_REAL_SQUADS: TeamSquad[] = [
    {
        "teamName": "FC Barcelona",
        "players": [
            {
                "name": "Joan García",
                "position": "Joan García            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€30.00m"
            },
            {
                "name": "Wojciech Szczęsny",
                "position": "Wojciech Szczęsny            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Poland",
                "age": 18,
                "marketValue": "€900k"
            },
            {
                "name": "Diego Kochen",
                "position": "Diego Kochen            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "United States",
                "age": 19,
                "marketValue": "€500k"
            },
            {
                "name": "Pau Cubarsí",
                "position": "Pau Cubarsí            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€80.00m"
            },
            {
                "name": "Eric García",
                "position": "Eric García            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€30.00m"
            },
            {
                "name": "Ronald Araujo",
                "position": "Ronald Araujo            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Uruguay",
                "age": 7,
                "marketValue": "€25.00m"
            },
            {
                "name": "Andreas Christensen",
                "position": "Andreas Christensen             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Denmark",
                "age": 10,
                "marketValue": "€10.00m"
            },
            {
                "name": "Alejandro Balde",
                "position": "Alejandro Balde            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 18,
                "marketValue": "€60.00m"
            },
            {
                "name": "Gerard Martín",
                "position": "Gerard Martín            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€20.00m"
            },
            {
                "name": "Jules Koundé",
                "position": "Jules Koundé            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "France",
                "age": 12,
                "marketValue": "€65.00m"
            },
            {
                "name": "João Cancelo",
                "position": "João Cancelo            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Portugal",
                "age": 27,
                "marketValue": "€10.00m"
            },
            {
                "name": "Marc Casadó",
                "position": "Marc Casadó            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€25.00m"
            },
            {
                "name": "Marc Bernal",
                "position": "Marc Bernal            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€10.00m"
            },
            {
                "name": "Pedri",
                "position": "Pedri             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€140.00m"
            },
            {
                "name": "Frenkie de Jong",
                "position": "Frenkie de Jong            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Netherlands",
                "age": 12,
                "marketValue": "€45.00m"
            },
            {
                "name": "Gavi",
                "position": "Gavi             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€40.00m"
            },
            {
                "name": "Fermín López",
                "position": "Fermín López            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€70.00m"
            },
            {
                "name": "Dani Olmo",
                "position": "Dani Olmo            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€60.00m"
            },
            {
                "name": "Raphinha",
                "position": "Raphinha            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Brazil",
                "age": 14,
                "marketValue": "€80.00m"
            },
            {
                "name": "Marcus Rashford",
                "position": "Marcus Rashford            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "England",
                "age": 31,
                "marketValue": "€40.00m"
            },
            {
                "name": "Lamine Yamal",
                "position": "Lamine Yamal            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€200.00m"
            },
            {
                "name": "Roony Bardghji",
                "position": "Roony Bardghji            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Sweden",
                "age": 15,
                "marketValue": "€10.00m"
            },
            {
                "name": "Ferran Torres",
                "position": "Ferran Torres            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 29,
                "marketValue": "€50.00m"
            },
            {
                "name": "Robert Lewandowski",
                "position": "Robert Lewandowski            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Poland",
                "age": 21,
                "marketValue": "€9.00m"
            }
        ]
    },
    {
        "teamName": "Real Madrid",
        "players": [
            {
                "name": "Thibaut Courtois",
                "position": "Thibaut Courtois            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Belgium",
                "age": 11,
                "marketValue": "€18.00m",
                "instagramUsername": "thibautcourtois",
                "instagramFollowers": 13000000
            },
            {
                "name": "Andriy Lunin",
                "position": "Andriy Lunin            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Ukraine",
                "age": 11,
                "marketValue": "€15.00m"
            },
            {
                "name": "Fran González",
                "position": "Fran González            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 24,
                "marketValue": "€1.00m"
            },
            {
                "name": "Dean Huijsen",
                "position": "Dean Huijsen            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€70.00m"
            },
            {
                "name": "Éder Militão",
                "position": "Éder Militão             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Brazil",
                "age": 18,
                "marketValue": "€30.00m",
                "instagramUsername": "edermilitao",
                "instagramFollowers": 11000000
            },
            {
                "name": "Raúl Asencio",
                "position": "Raúl Asencio\n  \n    \n  \n  \n    \n    \n  \n            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€30.00m"
            },
            {
                "name": "Antonio Rüdiger",
                "position": "Antonio Rüdiger            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Germany",
                "age": 3,
                "marketValue": "€12.00m",
                "instagramUsername": "toniruediger",
                "instagramFollowers": 8700000
            },
            {
                "name": "David Alaba",
                "position": "David Alaba            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Austria",
                "age": 24,
                "marketValue": "€4.00m"
            },
            {
                "name": "Álvaro Carreras",
                "position": "Álvaro Carreras            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€60.00m"
            },
            {
                "name": "Fran García",
                "position": "Fran García            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€15.00m"
            },
            {
                "name": "Ferland Mendy",
                "position": "Ferland Mendy             \n        \n    \n    \n        \n            Left-Back",
                "nationality": "France",
                "age": 8,
                "marketValue": "€8.00m"
            },
            {
                "name": "Trent Alexander-Arnold",
                "position": "Trent Alexander-Arnold            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "England",
                "age": 7,
                "marketValue": "€70.00m"
            },
            {
                "name": "Daniel Carvajal",
                "position": "Daniel Carvajal             \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€7.00m"
            },
            {
                "name": "Aurélien Tchouaméni",
                "position": "Aurélien Tchouaméni            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "France",
                "age": 27,
                "marketValue": "€75.00m",
                "instagramUsername": "aurelientchm",
                "instagramFollowers": 6200000
            },
            {
                "name": "Federico Valverde",
                "position": "Federico Valverde            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Uruguay",
                "age": 22,
                "marketValue": "€120.00m",
                "instagramUsername": "fedeevalverde",
                "instagramFollowers": 13500000
            },
            {
                "name": "Eduardo Camavinga",
                "position": "Eduardo Camavinga            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "France",
                "age": 10,
                "marketValue": "€50.00m",
                "instagramUsername": "camavinga",
                "instagramFollowers": 11000000
            },
            {
                "name": "Dani Ceballos",
                "position": "Dani Ceballos            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€8.00m"
            },
            {
                "name": "Jude Bellingham",
                "position": "Jude Bellingham             \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "England",
                "age": 29,
                "marketValue": "€160.00m",
                "instagramUsername": "judebellingham",
                "instagramFollowers": 37000000
            },
            {
                "name": "Arda Güler",
                "position": "Arda Güler            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Türkiye",
                "age": 25,
                "marketValue": "€90.00m"
            },
            {
                "name": "Vinicius Junior",
                "position": "Vinicius Junior            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Brazil",
                "age": 12,
                "marketValue": "€150.00m",
                "instagramUsername": "vinijr",
                "instagramFollowers": 56000000
            },
            {
                "name": "Rodrygo",
                "position": "Rodrygo\n  \n    \n  \n  \n    \n    \n  \n             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Brazil",
                "age": 9,
                "marketValue": "€60.00m",
                "instagramUsername": "rodrygogoes",
                "instagramFollowers": 19000000
            },
            {
                "name": "Franco Mastantuono",
                "position": "Franco Mastantuono            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Argentina",
                "age": 14,
                "marketValue": "€50.00m"
            },
            {
                "name": "Brahim Díaz",
                "position": "Brahim Díaz            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Morocco",
                "age": 3,
                "marketValue": "€35.00m"
            },
            {
                "name": "Kylian Mbappé",
                "position": "Kylian Mbappé            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "France",
                "age": 20,
                "marketValue": "€200.00m",
                "instagramUsername": "k.mbappe",
                "instagramFollowers": 123000000
            },
            {
                "name": "Gonzalo García",
                "position": "Gonzalo García            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 24,
                "marketValue": "€15.00m"
            }
        ]
    },
    {
        "teamName": "Atletico Madrid",
        "players": [
            {
                "name": "Jan Oblak",
                "position": "Jan Oblak            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Slovenia",
                "age": 7,
                "marketValue": "€17.00m",
                "instagramUsername": "oblakjan",
                "instagramFollowers": 6500000
            },
            {
                "name": "Juan Musso",
                "position": "Juan Musso            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Argentina",
                "age": 6,
                "marketValue": "€3.00m"
            },
            {
                "name": "Dávid Hancko",
                "position": "Dávid Hancko            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Slovakia",
                "age": 13,
                "marketValue": "€30.00m"
            },
            {
                "name": "Robin Le Normand",
                "position": "Robin Le Normand            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€30.00m"
            },
            {
                "name": "Marc Pubill",
                "position": "Marc Pubill            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€15.00m"
            },
            {
                "name": "José María Giménez",
                "position": "José María Giménez            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Uruguay",
                "age": 20,
                "marketValue": "€14.00m"
            },
            {
                "name": "Clément Lenglet",
                "position": "Clément Lenglet            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "France",
                "age": 17,
                "marketValue": "€6.00m"
            },
            {
                "name": "Matteo Ruggeri",
                "position": "Matteo Ruggeri            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Italy",
                "age": 11,
                "marketValue": "€15.00m"
            },
            {
                "name": "Marcos Llorente",
                "position": "Marcos Llorente            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€22.00m",
                "instagramUsername": "marcosllorente",
                "instagramFollowers": 5200000
            },
            {
                "name": "Nahuel Molina",
                "position": "Nahuel Molina            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Argentina",
                "age": 6,
                "marketValue": "€15.00m"
            },
            {
                "name": "Johnny Cardoso",
                "position": "Johnny Cardoso            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "United States",
                "age": 20,
                "marketValue": "€22.00m"
            },
            {
                "name": "Pablo Barrios",
                "position": "Pablo Barrios             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€60.00m"
            },
            {
                "name": "Rodrigo Mendoza",
                "position": "Rodrigo Mendoza            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€15.00m"
            },
            {
                "name": "Obed Vargas",
                "position": "Obed Vargas            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Mexico",
                "age": 5,
                "marketValue": "€8.00m"
            },
            {
                "name": "Koke",
                "position": "Koke             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€7.00m"
            },
            {
                "name": "Álex Baena",
                "position": "Álex Baena            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€55.00m",
                "instagramUsername": "alexbaena19",
                "instagramFollowers": 520000
            },
            {
                "name": "Nico González",
                "position": "Nico González            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Argentina",
                "age": 6,
                "marketValue": "€24.00m"
            },
            {
                "name": "Thiago Almada",
                "position": "Thiago Almada            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Argentina",
                "age": 26,
                "marketValue": "€20.00m"
            },
            {
                "name": "Giuliano Simeone",
                "position": "Giuliano Simeone            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Argentina",
                "age": 18,
                "marketValue": "€40.00m"
            },
            {
                "name": "Ademola Lookman",
                "position": "Ademola Lookman            \n        \n    \n    \n        \n            Second Striker",
                "nationality": "Nigeria",
                "age": 20,
                "marketValue": "€35.00m"
            },
            {
                "name": "Antoine Griezmann",
                "position": "Antoine Griezmann            \n        \n    \n    \n        \n            Second Striker",
                "nationality": "France",
                "age": 21,
                "marketValue": "€11.00m",
                "instagramUsername": "antogriezmann",
                "instagramFollowers": 47000000
            },
            {
                "name": "Julián Alvarez",
                "position": "Julián Alvarez            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Argentina",
                "age": 31,
                "marketValue": "€100.00m"
            },
            {
                "name": "Alexander Sørloth",
                "position": "Alexander Sørloth            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Norway",
                "age": 5,
                "marketValue": "€20.00m"
            }
        ]
    },
    {
        "teamName": "Villarreal",
        "players": [
            {
                "name": "Luiz Júnior",
                "position": "Luiz Júnior            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Brazil",
                "age": 14,
                "marketValue": "€12.00m"
            },
            {
                "name": "Diego Conde",
                "position": "Diego Conde            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€4.00m"
            },
            {
                "name": "Arnau Tenas",
                "position": "Arnau Tenas            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€4.00m"
            },
            {
                "name": "Renato Veiga",
                "position": "Renato Veiga            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Portugal",
                "age": 29,
                "marketValue": "€25.00m"
            },
            {
                "name": "Logan Costa",
                "position": "Logan Costa             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Cape Verde",
                "age": 1,
                "marketValue": "€18.00m"
            },
            {
                "name": "Juan Foyth",
                "position": "Juan Foyth             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Argentina",
                "age": 12,
                "marketValue": "€15.00m"
            },
            {
                "name": "Rafa Marín",
                "position": "Rafa Marín            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€12.00m"
            },
            {
                "name": "Willy Kambwala",
                "position": "Willy Kambwala            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "France",
                "age": 25,
                "marketValue": "€4.00m"
            },
            {
                "name": "Sergi Cardona",
                "position": "Sergi Cardona            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€10.00m"
            },
            {
                "name": "Alfonso Pedraza",
                "position": "Alfonso Pedraza            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€2.50m"
            },
            {
                "name": "Santiago Mouriño",
                "position": "Santiago Mouriño            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Uruguay",
                "age": 13,
                "marketValue": "€10.00m"
            },
            {
                "name": "Pau Navarro",
                "position": "Pau Navarro            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€5.00m"
            },
            {
                "name": "Alex Freeman",
                "position": "Alex Freeman            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "United States",
                "age": 9,
                "marketValue": "€3.50m"
            },
            {
                "name": "Thomas Partey",
                "position": "Thomas Partey            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Ghana",
                "age": 13,
                "marketValue": "€5.00m"
            },
            {
                "name": "Pape Gueye",
                "position": "Pape Gueye            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Senegal",
                "age": 24,
                "marketValue": "€20.00m"
            },
            {
                "name": "Santi Comesaña",
                "position": "Santi Comesaña            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€8.00m",
                "instagramUsername": "santicomesana",
                "instagramFollowers": 180000
            },
            {
                "name": "Dani Parejo",
                "position": "Dani Parejo            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€1.20m"
            },
            {
                "name": "Carlos Macià",
                "position": "Carlos Macià            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€1.00m"
            },
            {
                "name": "Alberto Moleiro",
                "position": "Alberto Moleiro            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€30.00m"
            },
            {
                "name": "Alfon González",
                "position": "Alfon González             \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€4.00m"
            },
            {
                "name": "Tajon Buchanan",
                "position": "Tajon Buchanan            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Canada",
                "age": 8,
                "marketValue": "€10.00m"
            },
            {
                "name": "Nicolas Pépé",
                "position": "Nicolas Pépé            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Cote d'Ivoire",
                "age": 29,
                "marketValue": "€6.00m"
            },
            {
                "name": "Georges Mikautadze",
                "position": "Georges Mikautadze            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Georgia",
                "age": 31,
                "marketValue": "€28.00m"
            },
            {
                "name": "Tani Oluwaseyi",
                "position": "Tani Oluwaseyi            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Canada",
                "age": 15,
                "marketValue": "€8.00m"
            },
            {
                "name": "Ayoze Pérez",
                "position": "Ayoze Pérez            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 29,
                "marketValue": "€6.00m",
                "instagramUsername": "ayoze_perez",
                "instagramFollowers": 380000
            },
            {
                "name": "Gerard Moreno",
                "position": "Gerard Moreno             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€2.80m"
            },
            {
                "name": "Pau Cabanes",
                "position": "Pau Cabanes             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 17,
                "marketValue": "€800k"
            }
        ]
    },
    {
        "teamName": "Espanyol",
        "players": [
            {
                "name": "Marko Dmitrovic",
                "position": "Marko Dmitrovic            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Serbia",
                "age": 24,
                "marketValue": "€800k"
            },
            {
                "name": "Ángel Fortuño",
                "position": "Ángel Fortuño            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€300k"
            },
            {
                "name": "Clemens Riedel",
                "position": "Clemens Riedel            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Germany",
                "age": 19,
                "marketValue": "€5.00m"
            },
            {
                "name": "Fernando Calero",
                "position": "Fernando Calero            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€2.00m"
            },
            {
                "name": "Miguel Rubio",
                "position": "Miguel Rubio            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€2.00m"
            },
            {
                "name": "Leandro Cabrera",
                "position": "Leandro Cabrera            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Uruguay",
                "age": 17,
                "marketValue": "€1.00m"
            },
            {
                "name": "Carlos Romero",
                "position": "Carlos Romero            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 29,
                "marketValue": "€15.00m"
            },
            {
                "name": "José Salinas",
                "position": "José Salinas            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€2.80m"
            },
            {
                "name": "Omar El Hilali",
                "position": "Omar El Hilali            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Morocco",
                "age": 12,
                "marketValue": "€15.00m"
            },
            {
                "name": "Rubén Sánchez",
                "position": "Rubén Sánchez            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€1.50m"
            },
            {
                "name": "Urko González de Zárate",
                "position": "Urko González de Zárate            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€5.00m"
            },
            {
                "name": "Charles Pickel",
                "position": "Charles Pickel            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "DR Congo",
                "age": 15,
                "marketValue": "€2.50m"
            },
            {
                "name": "Pol Lozano",
                "position": "Pol Lozano            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€6.00m"
            },
            {
                "name": "Edu Expósito",
                "position": "Edu Expósito            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€4.00m"
            },
            {
                "name": "Ramón Terrats",
                "position": "Ramón Terrats            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 18,
                "marketValue": "€3.00m"
            },
            {
                "name": "Javi Puado",
                "position": "Javi Puado              \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€10.00m"
            },
            {
                "name": "Pere Milla",
                "position": "Pere Milla            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€1.20m"
            },
            {
                "name": "Tyrhys Dolan",
                "position": "Tyrhys Dolan            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "England",
                "age": 28,
                "marketValue": "€10.00m"
            },
            {
                "name": "Cyril Ngonge",
                "position": "Cyril Ngonge            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Belgium",
                "age": 26,
                "marketValue": "€8.00m"
            },
            {
                "name": "Jofre Carreras",
                "position": "Jofre Carreras            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 17,
                "marketValue": "€3.00m"
            },
            {
                "name": "Antoniu Roca",
                "position": "Antoniu Roca            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€1.80m"
            },
            {
                "name": "Roberto Fernández",
                "position": "Roberto Fernández            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€10.00m"
            },
            {
                "name": "Kike García",
                "position": "Kike García            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€800k"
            }
        ]
    },
    {
        "teamName": "Real Betis",
        "players": [
            {
                "name": "Álvaro Valles",
                "position": "Álvaro Valles            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€2.50m"
            },
            {
                "name": "Pau López",
                "position": "Pau López            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€2.50m"
            },
            {
                "name": "Adrián",
                "position": "Adrián            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€400k"
            },
            {
                "name": "Natan",
                "position": "Natan            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Brazil",
                "age": 6,
                "marketValue": "€20.00m"
            },
            {
                "name": "Valentín Gómez",
                "position": "Valentín Gómez            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Argentina",
                "age": 26,
                "marketValue": "€12.00m"
            },
            {
                "name": "Diego Llorente",
                "position": "Diego Llorente            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€3.00m"
            },
            {
                "name": "Marc Bartra",
                "position": "Marc Bartra            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€1.00m"
            },
            {
                "name": "Junior Firpo",
                "position": "Junior Firpo            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Dominican Republic",
                "age": 22,
                "marketValue": "€6.00m"
            },
            {
                "name": "Ricardo Rodríguez",
                "position": "Ricardo Rodríguez            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Switzerland",
                "age": 25,
                "marketValue": "€1.50m"
            },
            {
                "name": "Ángel Ortiz",
                "position": "Ángel Ortiz            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€4.00m"
            },
            {
                "name": "Héctor Bellerín",
                "position": "Héctor Bellerín            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€2.50m"
            },
            {
                "name": "Sofyan Amrabat",
                "position": "Sofyan Amrabat             \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Morocco",
                "age": 21,
                "marketValue": "€12.00m"
            },
            {
                "name": "Marc Roca",
                "position": "Marc Roca            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€4.00m"
            },
            {
                "name": "Sergi Altimira",
                "position": "Sergi Altimira            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€20.00m"
            },
            {
                "name": "Nelson Deossa",
                "position": "Nelson Deossa            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Colombia",
                "age": 6,
                "marketValue": "€9.00m"
            },
            {
                "name": "Álvaro Fidalgo",
                "position": "Álvaro Fidalgo            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€8.50m"
            },
            {
                "name": "Pablo Fornals",
                "position": "Pablo Fornals            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€8.00m"
            },
            {
                "name": "Giovani Lo Celso",
                "position": "Giovani Lo Celso             \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Argentina",
                "age": 9,
                "marketValue": "€15.00m",
                "instagramUsername": "glocelso",
                "instagramFollowers": 2800000
            },
            {
                "name": "Isco",
                "position": "Isco              \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 21,
                "marketValue": "€4.00m",
                "instagramUsername": "isco_alarcon",
                "instagramFollowers": 17000000
            },
            {
                "name": "Abde Ezzalzouli",
                "position": "Abde Ezzalzouli            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Morocco",
                "age": 17,
                "marketValue": "€20.00m"
            },
            {
                "name": "Rodrigo Riquelme",
                "position": "Rodrigo Riquelme            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€8.00m"
            },
            {
                "name": "Antony",
                "position": "Antony            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Brazil",
                "age": 24,
                "marketValue": "€30.00m"
            },
            {
                "name": "Pablo García",
                "position": "Pablo García            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€10.00m"
            },
            {
                "name": "Aitor Ruibal",
                "position": "Aitor Ruibal            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€3.50m"
            },
            {
                "name": "Cucho Hernández",
                "position": "Cucho Hernández            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Colombia",
                "age": 20,
                "marketValue": "€18.00m"
            },
            {
                "name": "Chimy Ávila",
                "position": "Chimy Ávila            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Argentina",
                "age": 6,
                "marketValue": "€1.50m"
            },
            {
                "name": "Cédric Bakambu",
                "position": "Cédric Bakambu            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "DR Congo",
                "age": 11,
                "marketValue": "€1.40m"
            }
        ]
    },
    {
        "teamName": "Celta Vigo",
        "players": [
            {
                "name": "Ionuț Radu",
                "position": "Ionuț Radu            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Romania",
                "age": 28,
                "marketValue": "€5.00m"
            },
            {
                "name": "Iván Villar",
                "position": "Iván Villar            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€900k"
            },
            {
                "name": "Marc Vidal",
                "position": "Marc Vidal            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€300k"
            },
            {
                "name": "Javi Rodríguez",
                "position": "Javi Rodríguez            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€15.00m"
            },
            {
                "name": "Carl Starfelt",
                "position": "Carl Starfelt            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Sweden",
                "age": 1,
                "marketValue": "€5.00m"
            },
            {
                "name": "Carlos Domínguez",
                "position": "Carlos Domínguez            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€3.00m"
            },
            {
                "name": "Yoel Lago",
                "position": "Yoel Lago            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€2.50m"
            },
            {
                "name": "Manu Fernández",
                "position": "Manu Fernández            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€1.50m"
            },
            {
                "name": "Marcos Alonso",
                "position": "Marcos Alonso            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.40m"
            },
            {
                "name": "Joseph Aidoo",
                "position": "Joseph Aidoo            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Ghana",
                "age": 29,
                "marketValue": "€1.00m"
            },
            {
                "name": "Mihailo Ristic",
                "position": "Mihailo Ristic            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Serbia",
                "age": 31,
                "marketValue": "€800k"
            },
            {
                "name": "Óscar Mingueza",
                "position": "Óscar Mingueza            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€18.00m"
            },
            {
                "name": "Sergio Carreira",
                "position": "Sergio Carreira            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€6.00m"
            },
            {
                "name": "Álvaro Núñez",
                "position": "Álvaro Núñez            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€6.00m"
            },
            {
                "name": "Javi Rueda",
                "position": "Javi Rueda            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€3.00m"
            },
            {
                "name": "Ilaix Moriba",
                "position": "Ilaix Moriba            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Guinea",
                "age": 19,
                "marketValue": "€10.00m"
            },
            {
                "name": "Hugo Sotelo",
                "position": "Hugo Sotelo            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€9.00m"
            },
            {
                "name": "Miguel Román",
                "position": "Miguel Román            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€2.50m"
            },
            {
                "name": "Matías Vecino",
                "position": "Matías Vecino            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Uruguay",
                "age": 24,
                "marketValue": "€1.50m"
            },
            {
                "name": "Fer López",
                "position": "Fer López            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 24,
                "marketValue": "€16.00m"
            },
            {
                "name": "Williot Swedberg",
                "position": "Williot Swedberg            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Sweden",
                "age": 1,
                "marketValue": "€10.00m"
            },
            {
                "name": "Hugo Álvarez",
                "position": "Hugo Álvarez            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€8.00m"
            },
            {
                "name": "Franco Cervi",
                "position": "Franco Cervi            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Argentina",
                "age": 26,
                "marketValue": "€700k"
            },
            {
                "name": "Jones El-Abdellaoui",
                "position": "Jones El-Abdellaoui            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Morocco",
                "age": 12,
                "marketValue": "€4.00m"
            },
            {
                "name": "Ferran Jutglà",
                "position": "Ferran Jutglà            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€7.00m"
            },
            {
                "name": "Pablo Durán",
                "position": "Pablo Durán            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€4.00m"
            },
            {
                "name": "Borja Iglesias",
                "position": "Borja Iglesias            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 17,
                "marketValue": "€3.00m"
            },
            {
                "name": "Iago Aspas",
                "position": "Iago Aspas             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€1.80m"
            }
        ]
    },
    {
        "teamName": "Athletic Bilbao",
        "players": [
            {
                "name": "Unai Simón",
                "position": "Unai Simón            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€25.00m",
                "instagramUsername": "unai_simon",
                "instagramFollowers": 850000
            },
            {
                "name": "Álex Padilla",
                "position": "Álex Padilla            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Mexico",
                "age": 1,
                "marketValue": "€3.00m"
            },
            {
                "name": "Dani Vivian",
                "position": "Dani Vivian            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€30.00m"
            },
            {
                "name": "Aitor Paredes",
                "position": "Aitor Paredes            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 29,
                "marketValue": "€18.00m"
            },
            {
                "name": "Aymeric Laporte",
                "position": "Aymeric Laporte            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€9.00m"
            },
            {
                "name": "Yeray Álvarez",
                "position": "Yeray Álvarez\n  \n            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 24,
                "marketValue": "€1.00m"
            },
            {
                "name": "Unai Egiluz",
                "position": "Unai Egiluz             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€600k"
            },
            {
                "name": "Adama Boiro",
                "position": "Adama Boiro            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€3.00m"
            },
            {
                "name": "Yuri Berchiche",
                "position": "Yuri Berchiche            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€1.20m"
            },
            {
                "name": "Jesús Areso",
                "position": "Jesús Areso            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€10.00m"
            },
            {
                "name": "Andoni Gorosabel",
                "position": "Andoni Gorosabel            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€4.00m"
            },
            {
                "name": "Iñigo Lekue",
                "position": "Iñigo Lekue            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€1.20m"
            },
            {
                "name": "Mikel Vesga",
                "position": "Mikel Vesga            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€1.50m"
            },
            {
                "name": "Mikel Jauregizar",
                "position": "Mikel Jauregizar            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€30.00m"
            },
            {
                "name": "Beñat Prados",
                "position": "Beñat Prados             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€18.00m"
            },
            {
                "name": "Alejandro Rego",
                "position": "Alejandro Rego            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€3.00m"
            },
            {
                "name": "Selton Sánchez",
                "position": "Selton Sánchez            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€3.00m"
            },
            {
                "name": "Iñigo Ruiz de Galarreta",
                "position": "Iñigo Ruiz de Galarreta            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€2.50m"
            },
            {
                "name": "Oihan Sancet",
                "position": "Oihan Sancet            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€40.00m",
                "instagramUsername": "oihansancet",
                "instagramFollowers": 450000
            },
            {
                "name": "Unai Gómez",
                "position": "Unai Gómez            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€5.00m"
            },
            {
                "name": "Nico Williams",
                "position": "Nico Williams            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 12,
                "marketValue": "€60.00m",
                "instagramUsername": "nicolas.williams10",
                "instagramFollowers": 3800000
            },
            {
                "name": "Álex Berenguer",
                "position": "Álex Berenguer            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€5.00m"
            },
            {
                "name": "Nico Serrano",
                "position": "Nico Serrano            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€1.50m"
            },
            {
                "name": "Iñaki Williams",
                "position": "Iñaki Williams             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Ghana",
                "age": 15,
                "marketValue": "€10.00m",
                "instagramUsername": "inkiwilliams",
                "instagramFollowers": 2100000
            },
            {
                "name": "Robert Navarro",
                "position": "Robert Navarro            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 12,
                "marketValue": "€6.00m"
            },
            {
                "name": "Gorka Guruzeta",
                "position": "Gorka Guruzeta            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 12,
                "marketValue": "€5.00m"
            },
            {
                "name": "Maroan Sannadi",
                "position": "Maroan Sannadi             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Morocco",
                "age": 1,
                "marketValue": "€5.00m"
            },
            {
                "name": "Urko Izeta",
                "position": "Urko Izeta            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 29,
                "marketValue": "€1.50m"
            },
            {
                "name": "Asier Hierro",
                "position": "Asier Hierro            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€1.00m"
            }
        ]
    },
    {
        "teamName": "Elche",
        "players": [
            {
                "name": "Iñaki Peña",
                "position": "Iñaki Peña            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€8.00m"
            },
            {
                "name": "Alejandro Iturbe",
                "position": "Alejandro Iturbe            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€2.00m"
            },
            {
                "name": "Matías Dituro",
                "position": "Matías Dituro            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Argentina",
                "age": 8,
                "marketValue": "€200k"
            },
            {
                "name": "David Affengruber",
                "position": "David Affengruber            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Austria",
                "age": 19,
                "marketValue": "€9.00m"
            },
            {
                "name": "Víctor Chust",
                "position": "Víctor Chust            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€4.00m"
            },
            {
                "name": "John Donald",
                "position": "John Donald            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€1.00m"
            },
            {
                "name": "Pedro Bigas",
                "position": "Pedro Bigas             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€400k"
            },
            {
                "name": "Adrià Pedrosa",
                "position": "Adrià Pedrosa            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€4.00m"
            },
            {
                "name": "Léo Pétrot",
                "position": "Léo Pétrot            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "France",
                "age": 15,
                "marketValue": "€1.50m"
            },
            {
                "name": "Héctor Fort",
                "position": "Héctor Fort             \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€12.00m"
            },
            {
                "name": "Buba Sangaré",
                "position": "Buba Sangaré            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€1.00m"
            },
            {
                "name": "Federico Redondo",
                "position": "Federico Redondo            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Argentina",
                "age": 18,
                "marketValue": "€4.00m"
            },
            {
                "name": "Marc Aguado",
                "position": "Marc Aguado            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€3.00m"
            },
            {
                "name": "Martim Neto",
                "position": "Martim Neto            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Portugal",
                "age": 14,
                "marketValue": "€5.00m"
            },
            {
                "name": "Aleix Febas",
                "position": "Aleix Febas            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€4.00m"
            },
            {
                "name": "Gonzalo Villar",
                "position": "Gonzalo Villar            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€1.80m"
            },
            {
                "name": "Germán Valera",
                "position": "Germán Valera            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€5.00m"
            },
            {
                "name": "Lucas Cepeda",
                "position": "Lucas Cepeda            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Chile",
                "age": 31,
                "marketValue": "€3.20m"
            },
            {
                "name": "Tete Morente",
                "position": "Tete Morente             \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€1.80m"
            },
            {
                "name": "Yago Santiago",
                "position": "Yago Santiago            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€800k"
            },
            {
                "name": "Grady Diangana",
                "position": "Grady Diangana            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "DR Congo",
                "age": 19,
                "marketValue": "€3.50m"
            },
            {
                "name": "Josan",
                "position": "Josan            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€100k"
            },
            {
                "name": "Adam Boayar",
                "position": "Adam Boayar            \n        \n    \n    \n        \n            Second Striker",
                "nationality": "Morocco",
                "age": 13,
                "marketValue": "€500k"
            },
            {
                "name": "Rafa Mir",
                "position": "Rafa Mir             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 18,
                "marketValue": "€4.00m"
            },
            {
                "name": "Álvaro Rodríguez",
                "position": "Álvaro Rodríguez            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Uruguay",
                "age": 14,
                "marketValue": "€4.00m"
            },
            {
                "name": "André Silva",
                "position": "André Silva            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Portugal",
                "age": 6,
                "marketValue": "€3.00m"
            }
        ]
    },
    {
        "teamName": "Sevilla",
        "players": [
            {
                "name": "Odysseas Vlachodimos",
                "position": "Odysseas Vlachodimos            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Greece",
                "age": 26,
                "marketValue": "€4.00m"
            },
            {
                "name": "Ørjan Nyland",
                "position": "Ørjan Nyland            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Norway",
                "age": 10,
                "marketValue": "€900k"
            },
            {
                "name": "Kike Salas",
                "position": "Kike Salas            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€6.00m"
            },
            {
                "name": "Fábio Cardoso",
                "position": "Fábio Cardoso            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Portugal",
                "age": 19,
                "marketValue": "€2.50m"
            },
            {
                "name": "Marcão",
                "position": "Marcão             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Brazil",
                "age": 5,
                "marketValue": "€2.50m"
            },
            {
                "name": "Andrés Castrín",
                "position": "Andrés Castrín             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€1.50m"
            },
            {
                "name": "Tanguy Nianzou",
                "position": "Tanguy Nianzou            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "France",
                "age": 7,
                "marketValue": "€1.40m"
            },
            {
                "name": "César Azpilicueta",
                "position": "César Azpilicueta            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.20m"
            },
            {
                "name": "Federico Gattoni",
                "position": "Federico Gattoni            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Argentina",
                "age": 16,
                "marketValue": "€1.00m"
            },
            {
                "name": "Gabriel Suazo",
                "position": "Gabriel Suazo            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Chile",
                "age": 9,
                "marketValue": "€7.00m"
            },
            {
                "name": "Oso",
                "position": "Oso             \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€2.00m"
            },
            {
                "name": "Juanlu Sánchez",
                "position": "Juanlu Sánchez            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€15.00m"
            },
            {
                "name": "José Ángel Carmona",
                "position": "José Ángel Carmona            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 29,
                "marketValue": "€12.00m"
            },
            {
                "name": "Lucien Agoumé",
                "position": "Lucien Agoumé            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "France",
                "age": 9,
                "marketValue": "€12.00m"
            },
            {
                "name": "Batista Mendy",
                "position": "Batista Mendy            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "France",
                "age": 12,
                "marketValue": "€10.00m"
            },
            {
                "name": "Nemanja Gudelj",
                "position": "Nemanja Gudelj             \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Serbia",
                "age": 16,
                "marketValue": "€2.50m"
            },
            {
                "name": "Djibril Sow",
                "position": "Djibril Sow            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Switzerland",
                "age": 6,
                "marketValue": "€7.50m"
            },
            {
                "name": "Joan Jordán",
                "position": "Joan Jordán            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€2.00m"
            },
            {
                "name": "Manu Bueno",
                "position": "Manu Bueno            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€1.50m"
            },
            {
                "name": "Rubén Vargas",
                "position": "Rubén Vargas             \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Switzerland",
                "age": 5,
                "marketValue": "€12.00m"
            },
            {
                "name": "Chidera Ejuke",
                "position": "Chidera Ejuke            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Nigeria",
                "age": 2,
                "marketValue": "€4.00m"
            },
            {
                "name": "Adnan Januzaj",
                "position": "Adnan Januzaj            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Belgium",
                "age": 5,
                "marketValue": "€1.20m"
            },
            {
                "name": "Peque Fernández",
                "position": "Peque Fernández            \n        \n    \n    \n        \n            Second Striker",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€3.50m"
            },
            {
                "name": "Akor Adams",
                "position": "Akor Adams            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Nigeria",
                "age": 29,
                "marketValue": "€7.00m"
            },
            {
                "name": "Isaac Romero",
                "position": "Isaac Romero            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 18,
                "marketValue": "€6.00m"
            },
            {
                "name": "Neal Maupay",
                "position": "Neal Maupay            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "France",
                "age": 14,
                "marketValue": "€4.00m"
            },
            {
                "name": "Alexis Sánchez",
                "position": "Alexis Sánchez            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Chile",
                "age": 19,
                "marketValue": "€1.40m"
            }
        ]
    },
    {
        "teamName": "Getafe",
        "players": [
            {
                "name": "David Soria",
                "position": "David Soria            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€3.00m"
            },
            {
                "name": "Jiri Letacek",
                "position": "Jiri Letacek            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Czech Republic",
                "age": 9,
                "marketValue": "€2.00m"
            },
            {
                "name": "Abdel Abqar",
                "position": "Abdel Abqar            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Morocco",
                "age": 10,
                "marketValue": "€6.00m"
            },
            {
                "name": "Sebastián Boselli",
                "position": "Sebastián Boselli            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Uruguay",
                "age": 4,
                "marketValue": "€2.80m"
            },
            {
                "name": "Zaid Romero",
                "position": "Zaid Romero            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Argentina",
                "age": 15,
                "marketValue": "€2.00m"
            },
            {
                "name": "Dakonam Djené",
                "position": "Dakonam Djené             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Togo",
                "age": 31,
                "marketValue": "€1.60m"
            },
            {
                "name": "Domingos Duarte",
                "position": "Domingos Duarte            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Portugal",
                "age": 10,
                "marketValue": "€800k"
            },
            {
                "name": "Diego Rico",
                "position": "Diego Rico            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€1.20m"
            },
            {
                "name": "Davinchi",
                "position": "Davinchi             \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€1.00m"
            },
            {
                "name": "Juan Iglesias",
                "position": "Juan Iglesias            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€5.00m"
            },
            {
                "name": "Kiko Femenía",
                "position": "Kiko Femenía            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€800k"
            },
            {
                "name": "Ismael Bekhoucha",
                "position": "Ismael Bekhoucha            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Morocco",
                "age": 20,
                "marketValue": "€300k"
            },
            {
                "name": "Allan Nyom",
                "position": "Allan Nyom            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Cameroon",
                "age": 10,
                "marketValue": "€200k"
            },
            {
                "name": "Mario Martín",
                "position": "Mario Martín            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€5.00m"
            },
            {
                "name": "Mauro Arambarri",
                "position": "Mauro Arambarri            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Uruguay",
                "age": 30,
                "marketValue": "€10.00m"
            },
            {
                "name": "Luis Milla",
                "position": "Luis Milla            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€3.50m"
            },
            {
                "name": "Javi Muñoz",
                "position": "Javi Muñoz            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.50m"
            },
            {
                "name": "Adrián Liso",
                "position": "Adrián Liso            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€8.00m"
            },
            {
                "name": "Veljko Birmancevic",
                "position": "Veljko Birmancevic            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Serbia",
                "age": 5,
                "marketValue": "€4.50m"
            },
            {
                "name": "Juanmi",
                "position": "Juanmi            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€1.20m"
            },
            {
                "name": "Abu Kamara",
                "position": "Abu Kamara            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "England",
                "age": 21,
                "marketValue": "€3.00m"
            },
            {
                "name": "Álex Sancris",
                "position": "Álex Sancris            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 18,
                "marketValue": "€2.00m"
            },
            {
                "name": "Borja Mayoral",
                "position": "Borja Mayoral             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€7.50m"
            },
            {
                "name": "Martín Satriano",
                "position": "Martín Satriano            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Uruguay",
                "age": 20,
                "marketValue": "€6.00m"
            },
            {
                "name": "Luis Vázquez",
                "position": "Luis Vázquez            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Argentina",
                "age": 24,
                "marketValue": "€2.00m"
            }
        ]
    },
    {
        "teamName": "Osasuna",
        "players": [
            {
                "name": "Sergio Herrera",
                "position": "Sergio Herrera            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€3.00m"
            },
            {
                "name": "Aitor Fernández",
                "position": "Aitor Fernández            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€600k"
            },
            {
                "name": "Enzo Boyomo",
                "position": "Enzo Boyomo            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Cameroon",
                "age": 7,
                "marketValue": "€20.00m"
            },
            {
                "name": "Jorge Herrando",
                "position": "Jorge Herrando            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€3.50m"
            },
            {
                "name": "Alejandro Catena",
                "position": "Alejandro Catena            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€2.80m"
            },
            {
                "name": "Abel Bretones",
                "position": "Abel Bretones            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 21,
                "marketValue": "€4.50m"
            },
            {
                "name": "Javi Galán",
                "position": "Javi Galán            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€3.50m"
            },
            {
                "name": "Juan Cruz",
                "position": "Juan Cruz            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.20m"
            },
            {
                "name": "Valentin Rosier",
                "position": "Valentin Rosier            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "France",
                "age": 19,
                "marketValue": "€3.00m"
            },
            {
                "name": "Iñigo Arguibide",
                "position": "Iñigo Arguibide            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€500k"
            },
            {
                "name": "Lucas Torró",
                "position": "Lucas Torró            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€2.80m"
            },
            {
                "name": "Iker Muñoz",
                "position": "Iker Muñoz            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€2.00m"
            },
            {
                "name": "Jon Moncayola",
                "position": "Jon Moncayola            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€7.00m"
            },
            {
                "name": "Asier Osambela",
                "position": "Asier Osambela            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€1.00m"
            },
            {
                "name": "Aimar Oroz",
                "position": "Aimar Oroz            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€9.00m"
            },
            {
                "name": "Moi Gómez",
                "position": "Moi Gómez            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€1.80m"
            },
            {
                "name": "Víctor Muñoz",
                "position": "Víctor Muñoz            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€10.00m"
            },
            {
                "name": "Raúl Moro",
                "position": "Raúl Moro            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€7.00m"
            },
            {
                "name": "Rubén García",
                "position": "Rubén García            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€1.80m"
            },
            {
                "name": "Iker Benito",
                "position": "Iker Benito             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€1.50m"
            },
            {
                "name": "Kike Barja",
                "position": "Kike Barja             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€1.50m"
            },
            {
                "name": "Raúl García",
                "position": "Raúl García            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€3.00m"
            },
            {
                "name": "Ante Budimir",
                "position": "Ante Budimir            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Croatia",
                "age": 22,
                "marketValue": "€3.00m"
            }
        ]
    },
    {
        "teamName": "RCD Mallorca",
        "players": [
            {
                "name": "Leo Román",
                "position": "Leo Román            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€5.00m"
            },
            {
                "name": "Lucas Bergström",
                "position": "Lucas Bergström            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Finland",
                "age": 5,
                "marketValue": "€1.50m"
            },
            {
                "name": "Iván Cuéllar",
                "position": "Iván Cuéllar            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€100k"
            },
            {
                "name": "Marash Kumbulla",
                "position": "Marash Kumbulla            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Albania",
                "age": 8,
                "marketValue": "€5.00m"
            },
            {
                "name": "Martin Valjent",
                "position": "Martin Valjent            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Slovakia",
                "age": 11,
                "marketValue": "€4.50m"
            },
            {
                "name": "Antonio Raíllo",
                "position": "Antonio Raíllo             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€1.50m"
            },
            {
                "name": "David López",
                "position": "David López            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€600k"
            },
            {
                "name": "Johan Mojica",
                "position": "Johan Mojica            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Colombia",
                "age": 21,
                "marketValue": "€1.80m"
            },
            {
                "name": "Toni Lato",
                "position": "Toni Lato            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 21,
                "marketValue": "€1.50m"
            },
            {
                "name": "Pablo Maffeo",
                "position": "Pablo Maffeo            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Argentina",
                "age": 12,
                "marketValue": "€5.00m"
            },
            {
                "name": "Mateu Morey",
                "position": "Mateu Morey            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€1.50m"
            },
            {
                "name": "Samú Costa",
                "position": "Samú Costa            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Portugal",
                "age": 27,
                "marketValue": "€15.00m"
            },
            {
                "name": "Omar Mascarell",
                "position": "Omar Mascarell            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Equatorial Guinea",
                "age": 2,
                "marketValue": "€800k"
            },
            {
                "name": "Sergi Darder",
                "position": "Sergi Darder            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€3.50m"
            },
            {
                "name": "Antonio Sánchez",
                "position": "Antonio Sánchez            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€2.40m"
            },
            {
                "name": "Manu Morlanes",
                "position": "Manu Morlanes            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 12,
                "marketValue": "€2.40m"
            },
            {
                "name": "Jan Salas",
                "position": "Jan Salas             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€500k"
            },
            {
                "name": "Pablo Torre",
                "position": "Pablo Torre            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€5.00m"
            },
            {
                "name": "Jan Virgili",
                "position": "Jan Virgili            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€12.00m"
            },
            {
                "name": "Javi Llabrés",
                "position": "Javi Llabrés            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€800k"
            },
            {
                "name": "Takuma Asano",
                "position": "Takuma Asano            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Japan",
                "age": 10,
                "marketValue": "€1.80m"
            },
            {
                "name": "Justin Kalumba",
                "position": "Justin Kalumba            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "France",
                "age": 25,
                "marketValue": "€800k"
            },
            {
                "name": "Vedat Muriqi",
                "position": "Vedat Muriqi            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Kosovo",
                "age": 24,
                "marketValue": "€4.50m"
            },
            {
                "name": "Zito Luvumbo",
                "position": "Zito Luvumbo            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Angola",
                "age": 9,
                "marketValue": "€3.50m"
            },
            {
                "name": "Mateo Joseph",
                "position": "Mateo Joseph            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€3.50m"
            },
            {
                "name": "Abdón Prats",
                "position": "Abdón Prats            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€900k"
            }
        ]
    },
    {
        "teamName": "Deportivo Alaves",
        "players": [
            {
                "name": "Antonio Sivera",
                "position": "Antonio Sivera             \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€6.00m"
            },
            {
                "name": "Raúl Fernández",
                "position": "Raúl Fernández            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€200k"
            },
            {
                "name": "Jon Pacheco",
                "position": "Jon Pacheco            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€5.00m"
            },
            {
                "name": "Ville Koski",
                "position": "Ville Koski            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Finland",
                "age": 27,
                "marketValue": "€1.50m"
            },
            {
                "name": "Facundo Garcés",
                "position": "Facundo Garcés            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Malaysia",
                "age": 5,
                "marketValue": "-"
            },
            {
                "name": "Youssef Enríquez",
                "position": "Youssef Enríquez            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Morocco",
                "age": 7,
                "marketValue": "€5.00m"
            },
            {
                "name": "Victor Parada",
                "position": "Victor Parada            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€2.00m"
            },
            {
                "name": "Nahuel Tenaglia",
                "position": "Nahuel Tenaglia            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Argentina",
                "age": 21,
                "marketValue": "€3.00m"
            },
            {
                "name": "Jonny Otto",
                "position": "Jonny Otto            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€2.50m"
            },
            {
                "name": "Antonio Blanco",
                "position": "Antonio Blanco            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€10.00m"
            },
            {
                "name": "Carlos Protesoni",
                "position": "Carlos Protesoni            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Uruguay",
                "age": 30,
                "marketValue": "€1.00m"
            },
            {
                "name": "Ander Guevara",
                "position": "Ander Guevara            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€3.00m"
            },
            {
                "name": "Carles Aleñá",
                "position": "Carles Aleñá            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€3.00m"
            },
            {
                "name": "Pablo Ibáñez",
                "position": "Pablo Ibáñez            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€3.00m"
            },
            {
                "name": "Jon Guridi",
                "position": "Jon Guridi            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€2.50m"
            },
            {
                "name": "Calebe",
                "position": "Calebe            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Brazil",
                "age": 30,
                "marketValue": "€2.00m"
            },
            {
                "name": "Denis Suárez",
                "position": "Denis Suárez            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€1.20m"
            },
            {
                "name": "Abde Rebbach",
                "position": "Abde Rebbach            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Algeria",
                "age": 11,
                "marketValue": "€1.50m"
            },
            {
                "name": "Ángel Pérez",
                "position": "Ángel Pérez            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€600k"
            },
            {
                "name": "Lucas Boyé",
                "position": "Lucas Boyé            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Argentina",
                "age": 28,
                "marketValue": "€5.00m"
            },
            {
                "name": "Toni Martínez",
                "position": "Toni Martínez            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€3.50m"
            },
            {
                "name": "Ibrahim Diabate",
                "position": "Ibrahim Diabate            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Cote d'Ivoire",
                "age": 17,
                "marketValue": "€1.50m"
            },
            {
                "name": "Mariano Díaz",
                "position": "Mariano Díaz            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Dominican Republic",
                "age": 1,
                "marketValue": "€800k"
            },
            {
                "name": "Aitor Mañas",
                "position": "Aitor Mañas            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€200k"
            }
        ]
    },
    {
        "teamName": "Rayo Vallecano",
        "players": [
            {
                "name": "Augusto Batalla",
                "position": "Augusto Batalla            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Argentina",
                "age": 30,
                "marketValue": "€6.00m"
            },
            {
                "name": "Dani Cárdenas",
                "position": "Dani Cárdenas            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.80m"
            },
            {
                "name": "Nobel Mendy",
                "position": "Nobel Mendy            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Senegal",
                "age": 3,
                "marketValue": "€6.00m"
            },
            {
                "name": "Abdul Mumin",
                "position": "Abdul Mumin            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Ghana",
                "age": 6,
                "marketValue": "€4.00m"
            },
            {
                "name": "Luiz Felipe",
                "position": "Luiz Felipe            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Italy",
                "age": 22,
                "marketValue": "€3.00m"
            },
            {
                "name": "Jozhua Vertrouwd",
                "position": "Jozhua Vertrouwd            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Netherlands",
                "age": 21,
                "marketValue": "€3.00m"
            },
            {
                "name": "Florian Lejeune",
                "position": "Florian Lejeune            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "France",
                "age": 20,
                "marketValue": "€2.00m"
            },
            {
                "name": "Pep Chavarría",
                "position": "Pep Chavarría            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€10.00m"
            },
            {
                "name": "Alfonso Espino",
                "position": "Alfonso Espino            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Uruguay",
                "age": 5,
                "marketValue": "€1.00m"
            },
            {
                "name": "Andrei Rațiu",
                "position": "Andrei Rațiu            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Romania",
                "age": 20,
                "marketValue": "€18.00m"
            },
            {
                "name": "Iván Balliu",
                "position": "Iván Balliu            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Albania",
                "age": 1,
                "marketValue": "€1.20m"
            },
            {
                "name": "Gerard Gumbau",
                "position": "Gerard Gumbau            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 18,
                "marketValue": "€1.40m"
            },
            {
                "name": "Pedro Díaz",
                "position": "Pedro Díaz            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€3.00m"
            },
            {
                "name": "Unai López",
                "position": "Unai López            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€2.50m"
            },
            {
                "name": "Óscar Valentín",
                "position": "Óscar Valentín             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€2.20m"
            },
            {
                "name": "Pathé Ciss",
                "position": "Pathé Ciss            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Senegal",
                "age": 16,
                "marketValue": "€2.00m"
            },
            {
                "name": "Samu Becerra",
                "position": "Samu Becerra            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€300k"
            },
            {
                "name": "Randy Nteka",
                "position": "Randy Nteka            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Angola",
                "age": 6,
                "marketValue": "€1.20m"
            },
            {
                "name": "Óscar Trejo",
                "position": "Óscar Trejo            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Argentina",
                "age": 26,
                "marketValue": "€400k"
            },
            {
                "name": "Carlos Martín",
                "position": "Carlos Martín            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€2.50m"
            },
            {
                "name": "Álvaro García",
                "position": "Álvaro García            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€1.80m"
            },
            {
                "name": "Ilias Akhomach",
                "position": "Ilias Akhomach            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Morocco",
                "age": 16,
                "marketValue": "€12.00m"
            },
            {
                "name": "Jorge de Frutos",
                "position": "Jorge de Frutos            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€12.00m"
            },
            {
                "name": "Fran Pérez",
                "position": "Fran Pérez            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€3.00m"
            },
            {
                "name": "Isi Palazón",
                "position": "Isi Palazón            \n        \n    \n    \n        \n            Second Striker",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€3.00m"
            },
            {
                "name": "Alemão",
                "position": "Alemão            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Brazil",
                "age": 1,
                "marketValue": "€3.50m"
            },
            {
                "name": "Sergio Camello",
                "position": "Sergio Camello            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€2.00m"
            }
        ]
    },
    {
        "teamName": "Real Sociedad",
        "players": [
            {
                "name": "Álex Remiro",
                "position": "Álex Remiro            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 24,
                "marketValue": "€14.00m"
            },
            {
                "name": "Unai Marrero",
                "position": "Unai Marrero             \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€600k"
            },
            {
                "name": "Jon Martín",
                "position": "Jon Martín            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€10.00m"
            },
            {
                "name": "Igor Zubeldia",
                "position": "Igor Zubeldia            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€9.00m"
            },
            {
                "name": "Duje Caleta-Car",
                "position": "Duje Caleta-Car            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Croatia",
                "age": 17,
                "marketValue": "€3.00m"
            },
            {
                "name": "Aritz Elustondo",
                "position": "Aritz Elustondo            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.80m"
            },
            {
                "name": "Sergio Gómez",
                "position": "Sergio Gómez            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€15.00m"
            },
            {
                "name": "Aihen Muñoz",
                "position": "Aihen Muñoz            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€3.50m"
            },
            {
                "name": "Jon Aramburu",
                "position": "Jon Aramburu            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Venezuela",
                "age": 23,
                "marketValue": "€15.00m"
            },
            {
                "name": "Álvaro Odriozola",
                "position": "Álvaro Odriozola            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€800k"
            },
            {
                "name": "Jon Gorrotxategi",
                "position": "Jon Gorrotxategi            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€15.00m"
            },
            {
                "name": "Luka Sucic",
                "position": "Luka Sucic            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Croatia",
                "age": 8,
                "marketValue": "€10.00m"
            },
            {
                "name": "Yangel Herrera",
                "position": "Yangel Herrera            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Venezuela",
                "age": 7,
                "marketValue": "€9.00m"
            },
            {
                "name": "Beñat Turrientes",
                "position": "Beñat Turrientes            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 31,
                "marketValue": "€8.00m"
            },
            {
                "name": "Carlos Soler",
                "position": "Carlos Soler            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€8.00m"
            },
            {
                "name": "Brais Méndez",
                "position": "Brais Méndez            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€12.00m"
            },
            {
                "name": "Pablo Marín",
                "position": "Pablo Marín            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€8.00m"
            },
            {
                "name": "Arsen Zakharyan",
                "position": "Arsen Zakharyan             \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Russia",
                "age": 26,
                "marketValue": "€7.50m"
            },
            {
                "name": "Ander Barrenetxea",
                "position": "Ander Barrenetxea            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€20.00m"
            },
            {
                "name": "Gonçalo Guedes",
                "position": "Gonçalo Guedes            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Portugal",
                "age": 29,
                "marketValue": "€6.00m"
            },
            {
                "name": "Wesley",
                "position": "Wesley            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Brazil",
                "age": 5,
                "marketValue": "€5.00m"
            },
            {
                "name": "Takefusa Kubo",
                "position": "Takefusa Kubo             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Japan",
                "age": 4,
                "marketValue": "€30.00m",
                "instagramUsername": "takefusa.kubo",
                "instagramFollowers": 3500000
            },
            {
                "name": "Mikel Oyarzabal",
                "position": "Mikel Oyarzabal             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 21,
                "marketValue": "€25.00m",
                "instagramUsername": "oyarzabal",
                "instagramFollowers": 1200000
            },
            {
                "name": "Orri Óskarsson",
                "position": "Orri Óskarsson            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Iceland",
                "age": 29,
                "marketValue": "€12.00m"
            },
            {
                "name": "Jon Karrikaburu",
                "position": "Jon Karrikaburu            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€2.00m"
            }
        ]
    },
    {
        "teamName": "Valencia",
        "players": [
            {
                "name": "Julen Agirrezabala",
                "position": "Julen Agirrezabala             \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€15.00m"
            },
            {
                "name": "Stole Dimitrievski",
                "position": "Stole Dimitrievski            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "North Macedonia",
                "age": 25,
                "marketValue": "€2.00m"
            },
            {
                "name": "Cristian Rivero",
                "position": "Cristian Rivero            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 21,
                "marketValue": "€100k"
            },
            {
                "name": "César Tárrega",
                "position": "César Tárrega            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€15.00m"
            },
            {
                "name": "José Copete",
                "position": "José Copete            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€4.00m"
            },
            {
                "name": "Unai Núñez",
                "position": "Unai Núñez            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€3.50m"
            },
            {
                "name": "Mouctar Diakhaby",
                "position": "Mouctar Diakhaby             \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Guinea",
                "age": 19,
                "marketValue": "€2.80m"
            },
            {
                "name": "Eray Cömert",
                "position": "Eray Cömert            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Switzerland",
                "age": 4,
                "marketValue": "€2.00m"
            },
            {
                "name": "José Gayà",
                "position": "José Gayà             \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€5.00m"
            },
            {
                "name": "Jesús Vázquez",
                "position": "Jesús Vázquez            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 2,
                "marketValue": "€3.00m"
            },
            {
                "name": "Thierry Correia",
                "position": "Thierry Correia            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Portugal",
                "age": 9,
                "marketValue": "€3.00m"
            },
            {
                "name": "Dimitri Foulquier",
                "position": "Dimitri Foulquier            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Guadeloupe",
                "age": 23,
                "marketValue": "€1.20m"
            },
            {
                "name": "Pepelu",
                "position": "Pepelu            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€9.00m"
            },
            {
                "name": "Guido Rodríguez",
                "position": "Guido Rodríguez            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Argentina",
                "age": 12,
                "marketValue": "€6.00m"
            },
            {
                "name": "Baptiste Santamaria",
                "position": "Baptiste Santamaria            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "France",
                "age": 9,
                "marketValue": "€4.50m"
            },
            {
                "name": "Javi Guerra",
                "position": "Javi Guerra            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€25.00m"
            },
            {
                "name": "Filip Ugrinic",
                "position": "Filip Ugrinic            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Switzerland",
                "age": 5,
                "marketValue": "€6.00m"
            },
            {
                "name": "André Almeida",
                "position": "André Almeida            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Portugal",
                "age": 30,
                "marketValue": "€9.00m"
            },
            {
                "name": "Largie Ramazani",
                "position": "Largie Ramazani            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Belgium",
                "age": 27,
                "marketValue": "€6.00m"
            },
            {
                "name": "Arnaut Danjuma",
                "position": "Arnaut Danjuma            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Netherlands",
                "age": 31,
                "marketValue": "€4.00m"
            },
            {
                "name": "Luis Rioja",
                "position": "Luis Rioja            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€2.00m"
            },
            {
                "name": "Diego López",
                "position": "Diego López            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€15.00m"
            },
            {
                "name": "Dani Raba",
                "position": "Dani Raba            \n        \n    \n    \n        \n            Second Striker",
                "nationality": "Spain",
                "age": 29,
                "marketValue": "€2.40m"
            },
            {
                "name": "Hugo Duro",
                "position": "Hugo Duro            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€12.00m"
            },
            {
                "name": "Lucas Beltrán",
                "position": "Lucas Beltrán            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Argentina",
                "age": 29,
                "marketValue": "€8.00m"
            },
            {
                "name": "Umar Sadiq",
                "position": "Umar Sadiq            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Nigeria",
                "age": 2,
                "marketValue": "€4.00m"
            }
        ]
    },
    {
        "teamName": "Girona",
        "players": [
            {
                "name": "Marc-André ter Stegen",
                "position": "Marc-André ter Stegen             \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Germany",
                "age": 30,
                "marketValue": "€7.00m"
            },
            {
                "name": "Paulo Gazzaniga",
                "position": "Paulo Gazzaniga            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Argentina",
                "age": 2,
                "marketValue": "€2.00m"
            },
            {
                "name": "Vladyslav Krapyvtsov",
                "position": "Vladyslav Krapyvtsov            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Ukraine",
                "age": 25,
                "marketValue": "€400k"
            },
            {
                "name": "Juan Carlos",
                "position": "Juan Carlos             \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 20,
                "marketValue": "€100k"
            },
            {
                "name": "Vitor Reis",
                "position": "Vitor Reis            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Brazil",
                "age": 12,
                "marketValue": "€30.00m"
            },
            {
                "name": "Alejandro Francés",
                "position": "Alejandro Francés            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€3.00m"
            },
            {
                "name": "Daley Blind",
                "position": "Daley Blind            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Netherlands",
                "age": 9,
                "marketValue": "€1.40m"
            },
            {
                "name": "David López",
                "position": "David López            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 9,
                "marketValue": "€800k"
            },
            {
                "name": "Álex Moreno",
                "position": "Álex Moreno            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 8,
                "marketValue": "€3.50m"
            },
            {
                "name": "Arnau Martínez",
                "position": "Arnau Martínez            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€10.00m"
            },
            {
                "name": "Hugo Rincón",
                "position": "Hugo Rincón            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€2.50m"
            },
            {
                "name": "Axel Witsel",
                "position": "Axel Witsel            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Belgium",
                "age": 12,
                "marketValue": "€1.40m"
            },
            {
                "name": "Azzedine Ounahi",
                "position": "Azzedine Ounahi             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Morocco",
                "age": 19,
                "marketValue": "€10.00m"
            },
            {
                "name": "Fran Beltrán",
                "position": "Fran Beltrán            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€5.00m"
            },
            {
                "name": "Donny van de Beek",
                "position": "Donny van de Beek             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Netherlands",
                "age": 18,
                "marketValue": "€2.00m"
            },
            {
                "name": "Lass Kourouma",
                "position": "Lass Kourouma            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Guinea",
                "age": 30,
                "marketValue": "€500k"
            },
            {
                "name": "Claudio Echeverri",
                "position": "Claudio Echeverri            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Argentina",
                "age": 2,
                "marketValue": "€15.00m"
            },
            {
                "name": "Iván Martín",
                "position": "Iván Martín            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€6.00m"
            },
            {
                "name": "Thomas Lemar",
                "position": "Thomas Lemar            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "France",
                "age": 12,
                "marketValue": "€2.00m"
            },
            {
                "name": "Bryan Gil",
                "position": "Bryan Gil            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€12.00m"
            },
            {
                "name": "Joel Roca",
                "position": "Joel Roca            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 7,
                "marketValue": "€5.00m"
            },
            {
                "name": "Viktor Tsygankov",
                "position": "Viktor Tsygankov            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Ukraine",
                "age": 15,
                "marketValue": "€15.00m"
            },
            {
                "name": "Portu",
                "position": "Portu             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 21,
                "marketValue": "€1.50m"
            },
            {
                "name": "Vladyslav Vanat",
                "position": "Vladyslav Vanat            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Ukraine",
                "age": 4,
                "marketValue": "€15.00m"
            },
            {
                "name": "Abel Ruiz",
                "position": "Abel Ruiz            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€3.00m"
            },
            {
                "name": "Cristhian Stuani",
                "position": "Cristhian Stuani             \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Uruguay",
                "age": 12,
                "marketValue": "€900k"
            }
        ]
    },
    {
        "teamName": "Real Oviedo",
        "players": [
            {
                "name": "Sergio Herrera",
                "position": "Sergio Herrera            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€3.00m"
            },
            {
                "name": "Aitor Fernández",
                "position": "Aitor Fernández            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€600k"
            },
            {
                "name": "Enzo Boyomo",
                "position": "Enzo Boyomo            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Cameroon",
                "age": 7,
                "marketValue": "€20.00m"
            },
            {
                "name": "Jorge Herrando",
                "position": "Jorge Herrando            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€3.50m"
            },
            {
                "name": "Alejandro Catena",
                "position": "Alejandro Catena            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€2.80m"
            },
            {
                "name": "Abel Bretones",
                "position": "Abel Bretones            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 21,
                "marketValue": "€4.50m"
            },
            {
                "name": "Javi Galán",
                "position": "Javi Galán            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€3.50m"
            },
            {
                "name": "Juan Cruz",
                "position": "Juan Cruz            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.20m"
            },
            {
                "name": "Valentin Rosier",
                "position": "Valentin Rosier            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "France",
                "age": 19,
                "marketValue": "€3.00m"
            },
            {
                "name": "Iñigo Arguibide",
                "position": "Iñigo Arguibide            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€500k"
            },
            {
                "name": "Lucas Torró",
                "position": "Lucas Torró            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€2.80m"
            },
            {
                "name": "Iker Muñoz",
                "position": "Iker Muñoz            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€2.00m"
            },
            {
                "name": "Jon Moncayola",
                "position": "Jon Moncayola            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€7.00m"
            },
            {
                "name": "Asier Osambela",
                "position": "Asier Osambela            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 30,
                "marketValue": "€1.00m"
            },
            {
                "name": "Aimar Oroz",
                "position": "Aimar Oroz            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 27,
                "marketValue": "€9.00m"
            },
            {
                "name": "Moi Gómez",
                "position": "Moi Gómez            \n        \n    \n    \n        \n            Attacking Midfield",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€1.80m"
            },
            {
                "name": "Víctor Muñoz",
                "position": "Víctor Muñoz            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 13,
                "marketValue": "€10.00m"
            },
            {
                "name": "Raúl Moro",
                "position": "Raúl Moro            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 5,
                "marketValue": "€7.00m"
            },
            {
                "name": "Rubén García",
                "position": "Rubén García            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 14,
                "marketValue": "€1.80m"
            },
            {
                "name": "Iker Benito",
                "position": "Iker Benito             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€1.50m"
            },
            {
                "name": "Kike Barja",
                "position": "Kike Barja             \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€1.50m"
            },
            {
                "name": "Raúl García",
                "position": "Raúl García            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 3,
                "marketValue": "€3.00m"
            },
            {
                "name": "Ante Budimir",
                "position": "Ante Budimir            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Croatia",
                "age": 22,
                "marketValue": "€3.00m"
            }
        ]
    },
    {
        "teamName": "Levante",
        "players": [
            {
                "name": "Mathew Ryan",
                "position": "Mathew Ryan            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Australia",
                "age": 8,
                "marketValue": "€2.00m"
            },
            {
                "name": "Pablo Campos",
                "position": "Pablo Campos            \n        \n    \n    \n        \n            Goalkeeper",
                "nationality": "Spain",
                "age": 28,
                "marketValue": "€1.50m"
            },
            {
                "name": "Matías Moreno",
                "position": "Matías Moreno            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Argentina",
                "age": 24,
                "marketValue": "€4.00m"
            },
            {
                "name": "Alan Matturro",
                "position": "Alan Matturro            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Uruguay",
                "age": 11,
                "marketValue": "€4.00m"
            },
            {
                "name": "Adrián Dela",
                "position": "Adrián Dela            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 26,
                "marketValue": "€2.00m"
            },
            {
                "name": "Unai Elgezabal",
                "position": "Unai Elgezabal            \n        \n    \n    \n        \n            Centre-Back",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€600k"
            },
            {
                "name": "Manu Sánchez",
                "position": "Manu Sánchez            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 24,
                "marketValue": "€6.00m"
            },
            {
                "name": "Diego Pampín",
                "position": "Diego Pampín            \n        \n    \n    \n        \n            Left-Back",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€1.20m"
            },
            {
                "name": "Jeremy Toljan",
                "position": "Jeremy Toljan            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Germany",
                "age": 8,
                "marketValue": "€2.20m"
            },
            {
                "name": "Víctor García",
                "position": "Víctor García            \n        \n    \n    \n        \n            Right-Back",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€1.00m"
            },
            {
                "name": "Ugo Raghouber",
                "position": "Ugo Raghouber            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "France",
                "age": 13,
                "marketValue": "€3.00m"
            },
            {
                "name": "Oriol Rey",
                "position": "Oriol Rey            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Spain",
                "age": 25,
                "marketValue": "€2.00m"
            },
            {
                "name": "Kervin Arriaga",
                "position": "Kervin Arriaga            \n        \n    \n    \n        \n            Defensive Midfield",
                "nationality": "Honduras",
                "age": 5,
                "marketValue": "€1.50m"
            },
            {
                "name": "Pablo Martínez",
                "position": "Pablo Martínez             \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 22,
                "marketValue": "€2.00m"
            },
            {
                "name": "Unai Vencedor",
                "position": "Unai Vencedor            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 15,
                "marketValue": "€2.00m"
            },
            {
                "name": "Jon Ander Olasagasti",
                "position": "Jon Ander Olasagasti            \n        \n    \n    \n        \n            Central Midfield",
                "nationality": "Spain",
                "age": 16,
                "marketValue": "€1.80m"
            },
            {
                "name": "Roger Brugué",
                "position": "Roger Brugué             \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 4,
                "marketValue": "€2.00m"
            },
            {
                "name": "Paco Cortés",
                "position": "Paco Cortés            \n        \n    \n    \n        \n            Left Winger",
                "nationality": "Spain",
                "age": 11,
                "marketValue": "€300k"
            },
            {
                "name": "Carlos Álvarez",
                "position": "Carlos Álvarez            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 6,
                "marketValue": "€15.00m"
            },
            {
                "name": "Tay Abed",
                "position": "Tay Abed            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Israel",
                "age": 3,
                "marketValue": "€750k"
            },
            {
                "name": "Kareem Tunde",
                "position": "Kareem Tunde            \n        \n    \n    \n        \n            Right Winger",
                "nationality": "Spain",
                "age": 19,
                "marketValue": "€500k"
            },
            {
                "name": "Iker Losada",
                "position": "Iker Losada            \n        \n    \n    \n        \n            Second Striker",
                "nationality": "Spain",
                "age": 1,
                "marketValue": "€1.40m"
            },
            {
                "name": "Karl Etta Eyong",
                "position": "Karl Etta Eyong            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Cameroon",
                "age": 14,
                "marketValue": "€20.00m"
            },
            {
                "name": "Iván Romero",
                "position": "Iván Romero            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 10,
                "marketValue": "€7.50m"
            },
            {
                "name": "Carlos Espí",
                "position": "Carlos Espí            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 24,
                "marketValue": "€2.00m"
            },
            {
                "name": "José Luis Morales",
                "position": "José Luis Morales            \n        \n    \n    \n        \n            Centre-Forward",
                "nationality": "Spain",
                "age": 23,
                "marketValue": "€400k"
            }
        ]
    }
];
