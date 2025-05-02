import rateLimit from 'express-rate-limit';
import config from '../config/env.js';

/**
 * Rate limiting middleware to prevent excessive requests from a single IP.
 *
 * @constant
 * @type {import("express-rate-limit").RateLimitRequestHandler}
 *
 * @description
 * This limiter restricts the number of requests a client can make within a time window.
 * The window and max requests are configured via environment variables.
 *
 * @property {number} windowMs - Time window in milliseconds for rate limiting (e.g., 15 minutes).
 * @property {number} max - Maximum number of requests allowed from a single IP within the window.
 * @property {Object} message - Custom response sent when the limit is exceeded.
 * @property {boolean} standardHeaders - Whether to use the standardized `RateLimit-*` headers.
 * @property {boolean} legacyHeaders - Whether to include the deprecated `X-RateLimit-*` headers.
 */
const limiter = rateLimit({
    windowMs: config.RATE_LIMITING_WINDOW,
    max: config.RATE_LIMITING_MAX,
    message:{
        status:429,
        message:'Too many requests from this IP, please try again later'
    },
    standardHeaders:true,
    legactyHeaders:false
})

export default limiter;