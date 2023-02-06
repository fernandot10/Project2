const router = require('express').Router();
const { User } = require('../../models/');
const bcrypt = require('bcrypt');

// Get a list of all users
router.get('/', async (req, res) => {
  try {
    const usersRegistered = await User.findAll({
      order: [['email', 'ASC']]
    });

    const users = usersRegistered.map((project) => project.get({ plain: true }));

    res.json(users)
  } catch (err) {
    res.status(500).json(err);
  }
})

// POST route for signing up
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.status(200).json(newUser);

    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route for logging in
router.post('/login', async (req, res) => {
    try {
        console.log('Are you logging in?')
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log('made it this far')
        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        console.log(userData);
        // const validPassword = await userData.checkPassword(req.body.password);

        // use `bcrypt.compare()` to compare the provided password and the hashed password
        const validPassword = await bcrypt.compare(
          req.body.password,
          userData.password
        )

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        console.log('made it further')
        req.session.save(() => {
          //Possibly need to change back to user_id and logged_in and apply to handlebars
            req.session.userId = userData.id;
            req.session.email = userData.email;
            req.session.loggedIn = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST route for logging out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;