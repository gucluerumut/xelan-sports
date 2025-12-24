#!/usr/bin/env python3
"""
Premier League Social Media Scraper
Scrapes follower counts from Instagram, Twitter, TikTok
"""

import requests
import json
import re
from datetime import datetime

# Test with 2 teams first
TEST_TEAMS = [
    {
        "id": "manchester-city",
        "name": "Manchester City",
        "instagram": "mancity",
        "twitter": "ManCity",
        "tiktok": "mancity"
    },
    {
        "id": "liverpool",
        "name": "Liverpool",
        "instagram": "liverpoolfc",
        "twitter": "LFC",
        "tiktok": "liverpoolfc"
    }
]

def get_instagram_followers(username: str) -> int:
    """
    Scrape Instagram follower count using public page
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
        }
        
        url = f"https://www.instagram.com/{username}/"
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            # Try to find follower count in the page
            # Instagram often requires login for exact counts
            html = response.text
            
            # Pattern for "X followers" in meta description
            pattern = r'"edge_followed_by":\{"count":(\d+)\}'
            match = re.search(pattern, html)
            if match:
                return int(match.group(1))
            
            # Alternative pattern
            pattern2 = r'(\d+(?:,\d+)*(?:\.\d+)?[MK]?)\s*[Ff]ollowers'
            match2 = re.search(pattern2, html)
            if match2:
                count_str = match2.group(1).replace(',', '')
                if 'M' in count_str:
                    return int(float(count_str.replace('M', '')) * 1000000)
                elif 'K' in count_str:
                    return int(float(count_str.replace('K', '')) * 1000)
                return int(count_str)
                
        print(f"  ⚠️ Instagram returned status {response.status_code} for @{username}")
        return 0
        
    except Exception as e:
        print(f"  ❌ Instagram error for @{username}: {e}")
        return 0

def get_twitter_followers(username: str) -> int:
    """
    Twitter/X requires API access or authentication
    Using Nitter as alternative (public Twitter mirror)
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        
        # Try Nitter (public Twitter mirror)
        nitter_instances = [
            "nitter.net",
            "nitter.privacydev.net",
        ]
        
        for instance in nitter_instances:
            try:
                url = f"https://{instance}/{username}"
                response = requests.get(url, headers=headers, timeout=10)
                
                if response.status_code == 200:
                    # Find followers count
                    pattern = r'(\d+(?:,\d+)*)\s*[Ff]ollowers'
                    match = re.search(pattern, response.text)
                    if match:
                        count_str = match.group(1).replace(',', '')
                        return int(count_str)
            except:
                continue
                
        print(f"  ⚠️ Twitter/Nitter not available for @{username}")
        return 0
        
    except Exception as e:
        print(f"  ❌ Twitter error for @{username}: {e}")
        return 0

def get_tiktok_followers(username: str) -> int:
    """
    Scrape TikTok follower count
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
        
        url = f"https://www.tiktok.com/@{username}"
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            # Find follower count in page
            pattern = r'"followerCount":(\d+)'
            match = re.search(pattern, response.text)
            if match:
                return int(match.group(1))
                
        print(f"  ⚠️ TikTok returned status {response.status_code} for @{username}")
        return 0
        
    except Exception as e:
        print(f"  ❌ TikTok error for @{username}: {e}")
        return 0

def main():
    print("=" * 50)
    print("🏆 Premier League Social Media Scraper")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)
    print()
    
    results = []
    
    for team in TEST_TEAMS:
        print(f"📊 Scraping {team['name']}...")
        
        instagram = get_instagram_followers(team['instagram'])
        twitter = get_twitter_followers(team['twitter'])
        tiktok = get_tiktok_followers(team['tiktok'])
        
        total = instagram + twitter + tiktok
        
        result = {
            "id": team['id'],
            "name": team['name'],
            "socials": {
                "instagram": {"username": team['instagram'], "followers": instagram},
                "twitter": {"username": team['twitter'], "followers": twitter},
                "tiktok": {"username": team['tiktok'], "followers": tiktok}
            },
            "totalFollowers": total,
            "scrapedAt": datetime.now().isoformat()
        }
        results.append(result)
        
        print(f"  📸 Instagram: {instagram:,}")
        print(f"  🐦 Twitter: {twitter:,}")
        print(f"  🎵 TikTok: {tiktok:,}")
        print(f"  📈 Total: {total:,}")
        print()
    
    # Save results
    output_file = "scrape_results.json"
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"✅ Results saved to {output_file}")
    print()
    
    # Summary
    print("=" * 50)
    print("📋 SUMMARY")
    print("=" * 50)
    for r in results:
        followers = r['totalFollowers']
        if followers > 0:
            print(f"✅ {r['name']}: {followers:,} total followers")
        else:
            print(f"❌ {r['name']}: Could not scrape (login required)")

if __name__ == "__main__":
    main()
