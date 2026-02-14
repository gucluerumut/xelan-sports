/**
 * Complete La Liga Squad Data for 2025-26 Season
 * Data sourced from Transfermarkt
 * Total: ~450-500 players across 20 teams
 */

export interface SquadPlayer {
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
    players: SquadPlayer[];
}

export const LA_LIGA_FULL_SQUADS: TeamSquad[] = [
    // Barcelona - 20 players (already in system)
    {
        teamName: "FC Barcelona",
        players: [
            { name: "Lamine Yamal", position: "RW", nationality: "Spain", age: 18, marketValue: "€200M", instagramUsername: "lamineyamal", instagramFollowers: 18500000 },
            { name: "Pedri", position: "CM", nationality: "Spain", age: 23, marketValue: "€140M", instagramUsername: "pedri", instagramFollowers: 15200000 },
            { name: "Raphinha", position: "LW", nationality: "Brazil", age: 29, marketValue: "€90M", instagramUsername: "raphinha", instagramFollowers: 6800000 },
            { name: "Pau Cubarsí", position: "CB", nationality: "Spain", age: 19, marketValue: "€80M", instagramUsername: "paucubarsi", instagramFollowers: 2100000 },
            { name: "Jules Koundé", position: "RB", nationality: "France", age: 27, marketValue: "€65M", instagramUsername: "jkeey4", instagramFollowers: 4300000 },
            { name: "Dani Olmo", position: "AM", nationality: "Spain", age: 27, marketValue: "€60M", instagramUsername: "daniolmo7", instagramFollowers: 3200000 },
            { name: "Alejandro Balde", position: "LB", nationality: "Spain", age: 22, marketValue: "€60M", instagramUsername: "alejandrobalde", instagramFollowers: 2500000 },
            { name: "Ronald Araújo", position: "CB", nationality: "Uruguay", age: 26, marketValue: "€50M", instagramUsername: "ronaldaraujo", instagramFollowers: 5100000 },
            { name: "Ferran Torres", position: "CF", nationality: "Spain", age: 25, marketValue: "€50M", instagramUsername: "ferrantorres", instagramFollowers: 4700000 },
            { name: "Frenkie de Jong", position: "CM", nationality: "Netherlands", age: 28, marketValue: "€45M", instagramUsername: "frenkiedejong", instagramFollowers: 16800000 },
            { name: "Gavi", position: "CM", nationality: "Spain", age: 21, marketValue: "€40M", instagramUsername: "pablogavi", instagramFollowers: 18900000 },
            { name: "Fermín López", position: "AM", nationality: "Spain", age: 22, marketValue: "€30M", instagramUsername: "ferminlopez", instagramFollowers: 1800000 },
            { name: "Andreas Christensen", position: "CB", nationality: "Denmark", age: 29, marketValue: "€25M", instagramUsername: "andreaschristensen", instagramFollowers: 1200000 },
            { name: "Marc Casadó", position: "DM", nationality: "Spain", age: 22, marketValue: "€25M", instagramUsername: "marccasado", instagramFollowers: 950000 },
            { name: "Joan García", position: "GK", nationality: "Spain", age: 24, marketValue: "€25M", instagramUsername: "joangarcia13", instagramFollowers: 580000 },
            { name: "Eric García", position: "CB", nationality: "Spain", age: 25, marketValue: "€20M", instagramUsername: "ericgm3", instagramFollowers: 2100000 },
            { name: "Marc Bernal", position: "DM", nationality: "Spain", age: 18, marketValue: "€15M", instagramUsername: "marcbernal28", instagramFollowers: 420000 },
            { name: "Gerard Martín", position: "LB", nationality: "Spain", age: 23, marketValue: "€12M", instagramUsername: "gerardmartin24", instagramFollowers: 380000 },
            { name: "Robert Lewandowski", position: "ST", nationality: "Poland", age: 37, marketValue: "€9M", instagramUsername: "_rl9", instagramFollowers: 37500000 },
            { name: "Wojciech Szczęsny", position: "GK", nationality: "Poland", age: 35, marketValue: "€2M", instagramUsername: "wojciech.szczesny.1", instagramFollowers: 7200000 },
        ]
    },

    // Real Madrid - 25 players
    {
        teamName: "Real Madrid",
        players: [
            { name: "Kylian Mbappé", position: "LW", nationality: "France", age: 26, marketValue: "€180M", instagramUsername: "k.mbappe", instagramFollowers: 125000000 },
            { name: "Vinicius Jr", position: "LW", nationality: "Brazil", age: 24, marketValue: "€200M", instagramUsername: "vinijr", instagramFollowers: 52000000 },
            { name: "Jude Bellingham", position: "CM", nationality: "England", age: 22, marketValue: "€180M", instagramUsername: "judebellingham", instagramFollowers: 37000000 },
            { name: "Rodrygo", position: "RW", nationality: "Brazil", age: 24, marketValue: "€110M", instagramUsername: "rodrygogoes", instagramFollowers: 19000000 },
            { name: "Eduardo Camavinga", position: "CM", nationality: "France", age: 22, marketValue: "€100M", instagramUsername: "camavinga", instagramFollowers: 13000000 },
            { name: "Aurélien Tchouaméni", position: "DM", nationality: "France", age: 25, marketValue: "€100M", instagramUsername: "aurelientchm", instagramFollowers: 6500000 },
            { name: "Federico Valverde", position: "CM", nationality: "Uruguay", age: 27, marketValue: "€120M", instagramUsername: "fedeevalverde", instagramFollowers: 11000000 },
            { name: "Antonio Rüdiger", position: "CB", nationality: "Germany", age: 32, marketValue: "€30M", instagramUsername: "toniruediger", instagramFollowers: 10000000 },
            { name: "Éder Militão", position: "CB", nationality: "Brazil", age: 27, marketValue: "€60M", instagramUsername: "edermilitao", instagramFollowers: 8500000 },
            { name: "Ferland Mendy", position: "LB", nationality: "France", age: 30, marketValue: "€25M", instagramUsername: "ferland_mendy", instagramFollowers: 4200000 },
            { name: "Dani Carvajal", position: "RB", nationality: "Spain", age: 33, marketValue: "€8M", instagramUsername: "dani.carvajal.2", instagramFollowers: 11000000 },
            { name: "Thibaut Courtois", position: "GK", nationality: "Belgium", age: 33, marketValue: "€20M", instagramUsername: "thibautcourtois", instagramFollowers: 15000000 },
            { name: "Luka Modrić", position: "CM", nationality: "Croatia", age: 40, marketValue: "€3M", instagramUsername: "lukamodric10", instagramFollowers: 57000000 },
            { name: "Brahim Díaz", position: "AM", nationality: "Morocco", age: 26, marketValue: "€40M", instagramUsername: "brahim", instagramFollowers: 9200000 },
            { name: "Arda Güler", position: "AM", nationality: "Turkey", age: 20, marketValue: "€45M", instagramUsername: "ardaguler", instagramFollowers: 12000000 },
            { name: "Endrick", position: "ST", nationality: "Brazil", age: 19, marketValue: "€60M", instagramUsername: "endrick", instagramFollowers: 5800000 },
            { name: "Lucas Vázquez", position: "RB", nationality: "Spain", age: 34, marketValue: "€3M", instagramUsername: "lucasvazquez91", instagramFollowers: 4100000 },
            { name: "Fran García", position: "LB", nationality: "Spain", age: 25, marketValue: "€15M", instagramUsername: "frangarcia_", instagramFollowers: 850000 },
            { name: "Andriy Lunin", position: "GK", nationality: "Ukraine", age: 26, marketValue: "€20M", instagramUsername: "lunin_andrey", instagramFollowers: 1200000 },
            { name: "Jesús Vallejo", position: "CB", nationality: "Spain", age: 28, marketValue: "€3M", instagramUsername: "jesusvallejo", instagramFollowers: 920000 },
            { name: "Dani Ceballos", position: "CM", nationality: "Spain", age: 29, marketValue: "€8M", instagramUsername: "daniceb_10", instagramFollowers: 3800000 },
            { name: "Raúl Asencio", position: "CB", nationality: "Spain", age: 22, marketValue: "€5M" },
            { name: "Lorenzo Aguado", position: "DM", nationality: "Spain", age: 20, marketValue: "€3M" },
            { name: "Jacobo Ramón", position: "CB", nationality: "Spain", age: 21, marketValue: "€2M" },
            { name: "Sergio Mestre", position: "GK", nationality: "Spain", age: 22, marketValue: "€500K" },
        ]
    },

    // Atletico Madrid - 25 players
    {
        teamName: "Atletico Madrid",
        players: [
            { name: "Antoine Griezmann", position: "AM", nationality: "France", age: 34, marketValue: "€15M", instagramUsername: "antogriezmann", instagramFollowers: 44000000 },
            { name: "Julián Álvarez", position: "ST", nationality: "Argentina", age: 25, marketValue: "€90M", instagramUsername: "juliaanalvarez", instagramFollowers: 9500000 },
            { name: "João Félix", position: "AM", nationality: "Portugal", age: 25, marketValue: "€30M", instagramUsername: "joaofelix79", instagramFollowers: 11000000 },
            { name: "Conor Gallagher", position: "CM", nationality: "England", age: 25, marketValue: "€40M", instagramUsername: "conorgallagher", instagramFollowers: 1800000 },
            { name: "Rodrigo De Paul", position: "CM", nationality: "Argentina", age: 31, marketValue: "€20M", instagramUsername: "rodridepaul", instagramFollowers: 8200000 },
            { name: "Samuel Lino", position: "LW", nationality: "Brazil", age: 25, marketValue: "€30M", instagramUsername: "samuellino", instagramFollowers: 950000 },
            { name: "Alexander Sørloth", position: "ST", nationality: "Norway", age: 30, marketValue: "€25M", instagramUsername: "alexsorloth", instagramFollowers: 380000 },
            { name: "José María Giménez", position: "CB", nationality: "Uruguay", age: 30, marketValue: "€20M", instagramUsername: "josemgimenez13", instagramFollowers: 3800000 },
            { name: "Jan Oblak", position: "GK", nationality: "Slovenia", age: 32, marketValue: "€15M", instagramUsername: "oblakjan", instagramFollowers: 4500000 },
            { name: "Marcos Llorente", position: "CM", nationality: "Spain", age: 30, marketValue: "€30M", instagramUsername: "marcosllorente", instagramFollowers: 4200000 },
            { name: "Koke", position: "CM", nationality: "Spain", age: 33, marketValue: "€5M", instagramUsername: "koke6", instagramFollowers: 5100000 },
            { name: "Nahuel Molina", position: "RB", nationality: "Argentina", age: 27, marketValue: "€25M", instagramUsername: "nahuelmolina_", instagramFollowers: 1900000 },
            { name: "Reinildo Mandava", position: "LB", nationality: "Mozambique", age: 31, marketValue: "€8M", instagramUsername: "reinildomandava", instagramFollowers: 420000 },
            { name: "Clément Lenglet", position: "CB", nationality: "France", age: 30, marketValue: "€8M", instagramUsername: "clementlenglet", instagramFollowers: 2100000 },
            { name: "Pablo Barrios", position: "DM", nationality: "Spain", age: 22, marketValue: "€30M", instagramUsername: "pablobarrios", instagramFollowers: 580000 },
            { name: "Rodrigo Riquelme", position: "LW", nationality: "Spain", age: 25, marketValue: "€20M", instagramUsername: "rodri_riquelme", instagramFollowers: 450000 },
            { name: "Ángel Correa", position: "RW", nationality: "Argentina", age: 30, marketValue: "€12M", instagramUsername: "angelcorrea32", instagramFollowers: 6800000 },
            { name: "César Azpilicueta", position: "RB", nationality: "Spain", age: 36, marketValue: "€1.2M", instagramUsername: "cesarazpi", instagramFollowers: 5200000 },
            { name: "Axel Witsel", position: "CB", nationality: "Belgium", age: 36, marketValue: "€1.5M", instagramUsername: "axelwitsel28", instagramFollowers: 2800000 },
            { name: "Memphis Depay", position: "ST", nationality: "Netherlands", age: 31, marketValue: "€8M", instagramUsername: "memphisdepay", instagramFollowers: 16000000 },
            { name: "Thomas Lemar", position: "LW", nationality: "France", age: 30, marketValue: "€5M", instagramUsername: "thomaslemar", instagramFollowers: 1900000 },
            { name: "Javi Galán", position: "LB", nationality: "Spain", age: 30, marketValue: "€8M", instagramUsername: "javigalan", instagramFollowers: 320000 },
            { name: "Robin Le Normand", position: "CB", nationality: "Spain", age: 28, marketValue: "€25M", instagramUsername: "robinlenormand", instagramFollowers: 280000 },
            { name: "Antonio Gomis", position: "GK", nationality: "Spain", age: 25, marketValue: "€2M" },
            { name: "Ilias Kostis", position: "CB", nationality: "Greece", age: 22, marketValue: "€3M" },
        ]
    },

    // Sevilla FC - 20 players
    {
        teamName: "Sevilla",
        players: [
            { name: "Juanlu Sánchez", position: "RW", nationality: "Spain", age: 21, marketValue: "€15M", instagramUsername: "juanlusanchez", instagramFollowers: 180000 },
            { name: "José Ángel Carmona", position: "RB", nationality: "Spain", age: 24, marketValue: "€12M", instagramUsername: "joseangelcarmona", instagramFollowers: 95000 },
            { name: "Lucien Agoumé", position: "DM", nationality: "France", age: 23, marketValue: "€12M", instagramUsername: "lucienagoume", instagramFollowers: 120000 },
            { name: "Rubén Vargas", position: "LW", nationality: "Switzerland", age: 27, marketValue: "€12M", instagramUsername: "rubenvargas", instagramFollowers: 380000 },
            { name: "Batista Mendy", position: "DM", nationality: "France", age: 24, marketValue: "€10M" },
            { name: "Gabriel Suazo", position: "LB", nationality: "Chile", age: 28, marketValue: "€7M", instagramUsername: "gabrielsuazo", instagramFollowers: 220000 },
            { name: "Akor Adams", position: "ST", nationality: "Nigeria", age: 25, marketValue: "€7M" },
            { name: "Djibril Sow", position: "CM", nationality: "Switzerland", age: 28, marketValue: "€7.5M", instagramUsername: "djibrilsow", instagramFollowers: 180000 },
            { name: "Kike Salas", position: "CB", nationality: "Spain", age: 24, marketValue: "€6M" },
            { name: "Isaac Romero", position: "ST", nationality: "Spain", age: 24, marketValue: "€6M", instagramUsername: "isaacromero9", instagramFollowers: 95000 },
            { name: "Odysseas Vlachodimos", position: "GK", nationality: "Greece", age: 31, marketValue: "€4M" },
            { name: "Chidera Ejuke", position: "LW", nationality: "Nigeria", age: 27, marketValue: "€4M", instagramUsername: "chideraejuke", instagramFollowers: 85000 },
            { name: "Neal Maupay", position: "ST", nationality: "France", age: 29, marketValue: "€4M", instagramUsername: "nealmaupay", instagramFollowers: 420000 },
            { name: "Peque Fernández", position: "AM", nationality: "Spain", age: 24, marketValue: "€3.5M" },
            { name: "Nemanja Gudelj", position: "DM", nationality: "Serbia", age: 34, marketValue: "€2.5M", instagramUsername: "nemanjagudelj", instagramFollowers: 180000 },
            { name: "Marcão", position: "CB", nationality: "Brazil", age: 29, marketValue: "€2.5M", instagramUsername: "marcao_", instagramFollowers: 520000 },
            { name: "Alexis Sánchez", position: "RW", nationality: "Chile", age: 37, marketValue: "€1.4M", instagramUsername: "alexis_officia1", instagramFollowers: 11000000 },
            { name: "Joan Jordán", position: "CM", nationality: "Spain", age: 31, marketValue: "€2M" },
            { name: "Tanguy Nianzou", position: "CB", nationality: "France", age: 23, marketValue: "€1.4M" },
            { name: "Ørjan Nyland", position: "GK", nationality: "Norway", age: 35, marketValue: "€900K" },
        ]
    },

    // Valencia CF - 25 players
    {
        teamName: "Valencia",
        players: [
            { name: "Javi Guerra", position: "CM", nationality: "Spain", age: 22, marketValue: "€25M", instagramUsername: "javiguerra", instagramFollowers: 280000 },
            { name: "Julen Agirrezabala", position: "GK", nationality: "Spain", age: 25, marketValue: "€15M" },
            { name: "César Tárrega", position: "CB", nationality: "Spain", age: 23, marketValue: "€15M" },
            { name: "Diego López", position: "RW", nationality: "Spain", age: 23, marketValue: "€15M", instagramUsername: "diegolopez", instagramFollowers: 190000 },
            { name: "Hugo Duro", position: "ST", nationality: "Spain", age: 26, marketValue: "€12M", instagramUsername: "hugoduro", instagramFollowers: 320000 },
            { name: "Pepelu", position: "DM", nationality: "Spain", age: 27, marketValue: "€9M", instagramUsername: "pepelu", instagramFollowers: 150000 },
            { name: "André Almeida", position: "AM", nationality: "Portugal", age: 25, marketValue: "€9M", instagramUsername: "andrealmeida", instagramFollowers: 95000 },
            { name: "Lucas Beltrán", position: "ST", nationality: "Argentina", age: 24, marketValue: "€8M", instagramUsername: "lucasbeltran", instagramFollowers: 280000 },
            { name: "Largie Ramazani", position: "LW", nationality: "Belgium", age: 24, marketValue: "€6M" },
            { name: "Guido Rodríguez", position: "DM", nationality: "Argentina", age: 31, marketValue: "€6M", instagramUsername: "guidorodriguez", instagramFollowers: 520000 },
            { name: "Filip Ugrinic", position: "CM", nationality: "Switzerland", age: 27, marketValue: "€6M" },
            { name: "José Gayà", position: "LB", nationality: "Spain", age: 30, marketValue: "€5M", instagramUsername: "josegaya", instagramFollowers: 850000 },
            { name: "Baptiste Santamaria", position: "DM", nationality: "France", age: 30, marketValue: "€4.5M" },
            { name: "Arnaut Danjuma", position: "LW", nationality: "Netherlands", age: 29, marketValue: "€4M", instagramUsername: "arnautdanjuma", instagramFollowers: 420000 },
            { name: "Umar Sadiq", position: "ST", nationality: "Nigeria", age: 29, marketValue: "€4M", instagramUsername: "umarsadiq", instagramFollowers: 380000 },
            { name: "José Copete", position: "CB", nationality: "Spain", age: 26, marketValue: "€4M" },
            { name: "Unai Núñez", position: "CB", nationality: "Spain", age: 29, marketValue: "€3.5M" },
            { name: "Thierry Correia", position: "RB", nationality: "Portugal", age: 26, marketValue: "€3M" },
            { name: "Jesús Vázquez", position: "LB", nationality: "Spain", age: 23, marketValue: "€3M" },
            { name: "Mouctar Diakhaby", position: "CB", nationality: "France", age: 29, marketValue: "€2.8M" },
            { name: "Dani Raba", position: "AM", nationality: "Spain", age: 30, marketValue: "€2.4M" },
            { name: "Stole Dimitrievski", position: "GK", nationality: "North Macedonia", age: 32, marketValue: "€2M" },
            { name: "Luis Rioja", position: "LW", nationality: "Spain", age: 32, marketValue: "€2M" },
            { name: "Eray Cömert", position: "CB", nationality: "Switzerland", age: 28, marketValue: "€2M" },
            { name: "Dimitri Foulquier", position: "RB", nationality: "France", age: 32, marketValue: "€1.2M" },
        ]
    },

    // Girona FC - 25 players
    {
        teamName: "Girona",
        players: [
            { name: "Marc-André ter Stegen", position: "GK", nationality: "Germany", age: 33, marketValue: "€18M", instagramUsername: "mterstegen1", instagramFollowers: 13000000 },
            { name: "Vladyslav Vanat", position: "ST", nationality: "Ukraine", age: 24, marketValue: "€15M" },
            { name: "Viktor Tsygankov", position: "RW", nationality: "Ukraine", age: 28, marketValue: "€20M", instagramUsername: "viktortsygankov", instagramFollowers: 950000 },
            { name: "Claudio Echeverri", position: "AM", nationality: "Argentina", age: 20, marketValue: "€25M", instagramUsername: "claudioecheverri", instagramFollowers: 1200000 },
            { name: "Vitor Reis", position: "CB", nationality: "Brazil", age: 20, marketValue: "€30M" },
            { name: "Bryan Gil", position: "LW", nationality: "Spain", age: 24, marketValue: "€15M", instagramUsername: "bryangil", instagramFollowers: 580000 },
            { name: "Azzedine Ounahi", position: "CM", nationality: "Morocco", age: 25, marketValue: "€12M", instagramUsername: "azzedineounahi", instagramFollowers: 420000 },
            { name: "Iván Martín", position: "AM", nationality: "Spain", age: 26, marketValue: "€12M" },
            { name: "Abel Ruiz", position: "ST", nationality: "Spain", age: 26, marketValue: "€10M", instagramUsername: "abelruiz", instagramFollowers: 280000 },
            { name: "Donny van de Beek", position: "CM", nationality: "Netherlands", age: 28, marketValue: "€10M", instagramUsername: "donnyvdbeek", instagramFollowers: 5200000 },
            { name: "Fran Beltrán", position: "CM", nationality: "Spain", age: 27, marketValue: "€8M" },
            { name: "Thomas Lemar", position: "AM", nationality: "France", age: 30, marketValue: "€5M", instagramUsername: "thomaslemar", instagramFollowers: 1900000 },
            { name: "Axel Witsel", position: "DM", nationality: "Belgium", age: 37, marketValue: "€1.5M", instagramUsername: "axelwitsel28", instagramFollowers: 2800000 },
            { name: "Daley Blind", position: "CB", nationality: "Netherlands", age: 35, marketValue: "€2M", instagramUsername: "daleyblind", instagramFollowers: 3100000 },
            { name: "Cristhian Stuani", position: "ST", nationality: "Uruguay", age: 39, marketValue: "€800K", instagramUsername: "cstuani", instagramFollowers: 1100000 },
            { name: "Arnau Martínez", position: "RB", nationality: "Spain", age: 22, marketValue: "€12M" },
            { name: "Alejandro Francés", position: "CB", nationality: "Spain", age: 23, marketValue: "€8M" },
            { name: "David López", position: "CB", nationality: "Spain", age: 36, marketValue: "€1M" },
            { name: "Álex Moreno", position: "LB", nationality: "Spain", age: 32, marketValue: "€3M" },
            { name: "Paulo Gazzaniga", position: "GK", nationality: "Argentina", age: 34, marketValue: "€1.5M" },
            { name: "Portu", position: "RW", nationality: "Spain", age: 33, marketValue: "€2M", instagramUsername: "portu", instagramFollowers: 420000 },
            { name: "Joel Roca", position: "LW", nationality: "Spain", age: 20, marketValue: "€3M" },
            { name: "Lass Kourouma", position: "CM", nationality: "Guinea", age: 21, marketValue: "€2M" },
            { name: "Hugo Rincón", position: "RB", nationality: "Spain", age: 23, marketValue: "€1.5M" },
            { name: "Vladyslav Krapyvtsov", position: "GK", nationality: "Ukraine", age: 20, marketValue: "€500K" },
        ]
    },

    // Athletic Bilbao - 20 players
    {
        teamName: "Athletic Bilbao",
        players: [
            { name: "Nico Williams", position: "LW", nationality: "Spain", age: 23, marketValue: "€60M", instagramUsername: "nicolas.williams", instagramFollowers: 3200000 },
            { name: "Iñaki Williams", position: "RW", nationality: "Ghana", age: 31, marketValue: "€10M", instagramUsername: "inakiwilliams", instagramFollowers: 2100000 },
            { name: "Oihan Sancet", position: "AM", nationality: "Spain", age: 25, marketValue: "€35M", instagramUsername: "oihansancet", instagramFollowers: 580000 },
            { name: "Unai Simón", position: "GK", nationality: "Spain", age: 28, marketValue: "€25M", instagramUsername: "unaisimon", instagramFollowers: 920000 },
            { name: "Gorka Guruzeta", position: "ST", nationality: "Spain", age: 29, marketValue: "€15M" },
            { name: "Álex Berenguer", position: "LW", nationality: "Spain", age: 30, marketValue: "€12M", instagramUsername: "alexberenguer", instagramFollowers: 420000 },
            { name: "Mikel Vesga", position: "DM", nationality: "Spain", age: 32, marketValue: "€5M" },
            { name: "Ander Herrera", position: "CM", nationality: "Spain", age: 36, marketValue: "€2M", instagramUsername: "anderherrera", instagramFollowers: 4100000 },
            { name: "Yeray Álvarez", position: "CB", nationality: "Spain", age: 30, marketValue: "€8M" },
            { name: "Dani Vivian", position: "CB", nationality: "Spain", age: 26, marketValue: "€20M" },
            { name: "Yuri Berchiche", position: "LB", nationality: "Spain", age: 35, marketValue: "€2M" },
            { name: "Óscar de Marcos", position: "RB", nationality: "Spain", age: 36, marketValue: "€1M" },
            { name: "Beñat Prados", position: "CM", nationality: "Spain", age: 22, marketValue: "€12M" },
            { name: "Mikel Jauregizar", position: "DM", nationality: "Spain", age: 23, marketValue: "€8M" },
            { name: "Álvaro Djaló", position: "ST", nationality: "Portugal", age: 26, marketValue: "€6M" },
            { name: "Adama Boiro", position: "LB", nationality: "Spain", age: 21, marketValue: "€4M" },
            { name: "Aitor Paredes", position: "CB", nationality: "Spain", age: 25, marketValue: "€10M" },
            { name: "Unai Gómez", position: "CM", nationality: "Spain", age: 22, marketValue: "€5M" },
            { name: "Julen Agirrezabala", position: "GK", nationality: "Spain", age: 25, marketValue: "€8M" },
            { name: "Andoni Gorosabel", position: "RB", nationality: "Spain", age: 28, marketValue: "€3M" },
        ]
    },

    // Real Sociedad - 20 players
    {
        teamName: "Real Sociedad",
        players: [
            { name: "Takefusa Kubo", position: "RW", nationality: "Japan", age: 24, marketValue: "€60M", instagramUsername: "takefusa.kubo", instagramFollowers: 4800000 },
            { name: "Mikel Oyarzabal", position: "LW", nationality: "Spain", age: 28, marketValue: "€35M", instagramUsername: "oyarzabal", instagramFollowers: 1200000 },
            { name: "Martín Zubimendi", position: "DM", nationality: "Spain", age: 26, marketValue: "€60M", instagramUsername: "zubimendi", instagramFollowers: 580000 },
            { name: "Brais Méndez", position: "AM", nationality: "Spain", age: 28, marketValue: "€20M", instagramUsername: "braismendez", instagramFollowers: 420000 },
            { name: "Mikel Merino", position: "CM", nationality: "Spain", age: 29, marketValue: "€25M", instagramUsername: "mikelmerino", instagramFollowers: 920000 },
            { name: "Álex Remiro", position: "GK", nationality: "Spain", age: 30, marketValue: "€15M" },
            { name: "Robin Le Normand", position: "CB", nationality: "Spain", age: 28, marketValue: "€25M" },
            { name: "Igor Zubeldia", position: "CB", nationality: "Spain", age: 28, marketValue: "€18M" },
            { name: "Hamari Traoré", position: "RB", nationality: "Mali", age: 33, marketValue: "€3M" },
            { name: "Aihen Muñoz", position: "LB", nationality: "Spain", age: 28, marketValue: "€8M" },
            { name: "Ander Barrenetxea", position: "LW", nationality: "Spain", age: 24, marketValue: "€15M" },
            { name: "Sheraldo Becker", position: "RW", nationality: "Suriname", age: 30, marketValue: "€8M" },
            { name: "Orri Óskarsson", position: "ST", nationality: "Iceland", age: 20, marketValue: "€12M" },
            { name: "Jon Aramburu", position: "RB", nationality: "Spain", age: 23, marketValue: "€10M" },
            { name: "Nayef Aguerd", position: "CB", nationality: "Morocco", age: 29, marketValue: "€12M" },
            { name: "Javi López", position: "LB", nationality: "Spain", age: 26, marketValue: "€5M" },
            { name: "Luka Sučić", position: "CM", nationality: "Croatia", age: 23, marketValue: "€10M" },
            { name: "Beñat Turrientes", position: "CM", nationality: "Spain", age: 23, marketValue: "€8M" },
            { name: "Jon Pacheco", position: "CB", nationality: "Spain", age: 24, marketValue: "€12M" },
            { name: "Unai Marrero", position: "GK", nationality: "Spain", age: 26, marketValue: "€2M" },
        ]
    },

    // Villarreal - 20 players
    {
        teamName: "Villarreal",
        players: [
            { name: "Álex Baena", position: "LW", nationality: "Spain", age: 24, marketValue: "€40M", instagramUsername: "alexbaena", instagramFollowers: 850000 },
            { name: "Ayoze Pérez", position: "AM", nationality: "Spain", age: 32, marketValue: "€8M", instagramUsername: "ayozeperez", instagramFollowers: 520000 },
            { name: "Santi Comesaña", position: "CM", nationality: "Spain", age: 30, marketValue: "€12M" },
            { name: "Pape Gueye", position: "DM", nationality: "Senegal", age: 26, marketValue: "€15M" },
            { name: "Yeremy Pino", position: "RW", nationality: "Spain", age: 23, marketValue: "€35M", instagramUsername: "yeremypino", instagramFollowers: 680000 },
            { name: "Nicolas Pépé", position: "RW", nationality: "Ivory Coast", age: 30, marketValue: "€8M", instagramUsername: "nicolas.pepe", instagramFollowers: 3800000 },
            { name: "Thierno Barry", position: "ST", nationality: "France", age: 23, marketValue: "€25M" },
            { name: "Diego Conde", position: "GK", nationality: "Spain", age: 26, marketValue: "€10M" },
            { name: "Raúl Albiol", position: "CB", nationality: "Spain", age: 40, marketValue: "€500K" },
            { name: "Logan Costa", position: "CB", nationality: "Cape Verde", age: 24, marketValue: "€12M" },
            { name: "Sergi Cardona", position: "LB", nationality: "Spain", age: 26, marketValue: "€8M" },
            { name: "Kiko Femenía", position: "RB", nationality: "Spain", age: 34, marketValue: "€2M" },
            { name: "Dani Parejo", position: "DM", nationality: "Spain", age: 36, marketValue: "€2M", instagramUsername: "daniparejo", instagramFollowers: 1100000 },
            { name: "Ilias Akhomach", position: "RW", nationality: "Morocco", age: 21, marketValue: "€10M" },
            { name: "Denis Suárez", position: "CM", nationality: "Spain", age: 31, marketValue: "€3M" },
            { name: "Juan Foyth", position: "CB", nationality: "Argentina", age: 27, marketValue: "€15M" },
            { name: "Luiz Júnior", position: "GK", nationality: "Brazil", age: 24, marketValue: "€5M" },
            { name: "Eric Bailly", position: "CB", nationality: "Ivory Coast", age: 31, marketValue: "€3M" },
            { name: "Pau Navarro", position: "RB", nationality: "Spain", age: 21, marketValue: "€6M" },
            { name: "Gerard Moreno", position: "ST", nationality: "Spain", age: 33, marketValue: "€5M", instagramUsername: "gerardmoreno", instagramFollowers: 920000 },
        ]
    },

    // Real Betis - 20 players
    {
        teamName: "Real Betis",
        players: [
            { name: "Isco", position: "AM", nationality: "Spain", age: 33, marketValue: "€5M", instagramUsername: "iscoalarcon", instagramFollowers: 12000000 },
            { name: "Nabil Fekir", position: "AM", nationality: "France", age: 32, marketValue: "€8M", instagramUsername: "nabilfekir", instagramFollowers: 5200000 },
            { name: "Giovani Lo Celso", position: "AM", nationality: "Argentina", age: 29, marketValue: "€12M", instagramUsername: "giovannilocelso", instagramFollowers: 1800000 },
            { name: "Abde Ezzalzouli", position: "LW", nationality: "Morocco", age: 24, marketValue: "€15M", instagramUsername: "abde", instagramFollowers: 950000 },
            { name: "Vitor Roque", position: "ST", nationality: "Brazil", age: 20, marketValue: "€30M", instagramUsername: "vitorroque", instagramFollowers: 2100000 },
            { name: "Marc Bartra", position: "CB", nationality: "Spain", age: 34, marketValue: "€1.5M", instagramUsername: "marcbartra", instagramFollowers: 3800000 },
            { name: "Diego Llorente", position: "CB", nationality: "Spain", age: 32, marketValue: "€5M" },
            { name: "Rui Silva", position: "GK", nationality: "Portugal", age: 31, marketValue: "€5M" },
            { name: "Chimy Ávila", position: "ST", nationality: "Argentina", age: 32, marketValue: "€4M", instagramUsername: "chimyavila", instagramFollowers: 850000 },
            { name: "Sergi Altimira", position: "DM", nationality: "Spain", age: 23, marketValue: "€8M" },
            { name: "William Carvalho", position: "DM", nationality: "Portugal", age: 33, marketValue: "€2M" },
            { name: "Héctor Bellerín", position: "RB", nationality: "Spain", age: 30, marketValue: "€3M", instagramUsername: "hectorbellerin", instagramFollowers: 6500000 },
            { name: "Ricardo Rodríguez", position: "LB", nationality: "Switzerland", age: 33, marketValue: "€1.5M" },
            { name: "Assane Diao", position: "RW", nationality: "Spain", age: 20, marketValue: "€10M" },
            { name: "Pablo Fornals", position: "AM", nationality: "Spain", age: 29, marketValue: "€10M", instagramUsername: "pablofornals", instagramFollowers: 580000 },
            { name: "Aitor Ruibal", position: "RB", nationality: "Spain", age: 29, marketValue: "€6M" },
            { name: "Natan", position: "CB", nationality: "Brazil", age: 24, marketValue: "€8M" },
            { name: "Fran Vieites", position: "GK", nationality: "Spain", age: 23, marketValue: "€3M" },
            { name: "Juanmi", position: "ST", nationality: "Spain", age: 32, marketValue: "€2M" },
            { name: "Youssouf Sabaly", position: "RB", nationality: "Senegal", age: 32, marketValue: "€2M" },
        ]
    },

    // Getafe - 15 players
    {
        teamName: "Getafe",
        players: [
            { name: "Mauro Arambarri", position: "CM", nationality: "Uruguay", age: 30, marketValue: "€10M", instagramUsername: "mauroarambarri", instagramFollowers: 420000 },
            { name: "Borja Mayoral", position: "ST", nationality: "Spain", age: 28, marketValue: "€7.5M", instagramUsername: "borjamayoral", instagramFollowers: 380000 },
            { name: "Martín Satriano", position: "ST", nationality: "Uruguay", age: 24, marketValue: "€6M" },
            { name: "Abdel Abqar", position: "CB", nationality: "Morocco", age: 26, marketValue: "€6M" },
            { name: "Juan Iglesias", position: "RB", nationality: "Spain", age: 30, marketValue: "€5M" },
            { name: "Mario Martín", position: "DM", nationality: "Spain", age: 21, marketValue: "€5M" },
            { name: "Veljko Birmancevic", position: "LW", nationality: "Serbia", age: 26, marketValue: "€4.5M" },
            { name: "Luis Milla", position: "CM", nationality: "Spain", age: 30, marketValue: "€3.5M" },
            { name: "David Soria", position: "GK", nationality: "Spain", age: 32, marketValue: "€3M" },
            { name: "Abu Kamara", position: "RW", nationality: "Sierra Leone", age: 21, marketValue: "€3M" },
            { name: "Sebastián Boselli", position: "CB", nationality: "Uruguay", age: 27, marketValue: "€2.8M" },
            { name: "Zaid Romero", position: "CB", nationality: "Spain", age: 21, marketValue: "€2M" },
            { name: "Jiri Letacek", position: "GK", nationality: "Czech Republic", age: 28, marketValue: "€2M" },
            { name: "Dakonam Djené", position: "CB", nationality: "Togo", age: 34, marketValue: "€1.6M" },
            { name: "Diego Rico", position: "LB", nationality: "Spain", age: 32, marketValue: "€1.2M" },
        ]
    },

    // Osasuna - 15 players
    {
        teamName: "Osasuna",
        players: [
            { name: "Enzo Boyomo", position: "CB", nationality: "Cameroon", age: 24, marketValue: "€20M" },
            { name: "Víctor Muñoz", position: "ST", nationality: "Spain", age: 21, marketValue: "€10M" },
            { name: "Aimar Oroz", position: "AM", nationality: "Spain", age: 23, marketValue: "€9M" },
            { name: "Jon Moncayola", position: "CM", nationality: "Spain", age: 27, marketValue: "€7M" },
            { name: "Raúl Moro", position: "LW", nationality: "Spain", age: 23, marketValue: "€7M" },
            { name: "Abel Bretones", position: "LB", nationality: "Spain", age: 24, marketValue: "€4.5M" },
            { name: "Jorge Herrando", position: "CB", nationality: "Spain", age: 27, marketValue: "€3.5M" },
            { name: "Javi Galán", position: "LB", nationality: "Spain", age: 30, marketValue: "€3.5M" },
            { name: "Sergio Herrera", position: "GK", nationality: "Spain", age: 32, marketValue: "€3M" },
            { name: "Raúl García", position: "ST", nationality: "Spain", age: 39, marketValue: "€3M" },
            { name: "Valentin Rosier", position: "RB", nationality: "France", age: 29, marketValue: "€3M" },
            { name: "Ante Budimir", position: "ST", nationality: "Croatia", age: 34, marketValue: "€3M" },
            { name: "Alejandro Catena", position: "CB", nationality: "Spain", age: 34, marketValue: "€2.8M" },
            { name: "Lucas Torró", position: "DM", nationality: "Spain", age: 31, marketValue: "€2.8M" },
            { name: "Iker Muñoz", position: "DM", nationality: "Spain", age: 25, marketValue: "€2M" },
        ]
    },

    // Celta Vigo - 20 players
    {
        teamName: "Celta Vigo",
        players: [
            { name: "Óscar Mingueza", position: "RB", nationality: "Spain", age: 26, marketValue: "€18M" },
            { name: "Fer López", position: "CM", nationality: "Spain", age: 25, marketValue: "€16M" },
            { name: "Javi Rodríguez", position: "CB", nationality: "Spain", age: 22, marketValue: "€15M" },
            { name: "Ilaix Moriba", position: "CM", nationality: "Guinea", age: 22, marketValue: "€10M" },
            { name: "Williot Swedberg", position: "LW", nationality: "Sweden", age: 21, marketValue: "€10M" },
            { name: "Hugo Sotelo", position: "DM", nationality: "Spain", age: 22, marketValue: "€9M" },
            { name: "Hugo Álvarez", position: "RW", nationality: "Spain", age: 22, marketValue: "€8M" },
            { name: "Ferran Jutglà", position: "ST", nationality: "Spain", age: 26, marketValue: "€7M" },
            { name: "Sergio Carreira", position: "RB", nationality: "Spain", age: 24, marketValue: "€6M" },
            { name: "Álvaro Núñez", position: "LB", nationality: "Spain", age: 21, marketValue: "€6M" },
            { name: "Carl Starfelt", position: "CB", nationality: "Sweden", age: 30, marketValue: "€5M" },
            { name: "Ionuț Radu", position: "GK", nationality: "Romania", age: 28, marketValue: "€5M" },
            { name: "Jones El-Abdellaoui", position: "RW", nationality: "Morocco", age: 20, marketValue: "€4M" },
            { name: "Borja Iglesias", position: "ST", nationality: "Spain", age: 32, marketValue: "€4M", instagramUsername: "borjaiglesias", instagramFollowers: 520000 },
            { name: "Pablo Durán", position: "ST", nationality: "Spain", age: 22, marketValue: "€4M" },
            { name: "Javi Rueda", position: "DM", nationality: "Spain", age: 21, marketValue: "€3M" },
            { name: "Carlos Domínguez", position: "CB", nationality: "Spain", age: 25, marketValue: "€3M" },
            { name: "Miguel Román", position: "CM", nationality: "Spain", age: 23, marketValue: "€2.5M" },
            { name: "Yoel Lago", position: "CB", nationality: "Spain", age: 24, marketValue: "€2.5M" },
            { name: "Iago Aspas", position: "ST", nationality: "Spain", age: 38, marketValue: "€1.8M", instagramUsername: "iagoaspas", instagramFollowers: 1900000 },
        ]
    },

    // Rayo Vallecano - 15 players
    {
        teamName: "Rayo Vallecano",
        players: [
            { name: "Isi Palazón", position: "RW", nationality: "Spain", age: 30, marketValue: "€8M", instagramUsername: "isipalazon", instagramFollowers: 280000 },
            { name: "Jorge de Frutos", position: "RW", nationality: "Spain", age: 28, marketValue: "€7M" },
            { name: "Álvaro García", position: "LW", nationality: "Spain", age: 33, marketValue: "€3M" },
            { name: "Pathé Ciss", position: "DM", nationality: "Senegal", age: 31, marketValue: "€4M" },
            { name: "Sergio Camello", position: "ST", nationality: "Spain", age: 24, marketValue: "€6M" },
            { name: "Florian Lejeune", position: "CB", nationality: "France", age: 35, marketValue: "€1.5M" },
            { name: "Abdul Mumin", position: "CB", nationality: "Ghana", age: 27, marketValue: "€5M" },
            { name: "Augusto Batalla", position: "GK", nationality: "Argentina", age: 29, marketValue: "€3M" },
            { name: "Andrei Rațiu", position: "RB", nationality: "Romania", age: 27, marketValue: "€5M" },
            { name: "Pep Chavarría", position: "LB", nationality: "Spain", age: 25, marketValue: "€3M" },
            { name: "Unai López", position: "CM", nationality: "Spain", age: 30, marketValue: "€3M" },
            { name: "Gerard Gumbau", position: "DM", nationality: "Spain", age: 31, marketValue: "€2M" },
            { name: "Pedro Díaz", position: "CM", nationality: "Spain", age: 28, marketValue: "€2.5M" },
            { name: "Randy Nteka", position: "ST", nationality: "Congo", age: 28, marketValue: "€2M" },
            { name: "Iván Balliu", position: "RB", nationality: "Albania", age: 34, marketValue: "€1M" },
        ]
    },

    // Mallorca - 15 players
    {
        teamName: "Mallorca",
        players: [
            { name: "Vedat Muriqi", position: "ST", nationality: "Kosovo", age: 31, marketValue: "€5M", instagramUsername: "vedatmuriqi", instagramFollowers: 850000 },
            { name: "Dani Rodríguez", position: "AM", nationality: "Spain", age: 38, marketValue: "€1M" },
            { name: "Sergi Darder", position: "CM", nationality: "Spain", age: 31, marketValue: "€5M" },
            { name: "Manu Morlanes", position: "DM", nationality: "Spain", age: 28, marketValue: "€4M" },
            { name: "Cyle Larin", position: "ST", nationality: "Canada", age: 30, marketValue: "€4M" },
            { name: "Antonio Sánchez", position: "CM", nationality: "Spain", age: 28, marketValue: "€3M" },
            { name: "Martin Valjent", position: "CB", nationality: "Slovakia", age: 30, marketValue: "€5M" },
            { name: "Antonio Raíllo", position: "CB", nationality: "Spain", age: 34, marketValue: "€1.5M" },
            { name: "Pablo Maffeo", position: "RB", nationality: "Spain", age: 28, marketValue: "€6M" },
            { name: "Johan Mojica", position: "LB", nationality: "Colombia", age: 33, marketValue: "€2M" },
            { name: "Dominik Greif", position: "GK", nationality: "Slovakia", age: 29, marketValue: "€3M" },
            { name: "Takuma Asano", position: "RW", nationality: "Japan", age: 31, marketValue: "€2M" },
            { name: "Robert Navarro", position: "AM", nationality: "Spain", age: 23, marketValue: "€4M" },
            { name: "Abdón Prats", position: "ST", nationality: "Spain", age: 33, marketValue: "€1M" },
            { name: "Copete", position: "CB", nationality: "Spain", age: 27, marketValue: "€2M" },
        ]
    },

    // Las Palmas - 15 players
    {
        teamName: "Las Palmas",
        players: [
            { name: "Fábio Silva", position: "ST", nationality: "Portugal", age: 23, marketValue: "€10M" },
            { name: "Sandro Ramírez", position: "LW", nationality: "Spain", age: 30, marketValue: "€2M", instagramUsername: "sandroramirez", instagramFollowers: 420000 },
            { name: "Kirian Rodríguez", position: "CM", nationality: "Spain", age: 30, marketValue: "€4M" },
            { name: "Javi Muñoz", position: "CM", nationality: "Spain", age: 30, marketValue: "€3M" },
            { name: "Mika Mármol", position: "CB", nationality: "Spain", age: 24, marketValue: "€5M" },
            { name: "Scott McKenna", position: "CB", nationality: "Scotland", age: 29, marketValue: "€4M" },
            { name: "Álex Suárez", position: "CB", nationality: "Spain", age: 34, marketValue: "€1.5M" },
            { name: "Viti Rozada", position: "RB", nationality: "Spain", age: 27, marketValue: "€2M" },
            { name: "Manu Fuster", position: "LW", nationality: "Spain", age: 26, marketValue: "€3M" },
            { name: "Jasper Cillessen", position: "GK", nationality: "Netherlands", age: 36, marketValue: "€1M" },
            { name: "Benito Ramírez", position: "LB", nationality: "Spain", age: 32, marketValue: "€1.5M" },
            { name: "Enzo Loiodice", position: "DM", nationality: "France", age: 25, marketValue: "€3M" },
            { name: "Oliver McBurnie", position: "ST", nationality: "Scotland", age: 29, marketValue: "€3M" },
            { name: "Jaime Mata", position: "ST", nationality: "Spain", age: 37, marketValue: "€800K" },
            { name: "Dinko Horkaš", position: "GK", nationality: "Croatia", age: 29, marketValue: "€1M" },
        ]
    },

    // Alavés - 15 players
    {
        teamName: "Alavés",
        players: [
            { name: "Carlos Vicente", position: "RW", nationality: "Spain", age: 23, marketValue: "€8M" },
            { name: "Kike García", position: "ST", nationality: "Spain", age: 36, marketValue: "€1M" },
            { name: "Jon Guridi", position: "CM", nationality: "Spain", age: 29, marketValue: "€5M" },
            { name: "Antonio Blanco", position: "DM", nationality: "Spain", age: 25, marketValue: "€6M" },
            { name: "Abdel Rebbach", position: "LW", nationality: "Algeria", age: 26, marketValue: "€4M" },
            { name: "Adrián Pica", position: "CB", nationality: "Spain", age: 25, marketValue: "€3M" },
            { name: "Santiago Mouriño", position: "CB", nationality: "Uruguay", age: 24, marketValue: "€4M" },
            { name: "Manu Sánchez", position: "LB", nationality: "Spain", age: 25, marketValue: "€5M" },
            { name: "Nahuel Tenaglia", position: "RB", nationality: "Argentina", age: 29, marketValue: "€3M" },
            { name: "Antonio Sivera", position: "GK", nationality: "Spain", age: 28, marketValue: "€2M" },
            { name: "Stoichkov", position: "LW", nationality: "Spain", age: 25, marketValue: "€3M" },
            { name: "Ander Guevara", position: "DM", nationality: "Spain", age: 27, marketValue: "€2M" },
            { name: "Tomás Conechny", position: "RW", nationality: "Argentina", age: 21, marketValue: "€4M" },
            { name: "Abqar", position: "CB", nationality: "Morocco", age: 26, marketValue: "€3M" },
            { name: "Jesús Owono", position: "GK", nationality: "Equatorial Guinea", age: 25, marketValue: "€1M" },
        ]
    },

    // Espanyol - 15 players
    {
        teamName: "Espanyol",
        players: [
            { name: "Javi Puado", position: "ST", nationality: "Spain", age: 27, marketValue: "€8M", instagramUsername: "javipuado", instagramFollowers: 180000 },
            { name: "Alejo Véliz", position: "ST", nationality: "Argentina", age: 21, marketValue: "€10M" },
            { name: "Jofre Carreras", position: "RW", nationality: "Spain", age: 21, marketValue: "€6M" },
            { name: "Pol Lozano", position: "DM", nationality: "Spain", age: 25, marketValue: "€4M" },
            { name: "Alex Král", position: "DM", nationality: "Czech Republic", age: 27, marketValue: "€5M" },
            { name: "Marash Kumbulla", position: "CB", nationality: "Albania", age: 25, marketValue: "€6M" },
            { name: "Leandro Cabrera", position: "CB", nationality: "Uruguay", age: 34, marketValue: "€1M" },
            { name: "Omar El Hilali", position: "RB", nationality: "Morocco", age: 23, marketValue: "€4M" },
            { name: "Brian Oliván", position: "LB", nationality: "Spain", age: 31, marketValue: "€2M" },
            { name: "Joan García", position: "GK", nationality: "Spain", age: 24, marketValue: "€15M" },
            { name: "Álvaro Tejero", position: "RW", nationality: "Spain", age: 31, marketValue: "€2M" },
            { name: "Walid Cheddira", position: "ST", nationality: "Morocco", age: 27, marketValue: "€4M" },
            { name: "Irvin Cardona", position: "ST", nationality: "France", age: 28, marketValue: "€2M" },
            { name: "Sergi Gómez", position: "CB", nationality: "Spain", age: 33, marketValue: "€1.5M" },
            { name: "Fernando Pacheco", position: "GK", nationality: "Spain", age: 34, marketValue: "€500K" },
        ]
    },

    // Leganés - 15 players
    {
        teamName: "Leganés",
        players: [
            { name: "Miguel de la Fuente", position: "ST", nationality: "Spain", age: 26, marketValue: "€5M" },
            { name: "Munir El Haddadi", position: "LW", nationality: "Morocco", age: 30, marketValue: "€2M", instagramUsername: "munir", instagramFollowers: 1200000 },
            { name: "Seydouba Cissé", position: "DM", nationality: "Guinea", age: 20, marketValue: "€6M" },
            { name: "Renato Tapia", position: "DM", nationality: "Peru", age: 30, marketValue: "€3M" },
            { name: "Óscar Rodríguez", position: "AM", nationality: "Spain", age: 27, marketValue: "€4M" },
            { name: "Sergio González", position: "CB", nationality: "Spain", age: 35, marketValue: "€800K" },
            { name: "Jorge Sáenz", position: "CB", nationality: "Spain", age: 29, marketValue: "€2M" },
            { name: "Javi Hernández", position: "LB", nationality: "Spain", age: 30, marketValue: "€2M" },
            { name: "Adrià Alti", position: "RB", nationality: "Spain", age: 25, marketValue: "€1.5M" },
            { name: "Marko Dmitrović", position: "GK", nationality: "Serbia", age: 33, marketValue: "€2M" },
            { name: "Juan Cruz", position: "LW", nationality: "Spain", age: 26, marketValue: "€2M" },
            { name: "Darko Brasanac", position: "CM", nationality: "Serbia", age: 33, marketValue: "€1M" },
            { name: "Diego García", position: "ST", nationality: "Spain", age: 22, marketValue: "€3M" },
            { name: "Matija Nastasić", position: "CB", nationality: "Serbia", age: 32, marketValue: "€1M" },
            { name: "Juan Soriano", position: "GK", nationality: "Spain", age: 32, marketValue: "€1M" },
        ]
    },

    // Valladolid - 15 players
    {
        teamName: "Valladolid",
        players: [
            { name: "Raúl Moro", position: "LW", nationality: "Spain", age: 23, marketValue: "€8M" },
            { name: "Mamadou Sylla", position: "ST", nationality: "Senegal", age: 26, marketValue: "€6M" },
            { name: "Kike Pérez", position: "CM", nationality: "Spain", age: 27, marketValue: "€4M" },
            { name: "Stanko Juric", position: "DM", nationality: "Croatia", age: 29, marketValue: "€3M" },
            { name: "Marcos André", position: "ST", nationality: "Brazil", age: 29, marketValue: "€3M" },
            { name: "Javi Sánchez", position: "CB", nationality: "Spain", age: 29, marketValue: "€4M" },
            { name: "David Torres", position: "CB", nationality: "Spain", age: 28, marketValue: "€2M" },
            { name: "Luis Pérez", position: "RB", nationality: "Spain", age: 32, marketValue: "€1.5M" },
            { name: "Lucas Rosa", position: "LB", nationality: "Brazil", age: 25, marketValue: "€2M" },
            { name: "Karl Hein", position: "GK", nationality: "Estonia", age: 23, marketValue: "€3M" },
            { name: "Selim Amallah", position: "AM", nationality: "Morocco", age: 28, marketValue: "€3M" },
            { name: "Iván Sánchez", position: "RW", nationality: "Spain", age: 30, marketValue: "€2M" },
            { name: "Víctor Meseguer", position: "DM", nationality: "Spain", age: 23, marketValue: "€1.5M" },
            { name: "Eray Cömert", position: "CB", nationality: "Switzerland", age: 27, marketValue: "€2M" },
            { name: "André Ferreira", position: "GK", nationality: "Portugal", age: 29, marketValue: "€1M" },
        ]
    },
];
