import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config()

// Create Redis connection with error handling
const redisConfig = {
    host: 'localhost',
    port: 6379,
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
    lazyConnect: true,
    retryDelayOnClusterDown: 300,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
};

export const redis = new Redis(redisConfig);

redis.on('error', (err) => {
    // Only log the first error to avoid spam
    if (!redis._errorLogged) {
        console.log('Redis connection error:', err.message);
        console.log('Redis will retry connection automatically');
        redis._errorLogged = true;
    }
});

redis.on('connect', () => {
    console.log('Redis connected successfully');
    redis._errorLogged = false;
});