const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')

const UserModel = require('./userModel')
const BookModel = require('./bookModel')

// const User = DefineUser(sequelize, DataTypes)
// const Book = DefineBook(sequelize, DataTypes)

module.exports = {
    UserModel,
    BookModel
}

UserModel.hasMany(BookModel)
BookModel.belongsTo(UserModel)