/**
 * Sorare GraphQL API integration for fetching player images
 */

const SORARE_API_URL = "https://api.sorare.com/graphql";

interface SorarePlayerResponse {
    data: {
        football: {
            player: {
                displayName: string;
                pictureUrl: string | null;
            } | null;
        };
    };
}

/**
 * Fetch player picture from Sorare by slug
 * Sorare slugs are like: "robert-lewandowski"
 */
export async function fetchSorarePlayerImage(slug: string): Promise<string | null> {
    const query = `
        query PlayerBySlug($slug: String!) {
            football {
                player(slug: $slug) {
                    displayName
                    pictureUrl(derivative: "tinified")
                }
            }
        }
    `;

    try {
        const response = await fetch(SORARE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: { slug },
            }),
        });

        if (!response.ok) {
            console.error(`Sorare API error: ${response.status}`);
            return null;
        }

        const data: SorarePlayerResponse = await response.json();
        return data.data.football.player?.pictureUrl || null;
    } catch (error) {
        console.error(`Error fetching Sorare image for ${slug}:`, error);
        return null;
    }
}

/**
 * Barcelona players with their Sorare slugs
 * Sorare uses lowercase names with hyphens
 */
export const BARCELONA_SORARE_SLUGS: Record<string, string> = {
    "Gavi": "pablo-paez-gavira",
    "Pedri": "pedro-gonzalez-lopez",
    "Frenkie de Jong": "frenkie-de-jong",
    "Ronald Araújo": "ronald-araujo",
    "Alejandro Balde": "alejandro-balde",
    "Marc-André ter Stegen": "marc-andre-ter-stegen",
    "Robert Lewandowski": "robert-lewandowski",
    "Jules Koundé": "jules-kounde",
    "Raphinha": "raphael-dias-belloli",
    "Fermín López": "fermin-lopez",
};

/**
 * Test function to fetch images for all Barcelona players
 */
export async function fetchBarcelonaImages() {
    const results: Record<string, string | null> = {};

    for (const [name, slug] of Object.entries(BARCELONA_SORARE_SLUGS)) {
        console.log(`Fetching image for ${name}...`);
        const imageUrl = await fetchSorarePlayerImage(slug);
        results[name] = imageUrl;

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return results;
}
