#!/usr/bin/env python3
"""
Seed sample players to Firestore for testing
"""

import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialize Firebase
cred = credentials.Certificate('service-account.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Sample players data
SAMPLE_PLAYERS = [
    {
        "name": "Cristiano Ronaldo",
        "teamId": "al-nassr",
        "teamName": "Al Nassr",
        "league": "Saudi Pro League",
        "position": "FW",
        "nationality": "Portugal",
        "jerseyNumber": 7,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cristiano_Ronaldo_WC2022_-_01.jpg",
        "socials": {
            "instagram": {
                "username": "cristiano",
                "url": "https://instagram.com/cristiano",
                "followers": 636000000
            },
            "twitter": {
                "username": "Cristiano",
                "url": "https://x.com/Cristiano",
                "followers": 112000000
            },
            "tiktok": {
                "username": "cristiano",
                "url": "https://tiktok.com/@cristiano",
                "followers": 65000000
            }
        },
        "totalFollowers": 813000000
    },
    {
        "name": "Lionel Messi",
        "teamId": "inter-miami",
        "teamName": "Inter Miami",
        "league": "MLS",
        "position": "FW",
        "nationality": "Argentina",
        "jerseyNumber": 10,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg",
        "socials": {
            "instagram": {
                "username": "leomessi",
                "url": "https://instagram.com/leomessi",
                "followers": 504000000
            },
            "twitter": {
                "username": "TeamMessi",
                "url": "https://x.com/TeamMessi",
                "followers": 12000000
            },
            "tiktok": {
                "username": "leomessi",
                "url": "https://tiktok.com/@leomessi",
                "followers": 15000000
            }
        },
        "totalFollowers": 531000000
    },
    {
        "name": "Neymar Jr",
        "teamId": "al-hilal",
        "teamName": "Al Hilal",
        "league": "Saudi Pro League",
        "position": "FW",
        "nationality": "Brazil",
        "jerseyNumber": 10,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/65/Neymar_Jr_Brazil_0.jpg",
        "socials": {
            "instagram": {
                "username": "neymarjr",
                "url": "https://instagram.com/neymarjr",
                "followers": 228000000
            },
            "twitter": {
                "username": "naborneo",
                "url": "https://x.com/neymarjr",
                "followers": 63000000
            },
            "tiktok": {
                "username": "neymarjr",
                "url": "https://tiktok.com/@neymarjr",
                "followers": 22000000
            }
        },
        "totalFollowers": 313000000
    },
    {
        "name": "Kylian Mbappé",
        "teamId": "real-madrid",
        "teamName": "Real Madrid",
        "league": "La Liga",
        "position": "FW",
        "nationality": "France",
        "jerseyNumber": 9,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg",
        "socials": {
            "instagram": {
                "username": "k.mbappe",
                "url": "https://instagram.com/k.mbappe",
                "followers": 119000000
            },
            "twitter": {
                "username": "KMbappe",
                "url": "https://x.com/KMbappe",
                "followers": 14000000
            },
            "tiktok": {
                "username": "k.mbappe",
                "url": "https://tiktok.com/@k.mbappe",
                "followers": 5000000
            }
        },
        "totalFollowers": 138000000
    },
    {
        "name": "Erling Haaland",
        "teamId": "manchester-city",
        "teamName": "Manchester City",
        "league": "Premier League",
        "position": "FW",
        "nationality": "Norway",
        "jerseyNumber": 9,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Erling_Haaland_2022-09-14_1.jpg",
        "socials": {
            "instagram": {
                "username": "eraborehaaland",
                "url": "https://instagram.com/eraborehaaland",
                "followers": 42000000
            },
            "twitter": {
                "username": "ErlingHaaland",
                "url": "https://x.com/ErlingHaaland",
                "followers": 3500000
            },
            "tiktok": {
                "username": "erlinghaaland",
                "url": "https://tiktok.com/@erlinghaaland",
                "followers": 8000000
            }
        },
        "totalFollowers": 53500000
    },
    {
        "name": "Vinicius Jr",
        "teamId": "real-madrid",
        "teamName": "Real Madrid",
        "league": "La Liga",
        "position": "FW",
        "nationality": "Brazil",
        "jerseyNumber": 7,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Vinicius_J%C3%BAnior_2022.jpg",
        "socials": {
            "instagram": {
                "username": "vinijr",
                "url": "https://instagram.com/vinijr",
                "followers": 56000000
            },
            "twitter": {
                "username": "vinaboreb",
                "url": "https://x.com/vinaboreb",
                "followers": 11000000
            },
            "tiktok": {
                "username": "vinijr",
                "url": "https://tiktok.com/@vinijr",
                "followers": 12000000
            }
        },
        "totalFollowers": 79000000
    },
    {
        "name": "Mohamed Salah",
        "teamId": "liverpool",
        "teamName": "Liverpool",
        "league": "Premier League",
        "position": "FW",
        "nationality": "Egypt",
        "jerseyNumber": 11,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mohamed_Salah_2018.jpg",
        "socials": {
            "instagram": {
                "username": "mosalah",
                "url": "https://instagram.com/mosalah",
                "followers": 65000000
            },
            "twitter": {
                "username": "MoSalah",
                "url": "https://x.com/MoSalah",
                "followers": 21000000
            },
            "tiktok": {
                "username": "mosalah",
                "url": "https://tiktok.com/@mosalah",
                "followers": 3000000
            }
        },
        "totalFollowers": 89000000
    },
    {
        "name": "Jude Bellingham",
        "teamId": "real-madrid",
        "teamName": "Real Madrid",
        "league": "La Liga",
        "position": "MF",
        "nationality": "England",
        "jerseyNumber": 5,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Jude_Bellingham_2023.jpg",
        "socials": {
            "instagram": {
                "username": "judebellingham",
                "url": "https://instagram.com/judebellingham",
                "followers": 34000000
            },
            "twitter": {
                "username": "BellsLingham",
                "url": "https://x.com/BellsLingham",
                "followers": 3000000
            },
            "tiktok": {
                "username": "judebellingham",
                "url": "https://tiktok.com/@judebellingham",
                "followers": 5000000
            }
        },
        "totalFollowers": 42000000
    },
    {
        "name": "Mauro Icardi",
        "teamId": "galatasaray",
        "teamName": "Galatasaray",
        "league": "Süper Lig",
        "position": "FW",
        "nationality": "Argentina",
        "jerseyNumber": 9,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Mauro_Icardi_2019.jpg",
        "socials": {
            "instagram": {
                "username": "mauroicardi",
                "url": "https://instagram.com/mauroicardi",
                "followers": 12000000
            },
            "twitter": {
                "username": "MauroIcardi",
                "url": "https://x.com/MauroIcardi",
                "followers": 2000000
            },
            "tiktok": {
                "username": "mauroicardi",
                "url": "https://tiktok.com/@mauroicardi",
                "followers": 800000
            }
        },
        "totalFollowers": 14800000
    },
    {
        "name": "Victor Osimhen",
        "teamId": "galatasaray",
        "teamName": "Galatasaray",
        "league": "Süper Lig",
        "position": "FW",
        "nationality": "Nigeria",
        "jerseyNumber": 45,
        "photo": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Victor_Osimhen_2023.jpg",
        "socials": {
            "instagram": {
                "username": "victorosimhen9",
                "url": "https://instagram.com/victorosimhen9",
                "followers": 7000000
            },
            "twitter": {
                "username": "victorosimhen9",
                "url": "https://x.com/victorosimhen9",
                "followers": 1500000
            },
            "tiktok": {
                "username": "osimhen",
                "url": "https://tiktok.com/@osimhen",
                "followers": 500000
            }
        },
        "totalFollowers": 9000000
    }
]

def seed_players():
    print("=" * 70)
    print("🏃 Seeding Sample Players")
    print("=" * 70)
    print()

    players_ref = db.collection('players')
    
    for player in SAMPLE_PLAYERS:
        # Add timestamps
        player['createdAt'] = firestore.SERVER_TIMESTAMP
        player['updatedAt'] = firestore.SERVER_TIMESTAMP
        
        # Check if player already exists
        existing = players_ref.where('name', '==', player['name']).limit(1).get()
        
        if len(list(existing)) > 0:
            print(f"⏭️  {player['name']}: Already exists")
            continue
        
        # Add to Firestore
        doc_ref = players_ref.add(player)
        print(f"✅ {player['name']}: Added ({player['totalFollowers']:,} followers)")
    
    print()
    print("=" * 70)
    print(f"✅ Seeded {len(SAMPLE_PLAYERS)} players")
    print("=" * 70)

if __name__ == "__main__":
    seed_players()
