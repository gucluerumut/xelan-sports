#!/usr/bin/env python3
"""
RapidAPI Test Script - Instagram & Twitter Follower Count
Tests multiple RapidAPI endpoints to find the best option
"""

import requests
import json
import os
from datetime import datetime

# RapidAPI Key (get from https://rapidapi.com/auth/sign-up)
RAPIDAPI_KEY = os.environ.get('RAPIDAPI_KEY', 'YOUR_RAPIDAPI_KEY_HERE')

# Test teams
TEST_TEAMS = [
    {"name": "Manchester City", "instagram": "mancity", "twitter": "ManCity"},
    {"name": "Liverpool", "instagram": "liverpoolfc", "twitter": "LFC"},
]

def test_instagram_scraper_stable(username: str) -> dict:
    """
    Instagram Scraper Stable API
    https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2
    """
    url = "https://instagram-scraper-api2.p.rapidapi.com/v1/info"
    
    querystring = {"username_or_id_or_url": username}
    
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com"
    }
    
    try:
        response = requests.get(url, headers=headers, params=querystring, timeout=10)
        if response.status_code == 200:
            data = response.json()
            # Extract follower count from response
            followers = data.get('data', {}).get('follower_count', 0)
            return {"success": True, "followers": followers, "api": "Instagram Scraper Stable"}
        else:
            return {"success": False, "error": f"Status {response.status_code}", "api": "Instagram Scraper Stable"}
    except Exception as e:
        return {"success": False, "error": str(e), "api": "Instagram Scraper Stable"}

def test_instagram_cheap_fast(username: str) -> dict:
    """
    Instagram API Cheap and Fast
    https://rapidapi.com/mrngstar/api/instagram-api-cheap-and-fast
    """
    url = "https://instagram-api-cheap-and-fast.p.rapidapi.com/user/info"
    
    querystring = {"username": username}
    
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "instagram-api-cheap-and-fast.p.rapidapi.com"
    }
    
    try:
        response = requests.get(url, headers=headers, params=querystring, timeout=10)
        if response.status_code == 200:
            data = response.json()
            followers = data.get('follower_count', 0)
            return {"success": True, "followers": followers, "api": "Instagram Cheap & Fast"}
        else:
            return {"success": False, "error": f"Status {response.status_code}", "api": "Instagram Cheap & Fast"}
    except Exception as e:
        return {"success": False, "error": str(e), "api": "Instagram Cheap & Fast"}

def test_twitter_official(username: str) -> dict:
    """
    Twitter API Official
    https://rapidapi.com/Glavier/api/twitter154
    """
    url = "https://twitter154.p.rapidapi.com/user/details"
    
    querystring = {"username": username}
    
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "twitter154.p.rapidapi.com"
    }
    
    try:
        response = requests.get(url, headers=headers, params=querystring, timeout=10)
        if response.status_code == 200:
            data = response.json()
            followers = data.get('followers_count', 0)
            return {"success": True, "followers": followers, "api": "Twitter Official"}
        else:
            return {"success": False, "error": f"Status {response.status_code}", "api": "Twitter Official"}
    except Exception as e:
        return {"success": False, "error": str(e), "api": "Twitter Official"}

def test_twitter_aio(username: str) -> dict:
    """
    Twitter AIO
    https://rapidapi.com/omarmhaimdat/api/twitter-aio
    """
    url = "https://twitter-aio.p.rapidapi.com/user"
    
    querystring = {"username": username}
    
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "twitter-aio.p.rapidapi.com"
    }
    
    try:
        response = requests.get(url, headers=headers, params=querystring, timeout=10)
        if response.status_code == 200:
            data = response.json()
            followers = data.get('followers', 0)
            return {"success": True, "followers": followers, "api": "Twitter AIO"}
        else:
            return {"success": False, "error": f"Status {response.status_code}", "api": "Twitter AIO"}
    except Exception as e:
        return {"success": False, "error": str(e), "api": "Twitter AIO"}

