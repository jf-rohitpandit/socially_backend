const express = require('express');
const router = express.Router();

router.post('/post', uploadPost);

module.exports = router;