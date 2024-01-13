require('dotenv').config();
require('express-async-errors');

const { errorHandler } = require('./middleware/errorHandler');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/queries', require('./routes/queryRoutes'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
});