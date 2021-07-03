const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

export default redisClient;
