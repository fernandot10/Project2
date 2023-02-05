// Allow necessary directories and and enable routing
const router = require('express').Router();

const userRoutes = require('./user-routes');
// const albumRoutes = require('./album-routes');
const reviewRoutes = require('./review-routes');

router.use('/users', userRoutes);
// router.use('/albums', albumRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
