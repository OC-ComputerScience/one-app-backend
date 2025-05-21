const rateLimit = require('express-rate-limit');

// Create rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    // Use IP address and email as the key for rate limiting
    return `${req.ip}-${req.body.email || 'unknown'}`;
  }
});

module.exports = {
  loginLimiter
}; 