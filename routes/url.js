
const express = require('express');
const router = express.Router();
const { handlegenerateNewShortURL } = require('../controllers/url');

router.post('/', handlegenerateNewShortURL);

module.exports = router;
