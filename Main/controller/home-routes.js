const router = require('express').Router();
const withAuth = require('../utils/auth');

// Homepage Route - Gives user option to login or sign-up. 


// Redirects users if already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/api/reviews');
      return;
    }
  
    res.render('login');
});

module.exports = router;