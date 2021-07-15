const Redis = require("ioredis");
let redisClient = new Redis(process.env.REDIS_URI);
export default redisClient;
