const router = require('express').Router();
const { Album, User  } = require('../models/');
const withAuth = require('../utils/auth');

// GET Route for Homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const albumData = await Album.findAll({
      include: [
        {
          model: User,
          attributes: ['email']
        },
      ],
      limit: 10,
      order: [['id', 'DESC']]
    });

    // Serialize data
    const albums = albumData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { albums });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/album/:id', async (req, res) => {
  try {
    const albumData = await Album.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    const Album = albumData.get({ plain: true });

    res.render('album', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('signup');
});

module.exports = router;