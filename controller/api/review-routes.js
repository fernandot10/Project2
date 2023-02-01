const router = require('express').Router();
const { Album, Reviews } = require('../../models/');
const withAuth = require('../../utils/auth');

// GET route for showing all reviews 
router.get('/', withAuth, async (req, res) => {
    try {
      // variable for getting all reviews in general
      const allReviews = await Reviews.findAll({
        include: [{ model: Album }],
      });
  
      const reviews = allReviews.map((project) => project.get({ plain: true }));
      // rendering reviews on page
      res.render('reviews', { reviews });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET route for showing a specific review
  router.get('/:id', withAuth, async (req, res) => {
    try {
      const allReviews = await Reviews.findByPk(req.params.id, {
        include: [{ model: Album }],
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
  router.post('/', withAuth, async (req, res) => {
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

  // PUT route for editing a review
  
  // DELETE route for deleting a review
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      // use .destroy
      const reviewData = await Reviews.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      //if no id found gives 404
      if (!reviewData) {
        res.status(404).json('No review found with that id!');
        return;
      }
  
      // status 200 if successful res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;