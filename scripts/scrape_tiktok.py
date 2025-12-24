#!/usr/bin/env python3
"""
Premier League TikTok Follower Scraper
Updates Firestore with latest TikTok follower counts
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

# All Premier League Teams with TikTok usernames
PREMIER_LEAGUE_TEAMS = [
    {"id": "manchester-city", "name": "Manchester City", "tiktok": "mancity"},
    {"id": "manchester-united", "name": "Manchester United", "tiktok": "manutd"},
    {"id": "liverpool", "name": "Liverpool", "tiktok": "liverpoolfc"},
    {"id": "chelsea", "name": "Chelsea", "tiktok": "chelseafc"},
    {"id": "tottenham-hotspur", "name": "Tottenham Hotspur", "tiktok": "spursofficial"},
    {"id": "arsenal", "name": "Arsenal", "tiktok": "arsenal"},
    {"id": "leicester-city", "name": "Leicester City", "tiktok": "lcfc"},
    {"id": "west-ham-united", "name": "West Ham United", "tiktok": "westham"},
    {"id": "newcastle-united", "name": "Newcastle United", "tiktok": "nufc"},
    {"id": "aston-villa", "name": "Aston Villa", "tiktok": "avfcofficial"},
    {"id": "everton", "name": "Everton", "tiktok": "everton"},
    {"id": "brighton", "name": "Brighton & Hove Albion", "tiktok": "officialbhafc"},
    {"id": "wolverhampton", "name": "Wolverhampton Wanderers", "tiktok": "wolves"},
    {"id": "crystal-palace", "name": "Crystal Palace", "tiktok": "cpfc"},
    {"id": "brentford", "name": "Brentford", "tiktok": "brentfordfc"},
    {"id": "fulham", "name": "Fulham", "tiktok": "fulhamfc"},
    {"id": "bournemouth", "name": "AFC Bournemouth", "tiktok": "afcb"},
    {"id": "nottingham-forest", "name": "Nottingham Forest", "tiktok": "nffc"},
    {"id": "ipswich-town", "name": "Ipswich Town", "tiktok": "ipswichtown"},
    {"id": "southampton", "name": "Southampton", "tiktok": "southamptonfc"},
]

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
    print("=" * 60)
    print("🎵 Premier League TikTok Follower Scraper")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    print()
    
    # Initialize Firebase
    db = init_firebase()
    
    results = []
    success_count = 0
    fail_count = 0
    
    for team in PREMIER_LEAGUE_TEAMS:
        print(f"📊 {team['name']} (@{team['tiktok']})...")
        
        followers = get_tiktok_followers(team['tiktok'])
        
        if followers > 0:
            print(f"   ✅ {followers:,} followers")
            success_count += 1
            
            # Update Firestore if available
            if db:
                if update_firestore(team['id'], followers, db):
                    print(f"   💾 Firestore updated")
        else:
            print(f"   ❌ Could not fetch followers")
            fail_count += 1
        
        results.append({
            "id": team['id'],
            "name": team['name'],
            "tiktok_username": team['tiktok'],
            "tiktok_followers": followers,
            "scraped_at": datetime.now().isoformat()
        })
    
    print()
    print("=" * 60)
    print("📋 SUMMARY")
    print("=" * 60)
    print(f"✅ Success: {success_count}/{len(PREMIER_LEAGUE_TEAMS)}")
    print(f"❌ Failed: {fail_count}/{len(PREMIER_LEAGUE_TEAMS)}")
    
    # Save results to JSON
    output_file = "tiktok_results.json"
    with open(output_file, 'w') as f:
        json.dump({
            "scraped_at": datetime.now().isoformat(),
            "success_count": success_count,
            "fail_count": fail_count,
            "results": results
        }, f, indent=2)
    
    print(f"📁 Results saved to {output_file}")
    
    # Exit with error if too many failures
    if fail_count > len(PREMIER_LEAGUE_TEAMS) // 2:
        print("⚠️ Too many failures, exiting with error")
        exit(1)

if __name__ == "__main__":
    main()
