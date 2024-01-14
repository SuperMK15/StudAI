const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? 'hhttps://studai-8en7.onrender.com' : 'http://localhost:5173'
];

module.exports = allowedOrigins;