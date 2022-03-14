const sequelize = require('sequelize');
const connection = require('./database');

const Maquina = connection.define('maquinas', {
    nome:{
        type: sequelize.STRING,
        allowNull: false
    },
    status:{
        type: sequelize.STRING,
        allowNull: true
    },
    data:{
        type: sequelize.DATE,
        allowNull: false
    }
});

//Maquina.sync({force: true});

module.exports = Maquina;