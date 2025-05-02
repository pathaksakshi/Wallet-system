import dotenv from 'dotenv';

dotenv.config()

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    RATE_LIMITING_WINDOW:  process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
    RATE_LIMITING_MAX: process.env.RATE_LIMIT_MAX || 100,
    FRONTEND_URL: process.env.FRONTEND_URL
}