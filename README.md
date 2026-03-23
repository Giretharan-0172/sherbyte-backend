# SherByte Backend 🚀

SherByte is an AI-powered news aggregator and editor tailored for Indian readers aged 18-35. The backend is built with Spring Boot and leverages Google Gemini to rewrite, simplify, and categorize raw news articles fetched from various global news APIs.

## Tech Stack 🛠️
- **Framework:** Java 17 + Spring Boot 3.2.x
- **Database:** PostgreSQL (hosted on Supabase)
- **Caching:** Redis (hosted on Upstash)
- **AI Processing:** Google Gemini 2.5 Flash
- **News Sources:** NewsAPI, GNews, Currents API
- **Security:** Custom JWT Authentication & CORS config

## Features ✨
- **Automated Ingestion:** Periodically fetches raw news from multiple API sources.
- **AI Rewriting:** Uses Gemini AI to transform raw articles into jargon-free, neutral, 150-word summaries with auto-generated quizzes and vocabulary definitions.
- **Robust Caching:** Redis caching for ultra-fast feed delivery.
- **Secure Endpoints:** JWT-based protection for sensitive routes.

## Local Development 💻

### Prerequisites
- JDK 17
- Maven
- Supabase Project (PostgreSQL)
- Upstash Redis instance

### Setup
1. Clone the repository.
2. Create a `.env` file in the root directory based on the following template:
   ```env
   # Supabase
   SUPABASE_DB_HOST=aws-X-ap...pooler.supabase.com
   SUPABASE_DB_USERNAME=postgres.[project]
   SUPABASE_DB_PASSWORD=your_password

   # News APIs
   NEWSAPI_KEY=your_key
   GNEWS_KEY=your_key
   CURRENTS_KEY=your_key

   # Google Gemini
   GEMINI_API_KEY=your_gemini_key

   # Redis
   REDIS_URL=rediss://default:...@...upstash.io:6379

   # Security
   JWT_SECRET=your_jwt_secret
   ALLOWED_ORIGINS=http://localhost:5500
   ```
3. Ensure your local IP is allowed in your Supabase Network Restrictions if you face `EOFException` or timeout issues.
4. Run the application:
   ```bash
   mvn clean spring-boot:run
   ```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
