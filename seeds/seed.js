const sequelize = require('../config/connection');
const { Users, Album } = require('../models');

const projectData = require('./albumData.json');
const usersData = require('./usersData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await Users.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
    });

    for (const Album of albumData) {
        await Album.create({
            ...project,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
