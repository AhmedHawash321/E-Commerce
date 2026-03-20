# 🛒 Full-Stack E-Commerce Platform

A robust, scalable E-Commerce solution built with the **PERN Stack** (PostgreSQL, Express, React, Node.js) but enhanced with **MongoDB Atlas**, **Redis** for high-performance caching, and **Stripe** for secure payments.


## 🚀 Key Features

* **Secure Authentication:** JWT-based auth with Access & Refresh tokens stored in cookies.
* **High-Performance Caching:** Integrated **Redis (Upstash)** to optimize session management and reduce DB load.
* **Resilient Architecture:** Implemented a **Graceful Fallback** mechanism for Redis to ensure 100% uptime even if the cache layer is down.
* **Cloud Infrastructure:** Fully integrated with **MongoDB Atlas** for data persistence and **Cloudinary** for optimized image management.
* **Payment Integration:** Complete **Stripe** checkout flow including support for discount coupons.
* **Real-time Analytics:** Admin dashboard with visual charts (Recharts) to track sales and revenue.

## 🛠️ Technical Stack

- **Frontend:** React 18, Tailwind CSS, Zustand (State Management), Framer Motion.
- **Backend:** Node.js, Express.js.
- **Databases:** MongoDB (Mongoose), Redis (ioredis).
- **Security:** Bcrypt.js, JWT, CORS, Cookie-parser.
- **DevOps:** Environment variable management via Dotenv, Git for version control.

## 🏗️ Architectural Highlight: Resilience & Failover

One of the core strengths of this project is the **SafeRedis Wrapper**. Unlike standard implementations, this project uses a custom singleton pattern that prevents the application from crashing if the Redis server is unavailable.

```javascript
// Graceful fallback example
export const safeRedis = {
    async get(key) {
        try {
            return await redis.get(key);
        } catch (error) {
            console.log(`Redis failure: falling back to DB for ${key}`);
            return null;
        }
    }
};
```
📸 ScreenshotsLogin 

Login Interface,Product Management
,
<img width="2880" height="1367" alt="Screenshot 2026-03-20 224204" src="https://github.com/user-attachments/assets/ecdc06d1-6b0d-4ce9-b8a9-d8315dfa0c43" />

## ⚙️ Environment Setup

To run this project locally, create a `.env` file in the root directory and add the following configuration. Each variable should be on a **new line** for clarity:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
UPSTASH_REDIS_URL=your_upstash_redis_url

# Authentication Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Third-party Services
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App Environment
NODE_ENV=development
CLIENT_URL=http://localhost:5173

🚀 Getting Started

1 - Clone the repo

2 - Install dependencies:
```
npm run build
```
3 - Run the development server:
```
npm run dev
```
Developed with ❤️ by [Ahmed Hawash]

