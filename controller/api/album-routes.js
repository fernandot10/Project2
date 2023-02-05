// const router = require('express').Router();
// const { Album, Review } = require('../../models/');
// const withAuth = require('../../utils/auth');

// // GET Route for showing all albums reviewed 
// router.get('/', async (req, res) => {
//     try {
//       // variable for getting all albums reviewed from Model
//       const albumsReviewed = await Album.findAll();

//       console.log(albumsReviewed);

//       res.status(200).json(albumsReviewed);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   // GET route for a specific album & its reviews
//   router.get('/:id', withAuth, async (req, res) => {
//     try {
//       const albumsReviewed = await Album.findByPk(req.params.id, {
//         include: [{ model: Reviews }],
//       });
  
//       // serialize data so templates can read
//       const album = albumsReviewed.map((project) => project.get({ plain: true }));
  
//       // pass serialized data into handlebars
//       res.render('album', { album });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   })  

// module.exports = router;