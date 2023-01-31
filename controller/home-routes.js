const router = require('express').Router();
const { User } = require('../../../../UNCC-VIRT-FSF-PT-10-2022-U-LOLC/14-MVC/01-Activities/22-Stu_MVC-Review/Solved/models');
const Album = require('../models/Album');
const withAuth = require('../utils/auth');

// GET Route for Homepage
router.get('/', withAuth, (req, res) => {
  try {
    const albumData = await Album.findAll({
      limit: 10,
      order: [['id', 'DSC']]
    });

    const albums = albumData.map((project) => project.get({ plain: true }));

    res.render('homepage', { albums });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Route for showing all albums reviewed 
router.get('/albums', withAuth, async (req, res) => {
  try {
    // variable for getting all albums reviewed from Model
    const albumsReviewed = await Album.findAll({
      include: [{ model: Reviews }],
      order: [['title', 'ASC']],
    });

    // serialize data so templates can read
    const albums = albumsReviewed.map((project) => project.get({ plain: true }));

    // pass serialized data into handlebars
    res.render('albums', { albums })
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for a specific album & its reviews
router.get('/albums/:id', withAuth, async (req, res) => {
  try {
    const albumsReviewed = await Albums.findByPk(req.params.id, {
      include: [{ model: Reviews }],
    });

    // serialize data so templates can read
    const album = albumsReviewed.map((project) => project.get({ plain: true }));

    // pass serialized data into handlebars
    res.render('album', { album });
  } catch (err) {
    res.status(500).json(err);
  }
})

// GET route for showing all reviews 
router.get('/reviews', withAuth, (req, res) => {
  try {
    // variable for getting all reviews in general
    const allReviews = await Reviews.findAll({
      include: [{ model: Albums }],
    });

    const reviews = allReviews.map((project) => project.get({ plain: true }));
    // rendering reviews on page
    res.render('reviews', { reviews });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for showing a specific review
router.get('/reviews/:id', withAuth, (req, res) => {
  try {
    const allReviews = await Reviews.findByPk(req.params.id, {
      include: [{ model: Albums }],
    });

    // serialize data so templates can read
    const review = allReviews.map((project) => project.get({ plain: true }));

    // pass serialized data into handlebars
    res.render('review', { review });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route for creating a new review
router.post('/reviews', withAuth, async (req, res) => {
  try {
    // variable for album review data - gets data for album, then data for review
    const reviewData = await Reviews.create({
      rating: req.body.rating,
      comment: req.body.comment,
      album_id: req.body.album_id,
      user_id: req.body.user_id,
    });

    // show 200 status if successful
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route for deleting a review
router.delete('/reviews/:id', withAuth, async (req, res) => {
  try {
    // use .destroy
    const reviewData = await Reviews.destroy({
      where: {
        id: req.params.id,
      },
    });

    //if no id found gives 404
    if (!reviewData) {
      res.status(404).json({'No review found with that id!'});
      return;
    }

    // status 200 if successful
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Redirects users if already logged in
router.get('/login', withAuth, (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

module.exports = router;