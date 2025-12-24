#!/usr/bin/env python3
"""
Multi-Platform Social Media Scraper
Scrapes Instagram (Playwright) and TikTok (requests) follower counts
Updates Firestore with latest data
"""

from playwright.sync_api import sync_playwright
import requests
import json
import re
import os
import time
from datetime import datetime

# Firebase Admin SDK
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False
    print("⚠️ firebase-admin not installed")

# All teams with social media usernames (96 teams across 5 leagues)
ALL_TEAMS = {
    "Premier League": [
        {"id": "arsenal", "name": "Arsenal", "instagram": "arsenal", "tiktok": "arsenal"},
        {"id": "manchester-city", "name": "Manchester City", "instagram": "mancity", "tiktok": "mancity"},
        {"id": "aston-villa", "name": "Aston Villa", "instagram": "avfcofficial", "tiktok": "avfcofficial"},
        {"id": "chelsea", "name": "Chelsea", "instagram": "chelseafc", "tiktok": "chelseafc"},
        {"id": "liverpool", "name": "Liverpool", "instagram": "liverpoolfc", "tiktok": "liverpoolfc"},
        {"id": "sunderland", "name": "Sunderland", "instagram": "sunderlandafc", "tiktok": "sunderlandafc"},
        {"id": "manchester-united", "name": "Manchester United", "instagram": "manchesterunited", "tiktok": "manutd"},
        {"id": "crystal-palace", "name": "Crystal Palace", "instagram": "cpfc", "tiktok": "cpfc"},
        {"id": "brighton", "name": "Brighton", "instagram": "officialbhafc", "tiktok": "officialbhafc"},
        {"id": "everton", "name": "Everton", "instagram": "everton", "tiktok": "everton"},
        {"id": "newcastle-united", "name": "Newcastle", "instagram": "nufc", "tiktok": "nufc"},
        {"id": "brentford", "name": "Brentford", "instagram": "brentfordfc", "tiktok": "brentfordfc"},
        {"id": "tottenham-hotspur", "name": "Tottenham", "instagram": "spursofficial", "tiktok": "spursofficial"},
        {"id": "bournemouth", "name": "Bournemouth", "instagram": "afcbournemouth", "tiktok": "afcb"},
        {"id": "fulham", "name": "Fulham", "instagram": "fulhamfc", "tiktok": "fulhamfc"},
        {"id": "leeds-united", "name": "Leeds United", "instagram": "leedsunited", "tiktok": "leedsunited"},
        {"id": "nottingham-forest", "name": "Nottingham Forest", "instagram": "nottinghamforest", "tiktok": "nffc"},
        {"id": "west-ham-united", "name": "West Ham", "instagram": "westham", "tiktok": "westham"},
        {"id": "burnley", "name": "Burnley", "instagram": "burnleyofficial", "tiktok": "burnleyofficial"},
        {"id": "wolverhampton", "name": "Wolves", "instagram": "wolves", "tiktok": "wolves"},
    ],
    "La Liga": [
        {"id": "barcelona", "name": "Barcelona", "instagram": "fcbarcelona", "tiktok": "fcbarcelona"},
        {"id": "real-madrid", "name": "Real Madrid", "instagram": "realmadrid", "tiktok": "realmadrid"},
        {"id": "atletico-madrid", "name": "Atlético Madrid", "instagram": "atleticodemadrid", "tiktok": "atleticodemadrid"},
        {"id": "villarreal", "name": "Villarreal", "instagram": "villarrealcf", "tiktok": "villarrealcf"},
        {"id": "espanyol", "name": "Espanyol", "instagram": "rcdespanyol", "tiktok": "rcdespanyol"},
        {"id": "real-betis", "name": "Real Betis", "instagram": "realbetisbalompie", "tiktok": "realbetisbalompie"},
        {"id": "celta-vigo", "name": "Celta Vigo", "instagram": "rccelta", "tiktok": "rccelta"},
        {"id": "athletic-bilbao", "name": "Athletic Bilbao", "instagram": "athleticclub", "tiktok": "athleticclub"},
        {"id": "elche", "name": "Elche", "instagram": "elchecfoficial", "tiktok": "elchecfoficial"},
        {"id": "sevilla", "name": "Sevilla", "instagram": "sevillafc", "tiktok": "sevillafc"},
        {"id": "getafe", "name": "Getafe", "instagram": "getafecf", "tiktok": "getafecf"},
        {"id": "osasuna", "name": "Osasuna", "instagram": "caosasuna", "tiktok": "caosasuna"},
        {"id": "mallorca", "name": "Mallorca", "instagram": "rcdmallorca", "tiktok": "rcdmallorca"},
        {"id": "alaves", "name": "Alavés", "instagram": "deportivoalaves", "tiktok": "deportivoalaves"},
        {"id": "rayo-vallecano", "name": "Rayo Vallecano", "instagram": "rayovallecano", "tiktok": "rayovallecano"},
        {"id": "real-sociedad", "name": "Real Sociedad", "instagram": "realsociedad", "tiktok": "realsociedad"},
        {"id": "valencia", "name": "Valencia", "instagram": "valenciacf", "tiktok": "valenciacf"},
        {"id": "girona", "name": "Girona", "instagram": "gironafc", "tiktok": "gironafc"},
        {"id": "oviedo", "name": "Real Oviedo", "instagram": "realoviedo", "tiktok": "realoviedo"},
        {"id": "levante", "name": "Levante", "instagram": "levanteud", "tiktok": "levanteud"},
    ],
    "Serie A": [
        {"id": "inter-milan", "name": "Inter Milan", "instagram": "inter", "tiktok": "inter"},
        {"id": "ac-milan", "name": "AC Milan", "instagram": "acmilan", "tiktok": "acmilan"},
        {"id": "napoli", "name": "Napoli", "instagram": "officialsscnapoli", "tiktok": "officialsscnapoli"},
        {"id": "as-roma", "name": "AS Roma", "instagram": "asroma", "tiktok": "asroma"},
        {"id": "juventus", "name": "Juventus", "instagram": "juventus", "tiktok": "juventus"},
        {"id": "bologna", "name": "Bologna", "instagram": "bolognafc1909", "tiktok": "bolognafc1909"},
        {"id": "como", "name": "Como", "instagram": "comocalcio", "tiktok": "comocalcio"},
        {"id": "lazio", "name": "Lazio", "instagram": "officialsslazio", "tiktok": "officialsslazio"},
        {"id": "atalanta", "name": "Atalanta", "instagram": "atalantabc", "tiktok": "atalantabc"},
        {"id": "sassuolo", "name": "Sassuolo", "instagram": "sassuolocalcio", "tiktok": "sassuolocalcio"},
        {"id": "cremonese", "name": "Cremonese", "instagram": "uscremonese", "tiktok": "uscremonese"},
        {"id": "udinese", "name": "Udinese", "instagram": "udinesecalcio", "tiktok": "udinesecalcio"},
        {"id": "torino", "name": "Torino", "instagram": "torinofc_1906", "tiktok": "torinofc1906"},
        {"id": "lecce", "name": "Lecce", "instagram": "uslecce", "tiktok": "uslecce"},
        {"id": "cagliari", "name": "Cagliari", "instagram": "cagliaricalcio", "tiktok": "cagliaricalcio"},
        {"id": "parma", "name": "Parma", "instagram": "parmacalcio1913", "tiktok": "parmacalcio1913"},
        {"id": "genoa", "name": "Genoa", "instagram": "genoacfc", "tiktok": "genoacfc"},
        {"id": "verona", "name": "Hellas Verona", "instagram": "hellasveronafcofficial", "tiktok": "hellasveronafcofficial"},
        {"id": "pisa", "name": "Pisa", "instagram": "pisasportingclub", "tiktok": "pisasporting"},
        {"id": "fiorentina", "name": "Fiorentina", "instagram": "acffiorentina", "tiktok": "acffiorentina"},
    ],
    "Ligue 1": [
        {"id": "lens", "name": "RC Lens", "instagram": "rclens", "tiktok": "rclens"},
        {"id": "psg", "name": "PSG", "instagram": "psg", "tiktok": "psg"},
        {"id": "marseille", "name": "Marseille", "instagram": "olympiquedemarseille", "tiktok": "om"},
        {"id": "lille", "name": "Lille", "instagram": "loscofficiel", "tiktok": "loscofficiel"},
        {"id": "lyon", "name": "Lyon", "instagram": "ol", "tiktok": "ol"},
        {"id": "rennes", "name": "Rennes", "instagram": "staderennaisfc", "tiktok": "staderennaisfc"},
        {"id": "strasbourg", "name": "Strasbourg", "instagram": "rcsa", "tiktok": "rcstrasbourgalsace"},
        {"id": "toulouse", "name": "Toulouse", "instagram": "toulousefc", "tiktok": "toulousefc"},
        {"id": "monaco", "name": "Monaco", "instagram": "asmonaco", "tiktok": "asmonaco"},
        {"id": "angers", "name": "Angers", "instagram": "angersscofficiel", "tiktok": "angersscofficiel"},
        {"id": "brest", "name": "Brest", "instagram": "sb29", "tiktok": "sb29official"},
        {"id": "lorient", "name": "Lorient", "instagram": "fclorient", "tiktok": "fclorient"},
        {"id": "nice", "name": "Nice", "instagram": "ogcnice", "tiktok": "ogcnice"},
        {"id": "paris-fc", "name": "Paris FC", "instagram": "parisfcofficial", "tiktok": "parisfc"},
        {"id": "le-havre", "name": "Le Havre", "instagram": "hac_officiel", "tiktok": "lehavreac"},
        {"id": "auxerre", "name": "Auxerre", "instagram": "ajauxerre", "tiktok": "ajauxerre"},
        {"id": "nantes", "name": "Nantes", "instagram": "fcnantes", "tiktok": "fcnantes"},
        {"id": "metz", "name": "Metz", "instagram": "fcmetz", "tiktok": "fcmetz"},
    ],
    "Süper Lig": [
        {"id": "galatasaray", "name": "Galatasaray", "instagram": "galatasaray", "tiktok": "galatasaray"},
        {"id": "fenerbahce", "name": "Fenerbahçe", "instagram": "fenerbahce", "tiktok": "fenerbahce"},
        {"id": "trabzonspor", "name": "Trabzonspor", "instagram": "trabzonspor", "tiktok": "trabzonspor"},
        {"id": "goztepe", "name": "Göztepe", "instagram": "goztepeskresmi", "tiktok": "goztepeskresmi"},
        {"id": "besiktas", "name": "Beşiktaş", "instagram": "besiktas", "tiktok": "bjk"},
        {"id": "samsunspor", "name": "Samsunspor", "instagram": "samsunspor", "tiktok": "samsunspor"},
        {"id": "basaksehir", "name": "Başakşehir", "instagram": "ibfk2014", "tiktok": "basaksehir"},
        {"id": "kocaelispor", "name": "Kocaelispor", "instagram": "kocaelisporkulubu", "tiktok": "kocaelisporkulubu"},
        {"id": "gaziantep", "name": "Gaziantep FK", "instagram": "gaziantepfk", "tiktok": "gaziantepfk"},
        {"id": "alanyaspor", "name": "Alanyaspor", "instagram": "alanyaspor", "tiktok": "alanyaspor"},
        {"id": "genclerbirligi", "name": "Gençlerbirliği", "instagram": "genclerbirligi", "tiktok": "genclerbirligiresmi"},
        {"id": "rizespor", "name": "Rizespor", "instagram": "caykurrizespor", "tiktok": "caykurrizespor"},
        {"id": "konyaspor", "name": "Konyaspor", "instagram": "konyaspor", "tiktok": "konyaspor"},
        {"id": "kasimpasa", "name": "Kasımpaşa", "instagram": "kasimpasask", "tiktok": "kasimpasa"},
        {"id": "antalyaspor", "name": "Antalyaspor", "instagram": "antalyaspor", "tiktok": "antalyaspor"},
        {"id": "kayserispor", "name": "Kayserispor", "instagram": "kayserispor", "tiktok": "kayserispor"},
        {"id": "eyupspor", "name": "Eyüpspor", "instagram": "eyupspor", "tiktok": "eyupspor1925"},
        {"id": "karagumruk", "name": "Karagümrük", "instagram": "karagumruksk", "tiktok": "karagumruksk"},
    ],
}

