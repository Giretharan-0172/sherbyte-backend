const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres.kpcksbtwysxqqzynycst:BbU6XXccYain6k0a@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function run() {
    await client.connect();
    try {
        const rawRes = await client.query('SELECT count(*) FROM raw_articles');
        console.log('Raw Articles Count:', rawRes.rows[0].count);

        const res = await client.query('SELECT count(*) FROM articles');
        console.log('Processed Articles Count:', res.rows[0].count);

        // Check if there are unprocessed raw articles
        const unRes = await client.query('SELECT count(*) FROM raw_articles WHERE is_processed = false');
        console.log('Unprocessed Raw Articles:', unRes.rows[0].count);
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}
run();
