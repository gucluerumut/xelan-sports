#!/usr/bin/env python3
"""
Enhanced Multi-Platform Social Media Scraper
- Retry logic with exponential backoff
- Better error handling and logging
- Rate limiting protection
- Progress tracking
"""

from playwright.sync_api import sync_playwright
import requests
import json
import re
import os
import time
from datetime import datetime
from typing import Dict, Tuple

# Firebase Admin SDK
try:
    import firebase_admin
    from firebase_admin import credentials, firestore
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False
    print("⚠️  firebase-admin not installed")

# Configuration
MAX_RETRIES = 3
INITIAL_DELAY = 2
BACKOFF_FACTOR = 2
INSTAGRAM_DELAY = 3  # seconds between Instagram requests
TIKTOK_DELAY = 1     # seconds between TikTok requests

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

def retry_with_backoff(func, *args, max_retries=MAX_RETRIES, **kwargs):
    """
    Retry a function with exponential backoff
    Returns: (success: bool, result: any, error: str)
    """
    for attempt in range(max_retries):
        try:
            result = func(*args, **kwargs)
            if result > 0:  # Success if we got followers
                return True, result, None
            elif attempt < max_retries - 1:
                delay = INITIAL_DELAY * (BACKOFF_FACTOR ** attempt)
                print(f"         ⏳ Retry {attempt + 1}/{max_retries} in {delay}s...")
                time.sleep(delay)
        except Exception as e:
            error_msg = str(e)
            if attempt < max_retries - 1:
                delay = INITIAL_DELAY * (BACKOFF_FACTOR ** attempt)
                print(f"         ⚠️  Error: {error_msg[:50]}... Retrying in {delay}s")
                time.sleep(delay)
            else:
                return False, 0, error_msg
    
    return False, 0, "Max retries reached"

def scrape_instagram_playwright(page, username: str) -> int:
    """Scrape Instagram follower count using Playwright"""
    try:
        url = f"https://www.instagram.com/{username}/"
        page.goto(url, wait_until="networkidle", timeout=30000)
        time.sleep(INSTAGRAM_DELAY)
        
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
        raise Exception(f"Instagram scrape failed: {str(e)[:100]}")

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
        raise Exception(f"TikTok scrape failed: {str(e)[:100]}")

