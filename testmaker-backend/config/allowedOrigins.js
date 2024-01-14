const allowedOrigins = [
    process.env.NODE_ENV === 'production' ? 'https://StudAI.onrender.com' : 'http://localhost:5173'
];

module.exports = allowedOrigins;