const { Sequelize } = require('sequelize');

// const db = new Sequelize("postgres://postgres:michael3@localhost:5432/Book-db")

const db = new Sequelize(
        process.env.DB_DBNAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
        host: process.env.DB_HOST,
        dialect: 'postgres'
      }
    );

module.exports = db