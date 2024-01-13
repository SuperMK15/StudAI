const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minute window
    max: 5, // start blocking after 5 requests
    message: { message: 'Too many login attempts from this IP, please try again after 2 minutes' },
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

module.exports = loginLimiter;