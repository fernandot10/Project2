const router = require('express').Router();

const { Album, User  } = require('../models/');

const withAuth = require('../utils/auth');

// GET Route for Landing Page / Login
router.get('/', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
  res.render('dashboard', { 
    loggedIn: req.session.loggedIn });

});

// GET Route for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log("is it trying?")
    const albumReviewData = await Album.findAll({
      where: {
        user_id: req.session.userId
      }
    });
    console.log("it tried")

    const albums = albumReviewData.map((gallery) => gallery.get({ plain: true }))
    
    res.render('dashboard', { 
      albums,
      loggedIn: req.session.loggedIn });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new-post', withAuth, async(req, res) => {
  try {
    res.render('new-post', {
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/reviews/:id', withAuth, async (req, res) => {
  try {
    const albumReviewData = await Album.findByPk(req.params.id);
    
    const album = albumReviewData.get({ plain: true });
  
    res.render('review', {
      album,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', {
    loggedIn: req.session.loggedIn
  });

});

// router.get('/logout', (req, res) => {
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//     return;
//   }
//
// });

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;