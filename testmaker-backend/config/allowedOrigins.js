const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? 'N/A' : 'http://localhost:3000'
];

module.exports = allowedOrigins;