const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? 'N/A' : 'http://localhost:5173'
];

module.exports = allowedOrigins;