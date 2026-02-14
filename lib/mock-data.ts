export interface SocialStats {
  followers: number;
  growth: number;
  engagement: number;
  username?: string;
}

export interface Team {
  id: string;
  rank: number;
  name: string;
  country: string;
  league: string;
  logo: string;
  platforms: {
    instagram: SocialStats;
    twitter: SocialStats;
    tiktok: SocialStats;
  };
  totalFollowers: number;
  weeklyGrowth: number;
}

// Helper to create team object
const createTeam = (
  id: string,
  rank: number,
  name: string,
  country: string,
  league: string,
  logo: string,
  instagram: number,
  twitter: number,
  tiktok: number
): Team => ({
  id,
  rank,
  name,
  country,
  league,
  logo,
  platforms: {
    instagram: { followers: instagram, growth: 0, engagement: 0 },
    twitter: { followers: twitter, growth: 0, engagement: 0 },
    tiktok: { followers: tiktok, growth: 0, engagement: 0 },
  },
  totalFollowers: instagram + twitter + tiktok,
  weeklyGrowth: 0,
});

export const MOCK_TEAMS: Team[] = [
  // ============================================
  // PREMIER LEAGUE (20 teams)
  // ============================================
  createTeam("arsenal", 1, "Arsenal", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t3.png", 31458542, 12583416, 11000000),
  createTeam("manchester-city", 2, "Manchester City", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t43.png", 56252141, 22500856, 33800000),
  createTeam("aston-villa", 3, "Aston Villa", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t7.png", 4385173, 1754069, 4600000),
  createTeam("chelsea", 4, "Chelsea", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t8.png", 44156443, 17662577, 21600000),
  createTeam("liverpool", 5, "Liverpool", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t14.png", 49091287, 19636514, 28100000),
  createTeam("sunderland", 6, "Sunderland", "England", "Premier League", "https://upload.wikimedia.org/wikipedia/en/7/77/Sunderland_AFC.svg", 800000, 400000, 500000),
  createTeam("manchester-united", 7, "Manchester United", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t1.png", 65407773, 26163109, 31000000),
  createTeam("crystal-palace", 8, "Crystal Palace", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t31.png", 1100000, 440000, 1500000),
  createTeam("brighton", 9, "Brighton & Hove Albion", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t36.png", 1200000, 480000, 3400000),
  createTeam("everton", 10, "Everton", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t11.png", 3800000, 1520000, 4100000),
  createTeam("newcastle-united", 11, "Newcastle United", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t4.png", 3365911, 1346364, 7500000),
  createTeam("brentford", 12, "Brentford", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t94.png", 600000, 240000, 2300000),
  createTeam("tottenham-hotspur", 13, "Tottenham Hotspur", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t6.png", 17537051, 7014820, 43100000),
  createTeam("bournemouth", 14, "AFC Bournemouth", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t91.png", 700000, 280000, 1900000),
  createTeam("fulham", 15, "Fulham", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t54.png", 900000, 360000, 1400000),
  createTeam("leeds-united", 16, "Leeds United", "England", "Premier League", "https://upload.wikimedia.org/wikipedia/en/5/54/Leeds_United_F.C._logo.png", 2500000, 1000000, 1800000),
  createTeam("nottingham-forest", 17, "Nottingham Forest", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t17.png", 1000000, 400000, 600000),
  createTeam("west-ham-united", 18, "West Ham United", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t21.png", 4480151, 1792060, 7000000),
  createTeam("burnley", 19, "Burnley", "England", "Premier League", "https://upload.wikimedia.org/wikipedia/en/6/62/Burnley_F.C._Logo.svg", 500000, 200000, 400000),
  createTeam("wolverhampton", 20, "Wolverhampton Wanderers", "England", "Premier League", "https://resources.premierleague.com/premierleague/badges/50/t39.png", 2100000, 840000, 3300000),

  // ============================================
  // LA LIGA (20 teams)
  // ============================================
  createTeam("barcelona", 1, "FC Barcelona", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg", 145099510, 58039804, 61645241),
  createTeam("real-madrid", 2, "Real Madrid", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg", 180116798, 72046719, 68693675),
  createTeam("atletico-madrid", 3, "Atlético Madrid", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg", 33500000, 13400000, 15200000),
  createTeam("villarreal", 4, "Villarreal", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg", 3200000, 1280000, 2100000),
  createTeam("espanyol", 5, "Espanyol", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/d/d5/RCD_Espanyol_logo.svg", 800000, 320000, 500000),
  createTeam("real-betis", 6, "Real Betis", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg", 3500000, 1400000, 2200000),
  createTeam("celta-vigo", 7, "Celta Vigo", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/1/12/RC_Celta_de_Vigo_logo.svg", 1200000, 480000, 700000),
  createTeam("athletic-bilbao", 8, "Athletic Bilbao", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg", 2800000, 1120000, 1500000),
  createTeam("elche", 9, "Elche", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/a/a4/Elche_CF_logo.svg", 300000, 120000, 200000),
  createTeam("sevilla", 10, "Sevilla", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg", 6500000, 2600000, 3800000),
  createTeam("getafe", 11, "Getafe", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/7/7e/Getafe_CF_logo.svg", 400000, 160000, 250000),
  createTeam("osasuna", 12, "Osasuna", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/d/db/CA_Osasuna_logo.svg", 500000, 200000, 300000),
  createTeam("mallorca", 13, "RCD Mallorca", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/e/e0/RCD_Mallorca_logo.svg", 600000, 240000, 400000),
  createTeam("alaves", 14, "Deportivo Alavés", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/2/2e/Deportivo_Alaves_logo.svg", 300000, 120000, 200000),
  createTeam("rayo-vallecano", 15, "Rayo Vallecano", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/1/12/Rayo_Vallecano_logo.svg", 500000, 200000, 350000),
  createTeam("real-sociedad", 16, "Real Sociedad", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg", 2200000, 880000, 1400000),
  createTeam("valencia", 17, "Valencia", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg", 5500000, 2200000, 3200000),
  createTeam("girona", 18, "Girona", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/9/90/Girona_FC_logo.svg", 800000, 320000, 600000),
  createTeam("oviedo", 19, "Real Oviedo", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/6/6a/Real_Oviedo_logo.svg", 200000, 80000, 150000),
  createTeam("levante", 20, "Levante", "Spain", "La Liga", "https://upload.wikimedia.org/wikipedia/en/7/7b/Levante_Uni%C3%B3n_Deportiva%2C_S.A.D._logo.svg", 600000, 240000, 400000),

  // ============================================
  // SERIE A (20 teams)
  // ============================================
  createTeam("inter-milan", 1, "Inter Milan", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg", 11500000, 4600000, 6800000),
  createTeam("ac-milan", 2, "AC Milan", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg", 15200000, 6080000, 8500000),
  createTeam("napoli", 3, "Napoli", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Neapel.svg", 8500000, 3400000, 5200000),
  createTeam("as-roma", 4, "AS Roma", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg", 7800000, 3120000, 4500000),
  createTeam("juventus", 5, "Juventus", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/commons/a/a8/Juventus_FC_-_pictogram.svg", 69200000, 27680000, 35400000),
  createTeam("bologna", 6, "Bologna", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/commons/5/5b/Bologna_F.C._1909_logo.svg", 800000, 320000, 500000),
  createTeam("como", 7, "Como 1907", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/f/fd/Como_1907_logo.svg", 300000, 120000, 200000),
  createTeam("lazio", 8, "Lazio", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg", 3500000, 1400000, 2200000),
  createTeam("atalanta", 9, "Atalanta", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg", 2200000, 880000, 1500000),
  createTeam("sassuolo", 10, "Sassuolo", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/1/1a/US_Sassuolo_Calcio_logo.svg", 400000, 160000, 300000),
  createTeam("cremonese", 11, "Cremonese", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/2/20/US_Cremonese_logo.svg", 150000, 60000, 100000),
  createTeam("udinese", 12, "Udinese", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/c/ce/Udinese_Calcio_logo.svg", 500000, 200000, 350000),
  createTeam("torino", 13, "Torino", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/2/2e/Torino_FC_Logo.svg", 800000, 320000, 500000),
  createTeam("lecce", 14, "Lecce", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/5/5c/US_Lecce_logo.svg", 300000, 120000, 200000),
  createTeam("cagliari", 15, "Cagliari", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/6/61/Cagliari_Calcio_1920.svg", 400000, 160000, 250000),
  createTeam("parma", 16, "Parma", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/4/45/Parma_Calcio_1913_logo.svg", 600000, 240000, 400000),
  createTeam("genoa", 17, "Genoa", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/0/0f/Genoa_CFC_logo.svg", 500000, 200000, 350000),
  createTeam("verona", 18, "Hellas Verona", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/9/92/Hellas_Verona_FC_logo.svg", 400000, 160000, 280000),
  createTeam("pisa", 19, "Pisa", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/0/0e/AC_Pisa_1909_logo.svg", 200000, 80000, 150000),
  createTeam("fiorentina", 20, "Fiorentina", "Italy", "Serie A", "https://upload.wikimedia.org/wikipedia/en/8/8c/ACF_Fiorentina.svg", 3200000, 1280000, 2000000),

  // ============================================
  // LIGUE 1 (18 teams)
  // ============================================
  createTeam("lens", 1, "RC Lens", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/9/97/RC_Lens_logo.svg", 1200000, 480000, 900000),
  createTeam("psg", 2, "Paris Saint-Germain", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg", 65722865, 26289146, 50685285),
  createTeam("marseille", 3, "Olympique Marseille", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg", 8500000, 3400000, 5200000),
  createTeam("lille", 4, "Lille", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/6/62/LOSC_Lille_logo.svg", 2200000, 880000, 1500000),
  createTeam("lyon", 5, "Olympique Lyon", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/a/a4/Olympique_Lyonnais_logo.svg", 7200000, 2880000, 4500000),
  createTeam("rennes", 6, "Stade Rennais", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/9/9d/Stade_Rennais_FC_logo.svg", 1500000, 600000, 1000000),
  createTeam("strasbourg", 7, "RC Strasbourg", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/8/80/RC_Strasbourg_2016_logo.svg", 500000, 200000, 350000),
  createTeam("toulouse", 8, "Toulouse", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/4/4c/Toulouse_FC_logo.svg", 600000, 240000, 400000),
  createTeam("monaco", 9, "AS Monaco", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/d/dc/AS_Monaco_FC_logo.svg", 4500000, 1800000, 2800000),
  createTeam("angers", 10, "Angers SCO", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/0/0c/Angers_SCO_Logo.svg", 200000, 80000, 150000),
  createTeam("brest", 11, "Stade Brestois", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/4/4e/Stade_Brestois_29_logo.svg", 300000, 120000, 200000),
  createTeam("lorient", 12, "Lorient", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/e/e2/FC_Lorient_logo.svg", 250000, 100000, 180000),
  createTeam("nice", 13, "OGC Nice", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/2/2e/OGC_Nice_logo.svg", 1800000, 720000, 1200000),
  createTeam("paris-fc", 14, "Paris FC", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/0/07/Paris_FC_logo.svg", 100000, 40000, 80000),
  createTeam("le-havre", 15, "Le Havre", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/c/c2/Le_Havre_AC_logo.svg", 200000, 80000, 150000),
  createTeam("auxerre", 16, "AJ Auxerre", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/5/5e/AJ_Auxerre_logo.svg", 180000, 72000, 130000),
  createTeam("nantes", 17, "FC Nantes", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/e/e7/FC_Nantes_logo.svg", 800000, 320000, 500000),
  createTeam("metz", 18, "FC Metz", "France", "Ligue 1", "https://upload.wikimedia.org/wikipedia/en/0/0d/FC_Metz_logo.svg", 300000, 120000, 200000),

  // ============================================
  // SÜPER LİG (18 teams)
  // ============================================
  createTeam("galatasaray", 1, "Galatasaray", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/commons/f/f6/Galatasaray_Sports_Club_Logo.png", 19500000, 7800000, 12000000),
  createTeam("fenerbahce", 2, "Fenerbahçe", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png", 15200000, 6080000, 9500000),
  createTeam("trabzonspor", 3, "Trabzonspor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/b/b8/Trabzonspor_logo.svg", 3800000, 1520000, 2500000),
  createTeam("goztepe", 4, "Göztepe", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/2/24/Goztepe_logo.png", 600000, 240000, 400000),
  createTeam("besiktas", 5, "Beşiktaş", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/commons/5/52/Be%C5%9Fikta%C5%9F_J.K._2011_Logo.svg", 13500000, 5400000, 8200000),
  createTeam("samsunspor", 6, "Samsunspor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/1/14/Samsunspor_logo.png", 400000, 160000, 280000),
  createTeam("basaksehir", 7, "İstanbul Başakşehir", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/en/8/81/Istanbul_Basaksehir_FK_logo.svg", 800000, 320000, 500000),
  createTeam("kocaelispor", 8, "Kocaelispor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/0/0d/Kocaelispor_logo.png", 300000, 120000, 200000),
  createTeam("gaziantep", 9, "Gaziantep FK", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/en/c/c3/Gaziantep_FK_logo.svg", 350000, 140000, 250000),
  createTeam("alanyaspor", 10, "Alanyaspor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/5/5e/Alanyaspor_logo.png", 250000, 100000, 180000),
  createTeam("genclerbirligi", 11, "Gençlerbirliği", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/en/e/ee/Genclerbirligi_SK_logo.svg", 200000, 80000, 150000),
  createTeam("rizespor", 12, "Çaykur Rizespor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/7/79/%C3%87aykur_Rizespor_logo.png", 250000, 100000, 180000),
  createTeam("konyaspor", 13, "Konyaspor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/5/5c/Konyaspor_logo.png", 500000, 200000, 350000),
  createTeam("kasimpasa", 14, "Kasımpaşa", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/5/5b/Kas%C4%B1mpa%C5%9Fa_SK_logo.png", 300000, 120000, 200000),
  createTeam("antalyaspor", 15, "Antalyaspor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/b/b9/Antalyaspor_logo.png", 450000, 180000, 320000),
  createTeam("kayserispor", 16, "Kayserispor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/a/ab/Kayserispor_logo.png", 350000, 140000, 250000),
  createTeam("eyupspor", 17, "Eyüpspor", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/tr/e/e2/Eyupspor_logo.png", 200000, 80000, 150000),
  createTeam("karagumruk", 18, "Fatih Karagümrük", "Turkey", "Süper Lig", "https://upload.wikimedia.org/wikipedia/en/1/1d/Fatih_Karagümrük_S.K._logo.svg", 250000, 100000, 180000),
];

// Get all unique leagues
export const LEAGUES = [...new Set(MOCK_TEAMS.map(team => team.league))];

// Get teams by league
export const getTeamsByLeague = (league: string) =>
  MOCK_TEAMS.filter(team => team.league === league)
    .sort((a, b) => b.totalFollowers - a.totalFollowers);
