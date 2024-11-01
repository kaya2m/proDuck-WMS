const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('Roles endpoint');
});

module.exports = router;