def update_firestore(team_id: str, instagram: int, tiktok: int, db) -> Tuple[bool, str]:
    """
    Update team's social media followers in Firestore
    Returns: (success: bool, message: str)
    """
    try:
        doc_ref = db.collection('teams').document(team_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            return False, "Team not found in Firestore"
        
        current_data = doc.to_dict()
        socials = current_data.get('socials', {})
        
        # Only update Instagram if we got data (> 0)
        if instagram > 0:
            if 'instagram' in socials:
                socials['instagram']['followers'] = instagram
            else:
                socials['instagram'] = {'username': '', 'followers': instagram}
        elif 'instagram' not in socials:
            socials['instagram'] = {'username': '', 'followers': 0}
        
        # Only update TikTok if we got data (> 0)
        if tiktok > 0:
            if 'tiktok' in socials:
                socials['tiktok']['followers'] = tiktok
            else:
                socials['tiktok'] = {'username': '', 'followers': tiktok}
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
        return True, "Updated successfully"
    except Exception as e:
        return False, f"Firestore error: {str(e)[:100]}"

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
            print("⚠️  No Firebase credentials")
            return None
    
    return firestore.client()

def load_teams_from_firestore(db) -> Dict:
    """Load all teams from Firestore"""
    teams_dict = {}
    try:
        teams_ref = db.collection('teams')
        teams = teams_ref.stream()
        
        for team in teams:
            data = team.to_dict()
            league = data.get('league', 'Unknown')
            
            if league not in teams_dict:
                teams_dict[league] = []
            
            teams_dict[league].append({
                'id': team.id,
                'name': data.get('name', 'Unknown'),
                'instagram': data.get('socials', {}).get('instagram', {}).get('username', ''),
                'tiktok': data.get('socials', {}).get('tiktok', {}).get('username', '')
            })
        
        return teams_dict
    except Exception as e:
        print(f"❌ Error loading teams from Firestore: {e}")
        return {}

def main():
    print("=" * 70)
    print("🌐 Enhanced Multi-Platform Social Media Scraper")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()
    
    db = init_firebase()
    if not db:
        print("❌ Cannot proceed without Firebase connection")
        return
    
    # Load teams from Firestore
    print("📥 Loading teams from Firestore...")
    ALL_TEAMS = load_teams_from_firestore(db)
    total_teams = sum(len(teams) for teams in ALL_TEAMS.values())
    print(f"✅ Loaded {total_teams} teams across {len(ALL_TEAMS)} leagues\n")
    
    all_results = []
    stats = {
        'instagram_success': 0,
        'instagram_fail': 0,
        'tiktok_success': 0,
        'tiktok_fail': 0,
        'firestore_updates': 0
    }
    
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
        
        team_counter = 0
        for league, teams in ALL_TEAMS.items():
            print(f"\n🏆 {league} ({len(teams)} teams)")
            print("-" * 50)
            
            for team in teams:
                team_counter += 1
                print(f"\n   [{team_counter}/{total_teams}] 📊 {team['name']}")
                
                # Scrape Instagram with retry
                if team.get('instagram'):
                    success, instagram_followers, error = retry_with_backoff(
                        scrape_instagram_playwright, page, team['instagram']
                    )
                    if success:
                        print(f"      📸 Instagram: {instagram_followers:,} ✅")
                        stats['instagram_success'] += 1
                    else:
                        print(f"      📸 Instagram: Failed ❌")
                        stats['instagram_fail'] += 1
                else:
                    instagram_followers = 0
                    print(f"      📸 Instagram: No username")
                
                time.sleep(INSTAGRAM_DELAY)
                
                # Scrape TikTok with retry
                if team.get('tiktok'):
                    success, tiktok_followers, error = retry_with_backoff(
                        scrape_tiktok_requests, team['tiktok']
                    )
                    if success:
                        print(f"      🎵 TikTok: {tiktok_followers:,} ✅")
                        stats['tiktok_success'] += 1
                    else:
                        print(f"      🎵 TikTok: Failed ❌")
                        stats['tiktok_fail'] += 1
                else:
                    tiktok_followers = 0
                    print(f"      🎵 TikTok: No username")
                
                # Update Firestore
                if instagram_followers > 0 or tiktok_followers > 0:
                    success, message = update_firestore(team['id'], instagram_followers, tiktok_followers, db)
                    if success:
                        print(f"      💾 Firestore: Updated ✅")
                        stats['firestore_updates'] += 1
                    else:
                        print(f"      💾 Firestore: {message} ❌")
                
                all_results.append({
                    "id": team['id'],
                    "name": team['name'],
                    "league": league,
                    "instagram_followers": instagram_followers,
                    "tiktok_followers": tiktok_followers,
                    "scraped_at": datetime.now().isoformat()
                })
                
                time.sleep(TIKTOK_DELAY)
        
        browser.close()
    
    # Summary
    total_attempts = stats['instagram_success'] + stats['instagram_fail'] + stats['tiktok_success'] + stats['tiktok_fail']
    total_success = stats['instagram_success'] + stats['tiktok_success']
    
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"📸 Instagram: {stats['instagram_success']}/{stats['instagram_success'] + stats['instagram_fail']} successful")
    print(f"🎵 TikTok: {stats['tiktok_success']}/{stats['tiktok_success'] + stats['tiktok_fail']} successful")
    print(f"💾 Firestore: {stats['firestore_updates']} teams updated")
    print(f"📈 Overall Success Rate: {(total_success/total_attempts)*100:.1f}%")
    
    # Save results
    output_file = "multi_platform_results.json"
    with open(output_file, 'w') as f:
        json.dump({
            "scraped_at": datetime.now().isoformat(),
            "stats": stats,
            "total_teams": total_teams,
            "results": all_results
        }, f, indent=2)
    
    print(f"📁 Results saved to {output_file}")
    print("=" * 70)

if __name__ == "__main__":
    main()
