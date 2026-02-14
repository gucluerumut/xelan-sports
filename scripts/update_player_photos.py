#!/usr/bin/env python3
"""
Update player photos from Sorare GraphQL API.
Fetches player portraits using their display name.
"""

import requests
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate('service-account.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

SORARE_GRAPHQL_URL = "https://api.sorare.com/graphql"

# Player name to Sorare slug mapping
# Sorare uses slugs like "cristiano-ronaldo-dos-santos-aveiro"
PLAYER_SLUGS = {
    "Cristiano Ronaldo": "cristiano-ronaldo-dos-santos-aveiro",
    "Lionel Messi": "lionel-andres-messi-cuccittini",
    "Neymar Jr": "neymar-da-silva-santos-junior",
    "Kylian Mbappé": "kylian-mbappe-lottin",
    "Erling Haaland": "erling-braut-haaland",
    "Vinicius Jr": "vinicius-jose-de-oliveira-junior",
    "Mohamed Salah": "mohamed-salah-hamed-mahrous-ghaly",
    "Jude Bellingham": "jude-bellingham",
    "Mauro Icardi": "mauro-emanuel-icardi",
    "Victor Osimhen": "victor-james-osimhen",
}

def get_sorare_player_photo(slug: str) -> str | None:
    """Fetch player photo URL from Sorare GraphQL API."""
    query = """
    query PlayerBySlug($slug: String!) {
        football {
            player(slug: $slug) {
                displayName
                pictureUrl
                avatarUrl
            }
        }
    }
    """
    
    try:
        response = requests.post(
            SORARE_GRAPHQL_URL,
            json={"query": query, "variables": {"slug": slug}},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        
        player = data.get("data", {}).get("football", {}).get("player")
        if player:
            # Prefer pictureUrl, fallback to avatarUrl
            return player.get("pictureUrl") or player.get("avatarUrl")
    except Exception as e:
        print(f"Error fetching Sorare data for {slug}: {e}")
    
    return None

def update_player_photos():
    """Update all players with Sorare photos."""
    print("=" * 70)
    print("📸 Updating Player Photos from Sorare")
    print("=" * 70)
    print()
    
    players_ref = db.collection("players")
    players = players_ref.get()
    
    updated = 0
    for player_doc in players:
        player = player_doc.to_dict()
        name = player.get("name", "")
        
        if name in PLAYER_SLUGS:
            slug = PLAYER_SLUGS[name]
            print(f"🔍 Fetching: {name} ({slug})...")
            
            photo_url = get_sorare_player_photo(slug)
            
            if photo_url:
                players_ref.document(player_doc.id).update({
                    "photo": photo_url
                })
                print(f"   ✅ Updated with: {photo_url[:50]}...")
                updated += 1
            else:
                print(f"   ⚠️  No photo found")
        else:
            print(f"⏭️  {name}: No slug mapping")
    
    print()
    print("=" * 70)
    print(f"✅ Updated {updated} player photos")
    print("=" * 70)

if __name__ == "__main__":
    update_player_photos()
