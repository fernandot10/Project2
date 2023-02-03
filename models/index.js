const User = require('./Users');
const Album = require('./Album');

User.hasMany(Album, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Album.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Album };