#!/usr/bin/env python3
"""
Multi-League TikTok Follower Scraper
Updates Firestore with latest TikTok follower counts for all leagues
"""

import requests
import json
import re
import os
from datetime import datetime

# Firebase Admin SDK (for Firestore updates)
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False
    print("⚠️ firebase-admin not installed. Results will only be saved to JSON.")

# All teams with TikTok usernames by league
ALL_TEAMS = {
    "Premier League": [
        {"id": "arsenal", "name": "Arsenal", "tiktok": "arsenal"},
        {"id": "manchester-city", "name": "Manchester City", "tiktok": "mancity"},
        {"id": "aston-villa", "name": "Aston Villa", "tiktok": "avfcofficial"},
        {"id": "chelsea", "name": "Chelsea", "tiktok": "chelseafc"},
        {"id": "liverpool", "name": "Liverpool", "tiktok": "liverpoolfc"},
        {"id": "sunderland", "name": "Sunderland", "tiktok": "sunderlandafc"},
        {"id": "manchester-united", "name": "Manchester United", "tiktok": "manutd"},
        {"id": "crystal-palace", "name": "Crystal Palace", "tiktok": "cpfc"},
        {"id": "brighton", "name": "Brighton", "tiktok": "officialbhafc"},
        {"id": "everton", "name": "Everton", "tiktok": "everton"},
        {"id": "newcastle-united", "name": "Newcastle United", "tiktok": "nufc"},
        {"id": "brentford", "name": "Brentford", "tiktok": "brentfordfc"},
        {"id": "tottenham-hotspur", "name": "Tottenham Hotspur", "tiktok": "spursofficial"},
        {"id": "bournemouth", "name": "AFC Bournemouth", "tiktok": "afcb"},
        {"id": "fulham", "name": "Fulham", "tiktok": "fulhamfc"},
        {"id": "leeds-united", "name": "Leeds United", "tiktok": "leedsunited"},
        {"id": "nottingham-forest", "name": "Nottingham Forest", "tiktok": "nffc"},
        {"id": "west-ham-united", "name": "West Ham United", "tiktok": "westham"},
        {"id": "burnley", "name": "Burnley", "tiktok": "burnleyofficial"},
        {"id": "wolverhampton", "name": "Wolves", "tiktok": "wolves"},
    ],
    "La Liga": [
        {"id": "barcelona", "name": "FC Barcelona", "tiktok": "fcbarcelona"},
        {"id": "real-madrid", "name": "Real Madrid", "tiktok": "realmadrid"},
        {"id": "atletico-madrid", "name": "Atlético Madrid", "tiktok": "atleticodemadrid"},
        {"id": "villarreal", "name": "Villarreal", "tiktok": "villarrealcf"},
        {"id": "espanyol", "name": "Espanyol", "tiktok": "rcdespanyol"},
        {"id": "real-betis", "name": "Real Betis", "tiktok": "realbetisbalompie"},
        {"id": "celta-vigo", "name": "Celta Vigo", "tiktok": "rccelta"},
        {"id": "athletic-bilbao", "name": "Athletic Bilbao", "tiktok": "athleticclub"},
        {"id": "elche", "name": "Elche", "tiktok": "elchecfoficial"},
        {"id": "sevilla", "name": "Sevilla", "tiktok": "sevillafc"},
        {"id": "getafe", "name": "Getafe", "tiktok": "getafecf"},
        {"id": "osasuna", "name": "Osasuna", "tiktok": "caosasuna"},
        {"id": "mallorca", "name": "RCD Mallorca", "tiktok": "rabornemallorca"},
        {"id": "alaves", "name": "Alavés", "tiktok": "deportivoalaves"},
        {"id": "rayo-vallecano", "name": "Rayo Vallecano", "tiktok": "rayovallecano"},
        {"id": "real-sociedad", "name": "Real Sociedad", "tiktok": "realsociedad"},
        {"id": "valencia", "name": "Valencia", "tiktok": "valenciacf"},
        {"id": "girona", "name": "Girona", "tiktok": "gabornefc"},
        {"id": "oviedo", "name": "Real Oviedo", "tiktok": "realoviedo"},
        {"id": "levante", "name": "Levante", "tiktok": "levanteud"},
    ],
    "Serie A": [
        {"id": "inter-milan", "name": "Inter Milan", "tiktok": "inter"},
        {"id": "ac-milan", "name": "AC Milan", "tiktok": "acmilan"},
        {"id": "napoli", "name": "Napoli", "tiktok": "officialsscnapoli"},
        {"id": "as-roma", "name": "AS Roma", "tiktok": "asroma"},
        {"id": "juventus", "name": "Juventus", "tiktok": "juventus"},
        {"id": "bologna", "name": "Bologna", "tiktok": "bolognafc1909"},
        {"id": "como", "name": "Como 1907", "tiktok": "comocalcio"},
        {"id": "lazio", "name": "Lazio", "tiktok": "officialsslazio"},
        {"id": "atalanta", "name": "Atalanta", "tiktok": "abornebc"},
        {"id": "sassuolo", "name": "Sassuolo", "tiktok": "sassuolocalcio"},
        {"id": "cremonese", "name": "Cremonese", "tiktok": "uscremonese"},
        {"id": "udinese", "name": "Udinese", "tiktok": "udaborneecalcio"},
        {"id": "torino", "name": "Torino", "tiktok": "tobornefc1906"},
        {"id": "lecce", "name": "Lecce", "tiktok": "uslecce"},
        {"id": "cagliari", "name": "Cagliari", "tiktok": "cagliaricalcio"},
        {"id": "parma", "name": "Parma", "tiktok": "parmacalcio1913"},
        {"id": "genoa", "name": "Genoa", "tiktok": "genoacfc"},
        {"id": "verona", "name": "Hellas Verona", "tiktok": "hellasveronabornefc"},
        {"id": "pisa", "name": "Pisa", "tiktok": "pisasporting"},
        {"id": "fiorentina", "name": "Fiorentina", "tiktok": "acffiorentina"},
    ],
    "Ligue 1": [
        {"id": "lens", "name": "RC Lens", "tiktok": "rclens"},
        {"id": "psg", "name": "Paris Saint-Germain", "tiktok": "psg"},
        {"id": "marseille", "name": "Olympique Marseille", "tiktok": "om"},
        {"id": "lille", "name": "Lille", "tiktok": "loaborneofficial"},
        {"id": "lyon", "name": "Olympique Lyon", "tiktok": "ol"},
        {"id": "rennes", "name": "Stade Rennais", "tiktok": "staderennaisfc"},
        {"id": "strasbourg", "name": "RC Strasbourg", "tiktok": "rcstrasbourgalsace"},
        {"id": "toulouse", "name": "Toulouse", "tiktok": "toulousefc"},
        {"id": "monaco", "name": "AS Monaco", "tiktok": "asmonaco"},
        {"id": "angers", "name": "Angers SCO", "tiktok": "anaborneofficial"},
        {"id": "brest", "name": "Stade Brestois", "tiktok": "sb29official"},
        {"id": "lorient", "name": "Lorient", "tiktok": "fclorient"},
        {"id": "nice", "name": "OGC Nice", "tiktok": "ogcnice"},
        {"id": "paris-fc", "name": "Paris FC", "tiktok": "parisfc"},
        {"id": "le-havre", "name": "Le Havre", "tiktok": "lehaborneac"},
        {"id": "auxerre", "name": "AJ Auxerre", "tiktok": "aaborneofficial"},
        {"id": "nantes", "name": "FC Nantes", "tiktok": "fcnantes"},
        {"id": "metz", "name": "FC Metz", "tiktok": "fcmetz"},
    ],
    "Süper Lig": [
        {"id": "galatasaray", "name": "Galatasaray", "tiktok": "galatasaray"},
        {"id": "fenerbahce", "name": "Fenerbahçe", "tiktok": "fenerbahce"},
        {"id": "trabzonspor", "name": "Trabzonspor", "tiktok": "trabzonspor"},
        {"id": "goztepe", "name": "Göztepe", "tiktok": "goztepeskresmi"},
        {"id": "besiktas", "name": "Beşiktaş", "tiktok": "bjk"},
        {"id": "samsunspor", "name": "Samsunspor", "tiktok": "samsunspor"},
        {"id": "basaksehir", "name": "İstanbul Başakşehir", "tiktok": "basaborneehir"},
        {"id": "kocaelispor", "name": "Kocaelispor", "tiktok": "kocaelisporkulubu"},
        {"id": "gaziantep", "name": "Gaziantep FK", "tiktok": "gaziabornetepfk"},
        {"id": "alanyaspor", "name": "Alanyaspor", "tiktok": "alanyaspor"},
        {"id": "genclerbirligi", "name": "Gençlerbirliği", "tiktok": "genclerbirligiresmi"},
        {"id": "rizespor", "name": "Çaykur Rizespor", "tiktok": "caykurrizespor"},
        {"id": "konyaspor", "name": "Konyaspor", "tiktok": "konyaspor"},
        {"id": "kasimpasa", "name": "Kasımpaşa", "tiktok": "kasimpasa"},
        {"id": "antalyaspor", "name": "Antalyaspor", "tiktok": "antalyaspor"},
        {"id": "kayserispor", "name": "Kayserispor", "tiktok": "kayserispor"},
        {"id": "eyupspor", "name": "Eyüpspor", "tiktok": "eyupspor1925"},
        {"id": "karagumruk", "name": "Fatih Karagümrük", "tiktok": "karagumruksk"},
    ],
}

