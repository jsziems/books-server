const { DataTypes } = require('sequelize');
const db = require('../db')

// ToDo:  Add constraints
const User = db.define("user", {
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    }
})

module.exports = User