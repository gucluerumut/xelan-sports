#!/usr/bin/env python3
"""
Seed All Teams to Firestore
Seeds all 96 teams from 5 leagues to Firestore for admin panel editing
"""

import firebase_admin
from firebase_admin import credentials, firestore
import json
import os
from datetime import datetime

# All 96 teams with complete social media usernames
ALL_TEAMS = {
    "Premier League": [
        {"id": "arsenal", "name": "Arsenal", "country": "England", "instagram": "arsenal", "twitter": "Arsenal", "tiktok": "arsenal"},
        {"id": "manchester-city", "name": "Manchester City", "country": "England", "instagram": "mancity", "twitter": "ManCity", "tiktok": "mancity"},
        {"id": "aston-villa", "name": "Aston Villa", "country": "England", "instagram": "avfcofficial", "twitter": "AVFCOfficial", "tiktok": "avfcofficial"},
        {"id": "chelsea", "name": "Chelsea", "country": "England", "instagram": "chelseafc", "twitter": "ChelseaFC", "tiktok": "chelseafc"},
        {"id": "liverpool", "name": "Liverpool", "country": "England", "instagram": "liverpoolfc", "twitter": "LFC", "tiktok": "liverpoolfc"},
        {"id": "sunderland", "name": "Sunderland", "country": "England", "instagram": "sunderlandafc", "twitter": "SunderlandAFC", "tiktok": "sunderlandafc"},
        {"id": "manchester-united", "name": "Manchester United", "country": "England", "instagram": "manchesterunited", "twitter": "ManUtd", "tiktok": "manutd"},
        {"id": "crystal-palace", "name": "Crystal Palace", "country": "England", "instagram": "cpfc", "twitter": "CPFC", "tiktok": "cpfc"},
        {"id": "brighton", "name": "Brighton", "country": "England", "instagram": "officialbhafc", "twitter": "OfficialBHAFC", "tiktok": "officialbhafc"},
        {"id": "everton", "name": "Everton", "country": "England", "instagram": "everton", "twitter": "Everton", "tiktok": "everton"},
        {"id": "newcastle-united", "name": "Newcastle United", "country": "England", "instagram": "nufc", "twitter": "NUFC", "tiktok": "nufc"},
        {"id": "brentford", "name": "Brentford", "country": "England", "instagram": "brentfordfc", "twitter": "BrentfordFC", "tiktok": "brentfordfc"},
        {"id": "tottenham-hotspur", "name": "Tottenham Hotspur", "country": "England", "instagram": "spursofficial", "twitter": "SpursOfficial", "tiktok": "spursofficial"},
        {"id": "bournemouth", "name": "AFC Bournemouth", "country": "England", "instagram": "afcbournemouth", "twitter": "afcbournemouth", "tiktok": "afcb"},
        {"id": "fulham", "name": "Fulham", "country": "England", "instagram": "fulhamfc", "twitter": "FulhamFC", "tiktok": "fulhamfc"},
        {"id": "leeds-united", "name": "Leeds United", "country": "England", "instagram": "leedsunited", "twitter": "LUFC", "tiktok": "leedsunited"},
        {"id": "nottingham-forest", "name": "Nottingham Forest", "country": "England", "instagram": "nottinghamforest", "twitter": "NFFC", "tiktok": "nffc"},
        {"id": "west-ham-united", "name": "West Ham United", "country": "England", "instagram": "westham", "twitter": "WestHam", "tiktok": "westham"},
        {"id": "burnley", "name": "Burnley", "country": "England", "instagram": "burnleyofficial", "twitter": "BurnleyOfficial", "tiktok": "burnleyofficial"},
        {"id": "wolverhampton", "name": "Wolverhampton Wanderers", "country": "England", "instagram": "wolves", "twitter": "Wolves", "tiktok": "wolves"},
    ],
    "La Liga": [
        {"id": "barcelona", "name": "FC Barcelona", "country": "Spain", "instagram": "fcbarcelona", "twitter": "FCBarcelona", "tiktok": "fcbarcelona"},
        {"id": "real-madrid", "name": "Real Madrid", "country": "Spain", "instagram": "realmadrid", "twitter": "realmadrid", "tiktok": "realmadrid"},
        {"id": "atletico-madrid", "name": "Atlético Madrid", "country": "Spain", "instagram": "atleticodemadrid", "twitter": "Atleti", "tiktok": "atleticodemadrid"},
        {"id": "villarreal", "name": "Villarreal CF", "country": "Spain", "instagram": "villarrealcf", "twitter": "VillarrealCF", "tiktok": "villarrealcf"},
        {"id": "espanyol", "name": "RCD Espanyol", "country": "Spain", "instagram": "rcdespanyol", "twitter": "RCDEspanyol", "tiktok": "rcdespanyol"},
        {"id": "real-betis", "name": "Real Betis", "country": "Spain", "instagram": "realbetisbalompie", "twitter": "RealBetis", "tiktok": "realbetisbalompie"},
        {"id": "celta-vigo", "name": "RC Celta", "country": "Spain", "instagram": "rccelta", "twitter": "RCCelta", "tiktok": "rccelta"},
        {"id": "athletic-bilbao", "name": "Athletic Club", "country": "Spain", "instagram": "athleticclub", "twitter": "AthleticClub", "tiktok": "athleticclub"},
        {"id": "elche", "name": "Elche CF", "country": "Spain", "instagram": "elchecfoficial", "twitter": "elchecf", "tiktok": "elchecfoficial"},
        {"id": "sevilla", "name": "Sevilla FC", "country": "Spain", "instagram": "sevillafc", "twitter": "SevillaFC", "tiktok": "sevillafc"},
        {"id": "getafe", "name": "Getafe CF", "country": "Spain", "instagram": "getafecf", "twitter": "GetafeCF", "tiktok": "getafecf"},
        {"id": "osasuna", "name": "CA Osasuna", "country": "Spain", "instagram": "caosasuna", "twitter": "CAOsasuna", "tiktok": "caosasuna"},
        {"id": "mallorca", "name": "RCD Mallorca", "country": "Spain", "instagram": "rcdmallorca", "twitter": "RCD_Mallorca", "tiktok": "rcdmallorca"},
        {"id": "alaves", "name": "Deportivo Alavés", "country": "Spain", "instagram": "deportivoalaves", "twitter": "Alaves", "tiktok": "deportivoalaves"},
        {"id": "rayo-vallecano", "name": "Rayo Vallecano", "country": "Spain", "instagram": "rayovallecano", "twitter": "RayoVallecano", "tiktok": "rayovallecano"},
        {"id": "real-sociedad", "name": "Real Sociedad", "country": "Spain", "instagram": "realsociedad", "twitter": "RealSociedad", "tiktok": "realsociedad"},
        {"id": "valencia", "name": "Valencia CF", "country": "Spain", "instagram": "valenciacf", "twitter": "valenciacf", "tiktok": "valenciacf"},
        {"id": "girona", "name": "Girona FC", "country": "Spain", "instagram": "gironafc", "twitter": "GironaFC", "tiktok": "gironafc"},
        {"id": "oviedo", "name": "Real Oviedo", "country": "Spain", "instagram": "realoviedo", "twitter": "RealOviedo", "tiktok": "realoviedo"},
        {"id": "levante", "name": "Levante UD", "country": "Spain", "instagram": "levanteud", "twitter": "LevanteUD", "tiktok": "levanteud"},
    ],
    "Serie A": [
        {"id": "inter-milan", "name": "Inter Milan", "country": "Italy", "instagram": "inter", "twitter": "Inter", "tiktok": "inter"},
        {"id": "ac-milan", "name": "AC Milan", "country": "Italy", "instagram": "acmilan", "twitter": "acmilan", "tiktok": "acmilan"},
        {"id": "napoli", "name": "SSC Napoli", "country": "Italy", "instagram": "officialsscnapoli", "twitter": "sscnapoli", "tiktok": "officialsscnapoli"},
        {"id": "as-roma", "name": "AS Roma", "country": "Italy", "instagram": "asroma", "twitter": "ASRomaEN", "tiktok": "asroma"},
        {"id": "juventus", "name": "Juventus", "country": "Italy", "instagram": "juventus", "twitter": "juventusfcen", "tiktok": "juventus"},
        {"id": "bologna", "name": "Bologna FC", "country": "Italy", "instagram": "bolognafc1909", "twitter": "BolognaFC1909en", "tiktok": "bolognafc1909"},
        {"id": "como", "name": "Como 1907", "country": "Italy", "instagram": "comocalcio", "twitter": "Como_1907", "tiktok": "comocalcio"},
        {"id": "lazio", "name": "SS Lazio", "country": "Italy", "instagram": "officialsslazio", "twitter": "OfficialSSLazio", "tiktok": "officialsslazio"},
        {"id": "atalanta", "name": "Atalanta BC", "country": "Italy", "instagram": "atalantabc", "twitter": "Atalanta_BC", "tiktok": "atalantabc"},
        {"id": "sassuolo", "name": "US Sassuolo", "country": "Italy", "instagram": "sassuolocalcio", "twitter": "SassuoloUS", "tiktok": "sassuolocalcio"},
        {"id": "cremonese", "name": "US Cremonese", "country": "Italy", "instagram": "uscremonese", "twitter": "USCremonese", "tiktok": "uscremonese"},
        {"id": "udinese", "name": "Udinese Calcio", "country": "Italy", "instagram": "udinesecalcio", "twitter": "Udinese_1896", "tiktok": "udinesecalcio"},
        {"id": "torino", "name": "Torino FC", "country": "Italy", "instagram": "torinofc_1906", "twitter": "TorinoFC_1906", "tiktok": "torinofc1906"},
        {"id": "lecce", "name": "US Lecce", "country": "Italy", "instagram": "uslecce", "twitter": "OfficialUSLecce", "tiktok": "uslecce"},
        {"id": "cagliari", "name": "Cagliari Calcio", "country": "Italy", "instagram": "cagliaricalcio", "twitter": "CagliariCalcio", "tiktok": "cagliaricalcio"},
        {"id": "parma", "name": "Parma Calcio", "country": "Italy", "instagram": "parmacalcio1913", "twitter": "1913parmacalcio", "tiktok": "parmacalcio1913"},
        {"id": "genoa", "name": "Genoa CFC", "country": "Italy", "instagram": "genoacfc", "twitter": "GenoaCFC", "tiktok": "genoacfc"},
        {"id": "verona", "name": "Hellas Verona", "country": "Italy", "instagram": "hellasveronafcofficial", "twitter": "HellasVeronaFC", "tiktok": "hellasveronafcofficial"},
        {"id": "pisa", "name": "Pisa SC", "country": "Italy", "instagram": "pisasportingclub", "twitter": "PisaSC", "tiktok": "pisasporting"},
        {"id": "fiorentina", "name": "ACF Fiorentina", "country": "Italy", "instagram": "acffiorentina", "twitter": "acffiorentina", "tiktok": "acffiorentina"},
    ],
    "Ligue 1": [
        {"id": "lens", "name": "RC Lens", "country": "France", "instagram": "rclens", "twitter": "RCLens", "tiktok": "rclens"},
        {"id": "psg", "name": "Paris Saint-Germain", "country": "France", "instagram": "psg", "twitter": "PSG_English", "tiktok": "psg"},
        {"id": "marseille", "name": "Olympique de Marseille", "country": "France", "instagram": "olympiquedemarseille", "twitter": "OM_English", "tiktok": "om"},
        {"id": "lille", "name": "LOSC Lille", "country": "France", "instagram": "loscofficiel", "twitter": "LOSC_EN", "tiktok": "loscofficiel"},
        {"id": "lyon", "name": "Olympique Lyonnais", "country": "France", "instagram": "ol", "twitter": "OL", "tiktok": "ol"},
        {"id": "rennes", "name": "Stade Rennais", "country": "France", "instagram": "staderennaisfc", "twitter": "staderennais", "tiktok": "staderennaisfc"},
        {"id": "strasbourg", "name": "RC Strasbourg", "country": "France", "instagram": "rcsa", "twitter": "RCSA", "tiktok": "rcstrasbourgalsace"},
        {"id": "toulouse", "name": "Toulouse FC", "country": "France", "instagram": "toulousefc", "twitter": "ToulouseFC", "tiktok": "toulousefc"},
        {"id": "monaco", "name": "AS Monaco", "country": "France", "instagram": "asmonaco", "twitter": "AS_Monaco_EN", "tiktok": "asmonaco"},
        {"id": "angers", "name": "Angers SCO", "country": "France", "instagram": "angersscofficiel", "twitter": "AngersSCO", "tiktok": "angersscofficiel"},
        {"id": "brest", "name": "Stade Brestois", "country": "France", "instagram": "sb29", "twitter": "SB29", "tiktok": "sb29official"},
        {"id": "lorient", "name": "FC Lorient", "country": "France", "instagram": "fclorient", "twitter": "FCLorient", "tiktok": "fclorient"},
        {"id": "nice", "name": "OGC Nice", "country": "France", "instagram": "ogcnice", "twitter": "ogcnice", "tiktok": "ogcnice"},
        {"id": "paris-fc", "name": "Paris FC", "country": "France", "instagram": "parisfcofficial", "twitter": "ParisFC", "tiktok": "parisfc"},
        {"id": "le-havre", "name": "Le Havre AC", "country": "France", "instagram": "hac_officiel", "twitter": "HAC_Foot", "tiktok": "lehavreac"},
        {"id": "auxerre", "name": "AJ Auxerre", "country": "France", "instagram": "ajauxerre", "twitter": "AJA", "tiktok": "ajauxerre"},
        {"id": "nantes", "name": "FC Nantes", "country": "France", "instagram": "fcnantes", "twitter": "FCNantes", "tiktok": "fcnantes"},
        {"id": "metz", "name": "FC Metz", "country": "France", "instagram": "fcmetz", "twitter": "FCMetz", "tiktok": "fcmetz"},
    ],
    "Süper Lig": [
        {"id": "galatasaray", "name": "Galatasaray", "country": "Turkey", "instagram": "galatasaray", "twitter": "GalatasaraySK", "tiktok": "galatasaray"},
        {"id": "fenerbahce", "name": "Fenerbahçe", "country": "Turkey", "instagram": "fenerbahce", "twitter": "Fenerbahce", "tiktok": "fenerbahce"},
        {"id": "trabzonspor", "name": "Trabzonspor", "country": "Turkey", "instagram": "trabzonspor", "twitter": "Trabzonspor", "tiktok": "trabzonspor"},
        {"id": "goztepe", "name": "Göztepe", "country": "Turkey", "instagram": "goztepeskresmi", "twitter": "Goztepe", "tiktok": "goztepeskresmi"},
        {"id": "besiktas", "name": "Beşiktaş", "country": "Turkey", "instagram": "besiktas", "twitter": "Besiktas", "tiktok": "bjk"},
        {"id": "samsunspor", "name": "Samsunspor", "country": "Turkey", "instagram": "samsunspor", "twitter": "SamsunSporKlb", "tiktok": "samsunspor"},
        {"id": "basaksehir", "name": "İstanbul Başakşehir", "country": "Turkey", "instagram": "ibfk2014", "twitter": "ibfk2014", "tiktok": "basaksehir"},
        {"id": "kocaelispor", "name": "Kocaelispor", "country": "Turkey", "instagram": "kocaelisporkulubu", "twitter": "kocaelispor", "tiktok": "kocaelisporkulubu"},
        {"id": "gaziantep", "name": "Gaziantep FK", "country": "Turkey", "instagram": "gaziantepfk", "twitter": "GaziantepFK", "tiktok": "gaziantepfk"},
        {"id": "alanyaspor", "name": "Alanyaspor", "country": "Turkey", "instagram": "alanyaspor", "twitter": "Alanyaspor", "tiktok": "alanyaspor"},
        {"id": "genclerbirligi", "name": "Gençlerbirliği", "country": "Turkey", "instagram": "genclerbirligi", "twitter": "Genclerbirligi", "tiktok": "genclerbirligiresmi"},
        {"id": "rizespor", "name": "Çaykur Rizespor", "country": "Turkey", "instagram": "caykurrizespor", "twitter": "CRizespor", "tiktok": "caykurrizespor"},
        {"id": "konyaspor", "name": "Konyaspor", "country": "Turkey", "instagram": "konyaspor", "twitter": "konyaspor", "tiktok": "konyaspor"},
        {"id": "kasimpasa", "name": "Kasımpaşa", "country": "Turkey", "instagram": "kasimpasask", "twitter": "Kasimpasa", "tiktok": "kasimpasa"},
        {"id": "antalyaspor", "name": "Antalyaspor", "country": "Turkey", "instagram": "antalyaspor", "twitter": "Antalyaspor", "tiktok": "antalyaspor"},
        {"id": "kayserispor", "name": "Kayserispor", "country": "Turkey", "instagram": "kayserispor", "twitter": "Kayserispor", "tiktok": "kayserispor"},
        {"id": "eyupspor", "name": "Eyüpspor", "country": "Turkey", "instagram": "eyupspor", "twitter": "Eyupspor", "tiktok": "eyupspor1925"},
        {"id": "karagumruk", "name": "Fatih Karagümrük", "country": "Turkey", "instagram": "karagumruksk", "twitter": "karagumruksk", "tiktok": "karagumruksk"},
    ],
}

