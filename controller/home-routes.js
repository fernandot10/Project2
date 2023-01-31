const router = require('express').Router();
const { Album } = require('../models/');
const withAuth = require('../utils/auth');

// GET Route for Homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const albumData = await Album.findAll({
      limit: 10,
      order: [['id', 'DSC']]
    });

    const albums = albumData.map((project) => project.get({ plain: true }));

    res.render('homepage', { albums });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;