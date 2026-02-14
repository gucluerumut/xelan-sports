#!/bin/bash
# Fetch player photos from Sorare GraphQL API and output as JSON

echo "Fetching player photos from Sorare..."
echo ""

# Player slugs
declare -A PLAYERS=(
    ["Cristiano Ronaldo"]="cristiano-ronaldo-dos-santos-aveiro"
    ["Lionel Messi"]="lionel-andres-messi"
    ["Neymar Jr"]="neymar-da-silva-santos-junior"
    ["Kylian Mbappé"]="kylian-mbappe-lottin"
    ["Erling Haaland"]="erling-braut-haaland"
    ["Vinicius Jr"]="vinicius-jose-de-oliveira-junior"
    ["Mohamed Salah"]="mohamed-salah-hamed-mahrous-ghaly"
    ["Jude Bellingham"]="jude-bellingham"
    ["Mauro Icardi"]="mauro-emanuel-icardi"
    ["Victor Osimhen"]="victor-james-osimhen"
)

echo "{"
first=true
for name in "${!PLAYERS[@]}"; do
    slug="${PLAYERS[$name]}"
    
    result=$(curl -s -X POST https://api.sorare.com/graphql \
        -H "Content-Type: application/json" \
        -d "{\"query\": \"{ football { player(slug: \\\"$slug\\\") { displayName pictureUrl } } }\"}")
    
    picture=$(echo "$result" | grep -o '"pictureUrl":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$picture" ]; then
        if [ "$first" = true ]; then
            first=false
        else
            echo ","
        fi
        echo "  \"$name\": \"$picture\""
    fi
done
echo ""
echo "}"
