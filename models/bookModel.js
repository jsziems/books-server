const { DataTypes } = require('sequelize');
const db = require('../db')

// ToDo:  Add constraints
const Book = db.define("book", {
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    link: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    },
    media: {
        type: DataTypes.STRING
    },
    readStatus: {
        type: DataTypes.STRING
    },
    summary: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.STRING
    }
})

module.exports = Book