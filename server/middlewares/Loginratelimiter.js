import { rateLimit } from "express-rate-limit";

//defining rate limitting option

const loginRateLimiter=rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Maximum 5 requests from a single IP in the defined window
    message: 'Too many login attempts, please try again later after 15min.',

})

export default loginRateLimiter