const router = require('express').Router();
const { User } = require('../../models');

// POST route for signing up

// POST route for logging in
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        
        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        
        // const validPassword = await userData.checkPassword(req.body.password);

        // use `bcrypt.compare()` to compare the provided password and the hashed password
        const validPassword = await bcrypt.compare(
          req.body.password,
          userData.password
        )

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
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
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;