const Users = require('./Users');
const Album = require('./Album');

Users.hasMany(Album, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Album.belongsTo(Users, {
  foreignKey: 'user_id'
});

module.exports = { Users, Album };