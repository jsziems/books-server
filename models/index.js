const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')

const UserModel = require('./userModel')
const BookModel = require('./bookModel')

UserModel.hasMany(BookModel, {
    onDelete: 'CASCADE',
    hooks: true
})
BookModel.belongsTo(UserModel)

module.exports = {
    UserModel,
    BookModel
}

