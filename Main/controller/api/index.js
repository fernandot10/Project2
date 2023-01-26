const router = require('express').Router();

const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./userRoutes')

router.use('/reviews', reviewRoutes);
router.use('/users', reviewRoutes);

module.exports = router;