def parse_follower_count(text: str) -> int:
    """Parse follower count from text (handles K, M, B suffixes)"""
    text = str(text).strip().replace(',', '').replace('.', '')
    
    multipliers = {'K': 1_000, 'M': 1_000_000, 'B': 1_000_000_000}
    
    for suffix, multiplier in multipliers.items():
        if suffix in text.upper():
            number = float(text.upper().replace(suffix, ''))
            return int(number * multiplier)
    
    try:
        return int(float(text))
    except:
        return 0

def scrape_instagram_playwright(page, username: str) -> int:
    """Scrape Instagram follower count using Playwright"""
    try:
        url = f"https://www.instagram.com/{username}/"
        page.goto(url, wait_until="networkidle", timeout=30000)
        time.sleep(3)
        
        page_content = page.content()
        
        # Try JSON data first (exact count)
        match = re.search(r'"edge_followed_by":\{"count":(\d+)\}', page_content)
        if match:
            return int(match.group(1))
        
        match2 = re.search(r'"follower_count":(\d+)', page_content)
        if match2:
            return int(match2.group(1))
        
        # Fallback to meta tag (rounded)
        meta_content = page.locator('meta[property="og:description"]').get_attribute('content')
        if meta_content:
            match3 = re.search(r'([\d,\.]+[KMB]?)\s+Followers', meta_content, re.IGNORECASE)
            if match3:
                return parse_follower_count(match3.group(1))
        
        return 0
    except Exception as e:
        print(f"      ❌ Instagram error: {e}")
        return 0

