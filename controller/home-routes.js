const router = require('express').Router();
const { Album, User } = require('../models/');
const withAuth = require('../utils/auth');

// GET Route for Landing Page / Login
router.get('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Route for Homepage
router.get('/homepage', withAuth, async (req, res) => {
  try {
    res.render('homepage', { 
      logged_in: req.session.logged_in });
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

router.get('/logout', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('logout');
})
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;