require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING
    }
})

;(async () => {
    await sequelize.sync()
})();

//      Test connection
//      iife -- requires semicolon on previous line (or before the (async...))
// ;(async () => {
//     try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

//     REFERENCES
// Set up Sequelize:  https://sequelize.org/master/manual/getting-started.html
// Create an .env file: https://www.npmjs.com/package/dotenv
// Define the db model:  https://sequelize.org/master/manual/model-basics.html

