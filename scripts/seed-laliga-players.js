const { seedLaLigaFullSquads } = require('../lib/players-firestore');

async function main() {
    console.log('🚀 Starting La Liga player data upload...\n');

    try {
        const result = await seedLaLigaFullSquads();

        console.log('\n✅ Upload complete!');
        console.log(`📊 Total players loaded: ${result.totalPlayers}`);
        console.log(`🏆 Teams loaded: ${result.teams.length}`);
        console.log(`\nTeams: ${result.teams.join(', ')}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading players:', error);
        process.exit(1);
    }
}

main();