def init_firebase():
    """Initialize Firebase"""
    try:
        firebase_admin.get_app()
    except ValueError:
        cred_json = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
        if cred_json:
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        elif os.path.exists('service-account.json'):
            cred = credentials.Certificate('service-account.json')
            firebase_admin.initialize_app(cred)
        else:
            print("❌ No Firebase credentials found")
            return None
    
    return firestore.client()

def seed_teams(db):
    """Seed all teams to Firestore"""
    total_seeded = 0
    total_updated = 0
    
    for league, teams in ALL_TEAMS.items():
        print(f"\n🏆 {league}")
        print("-" * 50)
        
        for team in teams:
            team_ref = db.collection('teams').document(team['id'])
            
            # Check if team exists
            doc = team_ref.get()
            
            team_data = {
                'name': team['name'],
                'country': team['country'],
                'league': league,
                'logo': f"https://logo.clearbit.com/{team['name'].lower().replace(' ', '')}.com",
                'socials': {
                    'instagram': {
                        'username': team['instagram'],
                        'followers': 0
                    },
                    'twitter': {
                        'username': team['twitter'],
                        'followers': 0
                    },
                    'tiktok': {
                        'username': team['tiktok'],
                        'followers': 0
                    }
                },
                'totalFollowers': 0,
                'updatedAt': firestore.SERVER_TIMESTAMP
            }
            
            if doc.exists:
                # Update existing team (preserve follower counts)
                existing_data = doc.to_dict()
                if 'socials' in existing_data:
                    # Preserve existing follower counts
                    for platform in ['instagram', 'twitter', 'tiktok']:
                        if platform in existing_data['socials']:
                            team_data['socials'][platform]['followers'] = existing_data['socials'][platform].get('followers', 0)
                    
                    team_data['totalFollowers'] = sum(
                        team_data['socials'][p].get('followers', 0) 
                        for p in ['instagram', 'twitter', 'tiktok']
                    )
                
                team_ref.update(team_data)
                print(f"   ✅ Updated: {team['name']}")
                total_updated += 1
            else:
                # Create new team
                team_ref.set(team_data)
                print(f"   ✨ Created: {team['name']}")
                total_seeded += 1
    
    return total_seeded, total_updated

def main():
    print("=" * 70)
    print("🌱 Seed All Teams to Firestore")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()
    
    db = init_firebase()
    if not db:
        print("❌ Failed to initialize Firebase")
        return
    
    total_teams = sum(len(teams) for teams in ALL_TEAMS.values())
    print(f"📊 Total teams to seed: {total_teams}")
    
    seeded, updated = seed_teams(db)
    
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"✨ New teams created: {seeded}")
    print(f"✅ Existing teams updated: {updated}")
    print(f"📈 Total: {seeded + updated}/{total_teams}")
    print()
    print("🎉 All teams seeded! You can now edit them in the admin panel.")

if __name__ == "__main__":
    main()
