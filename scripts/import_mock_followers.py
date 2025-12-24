#!/usr/bin/env python3
"""
Import follower counts from mock-data.ts to Firestore
"""

import firebase_admin
from firebase_admin import credentials, firestore
import json
import os
import re

# Mock data follower counts (extracted from mock-data.ts)
MOCK_FOLLOWER_DATA = {
    # Premier League
    "arsenal": {"instagram": 31458542, "twitter": 12583416, "tiktok": 11000000},
    "manchester-city": {"instagram": 56252141, "twitter": 22500856, "tiktok": 33800000},
    "aston-villa": {"instagram": 4385173, "twitter": 1754069, "tiktok": 4600000},
    "chelsea": {"instagram": 44156443, "twitter": 17662577, "tiktok": 21600000},
    "liverpool": {"instagram": 49091287, "twitter": 19636514, "tiktok": 28100000},
    "sunderland": {"instagram": 800000, "twitter": 400000, "tiktok": 500000},
    "manchester-united": {"instagram": 65407773, "twitter": 26163109, "tiktok": 31000000},
    "crystal-palace": {"instagram": 1100000, "twitter": 440000, "tiktok": 1500000},
    "brighton": {"instagram": 1200000, "twitter": 480000, "tiktok": 3400000},
    "everton": {"instagram": 3800000, "twitter": 1520000, "tiktok": 4100000},
    "newcastle-united": {"instagram": 3365911, "twitter": 1346364, "tiktok": 7500000},
    "brentford": {"instagram": 600000, "twitter": 240000, "tiktok": 2300000},
    "tottenham-hotspur": {"instagram": 17537051, "twitter": 7014820, "tiktok": 43100000},
    "bournemouth": {"instagram": 700000, "twitter": 280000, "tiktok": 1900000},
    "fulham": {"instagram": 900000, "twitter": 360000, "tiktok": 1400000},
    "leeds-united": {"instagram": 2500000, "twitter": 1000000, "tiktok": 1800000},
    "nottingham-forest": {"instagram": 1000000, "twitter": 400000, "tiktok": 600000},
    "west-ham-united": {"instagram": 4480151, "twitter": 1792060, "tiktok": 7000000},
    "burnley": {"instagram": 500000, "twitter": 200000, "tiktok": 400000},
    "wolverhampton": {"instagram": 2100000, "twitter": 840000, "tiktok": 3300000},
    
    # La Liga
    "barcelona": {"instagram": 135000000, "twitter": 54000000, "tiktok": 65000000},
    "real-madrid": {"instagram": 165000000, "twitter": 66000000, "tiktok": 55000000},
    "atletico-madrid": {"instagram": 15000000, "twitter": 6000000, "tiktok": 8000000},
    "villarreal": {"instagram": 2000000, "twitter": 800000, "tiktok": 1500000},
    "espanyol": {"instagram": 1200000, "twitter": 480000, "tiktok": 600000},
    "real-betis": {"instagram": 3500000, "twitter": 1400000, "tiktok": 2000000},
    "celta-vigo": {"instagram": 900000, "twitter": 360000, "tiktok": 500000},
    "athletic-bilbao": {"instagram": 2800000, "twitter": 1120000, "tiktok": 1800000},
    "elche": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "sevilla": {"instagram": 5500000, "twitter": 2200000, "tiktok": 3000000},
    "getafe": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "osasuna": {"instagram": 800000, "twitter": 320000, "tiktok": 500000},
    "mallorca": {"instagram": 700000, "twitter": 280000, "tiktok": 450000},
    "alaves": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "rayo-vallecano": {"instagram": 900000, "twitter": 360000, "tiktok": 600000},
    "real-sociedad": {"instagram": 2500000, "twitter": 1000000, "tiktok": 1500000},
    "valencia": {"instagram": 6000000, "twitter": 2400000, "tiktok": 3500000},
    "girona": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "oviedo": {"instagram": 400000, "twitter": 160000, "tiktok": 250000},
    "levante": {"instagram": 800000, "twitter": 320000, "tiktok": 500000},
    
    # Serie A
    "inter-milan": {"instagram": 35000000, "twitter": 14000000, "tiktok": 20000000},
    "ac-milan": {"instagram": 32000000, "twitter": 12800000, "tiktok": 18000000},
    "napoli": {"instagram": 12000000, "twitter": 4800000, "tiktok": 8000000},
    "as-roma": {"instagram": 10000000, "twitter": 4000000, "tiktok": 6000000},
    "juventus": {"instagram": 60000000, "twitter": 24000000, "tiktok": 30000000},
    "bologna": {"instagram": 1500000, "twitter": 600000, "tiktok": 1000000},
    "como": {"instagram": 500000, "twitter": 200000, "tiktok": 400000},
    "lazio": {"instagram": 4000000, "twitter": 1600000, "tiktok": 2500000},
    "atalanta": {"instagram": 3000000, "twitter": 1200000, "tiktok": 2000000},
    "sassuolo": {"instagram": 800000, "twitter": 320000, "tiktok": 500000},
    "cremonese": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "udinese": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "torino": {"instagram": 1200000, "twitter": 480000, "tiktok": 800000},
    "lecce": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "cagliari": {"instagram": 700000, "twitter": 280000, "tiktok": 500000},
    "parma": {"instagram": 900000, "twitter": 360000, "tiktok": 600000},
    "genoa": {"instagram": 800000, "twitter": 320000, "tiktok": 500000},
    "verona": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "pisa": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "fiorentina": {"instagram": 3500000, "twitter": 1400000, "tiktok": 2000000},
    
    # Ligue 1
    "lens": {"instagram": 1500000, "twitter": 600000, "tiktok": 1000000},
    "psg": {"instagram": 85000000, "twitter": 34000000, "tiktok": 45000000},
    "marseille": {"instagram": 8000000, "twitter": 3200000, "tiktok": 5000000},
    "lille": {"instagram": 2500000, "twitter": 1000000, "tiktok": 1500000},
    "lyon": {"instagram": 10000000, "twitter": 4000000, "tiktok": 6000000},
    "rennes": {"instagram": 1200000, "twitter": 480000, "tiktok": 800000},
    "strasbourg": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "toulouse": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "monaco": {"instagram": 5000000, "twitter": 2000000, "tiktok": 3000000},
    "angers": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "brest": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "lorient": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "nice": {"instagram": 1500000, "twitter": 600000, "tiktok": 1000000},
    "paris-fc": {"instagram": 300000, "twitter": 120000, "tiktok": 200000},
    "le-havre": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "auxerre": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "nantes": {"instagram": 1000000, "twitter": 400000, "tiktok": 700000},
    "metz": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    
    # Süper Lig
    "galatasaray": {"instagram": 15000000, "twitter": 6000000, "tiktok": 10000000},
    "fenerbahce": {"instagram": 12000000, "twitter": 4800000, "tiktok": 8000000},
    "trabzonspor": {"instagram": 3000000, "twitter": 1200000, "tiktok": 2000000},
    "goztepe": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "besiktas": {"instagram": 8000000, "twitter": 3200000, "tiktok": 5000000},
    "samsunspor": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "basaksehir": {"instagram": 800000, "twitter": 320000, "tiktok": 500000},
    "kocaelispor": {"instagram": 300000, "twitter": 120000, "tiktok": 200000},
    "gaziantep": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "alanyaspor": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "genclerbirligi": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "rizespor": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "konyaspor": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "kasimpasa": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "antalyaspor": {"instagram": 600000, "twitter": 240000, "tiktok": 400000},
    "kayserispor": {"instagram": 500000, "twitter": 200000, "tiktok": 350000},
    "eyupspor": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
    "karagumruk": {"instagram": 400000, "twitter": 160000, "tiktok": 300000},
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

def import_follower_counts(db):
    """Import follower counts from mock data to Firestore"""
    updated = 0
    skipped = 0
    
    for team_id, followers in MOCK_FOLLOWER_DATA.items():
        try:
            doc_ref = db.collection('teams').document(team_id)
            doc = doc_ref.get()
            
            if doc.exists:
                current_data = doc.to_dict()
                socials = current_data.get('socials', {})
                
                # Update follower counts
                if 'instagram' in socials:
                    socials['instagram']['followers'] = followers['instagram']
                else:
                    socials['instagram'] = {'username': '', 'followers': followers['instagram']}
                
                if 'twitter' in socials:
                    socials['twitter']['followers'] = followers['twitter']
                else:
                    socials['twitter'] = {'username': '', 'followers': followers['twitter']}
                
                if 'tiktok' in socials:
                    socials['tiktok']['followers'] = followers['tiktok']
                else:
                    socials['tiktok'] = {'username': '', 'followers': followers['tiktok']}
                
                # Calculate total
                total = followers['instagram'] + followers['twitter'] + followers['tiktok']
                
                doc_ref.update({
                    'socials': socials,
                    'totalFollowers': total,
                    'updatedAt': firestore.SERVER_TIMESTAMP
                })
                
                print(f"✅ {team_id}: {total:,} total followers")
                updated += 1
            else:
                print(f"⚠️  {team_id}: Not found in Firestore")
                skipped += 1
                
        except Exception as e:
            print(f"❌ {team_id}: Error - {e}")
            skipped += 1
    
    return updated, skipped

def main():
    print("=" * 70)
    print("📥 Import Mock Data Follower Counts to Firestore")
    print("=" * 70)
    print()
    
    db = init_firebase()
    if not db:
        return
    
    print(f"📊 Importing follower counts for {len(MOCK_FOLLOWER_DATA)} teams...")
    print()
    
    updated, skipped = import_follower_counts(db)
    
    print()
    print("=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"✅ Updated: {updated}")
    print(f"⚠️  Skipped: {skipped}")
    print(f"📈 Total: {updated + skipped}")

if __name__ == "__main__":
    main()
