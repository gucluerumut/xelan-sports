#!/usr/bin/env python3
"""
Logo URL Updater
Updates team logos with high-quality sources (Wikipedia Commons, official sites)
Fallback to Clearbit for missing logos
"""

import firebase_admin
from firebase_admin import credentials, firestore
import json

# Initialize Firebase
cred = credentials.Certificate('service-account.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# High-quality logo URLs (Wikipedia Commons SVG logos)
# These are official, high-resolution logos
LOGO_URLS = {
    # Premier League
    "arsenal": "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    "manchester-city": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    "aston-villa": "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg",
    "chelsea": "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    "liverpool": "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    "sunderland": "https://upload.wikimedia.org/wikipedia/en/7/77/Logo_Sunderland.svg",
    "manchester-united": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    "crystal-palace": "https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg",
    "brighton": "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg",
    "everton": "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
    "newcastle-united": "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
    "brentford": "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg",
    "tottenham-hotspur": "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
    "bournemouth": "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg",
    "fulham": "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg",
    "leeds-united": "https://upload.wikimedia.org/wikipedia/en/5/54/Leeds_United_F.C._logo.svg",
    "nottingham-forest": "https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg",
    "west-ham-united": "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
    "burnley": "https://upload.wikimedia.org/wikipedia/en/6/6d/Burnley_FC_Logo.svg",
    "wolverhampton": "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
    
    # La Liga
    "barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    "real-madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    "atletico-madrid": "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
    "villarreal": "https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-en.svg",
    "espanyol": "https://upload.wikimedia.org/wikipedia/en/7/72/RCD_Espanyol_logo.svg",
    "real-betis": "https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg",
    "celta-vigo": "https://upload.wikimedia.org/wikipedia/en/1/12/RC_Celta_de_Vigo_logo.svg",
    "athletic-bilbao": "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg",
    "elche": "https://upload.wikimedia.org/wikipedia/en/2/20/Elche_CF_logo.svg",
    "sevilla": "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg",
    "getafe": "https://upload.wikimedia.org/wikipedia/en/4/46/Getafe_logo.svg",
    "osasuna": "https://upload.wikimedia.org/wikipedia/en/c/c2/Osasuna_logo.svg",
    "mallorca": "https://upload.wikimedia.org/wikipedia/en/e/e0/RCD_Mallorca.svg",
    "alaves": "https://upload.wikimedia.org/wikipedia/en/6/60/Deportivo_Alaves_logo_%282020%29.svg",
    "rayo-vallecano": "https://upload.wikimedia.org/wikipedia/en/2/22/Rayo_Vallecano_logo.svg",
    "real-sociedad": "https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg",
    "valencia": "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg",
    "girona": "https://upload.wikimedia.org/wikipedia/en/7/79/Girona_FC_logo.svg",
    "oviedo": "https://upload.wikimedia.org/wikipedia/en/9/9a/Real_Oviedo_logo.svg",
    "levante": "https://upload.wikimedia.org/wikipedia/en/7/7b/Levante_Uni%C3%B3n_Deportiva%2C_S.A.D._logo.svg",
    
    # Serie A
    "inter-milan": "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    "ac-milan": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    "napoli": "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Neapel.svg",
    "as-roma": "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
    "juventus": "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
    "bologna": "https://upload.wikimedia.org/wikipedia/commons/7/76/Bologna_FC_1909_logo.svg",
    "como": "https://upload.wikimedia.org/wikipedia/commons/2/22/Como_1907_logo.svg",
    "lazio": "https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg",
    "atalanta": "https://upload.wikimedia.org/wikipedia/en/6/66/Atalanta_BC_logo.svg",
    "sassuolo": "https://upload.wikimedia.org/wikipedia/en/f/f1/US_Sassuolo_Calcio_logo.svg",
    "cremonese": "https://upload.wikimedia.org/wikipedia/commons/3/31/US_Cremonese_logo.svg",
    "udinese": "https://upload.wikimedia.org/wikipedia/en/c/ce/Udinese_Calcio_logo.svg",
    "torino": "https://upload.wikimedia.org/wikipedia/en/2/2e/Torino_FC_Logo.svg",
    "lecce": "https://upload.wikimedia.org/wikipedia/en/9/96/US_Lecce_logo.svg",
    "cagliari": "https://upload.wikimedia.org/wikipedia/en/7/73/Cagliari_Calcio_1920_logo.svg",
    "parma": "https://upload.wikimedia.org/wikipedia/en/3/3b/Parma_Calcio_1913_logo.svg",
    "genoa": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Genoa_CFC_logo.svg",
    "verona": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Hellas_Verona_FC_logo_%282020%29.svg",
    "pisa": "https://upload.wikimedia.org/wikipedia/commons/4/49/Pisa_Sporting_Club_logo.svg",
    "fiorentina": "https://upload.wikimedia.org/wikipedia/commons/b/b2/ACF_Fiorentina.svg",
    
    # Ligue 1
    "lens": "https://upload.wikimedia.org/wikipedia/en/8/8b/RC_Lens_logo.svg",
    "psg": "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
    "marseille": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg",
    "lille": "https://upload.wikimedia.org/wikipedia/en/6/61/Lille_OSC_%282018%29_logo.svg",
    "lyon": "https://upload.wikimedia.org/wikipedia/en/e/e2/Olympique_Lyonnais_logo.svg",
    "rennes": "https://upload.wikimedia.org/wikipedia/en/2/20/Stade_Rennais_F.C._logo.svg",
    "strasbourg": "https://upload.wikimedia.org/wikipedia/commons/7/74/Racing_Club_de_Strasbourg_Alsace_logo.svg",
    "toulouse": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Toulouse_FC_2018_logo.svg",
    "monaco": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Logo_AS_Monaco_FC_%282013%29.svg",
    "angers": "https://upload.wikimedia.org/wikipedia/en/3/30/Angers_SCO_logo.svg",
    "brest": "https://upload.wikimedia.org/wikipedia/en/b/b9/Stade_Brestois_29_logo.svg",
    "lorient": "https://upload.wikimedia.org/wikipedia/en/c/c7/FC_Lorient_logo.svg",
    "nice": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Logo_OGC_Nice_2013.svg",
    "paris-fc": "https://upload.wikimedia.org/wikipedia/en/9/9f/Paris_FC_logo_%282020%29.svg",
    "le-havre": "https://upload.wikimedia.org/wikipedia/en/7/71/Le_Havre_AC_logo.svg",
    "auxerre": "https://upload.wikimedia.org/wikipedia/en/f/f8/AJ_Auxerre_logo.svg",
    "nantes": "https://upload.wikimedia.org/wikipedia/commons/6/66/FC_Nantes_logo.svg",
    "metz": "https://upload.wikimedia.org/wikipedia/en/5/54/FC_Metz_logo.svg",
    
    # Süper Lig
    "galatasaray": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Galatasaray_Sports_Club_Logo.png",
    "fenerbahce": "https://upload.wikimedia.org/wikipedia/en/8/86/Fenerbah%C3%A7e_SK_Logo.svg",
    "trabzonspor": "https://upload.wikimedia.org/wikipedia/en/6/63/Trabzonspor_logo.svg",
    "goztepe": "https://upload.wikimedia.org/wikipedia/en/3/3b/G%C3%B6ztepe_SK_logo.svg",
    "besiktas": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Be%C5%9Fikta%C5%9F_JK_logo_%282019%29.svg",
    "samsunspor": "https://upload.wikimedia.org/wikipedia/en/9/9c/Samsunspor_logo.svg",
    "basaksehir": "https://upload.wikimedia.org/wikipedia/en/a/a8/%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK_logo.svg",
    "kocaelispor": "https://upload.wikimedia.org/wikipedia/en/6/6e/Kocaelispor_logo.svg",
    "gaziantep": "https://upload.wikimedia.org/wikipedia/en/2/2b/Gaziantep_FK_logo.svg",
    "alanyaspor": "https://upload.wikimedia.org/wikipedia/en/c/c2/Alanyaspor_logo.svg",
    "genclerbirligi": "https://upload.wikimedia.org/wikipedia/en/d/d0/Gen%C3%A7lerbirli%C4%9Fi_SK_logo.svg",
    "rizespor": "https://upload.wikimedia.org/wikipedia/en/e/e1/%C3%87aykur_Rizespor_logo.svg",
    "konyaspor": "https://upload.wikimedia.org/wikipedia/en/9/91/Konyaspor_logo.svg",
    "kasimpasa": "https://upload.wikimedia.org/wikipedia/en/a/a7/Kas%C4%B1mpa%C5%9Fa_SK_logo.svg",
    "antalyaspor": "https://upload.wikimedia.org/wikipedia/en/a/a0/Antalyaspor_logo.svg",
    "kayserispor": "https://upload.wikimedia.org/wikipedia/en/b/b8/Kayserispor_logo.svg",
    "eyupspor": "https://upload.wikimedia.org/wikipedia/en/4/49/Ey%C3%BCpspor_logo.svg",
    "karagumruk": "https://upload.wikimedia.org/wikipedia/en/6/6f/Fatih_Karag%C3%BCmr%C3%BCk_SK_logo.svg",
}

def update_team_logo(team_id: str, logo_url: str):
    """Update a team's logo URL in Firestore"""
    try:
        doc_ref = db.collection('teams').document(team_id)
        doc = doc_ref.get()
        
        if doc.exists:
            doc_ref.update({'logo': logo_url})
            return True
        return False
    except Exception as e:
        print(f"Error updating {team_id}: {e}")
        return False

def main():
    print("=" * 70)
    print("🎨 Logo URL Updater")
    print("=" * 70)
    print()
    
    updated = 0
    failed = 0
    skipped = 0
    
    # Get all teams from Firestore
    teams_ref = db.collection('teams')
    teams = teams_ref.stream()
    
    for team in teams:
        team_id = team.id
        data = team.to_dict()
        name = data.get('name', 'Unknown')
        current_logo = data.get('logo', '')
        
        if team_id in LOGO_URLS:
            new_logo = LOGO_URLS[team_id]
            
            # Skip if already using the correct logo
            if current_logo == new_logo:
                print(f"⏭️  {name}: Already up-to-date")
                skipped += 1
                continue
            
            # Update logo
            if update_team_logo(team_id, new_logo):
                print(f"✅ {name}: Updated to Wikipedia Commons")
                updated += 1
            else:
                print(f"❌ {name}: Failed to update")
                failed += 1
        else:
            print(f"⚠️  {name}: No Wikipedia logo found (keeping Clearbit)")
            skipped += 1
    
    print()
    print("=" * 70)
    print("📊 Summary")
    print("=" * 70)
    print(f"✅ Updated: {updated}")
    print(f"⏭️  Skipped: {skipped}")
    print(f"❌ Failed: {failed}")
    print()

if __name__ == "__main__":
    main()
