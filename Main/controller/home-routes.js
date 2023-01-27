const router = require('express').Router();
const withAuth = require('../utils/auth');

// Homepage Route - Shows Dashboard when user is Logged In, redirects to login/sign-up page when not logged in 


// Login Route that redirects users to Homepage if already logged in

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

module.exports = router;