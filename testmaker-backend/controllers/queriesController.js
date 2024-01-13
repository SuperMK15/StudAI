const Query = require('../models/Query');
const User = require('../models/User');

const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
function isValidObjectId(id) { return mongoose.Types.ObjectId.isValid(id); }


// @desc    Get all queries
// @route   GET /queries
// @access  Private
const getAllQueries = asyncHandler(async (req, res) => {
    // fetch all queries from db
    const queries = await Query.find().lean();

    // handle the case where no queries are found
    if (!queries?.length) return res.status(404).json({ message: 'No queries found in DB' });

    res.json(queries); // send the queries back to the client
});


// @desc    Get queries by user id
// @route   GET /queries/:user_id
// @access  Private
const getQueriesByUserId = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    // validate user_id
    if (!user_id) return res.status(400).json({ message: 'Missing user id' });
    if (!isValidObjectId(user_id)) return res.status(400).json({ message: 'Invalid user id' });

    // fetch queries from db that have the user_id attribute equal to the user_id param
    const queries = await Query.find({ user_id }).lean();

    // handle the case where no queries are found
    if (!queries?.length) return res.status(404).json({ message: 'No queries found in DB' });

    res.json(queries); // send the queries back to the client
});


// @desc    Create a query
// @route   POST /queries
// @access  Private
const createQuery = asyncHandler(async (req, res) => {
    const { user_id, title, lecture_note_input, test_output } = req.body;

    // ensure all required fields are present
    if (!user_id || !title || !lecture_note_input || !test_output) return res.status(400).json({ message: 'Missing required fields' });

    // validate user_id
    if (!isValidObjectId(user_id)) return res.status(400).json({ message: 'Invalid user id' });

    // create a new query
    const queryObject = new Query({
        user_id,
        title,
        lecture_note_input,
        test_output
    });

    // save the query to the db and log response
    const newQuery = await Query.create(queryObject);
    if (newQuery) res.status(201).json({ message: `Contest with title ${title} created successfully` });
    else res.status(400).json({ message: 'Contest creation failed' });
});


// @desc    Delete a query
// @route   DELETE /queries
// @access  Private
const deleteQuery = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // validate query_id
    if (!id) return res.status(400).json({ message: 'Missing query id' });
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid query id' });

    // delete the query from the db
    const deletedQuery = await Query.findByIdAndDelete(id);
    if (deletedQuery) res.status(200).json({ message: `Query with id ${id} deleted successfully` });
    else res.status(400).json({ message: `Query with id ${id} could not be deleted` });
});


module.exports = {
    getAllQueries,
    getQueriesByUserId,
    createQuery,
    deleteQuery
};