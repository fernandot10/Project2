const router = require('express').Router();
const withAuth = require('../utils/auth');

// GET Route for Homepage
router.get('/', (req, res) => {
  // redirects user to login page if not signed in
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  } else {
    res.redirect('/login');
    return;
  }
  // otherwise redirects user to dashboard
});

// GET Route for Dashboard that shows all albums reviewed so far
router.get('/dashboard', withAuth, (req, res) => {
  try {
    // variable for getting all album reviews from Model

    // render albums on page
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route for showing all reviews 
router.get('/reviews', withAuth, (req, res) => {
  try {
    // variable for getting all reviews in general

    // rendering reviews on page
  }
})

// GET route for showing a specific review
router.get('/reviews/:id', withAuth, (req, res) => {
  try {
    // variable for getting single album review by id

    // render album on page
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route for creating a new review
router.post('/reviews', withAuth, (req, res) => {
  try {
    // variable for album review data - gets data for album, then data for review

    // show 200 status if successful
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route for deleting a review
router.delete('/reviews/:id', (req, res) => {
  // use .destroy

  //if no id found gives 404

  // status 200 if successful
})

// Redirects users if already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

module.exports = router;