const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const queriesController = require('../controllers/queriesController');

router.use(verifyJWT);

router.route('/')
    .get(queriesController.getAllQueries)
    .post(queriesController.createQuery)
    .delete(queriesController.deleteQuery);

router.route('/:user_id')
    .get(queriesController.getQueriesByUserId);

module.exports = router;