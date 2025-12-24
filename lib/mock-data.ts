export interface SocialStats {
  followers: number;
  growth: number; // Weekly growth percentage
  engagement: number; // Engagement rate
}

export interface Team {
  id: string;
  rank: number;
  name: string;
  country: string;
  league: string;
  logo: string; // URL or placeholder
  platforms: {
    instagram: SocialStats;
    twitter: SocialStats;
    tiktok: SocialStats;
  };
  totalFollowers: number;
  weeklyGrowth: number;
}

export const MOCK_TEAMS: Team[] = [
  {
    "id": "real-madrid",
    "rank": 1,
    "name": "Real Madrid",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/200px-Real_Madrid_CF.svg.png",
    "platforms": {
      "instagram": {
        "followers": 180116798,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 72046719,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 68693675,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 320857192,
    "weeklyGrowth": 0
  },
  {
    "id": "fc-barcelona",
    "rank": 2,
    "name": "FC Barcelona",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/200px-FC_Barcelona_%28crest%29.svg.png",
    "platforms": {
      "instagram": {
        "followers": 145099510,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 58039804,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 61645241,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 264784555,
    "weeklyGrowth": 0
  },
  {
    "id": "paris-saint-germain",
    "rank": 3,
    "name": "Paris Saint-Germain",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/200px-Paris_Saint-Germain_F.C..svg.png",
    "platforms": {
      "instagram": {
        "followers": 65722865,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 26289146,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 50685285,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 142697296,
    "weeklyGrowth": 0
  },
  {
    "id": "juventus",
    "rank": 4,
    "name": "Juventus",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/200px-Juventus_FC_2017_icon_%28black%29.svg.png",
    "platforms": {
      "instagram": {
        "followers": 59850754,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 23940301,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 41825618,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 125616673,
    "weeklyGrowth": 0
  },
  {
    "id": "manchester-city",
    "rank": 5,
    "name": "Manchester City",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t43.png",
    "platforms": {
      "instagram": {
        "followers": 56252141,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 22500856,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 33234800,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 111987797,
    "weeklyGrowth": 0
  },
  {
    "id": "manchester-united",
    "rank": 6,
    "name": "Manchester United",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    "platforms": {
      "instagram": {
        "followers": 65407773,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 26163109,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 19622331,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 111193213,
    "weeklyGrowth": 0
  },
  {
    "id": "liverpool",
    "rank": 7,
    "name": "Liverpool",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t14.png",
    "platforms": {
      "instagram": {
        "followers": 49091287,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 19636514,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 28045590,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 96773391,
    "weeklyGrowth": 0
  },
  {
    "id": "bayern-munich",
    "rank": 8,
    "name": "Bayern Munich",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    "platforms": {
      "instagram": {
        "followers": 44015079,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 17606031,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 26198794,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 87819904,
    "weeklyGrowth": 0
  },
  {
    "id": "chelsea",
    "rank": 9,
    "name": "Chelsea",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t8.png",
    "platforms": {
      "instagram": {
        "followers": 44156443,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 17662577,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 21241304,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 83060324,
    "weeklyGrowth": 0
  },
  {
    "id": "tottenham-hotspur",
    "rank": 10,
    "name": "Tottenham Hotspur",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t6.png",
    "platforms": {
      "instagram": {
        "followers": 17537051,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 7014820,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 43061739,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 67613610,
    "weeklyGrowth": 0
  },
  {
    "id": "atl\u00e9tico-madrid",
    "rank": 11,
    "name": "Atl\u00e9tico Madrid",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/200px-Atletico_Madrid_2017_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 17944385,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 7177754,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 30119831,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 55241970,
    "weeklyGrowth": 0
  },
  {
    "id": "arsenal",
    "rank": 12,
    "name": "Arsenal",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t3.png",
    "platforms": {
      "instagram": {
        "followers": 31458542,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 12583416,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 10751513,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 54793471,
    "weeklyGrowth": 0
  },
  {
    "id": "ac-milan",
    "rank": 13,
    "name": "AC Milan",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/200px-Logo_of_AC_Milan.svg.png",
    "platforms": {
      "instagram": {
        "followers": 18169547,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 7267818,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 22761795,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 48199160,
    "weeklyGrowth": 0
  },
  {
    "id": "inter-milan",
    "rank": 14,
    "name": "Inter Milan",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/200px-FC_Internazionale_Milano_2021.svg.png",
    "platforms": {
      "instagram": {
        "followers": 14373076,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 5749230,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 17896838,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 38019144,
    "weeklyGrowth": 0
  },
  {
    "id": "borussia-dortmund",
    "rank": 15,
    "name": "Borussia Dortmund",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/200px-Borussia_Dortmund_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 20898210,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 8359284,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 2,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 29257496,
    "weeklyGrowth": 0
  },
  {
    "id": "galatasaray",
    "rank": 16,
    "name": "Galatasaray",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Galatasaray_Sports_Club_Logo.png/200px-Galatasaray_Sports_Club_Logo.png",
    "platforms": {
      "instagram": {
        "followers": 17612889,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 7045155,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 3962186,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 28620230,
    "weeklyGrowth": 0
  },
  {
    "id": "fenerbah\u00e7e",
    "rank": 17,
    "name": "Fenerbah\u00e7e",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Fenerbah%C3%A7e_SK_logo.svg/200px-Fenerbah%C3%A7e_SK_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 11444054,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 4577621,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 2024194,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 18045869,
    "weeklyGrowth": 0
  },
  {
    "id": "real-sociedad",
    "rank": 18,
    "name": "Real Sociedad",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/200px-Real_Sociedad_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1186340,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 474536,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 16067647,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 17728523,
    "weeklyGrowth": 0
  },
  {
    "id": "sevilla",
    "rank": 19,
    "name": "Sevilla",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/200px-Sevilla_FC_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 3714756,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1485902,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 11315004,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 16515662,
    "weeklyGrowth": 0
  },
  {
    "id": "real-betis",
    "rank": 20,
    "name": "Real Betis",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/200px-Real_betis_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 2914452,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 15834864,
    "weeklyGrowth": 0
  },
  {
    "id": "leicester-city",
    "rank": 21,
    "name": "Leicester City",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t13.png",
    "platforms": {
      "instagram": {
        "followers": 7813888,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 13283609,
    "weeklyGrowth": 0
  },
  {
    "id": "west-ham-united",
    "rank": 22,
    "name": "West Ham United",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t21.png",
    "platforms": {
      "instagram": {
        "followers": 4480151,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1792060,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 6942348,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 13214559,
    "weeklyGrowth": 0
  },
  {
    "id": "be\u015fikta\u015f",
    "rank": 23,
    "name": "Be\u015fikta\u015f",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Besiktas_JK_logo.svg/200px-Besiktas_JK_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 7612583,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 3045033,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1300000,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 11957616,
    "weeklyGrowth": 0
  },
  {
    "id": "newcastle-united",
    "rank": 24,
    "name": "Newcastle United",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t4.png",
    "platforms": {
      "instagram": {
        "followers": 3365911,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1346364,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 7174196,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 11886471,
    "weeklyGrowth": 0
  },
  {
    "id": "athletic-bilbao",
    "rank": 25,
    "name": "Athletic Bilbao",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Club_Athletic_Bilbao_logo.svg/200px-Club_Athletic_Bilbao_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1661775,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 11766578,
    "weeklyGrowth": 0
  },
  {
    "id": "monaco",
    "rank": 26,
    "name": "Monaco",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/AS_Monaco_FC.svg/200px-AS_Monaco_FC.svg.png",
    "platforms": {
      "instagram": {
        "followers": 2796573,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1118629,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 6991646,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 10906848,
    "weeklyGrowth": 0
  },
  {
    "id": "celta-vigo",
    "rank": 27,
    "name": "Celta Vigo",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/RC_Celta_de_Vigo_logo.svg/200px-RC_Celta_de_Vigo_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 628717,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 251486,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 9966929,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 10847132,
    "weeklyGrowth": 0
  },
  {
    "id": "aston-villa",
    "rank": 28,
    "name": "Aston Villa",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t7.png",
    "platforms": {
      "instagram": {
        "followers": 4385173,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1754069,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 4453352,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 10592594,
    "weeklyGrowth": 0
  },
  {
    "id": "valencia",
    "rank": 29,
    "name": "Valencia",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/200px-Valenciacf.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1401488,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 560595,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 8514879,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 10476962,
    "weeklyGrowth": 0
  },
  {
    "id": "as-roma",
    "rank": 30,
    "name": "AS Roma",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/AS_Roma_logo_%282017%29.svg/200px-AS_Roma_logo_%282017%29.svg.png",
    "platforms": {
      "instagram": {
        "followers": 7327703,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 10259901,
    "weeklyGrowth": 0
  },
  {
    "id": "napoli",
    "rank": 31,
    "name": "Napoli",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Napoli_End_of_Season_Logo.svg/200px-SSC_Napoli_End_of_Season_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 5271587,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 8961697,
    "weeklyGrowth": 0
  },
  {
    "id": "everton",
    "rank": 32,
    "name": "Everton",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t11.png",
    "platforms": {
      "instagram": {
        "followers": 3321733,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1328693,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 3656234,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 8306660,
    "weeklyGrowth": 0
  },
  {
    "id": "wolverhampton-wanderers",
    "rank": 33,
    "name": "Wolverhampton Wanderers",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t39.png",
    "platforms": {
      "instagram": {
        "followers": 3066554,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1226621,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 3356762,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 7649937,
    "weeklyGrowth": 0
  },
  {
    "id": "espanyol",
    "rank": 34,
    "name": "Espanyol",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Rcd_espanyol_logo.svg/200px-Rcd_espanyol_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 536457,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 7541652,
    "weeklyGrowth": 0
  },
  {
    "id": "girona",
    "rank": 35,
    "name": "Girona",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Girona_FC_Logo.svg/200px-Girona_FC_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 971636,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 388654,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 5293294,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 6653584,
    "weeklyGrowth": 0
  },
  {
    "id": "bayer-leverkusen",
    "rank": 36,
    "name": "Bayer Leverkusen",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/200px-Bayer_04_Leverkusen_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 4648159,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1859263,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 10,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 6507432,
    "weeklyGrowth": 0
  },
  {
    "id": "brighton-&-hove-albion",
    "rank": 37,
    "name": "Brighton & Hove Albion",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t36.png",
    "platforms": {
      "instagram": {
        "followers": 2168918,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 867567,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 3395079,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 6431564,
    "weeklyGrowth": 0
  },
  {
    "id": "rb-leipzig",
    "rank": 38,
    "name": "RB Leipzig",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/200px-RB_Leipzig_2014_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 2213347,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 6013548,
    "weeklyGrowth": 0
  },
  {
    "id": "getafe",
    "rank": 39,
    "name": "Getafe",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Getafe_CF.svg/200px-Getafe_CF.svg.png",
    "platforms": {
      "instagram": {
        "followers": 545532,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 218212,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 5229949,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 5993693,
    "weeklyGrowth": 0
  },
  {
    "id": "lyon",
    "rank": 40,
    "name": "Lyon",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Olympique_Lyonnais.svg/200px-Olympique_Lyonnais.svg.png",
    "platforms": {
      "instagram": {
        "followers": 2618444,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1047377,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 2300000,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 5965821,
    "weeklyGrowth": 0
  },
  {
    "id": "villarreal",
    "rank": 41,
    "name": "Villarreal",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Villarreal_CF_logo.svg/200px-Villarreal_CF_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1713086,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 685234,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 3537100,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 5935420,
    "weeklyGrowth": 0
  },
  {
    "id": "osasuna",
    "rank": 42,
    "name": "Osasuna",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/CA_Osasuna_logo.svg/200px-CA_Osasuna_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 375693,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 150277,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 5318462,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 5844432,
    "weeklyGrowth": 0
  },
  {
    "id": "marseille",
    "rank": 43,
    "name": "Marseille",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/200px-Olympique_Marseille_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 3834695,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 1533878,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 21,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 5368594,
    "weeklyGrowth": 0
  },
  {
    "id": "alav\u00e9s",
    "rank": 44,
    "name": "Alav\u00e9s",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Deportivo_Alaves_logo_%282020%29.svg/200px-Deportivo_Alaves_logo_%282020%29.svg.png",
    "platforms": {
      "instagram": {
        "followers": 229134,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 91653,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 4748232,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 5069019,
    "weeklyGrowth": 0
  },
  {
    "id": "crystal-palace",
    "rank": 45,
    "name": "Crystal Palace",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t31.png",
    "platforms": {
      "instagram": {
        "followers": 2301794,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 920717,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1447211,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 4669722,
    "weeklyGrowth": 0
  },
  {
    "id": "bournemouth",
    "rank": 46,
    "name": "Bournemouth",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t91.png",
    "platforms": {
      "instagram": {
        "followers": 1183093,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 3590316,
    "weeklyGrowth": 0
  },
  {
    "id": "brentford",
    "rank": 47,
    "name": "Brentford",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t94.png",
    "platforms": {
      "instagram": {
        "followers": 851555,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 340622,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 2313362,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 3505539,
    "weeklyGrowth": 0
  },
  {
    "id": "fulham",
    "rank": 48,
    "name": "Fulham",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t54.png",
    "platforms": {
      "instagram": {
        "followers": 1317278,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 526911,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1364109,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 3208298,
    "weeklyGrowth": 0
  },
  {
    "id": "fiorentina",
    "rank": 49,
    "name": "Fiorentina",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/ACF_Fiorentina_2.svg/200px-ACF_Fiorentina_2.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1433220,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 573288,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1150697,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 3157205,
    "weeklyGrowth": 0
  },
  {
    "id": "borussia-m\u00f6nchengladbach",
    "rank": 50,
    "name": "Borussia M\u00f6nchengladbach",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/200px-Borussia_M%C3%B6nchengladbach_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1230443,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 492177,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1378230,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 3100850,
    "weeklyGrowth": 0
  },
  {
    "id": "atalanta",
    "rank": 51,
    "name": "Atalanta",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Atalanta_BC_logo.svg/200px-Atalanta_BC_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1180389,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 472155,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1200000,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2852544,
    "weeklyGrowth": 0
  },
  {
    "id": "lens",
    "rank": 52,
    "name": "Lens",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/RC_Lens_logo.svg/200px-RC_Lens_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 483036,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 193214,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 2015304,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2691554,
    "weeklyGrowth": 0
  },
  {
    "id": "parma",
    "rank": 53,
    "name": "Parma",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Parma_Calcio_1913_logo.svg/200px-Parma_Calcio_1913_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 709973,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 283989,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1512979,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2506941,
    "weeklyGrowth": 0
  },
  {
    "id": "nice",
    "rank": 54,
    "name": "Nice",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/OGC_Nice_logo.svg/200px-OGC_Nice_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 816735,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 326694,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1336179,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2479608,
    "weeklyGrowth": 0
  },
  {
    "id": "southampton",
    "rank": 55,
    "name": "Southampton",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t20.png",
    "platforms": {
      "instagram": {
        "followers": 1418688,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2411769,
    "weeklyGrowth": 0
  },
  {
    "id": "trabzonspor",
    "rank": 56,
    "name": "Trabzonspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Trabzonspor_logo.svg/200px-Trabzonspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1465043,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 586017,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 331682,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2382742,
    "weeklyGrowth": 0
  },
  {
    "id": "nottingham-forest",
    "rank": 57,
    "name": "Nottingham Forest",
    "country": "England",
    "league": "Premier League",
    "logo": "https://resources.premierleague.com/premierleague/badges/50/t17.png",
    "platforms": {
      "instagram": {
        "followers": 1380149,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2346252,
    "weeklyGrowth": 0
  },
  {
    "id": "strasbourg",
    "rank": 58,
    "name": "Strasbourg",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Racing_Club_de_Strasbourg_Alsace_logo.svg/200px-Racing_Club_de_Strasbourg_Alsace_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 590145,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2202836,
    "weeklyGrowth": 0
  },
  {
    "id": "rennes",
    "rank": 59,
    "name": "Rennes",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Stade_Rennais_FC.svg/200px-Stade_Rennais_FC.svg.png",
    "platforms": {
      "instagram": {
        "followers": 640645,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 256258,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 1245082,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 2141985,
    "weeklyGrowth": 0
  },
  {
    "id": "eintracht-frankfurt",
    "rank": 60,
    "name": "Eintracht Frankfurt",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Eintracht_Frankfurt_Logo.svg/200px-Eintracht_Frankfurt_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1345002,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1883054,
    "weeklyGrowth": 0
  },
  {
    "id": "lazio",
    "rank": 61,
    "name": "Lazio",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/SS_Lazio_logo.svg/200px-SS_Lazio_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1204918,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1687882,
    "weeklyGrowth": 0
  },
  {
    "id": "lille",
    "rank": 62,
    "name": "Lille",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Lille_OSC_2018_logo.svg/200px-Lille_OSC_2018_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1144488,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1602285,
    "weeklyGrowth": 0
  },
  {
    "id": "vfl-wolfsburg",
    "rank": 63,
    "name": "VfL Wolfsburg",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Logo-VfL-Wolfsburg.svg/200px-Logo-VfL-Wolfsburg.svg.png",
    "platforms": {
      "instagram": {
        "followers": 926435,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1574939,
    "weeklyGrowth": 0
  },
  {
    "id": "toulouse",
    "rank": 64,
    "name": "Toulouse",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Toulouse_FC_logo.svg/200px-Toulouse_FC_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 451910,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 180764,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 875126,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1507800,
    "weeklyGrowth": 0
  },
  {
    "id": "bologna",
    "rank": 65,
    "name": "Bologna",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Bologna_F.C._1909_logo.svg/200px-Bologna_F.C._1909_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 620878,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 248351,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 615400,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1484629,
    "weeklyGrowth": 0
  },
  {
    "id": "como",
    "rank": 66,
    "name": "Como",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Como_1907_logo.svg/200px-Como_1907_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 1057651,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1480717,
    "weeklyGrowth": 0
  },
  {
    "id": "rayo-vallecano",
    "rank": 67,
    "name": "Rayo Vallecano",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Rayo_Vallecano_logo.svg/200px-Rayo_Vallecano_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 352364,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 140945,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 975460,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1468769,
    "weeklyGrowth": 0
  },
  {
    "id": "nantes",
    "rank": 68,
    "name": "Nantes",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/FC_Nantes_logo.svg/200px-FC_Nantes_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 609335,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 243734,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 515774,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1368843,
    "weeklyGrowth": 0
  },
  {
    "id": "tsg-hoffenheim",
    "rank": 69,
    "name": "TSG Hoffenheim",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_TSG_Hoffenheim.svg/200px-Logo_TSG_Hoffenheim.svg.png",
    "platforms": {
      "instagram": {
        "followers": 520301,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1356692,
    "weeklyGrowth": 0
  },
  {
    "id": "vfb-stuttgart",
    "rank": 70,
    "name": "VfB Stuttgart",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/VfB_Stuttgart_1893_Logo.svg/200px-VfB_Stuttgart_1893_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 706345,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 282538,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 211903,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1200786,
    "weeklyGrowth": 0
  },
  {
    "id": "mainz-05",
    "rank": 71,
    "name": "Mainz 05",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Logo_Mainz_05.svg/200px-Logo_Mainz_05.svg.png",
    "platforms": {
      "instagram": {
        "followers": 337896,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1136010,
    "weeklyGrowth": 0
  },
  {
    "id": "cagliari",
    "rank": 72,
    "name": "Cagliari",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cagliari_Calcio_1920.svg/200px-Cagliari_Calcio_1920.svg.png",
    "platforms": {
      "instagram": {
        "followers": 541973,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 216789,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 363899,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1122661,
    "weeklyGrowth": 0
  },
  {
    "id": "sc-freiburg",
    "rank": 73,
    "name": "SC Freiburg",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/SC_Freiburg_logo.svg/200px-SC_Freiburg_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 615923,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 246369,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 222005,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1084297,
    "weeklyGrowth": 0
  },
  {
    "id": "werder-bremen",
    "rank": 74,
    "name": "Werder Bremen",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SV-Werder-Bremen-Logo.svg/200px-SV-Werder-Bremen-Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 577845,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 231138,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 265166,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1074149,
    "weeklyGrowth": 0
  },
  {
    "id": "real-valladolid",
    "rank": 75,
    "name": "Real Valladolid",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Real_Valladolid_Logo.svg/200px-Real_Valladolid_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 630600,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1072020,
    "weeklyGrowth": 0
  },
  {
    "id": "ipswich-town",
    "rank": 76,
    "name": "Ipswich Town",
    "country": "England",
    "league": "Premier League",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Ipswich_Town.svg/200px-Ipswich_Town.svg.png",
    "platforms": {
      "instagram": {
        "followers": 611725,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1039932,
    "weeklyGrowth": 0
  },
  {
    "id": "torino",
    "rank": 77,
    "name": "Torino",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Torino_FC_Logo.svg/200px-Torino_FC_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 494786,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1021008,
    "weeklyGrowth": 0
  },
  {
    "id": "genoa",
    "rank": 78,
    "name": "Genoa",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Genoa_C.F.C._logo.svg/200px-Genoa_C.F.C._logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 481732,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 1015087,
    "weeklyGrowth": 0
  },
  {
    "id": "udinese",
    "rank": 79,
    "name": "Udinese",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Udinese_Calcio_logo.svg/200px-Udinese_Calcio_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 427490,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 863928,
    "weeklyGrowth": 0
  },
  {
    "id": "mallorca",
    "rank": 80,
    "name": "Mallorca",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/RCD_Mallorca_logo.svg/200px-RCD_Mallorca_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 465000,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 790500,
    "weeklyGrowth": 0
  },
  {
    "id": "saint-\u00e9tienne",
    "rank": 81,
    "name": "Saint-\u00c9tienne",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/AS_Saint-%C3%89tienne_Logo.svg/200px-AS_Saint-%C3%89tienne_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 452806,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 769769,
    "weeklyGrowth": 0
  },
  {
    "id": "venezia",
    "rank": 82,
    "name": "Venezia",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Venezia_FC_logo.svg/200px-Venezia_FC_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 437627,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 743965,
    "weeklyGrowth": 0
  },
  {
    "id": "fc-st-pauli",
    "rank": 83,
    "name": "FC St. Pauli",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/FC_St._Pauli_logo.svg/200px-FC_St._Pauli_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 454395,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 181758,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 82324,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 718477,
    "weeklyGrowth": 0
  },
  {
    "id": "legan\u00e9s",
    "rank": 84,
    "name": "Legan\u00e9s",
    "country": "Spain",
    "league": "La Liga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Club_Deportivo_Legan%C3%A9s.png/200px-Club_Deportivo_Legan%C3%A9s.png",
    "platforms": {
      "instagram": {
        "followers": 391831,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 666112,
    "weeklyGrowth": 0
  },
  {
    "id": "hellas-verona",
    "rank": 85,
    "name": "Hellas Verona",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/200px-Hellas_Verona_FC_logo_%282020%29.svg.png",
    "platforms": {
      "instagram": {
        "followers": 326338,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 641807,
    "weeklyGrowth": 0
  },
  {
    "id": "samsunspor",
    "rank": 86,
    "name": "Samsunspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Samsunspor_logo.svg/200px-Samsunspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 400386,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 584677,
    "weeklyGrowth": 0
  },
  {
    "id": "union-berlin",
    "rank": 87,
    "name": "Union Berlin",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/1._FC_Union_Berlin_Logo.svg/200px-1._FC_Union_Berlin_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 342702,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 582592,
    "weeklyGrowth": 0
  },
  {
    "id": "brest",
    "rank": 88,
    "name": "Brest",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Stade_Brestois_29_logo.svg/200px-Stade_Brestois_29_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 392638,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 549707,
    "weeklyGrowth": 0
  },
  {
    "id": "monza",
    "rank": 89,
    "name": "Monza",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/AC_Monza_logo.svg/200px-AC_Monza_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 303556,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 516044,
    "weeklyGrowth": 0
  },
  {
    "id": "g\u00f6ztepe",
    "rank": 90,
    "name": "G\u00f6ztepe",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/G%C3%B6ztepe_S.K._logo.svg/200px-G%C3%B6ztepe_S.K._logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 360949,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 144379,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 7700,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 513028,
    "weeklyGrowth": 0
  },
  {
    "id": "ba\u015fak\u015fehir",
    "rank": 91,
    "name": "Ba\u015fak\u015fehir",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK.svg/200px-%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK.svg.png",
    "platforms": {
      "instagram": {
        "followers": 313901,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 488253,
    "weeklyGrowth": 0
  },
  {
    "id": "konyaspor",
    "rank": 92,
    "name": "Konyaspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Konyaspor_logo.svg/200px-Konyaspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 309857,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 123942,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 53321,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 487120,
    "weeklyGrowth": 0
  },
  {
    "id": "hatayspor",
    "rank": 93,
    "name": "Hatayspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Hatayspor_logo.svg/200px-Hatayspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 244084,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 414942,
    "weeklyGrowth": 0
  },
  {
    "id": "fc-augsburg",
    "rank": 94,
    "name": "FC Augsburg",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/FC_Augsburg_logo.svg/200px-FC_Augsburg_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 277801,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 388953,
    "weeklyGrowth": 0
  },
  {
    "id": "lecce",
    "rank": 95,
    "name": "Lecce",
    "country": "Italy",
    "league": "Serie A",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/U.S._Lecce_logo.svg/200px-U.S._Lecce_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 249379,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 99751,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 36185,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 385315,
    "weeklyGrowth": 0
  },
  {
    "id": "sivasspor",
    "rank": 96,
    "name": "Sivasspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Sivasspor_logo.svg/200px-Sivasspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 221725,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 376932,
    "weeklyGrowth": 0
  },
  {
    "id": "gaziantep-fk",
    "rank": 97,
    "name": "Gaziantep FK",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Gaziantep_F.K._logo.svg/200px-Gaziantep_F.K._logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 218940,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 87576,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 306519,
    "weeklyGrowth": 0
  },
  {
    "id": "le-havre",
    "rank": 98,
    "name": "Le Havre",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Le_Havre_AC_logo.svg/200px-Le_Havre_AC_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 168331,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 286162,
    "weeklyGrowth": 0
  },
  {
    "id": "vfl-bochum",
    "rank": 99,
    "name": "VfL Bochum",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VfL_Bochum_logo.svg/200px-VfL_Bochum_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 167610,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 284937,
    "weeklyGrowth": 0
  },
  {
    "id": "auxerre",
    "rank": 100,
    "name": "Auxerre",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/AJ_Auxerre_logo.svg/200px-AJ_Auxerre_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 165448,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 281261,
    "weeklyGrowth": 0
  },
  {
    "id": "kayserispor",
    "rank": 101,
    "name": "Kayserispor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Kayserispor_logo.svg/200px-Kayserispor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 193333,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 270669,
    "weeklyGrowth": 0
  },
  {
    "id": "ey\u00fcpspor",
    "rank": 102,
    "name": "Ey\u00fcpspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Ey%C3%BCpspor_logo.svg/200px-Ey%C3%BCpspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 186374,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 261154,
    "weeklyGrowth": 0
  },
  {
    "id": "angers",
    "rank": 103,
    "name": "Angers",
    "country": "France",
    "league": "Ligue 1",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Angers_SCO_logo.svg/200px-Angers_SCO_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 185950,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 260424,
    "weeklyGrowth": 0
  },
  {
    "id": "antalyaspor",
    "rank": 104,
    "name": "Antalyaspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Antalyaspor_logo.svg/200px-Antalyaspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 182218,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 72887,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 255128,
    "weeklyGrowth": 0
  },
  {
    "id": "rizespor",
    "rank": 105,
    "name": "Rizespor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Caykur_Rizespor_logo.svg/200px-Caykur_Rizespor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 158572,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 225412,
    "weeklyGrowth": 0
  },
  {
    "id": "holstein-kiel",
    "rank": 106,
    "name": "Holstein Kiel",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Holstein_Kiel_Logo.svg/200px-Holstein_Kiel_Logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 129679,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 220453,
    "weeklyGrowth": 0
  },
  {
    "id": "heidenheim",
    "rank": 107,
    "name": "Heidenheim",
    "country": "Germany",
    "league": "Bundesliga",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/1._FC_Heidenheim_1846.svg/200px-1._FC_Heidenheim_1846.svg.png",
    "platforms": {
      "instagram": {
        "followers": 98617,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 167648,
    "weeklyGrowth": 0
  },
  {
    "id": "alanyaspor",
    "rank": 108,
    "name": "Alanyaspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Alanyaspor_logo.svg/200px-Alanyaspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 114313,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 45725,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 160043,
    "weeklyGrowth": 0
  },
  {
    "id": "kas\u0131mpa\u015fa",
    "rank": 109,
    "name": "Kas\u0131mpa\u015fa",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Kasimpasa_logo.svg/200px-Kasimpasa_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 92564,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 37025,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 129811,
    "weeklyGrowth": 0
  },
  {
    "id": "pendikspor",
    "rank": 110,
    "name": "Pendikspor",
    "country": "Turkey",
    "league": "S\u00fcper Lig",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Pendikspor_logo.svg/200px-Pendikspor_logo.svg.png",
    "platforms": {
      "instagram": {
        "followers": 64557,
        "growth": 0,
        "engagement": 0
      },
      "twitter": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      },
      "tiktok": {
        "followers": 0,
        "growth": 0,
        "engagement": 0
      }
    },
    "totalFollowers": 109746,
    "weeklyGrowth": 0
  }
];
 
