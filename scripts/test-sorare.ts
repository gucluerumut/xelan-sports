/**
 * Test script to fetch Sorare images for Barcelona players
 * Run with: node --loader ts-node/esm scripts/test-sorare.ts
 */

import { fetchBarcelonaImages } from "../lib/sorare-api";

async function main() {
    console.log("🔍 Fetching Sorare images for Barcelona players...\n");

    const results = await fetchBarcelonaImages();

    console.log("\n✅ Results:");
    console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