def main():
    print("=" * 70)
    print("🧪 RapidAPI Test - Instagram & Twitter")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()
    
    if RAPIDAPI_KEY == 'YOUR_RAPIDAPI_KEY_HERE':
        print("❌ ERROR: Please set RAPIDAPI_KEY environment variable")
        print("   Get your key from: https://rapidapi.com/auth/sign-up")
        print()
        print("   export RAPIDAPI_KEY='your-key-here'")
        print("   python scripts/test_rapidapi.py")
        return
    
    results = []
    
    for team in TEST_TEAMS:
        print(f"\n🏆 {team['name']}")
        print("-" * 50)
        
        # Test Instagram APIs
        print(f"\n📸 Instagram (@{team['instagram']}):")
        
        # Test 1: Instagram Scraper Stable
        result1 = test_instagram_scraper_stable(team['instagram'])
        if result1['success']:
            print(f"   ✅ {result1['api']}: {result1['followers']:,} followers")
        else:
            print(f"   ❌ {result1['api']}: {result1['error']}")
        results.append({**team, "platform": "Instagram", **result1})
        
        # Test 2: Instagram Cheap & Fast
        result2 = test_instagram_cheap_fast(team['instagram'])
        if result2['success']:
            print(f"   ✅ {result2['api']}: {result2['followers']:,} followers")
        else:
            print(f"   ❌ {result2['api']}: {result2['error']}")
        results.append({**team, "platform": "Instagram", **result2})
        
        # Test Twitter APIs
        print(f"\n🐦 Twitter (@{team['twitter']}):")
        
        # Test 3: Twitter Official
        result3 = test_twitter_official(team['twitter'])
        if result3['success']:
            print(f"   ✅ {result3['api']}: {result3['followers']:,} followers")
        else:
            print(f"   ❌ {result3['api']}: {result3['error']}")
        results.append({**team, "platform": "Twitter", **result3})
        
        # Test 4: Twitter AIO
        result4 = test_twitter_aio(team['twitter'])
        if result4['success']:
            print(f"   ✅ {result4['api']}: {result4['followers']:,} followers")
        else:
            print(f"   ❌ {result4['api']}: {result4['error']}")
        results.append({**team, "platform": "Twitter", **result4})
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    
    instagram_apis = [r for r in results if r['platform'] == 'Instagram']
    twitter_apis = [r for r in results if r['platform'] == 'Twitter']
    
    instagram_success = sum(1 for r in instagram_apis if r['success'])
    twitter_success = sum(1 for r in twitter_apis if r['success'])
    
    print(f"\n📸 Instagram APIs:")
    print(f"   Success: {instagram_success}/{len(instagram_apis)}")
    
    print(f"\n🐦 Twitter APIs:")
    print(f"   Success: {twitter_success}/{len(twitter_apis)}")
    
    # Best API recommendation
    print("\n💡 RECOMMENDATION:")
    
    instagram_working = [r for r in instagram_apis if r['success']]
    if instagram_working:
        best_ig = instagram_working[0]
        print(f"   Instagram: Use '{best_ig['api']}'")
    else:
        print(f"   Instagram: ❌ No working API found")
    
    twitter_working = [r for r in twitter_apis if r['success']]
    if twitter_working:
        best_tw = twitter_working[0]
        print(f"   Twitter: Use '{best_tw['api']}'")
    else:
        print(f"   Twitter: ❌ No working API found")
    
    # Save results
    output_file = "rapidapi_test_results.json"
    with open(output_file, 'w') as f:
        json.dump({
            "tested_at": datetime.now().isoformat(),
            "rapidapi_key_set": RAPIDAPI_KEY != 'YOUR_RAPIDAPI_KEY_HERE',
            "results": results
        }, f, indent=2)
    
    print(f"\n📁 Results saved to {output_file}")

if __name__ == "__main__":
    main()
