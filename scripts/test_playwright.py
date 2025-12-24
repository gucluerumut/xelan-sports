#!/usr/bin/env python3
"""
Playwright Headless Browser Test - Instagram & Twitter
Public data scraping WITHOUT login (safer and more reliable)
"""

from playwright.sync_api import sync_playwright
import json
import time
from datetime import datetime

# Test teams
TEST_TEAMS = [
    {"name": "Manchester City", "instagram": "mancity", "twitter": "ManCity"},
    {"name": "Liverpool", "instagram": "liverpoolfc", "twitter": "LFC"},
]

def scrape_instagram_followers(page, username: str) -> dict:
    """
    Scrape Instagram follower count from public profile (no login)
    """
    try:
        url = f"https://www.instagram.com/{username}/"
        print(f"   🔍 Navigating to {url}")
        
        # Navigate with realistic headers
        page.goto(url, wait_until="networkidle", timeout=30000)
        
        # Wait a bit for dynamic content
        time.sleep(3)
        
        # Get page content
        page_content = page.content()
        
        import re
        
        # PRIORITY 1: Try to find exact count in JSON data (most accurate)
        match = re.search(r'"edge_followed_by":\{"count":(\d+)\}', page_content)
        if match:
            followers = int(match.group(1))
            return {"success": True, "followers": followers, "source": "json_data_exact"}
        
        # PRIORITY 2: Try alternative JSON pattern
        match2 = re.search(r'"follower_count":(\d+)', page_content)
        if match2:
            followers = int(match2.group(1))
            return {"success": True, "followers": followers, "source": "json_follower_count"}
        
        # PRIORITY 3: Fallback to meta tags (rounded, less accurate)
        meta_content = page.locator('meta[property="og:description"]').get_attribute('content')
        
        if meta_content:
            # Extract follower count from meta description
            # Format: "123K Followers, 456 Following, 789 Posts"
            match3 = re.search(r'([\d,\.]+[KMB]?)\s+Followers', meta_content, re.IGNORECASE)
            if match3:
                followers_str = match3.group(1)
                # Convert K/M/B to numbers
                followers = parse_follower_count(followers_str)
                return {"success": True, "followers": followers, "source": "meta_tag_rounded"}
        
        return {"success": False, "error": "Could not find follower count"}
        
    except Exception as e:
        return {"success": False, "error": str(e)}

def scrape_twitter_followers(page, username: str) -> dict:
    """
    Scrape Twitter follower count from public profile (no login)
    """
    try:
        url = f"https://twitter.com/{username}"
        print(f"   🔍 Navigating to {url}")
        
        page.goto(url, wait_until="networkidle", timeout=30000)
        
        # Wait for content
        time.sleep(3)
        
        # Twitter often requires login for full access
        # Try to find follower count in page
        page_content = page.content()
        
        import re
        # Look for follower count pattern
        match = re.search(r'(\d+(?:,\d+)*)\s+Followers', page_content)
        if match:
            followers_str = match.group(1).replace(',', '')
            followers = int(followers_str)
            return {"success": True, "followers": followers, "source": "page_content"}
        
        # Alternative: Try Nitter (Twitter mirror without login requirement)
        nitter_url = f"https://nitter.net/{username}"
        print(f"   🔄 Trying Nitter: {nitter_url}")
        
        page.goto(nitter_url, wait_until="networkidle", timeout=30000)
        time.sleep(2)
        
        # Find follower count on Nitter
        try:
            followers_elem = page.locator('.profile-stat-num').first
            if followers_elem:
                followers_text = followers_elem.inner_text()
                followers = parse_follower_count(followers_text)
                return {"success": True, "followers": followers, "source": "nitter"}
        except:
            pass
        
        return {"success": False, "error": "Could not find follower count"}
        
    except Exception as e:
        return {"success": False, "error": str(e)}

def parse_follower_count(text: str) -> int:
    """
    Parse follower count from text (handles K, M, B suffixes)
    Examples: "1.2M" -> 1200000, "500K" -> 500000, "1,234" -> 1234
    """
    text = text.strip().replace(',', '')
    
    multipliers = {
        'K': 1_000,
        'M': 1_000_000,
        'B': 1_000_000_000,
    }
    
    for suffix, multiplier in multipliers.items():
        if suffix in text.upper():
            number = float(text.upper().replace(suffix, ''))
            return int(number * multiplier)
    
    try:
        return int(float(text))
    except:
        return 0

def main():
    print("=" * 70)
    print("🤖 Playwright Headless Browser Test")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()
    
    results = []
    
    with sync_playwright() as p:
        print("🚀 Launching Chromium browser (headless)...")
        browser = p.chromium.launch(
            headless=True,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
            ]
        )
        
        # Create context with realistic user agent
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080},
            locale='en-US',
        )
        
        page = context.new_page()
        
        for team in TEST_TEAMS:
            print(f"\n🏆 {team['name']}")
            print("-" * 50)
            
            # Test Instagram
            print(f"\n📸 Instagram (@{team['instagram']}):")
            ig_result = scrape_instagram_followers(page, team['instagram'])
            
            if ig_result['success']:
                print(f"   ✅ {ig_result['followers']:,} followers (via {ig_result['source']})")
            else:
                print(f"   ❌ Failed: {ig_result['error']}")
            
            results.append({
                **team,
                "platform": "Instagram",
                **ig_result
            })
            
            # Test Twitter
            print(f"\n🐦 Twitter (@{team['twitter']}):")
            tw_result = scrape_twitter_followers(page, team['twitter'])
            
            if tw_result['success']:
                print(f"   ✅ {tw_result['followers']:,} followers (via {tw_result['source']})")
            else:
                print(f"   ❌ Failed: {tw_result['error']}")
            
            results.append({
                **team,
                "platform": "Twitter",
                **tw_result
            })
            
            # Small delay between requests
            time.sleep(2)
        
        browser.close()
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    
    instagram_results = [r for r in results if r['platform'] == 'Instagram']
    twitter_results = [r for r in results if r['platform'] == 'Twitter']
    
    ig_success = sum(1 for r in instagram_results if r['success'])
    tw_success = sum(1 for r in twitter_results if r['success'])
    
    print(f"\n📸 Instagram: {ig_success}/{len(instagram_results)} successful")
    print(f"🐦 Twitter: {tw_success}/{len(twitter_results)} successful")
    
    if ig_success > 0 or tw_success > 0:
        print("\n✅ Headless browser scraping is VIABLE!")
    else:
        print("\n⚠️ Headless browser scraping needs adjustment")
    
    # Save results
    output_file = "playwright_test_results.json"
    with open(output_file, 'w') as f:
        json.dump({
            "tested_at": datetime.now().isoformat(),
            "results": results
        }, f, indent=2)
    
    print(f"\n📁 Results saved to {output_file}")

if __name__ == "__main__":
    main()
