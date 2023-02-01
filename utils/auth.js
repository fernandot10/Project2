// If the user isn't logged in, redirect the user to the login route
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next()
    };
  };
  
  module.exports = withAuth;  