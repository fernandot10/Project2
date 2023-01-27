const router = require('express').Router();
const withAuth = require('../utils/auth');

// GET Route for Homepage
router.get('/', (req, res) => {
  // redirects user to login page if not signed in

  // otherwise redirects user to dashboard
});

// GET Route for Dashboard that shows all albums reviewed so far
router.get('/dashboard', withAuth, (req, res) => {

});

// GET route for showing a specific review
router.get('/reviews/:id', withAuth, (req, res) => {

});

// POST route for creating a new review
router.post('reviews', withAuth, (req, res) => {

});

// Redirects users if already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

module.exports = router;