def get_tiktok_followers(username: str) -> int:
    """
    Scrape TikTok follower count from public page
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
        }
        
        url = f"https://www.tiktok.com/@{username}"
        response = requests.get(url, headers=headers, timeout=15)
        
        if response.status_code == 200:
            # Find follower count in JSON data
            pattern = r'"followerCount":(\d+)'
            match = re.search(pattern, response.text)
            if match:
                return int(match.group(1))
            
            # Alternative pattern
            pattern2 = r'"stats":\{"followerCount":(\d+)'
            match2 = re.search(pattern2, response.text)
            if match2:
                return int(match2.group(1))
                
        return 0
        
    except Exception as e:
        print(f"  ❌ Error for @{username}: {e}")
        return 0

def update_firestore(team_id: str, tiktok_followers: int, db):
    """
    Update team's TikTok followers in Firestore
    """
    try:
        doc_ref = db.collection('teams').document(team_id)
        doc = doc_ref.get()
        
        if doc.exists:
            # Update only TikTok followers
            current_data = doc.to_dict()
            socials = current_data.get('socials', {})
            
            # Update TikTok followers
            if 'tiktok' in socials:
                socials['tiktok']['followers'] = tiktok_followers
            else:
                socials['tiktok'] = {'username': '', 'followers': tiktok_followers}
            
            # Recalculate total
            total = (
                socials.get('instagram', {}).get('followers', 0) +
                socials.get('twitter', {}).get('followers', 0) +
                tiktok_followers
            )
            
            doc_ref.update({
                'socials.tiktok.followers': tiktok_followers,
                'totalFollowers': total,
                'updatedAt': firestore.SERVER_TIMESTAMP
            })
            return True
        else:
            print(f"  ⚠️ Team {team_id} not found in Firestore")
            return False
            
    except Exception as e:
        print(f"  ❌ Firestore error for {team_id}: {e}")
        return False

def init_firebase():
    """
    Initialize Firebase from environment variable or service account file
    """
    if not FIREBASE_AVAILABLE:
        return None
        
    try:
        # Check if already initialized
        firebase_admin.get_app()
    except ValueError:
        # Not initialized, try to initialize
        cred_json = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
        
        if cred_json:
            # From environment variable (GitHub Actions)
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        elif os.path.exists('service-account.json'):
            # From local file
            cred = credentials.Certificate('service-account.json')
            firebase_admin.initialize_app(cred)
        else:
            print("⚠️ No Firebase credentials found")
            return None
    
    return firestore.client()

def main():
    print("=" * 70)
    print("🎵 Multi-League TikTok Follower Scraper")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()
    
    # Initialize Firebase
    db = init_firebase()
    
    all_results = []
    total_success = 0
    total_fail = 0
    
    for league, teams in ALL_TEAMS.items():
        print(f"\n🏆 {league} ({len(teams)} teams)")
        print("-" * 50)
        
        league_success = 0
        league_fail = 0
        
        for team in teams:
            followers = get_tiktok_followers(team['tiktok'])
            
            if followers > 0:
                print(f"   ✅ {team['name']}: {followers:,}")
                league_success += 1
                
                # Update Firestore if available
                if db:
                    if update_firestore(team['id'], followers, db):
                        print(f"      💾 Firestore updated")
            else:
                print(f"   ❌ {team['name']}: Could not fetch")
                league_fail += 1
            
            all_results.append({
                "id": team['id'],
                "name": team['name'],
                "league": league,
                "tiktok_username": team['tiktok'],
                "tiktok_followers": followers,
                "scraped_at": datetime.now().isoformat()
            })
        
        total_success += league_success
        total_fail += league_fail
        print(f"   📊 {league}: {league_success}/{len(teams)} success")
    
    total_teams = sum(len(teams) for teams in ALL_TEAMS.values())
    
    print()
    print("=" * 70)
    print("📋 GRAND SUMMARY")
    print("=" * 70)
    print(f"✅ Total Success: {total_success}/{total_teams}")
    print(f"❌ Total Failed: {total_fail}/{total_teams}")
    print(f"📊 Success Rate: {(total_success/total_teams)*100:.1f}%")
    
    # Save results to JSON
    output_file = "tiktok_results.json"
    with open(output_file, 'w') as f:
        json.dump({
            "scraped_at": datetime.now().isoformat(),
            "total_teams": total_teams,
            "success_count": total_success,
            "fail_count": total_fail,
            "results": all_results
        }, f, indent=2)
    
    print(f"📁 Results saved to {output_file}")
    
    # Exit with error if too many failures
    if total_fail > total_teams // 2:
        print("⚠️ Too many failures, exiting with error")
        exit(1)

if __name__ == "__main__":
    main()
