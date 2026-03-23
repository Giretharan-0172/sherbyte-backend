const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres.kpcksbtwysxqqzynycst:BbU6XXccYain6k0a@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

const GEMINI_KEY = 'AIzaSyABFxvePrQi_tvnJHXzqh5m-pigscSqLxw';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

async function run() {
    await client.connect();
    try {
        const rawRes = await client.query('SELECT title, body FROM raw_articles WHERE is_processed = false LIMIT 1');
        if (rawRes.rows.length === 0) {
            console.log('No unprocessed articles found');
            return;
        }
        const raw = rawRes.rows[0];
        const prompt = "You are SherByte's AI editor. Transform raw news for Indian readers aged 18-35.\n" +
            "Output ONLY valid JSON with this exact structure — no markdown, no preamble:\n" +
            "{\n  \"title\": \"Clear headline under 12 words\",\n  \"preview\": \"55-65 word plain-language summary\",\n  \"body\": \"150-180 word neutral rewrite, no jargon\",\n  \"category\": \"tech|society|economy|nature|arts|selfwell|philo\",\n  \"topics\": [\"topic1\", \"topic2\"],\n  \"quiz\": [{\"q\":\"question\",\"opts\":[\"a\",\"b\",\"c\",\"d\"],\"ans\":0,\"explain\":\"1 sentence\"}],\n  \"word\": {\"word\":\"term\",\"phonetic\":\"/pron/\",\"part_of_speech\":\"noun\",\"definition\":\"plain def\"}\n}" +
            "\n\nARTICLE:\nTitle: " + raw.title + "\nBody: " + (raw.body ? raw.body.substring(0, 3000) : "");

        const body = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
        };

        console.log('Sending request to Gemini...');
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const text = await res.text();
        console.log('HTTP Status:', res.status);
        console.log('Response:', text);

    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}
run();
