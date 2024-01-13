const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// @desc    Login a user
// @route   POST /auth
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body; // get the username and password from the request body

    // confirm data is valid
    if (!username || !password) res.status(400).json({ message: 'Error: Username and password is required for login' });

    // fetch the user from db and confirm user exists
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.status(401).json({ message: 'Unauthorized: Username Invalid' });

    // compare the password with the hashed password in the db
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: 'Unauthorized: Password Invalid' });

    // create the access token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": foundUser._id,
                "username": foundUser.username,
                "role": foundUser.role
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    // create the refresh token
    const refreshToken = jwt.sign(
        { "id": foundUser._id, "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // create a secure cookie containing the refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: false, // cookie cannot be accessed by client-side scripts
        secure: false, // cookie will only be sent over HTTPS
        sameSite: 'none', // cookie can be sent for cross-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie will expire after 7 days, set to match the expiration of the refresh token
    });

    res.json({ accessToken }); // send the access token to the client
});


// @desc    Register a user
// @route   POST /auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { username, password, first_name, last_name } = req.body; // destructuring the request body

    // confirm data is valid
    if (!username || !password || !first_name || !last_name) {
        res.status(400).json({ message: 'Error: All fields are required for registration' });
    }

    // check if username is already taken and if so, return an error
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) return res.status(400).json({ message: `Error: Username ${username} is already taken` });

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create and save the user
    const UserObject = {
        username,
        password: hashedPassword,
        first_name,
        last_name,
        queries_ids: []
    };
    const newUser = await User.create(UserObject);
    if (newUser) res.status(201).json({ message: `User ${username} created successfully` });
    else res.status(500).json({ message: `Error: User ${username} could not be created` });
});


// @desc    Refresh a user's access token (in the event that the access token expires)
// @route   GET /auth/refresh
// @access  Public
const refresh = (req, res) => {
    const cookies = req.cookies; // get the cookies from the request
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' }); // if no refresh token is found, return an error
    const refreshToken = cookies.jwt; // get the refresh token from the cookies

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' }); // if the refresh token is invalid, return an error

            // fetch the user from the db
            const foundUser = await User.findById(decoded.id).exec();
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' }); // if the user is not found, return an error

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": foundUser._id,
                        "username": foundUser.username,
                        "role": foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ accessToken }); // send the access token to the client
        })
    );
};


// @desc    Logout a user
// @route   GET /auth/logout
// @access  Public
const logout = (req, res) => {
    const cookies = req.cookies; // get the cookies from the request
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' }); // if no refresh token is found, return an error

    // clear the refresh token cookie if it exists and send a success message to the client
    res.clearCookie('jwt', { httpOnly: false, secure: false }); // SECURE MUST BE SET TO TRUE WHEN USING WITH FRONTEND
    res.status(200).json({ message: 'Logout successful' });
}


module.exports = {
    login,
    register,
    refresh,
    logout
};