def scrape_tiktok_requests(username: str) -> int:
    """Scrape TikTok follower count using requests"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        }
        url = f"https://www.tiktok.com/@{username}"
        response = requests.get(url, headers=headers, timeout=15)
        
        if response.status_code == 200:
            match = re.search(r'"followerCount":(\d+)', response.text)
            if match:
                return int(match.group(1))
            
            match2 = re.search(r'"stats":\{"followerCount":(\d+)', response.text)
            if match2:
                return int(match2.group(1))
        
        return 0
    except Exception as e:
        print(f"      ❌ TikTok error: {e}")
        return 0

def update_firestore(team_id: str, instagram: int, tiktok: int, db):
    """
    Update team's social media followers in Firestore
    Only updates platforms where scraping succeeded (followers > 0)
    Preserves existing data for failed scrapes
    """
    try:
        doc_ref = db.collection('teams').document(team_id)
        doc = doc_ref.get()
        
        if doc.exists:
            current_data = doc.to_dict()
            socials = current_data.get('socials', {})
            
            # Only update Instagram if we got data (> 0)
            if instagram > 0:
                if 'instagram' in socials:
                    socials['instagram']['followers'] = instagram
                else:
                    socials['instagram'] = {'username': '', 'followers': instagram}
            # If scraping failed but data exists, keep existing value
            elif 'instagram' not in socials:
                socials['instagram'] = {'username': '', 'followers': 0}
            
            # Only update TikTok if we got data (> 0)
            if tiktok > 0:
                if 'tiktok' in socials:
                    socials['tiktok']['followers'] = tiktok
                else:
                    socials['tiktok'] = {'username': '', 'followers': tiktok}
            # If scraping failed but data exists, keep existing value
            elif 'tiktok' not in socials:
                socials['tiktok'] = {'username': '', 'followers': 0}
            
            # Recalculate total from all platforms
            total = (
                socials.get('instagram', {}).get('followers', 0) +
                socials.get('twitter', {}).get('followers', 0) +
                socials.get('tiktok', {}).get('followers', 0)
            )
            
            doc_ref.update({
                'socials': socials,
                'totalFollowers': total,
                'updatedAt': firestore.SERVER_TIMESTAMP
            })
            return True
        return False
    except Exception as e:
        print(f"      ❌ Firestore error: {e}")
        return False

def init_firebase():
    """Initialize Firebase"""
    if not FIREBASE_AVAILABLE:
        return None
    
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
            print("⚠️ No Firebase credentials")
            return None
    
    return firestore.client()

def main():
    print("=" * 70)
    print("🌐 Multi-Platform Social Media Scraper")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()
    
    db = init_firebase()
    all_results = []
    total_success = 0
    total_fail = 0
    
    with sync_playwright() as p:
        print("🚀 Launching browser...")
        browser = p.chromium.launch(
            headless=True,
            args=['--disable-blink-features=AutomationControlled']
        )
        
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            viewport={'width': 1920, 'height': 1080},
        )
        page = context.new_page()
        
        for league, teams in ALL_TEAMS.items():
            print(f"\n🏆 {league} ({len(teams)} teams)")
            print("-" * 50)
            
            for team in teams:
                print(f"\n   📊 {team['name']}")
                
                # Scrape Instagram
                instagram_followers = scrape_instagram_playwright(page, team['instagram'])
                if instagram_followers > 0:
                    print(f"      📸 Instagram: {instagram_followers:,}")
                    total_success += 1
                else:
                    print(f"      📸 Instagram: Failed")
                    total_fail += 1
                
                time.sleep(2)
                
                # Scrape TikTok
                tiktok_followers = scrape_tiktok_requests(team['tiktok'])
                if tiktok_followers > 0:
                    print(f"      🎵 TikTok: {tiktok_followers:,}")
                    total_success += 1
                else:
                    print(f"      🎵 TikTok: Failed")
                    total_fail += 1
                
                # Update Firestore
                if db and (instagram_followers > 0 or tiktok_followers > 0):
                    if update_firestore(team['id'], instagram_followers, tiktok_followers, db):
                        print(f"      💾 Firestore updated")
                
                all_results.append({
                    "id": team['id'],
                    "name": team['name'],
                    "league": league,
                    "instagram_followers": instagram_followers,
                    "tiktok_followers": tiktok_followers,
                    "scraped_at": datetime.now().isoformat()
                })
                
                time.sleep(1)
        
        browser.close()
    
    # Summary
    total_attempts = total_success + total_fail
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"✅ Success: {total_success}/{total_attempts}")
    print(f"❌ Failed: {total_fail}/{total_attempts}")
    print(f"📈 Success Rate: {(total_success/total_attempts)*100:.1f}%")
    
    # Save results
    output_file = "multi_platform_results.json"
    with open(output_file, 'w') as f:
        json.dump({
            "scraped_at": datetime.now().isoformat(),
            "total_attempts": total_attempts,
            "success_count": total_success,
            "fail_count": total_fail,
            "results": all_results
        }, f, indent=2)
    
    print(f"📁 Results saved to {output_file}")

if __name__ == "__main__":
    main()
