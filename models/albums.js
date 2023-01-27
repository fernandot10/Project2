const {Model, DataTypes } = require('sequelize');
const { DataTypes } = require("sequelize");


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
        date_release: {
            type: DataTypes.DATE,
            allowNull:false,
        },
    }
);
