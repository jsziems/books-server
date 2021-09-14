const { DataTypes } = require('sequelize');
const db = require('../db')

// ToDo:  Add constraints
const Book = db.define("book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    media: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    readStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
})

module.exports = Book