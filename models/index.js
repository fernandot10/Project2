const User = require('./Users');
const Album = require('./Album');
// const Review = require('./Review');

User.hasMany(Album, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// User.hasMany(Review, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// })

Album.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Album };