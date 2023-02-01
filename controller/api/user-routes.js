const router = require('express').Router();
const { User } = require('../../models');

// POST route for creating a new user 
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route to find the user who matches the posted email
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        
        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // Verifies the posted password with the password stored in the database
        const validPassword = await userData.checkPassword(req.body.password);
        
        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST route for logging out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Removes the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;