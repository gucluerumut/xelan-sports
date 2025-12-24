#!/usr/bin/env python3
"""
Firestore Data Backup Script
Backs up all teams from Firestore to JSON file
"""

import firebase_admin
from firebase_admin import credentials, firestore
import json
from datetime import datetime
import os

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

def backup_teams(db):
    """Backup all teams from Firestore"""
    teams_ref = db.collection('teams')
    docs = teams_ref.stream()
    
    teams_data = []
    for doc in docs:
        team_data = doc.to_dict()
        team_data['id'] = doc.id
        
        # Convert Firestore timestamps to ISO format
        if 'updatedAt' in team_data and team_data['updatedAt']:
            team_data['updatedAt'] = team_data['updatedAt'].isoformat() if hasattr(team_data['updatedAt'], 'isoformat') else str(team_data['updatedAt'])
        if 'createdAt' in team_data and team_data['createdAt']:
            team_data['createdAt'] = team_data['createdAt'].isoformat() if hasattr(team_data['createdAt'], 'isoformat') else str(team_data['createdAt'])
        
        teams_data.append(team_data)
    
    return teams_data

def main():
    print("=" * 70)
    print("💾 Firestore Data Backup")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()
    
    db = init_firebase()
    if not db:
        print("❌ Failed to initialize Firebase")
        return
    
    print("📥 Fetching teams from Firestore...")
    teams = backup_teams(db)
    
    print(f"✅ Found {len(teams)} teams")
    
    # Save backup
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = f"firestore_backup_{timestamp}.json"
    
    with open(backup_file, 'w', encoding='utf-8') as f:
        json.dump({
            "backup_date": datetime.now().isoformat(),
            "total_teams": len(teams),
            "teams": teams
        }, f, indent=2, ensure_ascii=False)
    
    print(f"💾 Backup saved to: {backup_file}")
    print()
    print("📊 Summary by league:")
    
    # Group by league
    leagues = {}
    for team in teams:
        league = team.get('league', 'Unknown')
        leagues[league] = leagues.get(league, 0) + 1
    
    for league, count in sorted(leagues.items()):
        print(f"   {league}: {count} teams")

if __name__ == "__main__":
    main()
