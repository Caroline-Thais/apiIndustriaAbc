const sequelize = require('sequelize');


const connection = new sequelize('maquinaapi', 'root', 'Passei1t', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;