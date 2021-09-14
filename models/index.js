const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')

const UserModel = require('./userModel')
const BookModel = require('./bookModel')

UserModel.hasMany(BookModel)
// BookModel.belongsTo(UserModel)
BookModel.belongsTo(UserModel, {
    onDelete: 'CASCADE',
    hooks: true
})

module.exports = {
    UserModel,
    BookModel
}

