import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Use Upstash URL if available, otherwise fall back to localhost
const redisConfig = process.env.UPSTASH_REDIS_URL || {
    host: 'localhost',
    port: 6379,
    // Reduce retries to fail faster locally
    maxRetriesPerRequest: 3,
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    lazyConnect: true,
};

export const redis = new Redis(redisConfig);

let connectionAttempted = false;

redis.on('error', (err) => {
    if (!connectionAttempted) {
        console.log('⚠️ Redis connection failed. Caching will be disabled.');
        console.log('ℹ️ This is normal if Redis is not running locally.');
        connectionAttempted = true;
    }
});

redis.on('connect', () => {
    console.log('✅ Redis connected successfully');
    connectionAttempted = true;
});

// Graceful fallback for Redis operations
export const safeRedis = {
    async get(key) {
        try {
            return await redis.get(key);
        } catch (error) {
            console.log(`Redis get failed for ${key}, returning null`);
            return null;
        }
    },
    
    async set(key, value) {
        try {
            return await redis.set(key, value);
        } catch (error) {
            console.log(`Redis set failed for ${key}`);
            return null;
        }
    }
};