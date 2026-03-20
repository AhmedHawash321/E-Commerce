import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Use Upstash URL if available, otherwise fall back to localhost

console.log("URL protocol:", process.env.UPSTASH_REDIS_URL?.split("://")[0]);
export const redis = process.env.UPSTASH_REDIS_URL
  ? new Redis(process.env.UPSTASH_REDIS_URL, {
    tls: { rejectUnauthorized: false }
  })
  : new Redis({
      host: "localhost",
      port: 6379,
      maxRetriesPerRequest: 3,
    });

let connectionAttempted = false;



redis.on("error", (err) => {
  if (!connectionAttempted) {
    console.log("Redis connection failed. Caching will be disabled.");
    console.log("ℹThis is normal if Redis is not running locally.");
    connectionAttempted = true;
  }
});

redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
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
  },
};
