const sequelize = require('../config/connection');
const { User, Album } = require('../models');

const albumData = require('./albumData.json');
const usersData = require('./usersData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
    });

    for (const album of albumData) {
        await Album.create({
            ...album
        });
    }

    process.exit(0);
};

seedDatabase();
