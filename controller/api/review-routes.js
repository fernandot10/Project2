const router = require('express').Router();
const { Album, Review } = require('../../models/');
const withAuth = require('../../utils/auth');

// GET route for showing all reviews 
router.get('/', withAuth, async (req, res) => {
    try {
      // variable for getting all reviews in general
      const allAlbumReviews = await Album.findAll();

      console.log(allAlbumReviews);
  
      res.status(200).json(allAlbumReviews);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET route for showing a specific review
  router.get('/:id', withAuth, async (req, res) => {
    try {
      const albumReviewData = await Album.findByPk(req.params.id);
  
      res.status(200).json(albumReviewData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // POST route for creating a new review
  router.post('/new-post', withAuth, async (req, res) => {
    try {
       // variable for album data
      const albumReviewData = await Album.create({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        year: req.body.year,
        cover: req.body.cover,
        review: req.body.review,
        user_id: req.session.userId
      })

      console.log(albumReviewData);

      res.status(200).json(albumReviewData);

    } catch (err) {
      res.status(500).json(err);
    }
  });

  // PUT route for editing a review
  
  // DELETE route for deleting a review
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      // use .destroy
      const albumReviewData = await Album.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      //if no id found gives 404
      if (!albumReviewData) {
        res.status(404).json('No review found with that id!');
        return;
      }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;