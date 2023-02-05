const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },

    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'review'
    }
);

module.exports = Review;