import re
import json

def parse_rtf_content(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Basic cleanup
    text = re.sub(r'\\[a-z0-9]+', '', content)
    text = re.sub(r'[{}]', '', text)
    lines = text.split('\n')
    
    teams = []
    current_league = ""
    current_team = {}
    
    # Regex patterns
    team_start_pattern = re.compile(r'^\d+\.\s+(.+)$')
    insta_pattern = re.compile(r'Instagram:\s+@?([\w\.]+)\s+-\s+([\d,]+)\s+followers')
    tiktok_pattern = re.compile(r'TikTok:\s+@?([\w\.]+)\s+-\s+([\d,]+)\s+followers')
    twitter_pattern = re.compile(r'Twitter:\s+@?([\w\.]+)\s+-\s+([\d,]+)\s+followers')
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if "Total Teams:" in line: continue
        if line.startswith("====="): continue

        # Detect League
        clean_line = line.replace("\\", "").strip()
        if any(l in clean_line for l in ["BUNDESLIGA", "LA LIGA", "LIGUE 1", "PREMIER LEAGUE", "SERIE A", "S'dcPER LIG", "Super Lig"]):
            current_league = clean_line.replace("S'dcPER LIG", "Super Lig")
            continue
            
        # Team Start
        team_match = team_start_pattern.match(line)
        if team_match:
            if current_team:
                teams.append(current_team)
            
            raw_name = team_match.group(1).strip().replace("\\", "")
            clean_name, logo_url = get_team_details(raw_name, current_league)
            
            current_team = {
                "id": clean_name.lower().replace(" ", "-").replace(".", ""),
                "rank": len(teams) + 1,
                "name": clean_name,
                "country": get_country_from_league(current_league),
                "league": normalize_league_name(current_league),
                "logo": logo_url,
                "platforms": {
                    "instagram": {"followers": 0, "growth": 0, "engagement": 0},
                    "twitter": {"followers": 0, "growth": 0, "engagement": 0},
                    "tiktok": {"followers": 0, "growth": 0, "engagement": 0}
                },
                "totalFollowers": 0,
                "weeklyGrowth": 0
            }
            continue
            
        # Stats
        if current_team:
            insta_match = insta_pattern.search(line)
            if insta_match:
                current_team["platforms"]["instagram"]["followers"] = int(insta_match.group(2).replace(",", ""))
                
            tiktok_match = tiktok_pattern.search(line)
            if tiktok_match:
                current_team["platforms"]["tiktok"]["followers"] = int(tiktok_match.group(2).replace(",", ""))
                
            twitter_match = twitter_pattern.search(line)
            if twitter_match:
                current_team["platforms"]["twitter"]["followers"] = int(twitter_match.group(2).replace(",", ""))
                
            if "TOTAL FOLLOWERS:" in line:
                total_str = line.split(":")[1].strip().replace(",", "").replace("\\", "")
                current_team["totalFollowers"] = int(total_str)

    if current_team:
        teams.append(current_team)
        
    # Sort by total followers
    teams.sort(key=lambda x: x["totalFollowers"], reverse=True)
    for i, team in enumerate(teams):
        team["rank"] = i + 1
        
    return teams

def normalize_league_name(league):
    if "BUNDESLIGA" in league: return "Bundesliga"
    if "LA LIGA" in league: return "La Liga"
    if "LIGUE 1" in league: return "Ligue 1"
    if "PREMIER LEAGUE" in league: return "Premier League"
    if "SERIE A" in league: return "Serie A"
    if "Super Lig" in league: return "Süper Lig"
    return league

def get_country_from_league(league):
    if "BUNDESLIGA" in league: return "Germany"
    if "LA LIGA" in league: return "Spain"
    if "LIGUE 1" in league: return "France"
    if "PREMIER LEAGUE" in league: return "England"
    if "SERIE A" in league: return "Italy"
    if "Super Lig" in league: return "Turkey"
    return "Unknown"

def get_team_details(raw_name, league):
    # Mapping dictionary
    mapping = {
        # Premier League
        "ManCity": ("Manchester City", "https://resources.premierleague.com/premierleague/badges/50/t43.png"),
        "Arsenal": ("Arsenal", "https://resources.premierleague.com/premierleague/badges/50/t3.png"),
        "LFC": ("Liverpool", "https://resources.premierleague.com/premierleague/badges/50/t14.png"),
        "AVFCOfficial": ("Aston Villa", "https://resources.premierleague.com/premierleague/badges/50/t7.png"),
        "SpursOfficial": ("Tottenham Hotspur", "https://resources.premierleague.com/premierleague/badges/50/t6.png"),
        "ChelseaFC": ("Chelsea", "https://resources.premierleague.com/premierleague/badges/50/t8.png"),
        "NUFC": ("Newcastle United", "https://resources.premierleague.com/premierleague/badges/50/t4.png"),
        "ManUtd": ("Manchester United", "https://resources.premierleague.com/premierleague/badges/50/t1.png"),
        "WestHam": ("West Ham United", "https://resources.premierleague.com/premierleague/badges/50/t21.png"),
        "OfficialBHAFC": ("Brighton & Hove Albion", "https://resources.premierleague.com/premierleague/badges/50/t36.png"),
        "afcb": ("Bournemouth", "https://resources.premierleague.com/premierleague/badges/50/t91.png"),
        "FulhamFC": ("Fulham", "https://resources.premierleague.com/premierleague/badges/50/t54.png"),
        "Wolves": ("Wolverhampton Wanderers", "https://resources.premierleague.com/premierleague/badges/50/t39.png"),
        "Everton": ("Everton", "https://resources.premierleague.com/premierleague/badges/50/t11.png"),
        "BrentfordFC": ("Brentford", "https://resources.premierleague.com/premierleague/badges/50/t94.png"),
        "officialnffc": ("Nottingham Forest", "https://resources.premierleague.com/premierleague/badges/50/t17.png"),
        "CPFC": ("Crystal Palace", "https://resources.premierleague.com/premierleague/badges/50/t31.png"),
        "ipswichtown": ("Ipswich Town", "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Ipswich_Town.svg/200px-Ipswich_Town.svg.png"),
        "lcfc": ("Leicester City", "https://resources.premierleague.com/premierleague/badges/50/t13.png"),
        "southamptonfc": ("Southampton", "https://resources.premierleague.com/premierleague/badges/50/t20.png"),

        # La Liga
        "Real Madrid": ("Real Madrid", "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/200px-Real_Madrid_CF.svg.png"),
        "realmadrid": ("Real Madrid", "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/200px-Real_Madrid_CF.svg.png"),
        "FCBarcelona": ("FC Barcelona", "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/200px-FC_Barcelona_%28crest%29.svg.png"),
        "Atleti": ("Atlético Madrid", "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/200px-Atletico_Madrid_2017_logo.svg.png"),
        "athleticclub": ("Athletic Bilbao", "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Club_Athletic_Bilbao_logo.svg/200px-Club_Athletic_Bilbao_logo.svg.png"),
        "RealSociedad": ("Real Sociedad", "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/200px-Real_Sociedad_logo.svg.png"),
        "realbetisbalompie": ("Real Betis", "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/200px-Real_betis_logo.svg.png"),
        "VillarrealCF": ("Villarreal", "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Villarreal_CF_logo.svg/200px-Villarreal_CF_logo.svg.png"),
        "valenciacf": ("Valencia", "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/200px-Valenciacf.svg.png"),
        "CAOsasuna": ("Osasuna", "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/CA_Osasuna_logo.svg/200px-CA_Osasuna_logo.svg.png"),
        "GetafeCF": ("Getafe", "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Getafe_CF.svg/200px-Getafe_CF.svg.png"),
        "SevillaFC": ("Sevilla", "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/200px-Sevilla_FC_logo.svg.png"),
        "GironaFC": ("Girona", "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Girona_FC_Logo.svg/200px-Girona_FC_Logo.svg.png"),
        "RayoVallecano": ("Rayo Vallecano", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Rayo_Vallecano_logo.svg/200px-Rayo_Vallecano_logo.svg.png"),
        "Alaves": ("Alavés", "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Deportivo_Alaves_logo_%282020%29.svg/200px-Deportivo_Alaves_logo_%282020%29.svg.png"),
        "rcdmallorcaoficial": ("Mallorca", "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/RCD_Mallorca_logo.svg/200px-RCD_Mallorca_logo.svg.png"),
        "RCCelta": ("Celta Vigo", "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/RC_Celta_de_Vigo_logo.svg/200px-RC_Celta_de_Vigo_logo.svg.png"),
        "realvalladolid": ("Real Valladolid", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Real_Valladolid_Logo.svg/200px-Real_Valladolid_Logo.svg.png"),
        "cdleganes": ("Leganés", "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Club_Deportivo_Legan%C3%A9s.png/200px-Club_Deportivo_Legan%C3%A9s.png"),
        "rcdespanyol": ("Espanyol", "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Rcd_espanyol_logo.svg/200px-Rcd_espanyol_logo.svg.png"),

        # Bundesliga
        "FCBayern": ("Bayern Munich", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"),
        "BVB": ("Borussia Dortmund", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/200px-Borussia_Dortmund_logo.svg.png"),
        "bayer04fussball": ("Bayer Leverkusen", "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/200px-Bayer_04_Leverkusen_logo.svg.png"),
        "rbleipzig": ("RB Leipzig", "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/200px-RB_Leipzig_2014_logo.svg.png"),
        "eintrachtfrankfurt": ("Eintracht Frankfurt", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Eintracht_Frankfurt_Logo.svg/200px-Eintracht_Frankfurt_Logo.svg.png"),
        "borussia": ("Borussia Mönchengladbach", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/200px-Borussia_M%C3%B6nchengladbach_logo.svg.png"),
        "vfl.wolfsburg": ("VfL Wolfsburg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Logo-VfL-Wolfsburg.svg/200px-Logo-VfL-Wolfsburg.svg.png"),
        "tsghoffenheim": ("TSG Hoffenheim", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_TSG_Hoffenheim.svg/200px-Logo_TSG_Hoffenheim.svg.png"),
        "scfreiburg": ("SC Freiburg", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/SC_Freiburg_logo.svg/200px-SC_Freiburg_logo.svg.png"),
        "1.fcunion": ("Union Berlin", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/1._FC_Union_Berlin_Logo.svg/200px-1._FC_Union_Berlin_Logo.svg.png"),
        "1fsvmainz05": ("Mainz 05", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Logo_Mainz_05.svg/200px-Logo_Mainz_05.svg.png"),
        "werderbremen": ("Werder Bremen", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SV-Werder-Bremen-Logo.svg/200px-SV-Werder-Bremen-Logo.svg.png"),
        "fcaugsburg1907": ("FC Augsburg", "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/FC_Augsburg_logo.svg/200px-FC_Augsburg_logo.svg.png"),
        "VfB": ("VfB Stuttgart", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/VfB_Stuttgart_1893_Logo.svg/200px-VfB_Stuttgart_1893_Logo.svg.png"),
        "vflbochum1848.official": ("VfL Bochum", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VfL_Bochum_logo.svg/200px-VfL_Bochum_logo.svg.png"),
        "fch_1846": ("Heidenheim", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/1._FC_Heidenheim_1846.svg/200px-1._FC_Heidenheim_1846.svg.png"),
        "fcstpauli": ("FC St. Pauli", "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/FC_St._Pauli_logo.svg/200px-FC_St._Pauli_logo.svg.png"),
        "holsteinkiel": ("Holstein Kiel", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Holstein_Kiel_Logo.svg/200px-Holstein_Kiel_Logo.svg.png"),

        # Serie A
        "juventusfc": ("Juventus", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/200px-Juventus_FC_2017_icon_%28black%29.svg.png"),
        "acmilan": ("AC Milan", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/200px-Logo_of_AC_Milan.svg.png"),
        "Inter": ("Inter Milan", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/200px-FC_Internazionale_Milano_2021.svg.png"),
        "officialasroma": ("AS Roma", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/AS_Roma_logo_%282017%29.svg/200px-AS_Roma_logo_%282017%29.svg.png"),
        "officialsscnapoli": ("Napoli", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Napoli_End_of_Season_Logo.svg/200px-SSC_Napoli_End_of_Season_Logo.svg.png"),
        "official_sslazio": ("Lazio", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/SS_Lazio_logo.svg/200px-SS_Lazio_logo.svg.png"),
        "acffiorentina": ("Fiorentina", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/ACF_Fiorentina_2.svg/200px-ACF_Fiorentina_2.svg.png"),
        "Atalanta_BC": ("Atalanta", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Atalanta_BC_logo.svg/200px-Atalanta_BC_logo.svg.png"),
        "BfcOfficialPage": ("Bologna", "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Bologna_F.C._1909_logo.svg/200px-Bologna_F.C._1909_logo.svg.png"),
        "torinofc1906": ("Torino", "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Torino_FC_Logo.svg/200px-Torino_FC_Logo.svg.png"),
        "udinesecalcio": ("Udinese", "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Udinese_Calcio_logo.svg/200px-Udinese_Calcio_logo.svg.png"),
        "genoacfc": ("Genoa", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Genoa_C.F.C._logo.svg/200px-Genoa_C.F.C._logo.svg.png"),
        "hellasveronafc": ("Hellas Verona", "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/200px-Hellas_Verona_FC_logo_%282020%29.svg.png"),
        "OfficialUSLecce": ("Lecce", "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/U.S._Lecce_logo.svg/200px-U.S._Lecce_logo.svg.png"),
        "acmonza": ("Monza", "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/AC_Monza_logo.svg/200px-AC_Monza_logo.svg.png"),
        "CagliariCalcio": ("Cagliari", "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cagliari_Calcio_1920.svg/200px-Cagliari_Calcio_1920.svg.png"),
        "1913parmacalcio": ("Parma", "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Parma_Calcio_1913_logo.svg/200px-Parma_Calcio_1913_logo.svg.png"),
        "comofootball": ("Como", "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Como_1907_logo.svg/200px-Como_1907_logo.svg.png"),
        "veneziafc": ("Venezia", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Venezia_FC_logo.svg/200px-Venezia_FC_logo.svg.png"),

        # Ligue 1
        "PSG_inside": ("Paris Saint-Germain", "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/200px-Paris_Saint-Germain_F.C..svg.png"),
        "OM_Officiel": ("Marseille", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/200px-Olympique_Marseille_logo.svg.png"),
        "OL": ("Lyon", "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Olympique_Lyonnais.svg/200px-Olympique_Lyonnais.svg.png"),
        "AS_Monaco": ("Monaco", "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/AS_Monaco_FC.svg/200px-AS_Monaco_FC.svg.png"),
        "losclive": ("Lille", "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Lille_OSC_2018_logo.svg/200px-Lille_OSC_2018_logo.svg.png"),
        "staderennais": ("Rennes", "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Stade_Rennais_FC.svg/200px-Stade_Rennais_FC.svg.png"),
        "ogcnice": ("Nice", "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/OGC_Nice_logo.svg/200px-OGC_Nice_logo.svg.png"),
        "RCLens": ("Lens", "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/RC_Lens_logo.svg/200px-RC_Lens_logo.svg.png"),
        "FCNantes": ("Nantes", "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/FC_Nantes_logo.svg/200px-FC_Nantes_logo.svg.png"),
        "rcsa": ("Strasbourg", "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Racing_Club_de_Strasbourg_Alsace_logo.svg/200px-Racing_Club_de_Strasbourg_Alsace_logo.svg.png"),
        "ToulouseFC": ("Toulouse", "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Toulouse_FC_logo.svg/200px-Toulouse_FC_logo.svg.png"),
        "stadebrestois29": ("Brest", "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Stade_Brestois_29_logo.svg/200px-Stade_Brestois_29_logo.svg.png"),
        "hac_foot": ("Le Havre", "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Le_Havre_AC_logo.svg/200px-Le_Havre_AC_logo.svg.png"),
        "asseofficiel": ("Saint-Étienne", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/AS_Saint-%C3%89tienne_Logo.svg/200px-AS_Saint-%C3%89tienne_Logo.svg.png"),
        "aja": ("Auxerre", "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/AJ_Auxerre_logo.svg/200px-AJ_Auxerre_logo.svg.png"),
        "angers_sco": ("Angers", "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Angers_SCO_logo.svg/200px-Angers_SCO_logo.svg.png"),

        # Super Lig
        "GalatasaraySK": ("Galatasaray", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Galatasaray_Sports_Club_Logo.png/200px-Galatasaray_Sports_Club_Logo.png"),
        "Fenerbahce": ("Fenerbahçe", "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Fenerbah%C3%A7e_SK_logo.svg/200px-Fenerbah%C3%A7e_SK_logo.svg.png"),
        "Besiktas": ("Beşiktaş", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Besiktas_JK_logo.svg/200px-Besiktas_JK_logo.svg.png"),
        "Trabzonspor": ("Trabzonspor", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Trabzonspor_logo.svg/200px-Trabzonspor_logo.svg.png"),
        "ibfk2014": ("Başakşehir", "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK.svg/200px-%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK.svg.png"),
        "AdanaDemirspor": ("Adana Demirspor", "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Adana_Demirspor_logo.svg/200px-Adana_Demirspor_logo.svg.png"),
        "konyaspor": ("Konyaspor", "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Konyaspor_logo.svg/200px-Konyaspor_logo.svg.png"),
        "Antalyaspor": ("Antalyaspor", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Antalyaspor_logo.svg/200px-Antalyaspor_logo.svg.png"),
        "Alanyaspor": ("Alanyaspor", "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Alanyaspor_logo.svg/200px-Alanyaspor_logo.svg.png"),
        "sivasspor": ("Sivasspor", "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Sivasspor_logo.svg/200px-Sivasspor_logo.svg.png"),
        "Goztepe": ("Göztepe", "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/G%C3%B6ztepe_S.K._logo.svg/200px-G%C3%B6ztepe_S.K._logo.svg.png"),
        "GaziantepFK": ("Gaziantep FK", "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Gaziantep_F.K._logo.svg/200px-Gaziantep_F.K._logo.svg.png"),
        "hatayspor": ("Hatayspor", "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Hatayspor_logo.svg/200px-Hatayspor_logo.svg.png"),
        "kayserisporfk": ("Kayserispor", "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Kayserispor_logo.svg/200px-Kayserispor_logo.svg.png"),
        "KasimpasaSK": ("Kasımpaşa", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Kasimpasa_logo.svg/200px-Kasimpasa_logo.svg.png"),
        "crizesporas": ("Rizespor", "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Caykur_Rizespor_logo.svg/200px-Caykur_Rizespor_logo.svg.png"),
        "samsunspor": ("Samsunspor", "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Samsunspor_logo.svg/200px-Samsunspor_logo.svg.png"),
        "eyupsporkulubu": ("Eyüpspor", "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Ey%C3%BCpspor_logo.svg/200px-Ey%C3%BCpspor_logo.svg.png"),
        "pendikspor": ("Pendikspor", "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Pendikspor_logo.svg/200px-Pendikspor_logo.svg.png"),
    }
    
    if raw_name in mapping:
        return mapping[raw_name]
        
    # Fallback
    return raw_name, f"https://ui-avatars.com/api/?name={raw_name.replace(' ', '+')}&background=random"

teams = parse_rtf_content('dataset-1.rtf')

# Generate TypeScript output
ts_output = """export interface SocialStats {
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

export const MOCK_TEAMS: Team[] = """ + json.dumps(teams, indent=2) + ";"

print(ts_output)
