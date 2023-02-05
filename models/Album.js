const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Album extends Model { }

Album.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },

    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'album'
    }
);

module.exports = Album;