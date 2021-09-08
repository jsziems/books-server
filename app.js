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

const Book = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    Link: {
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

//      One to Many
User.hasMany(Book)
Book.belongsTo(User)

;(async () => {
    // await sequelize.sync({force: true})
    await sequelize.sync()

    let my_user = await User.create({
        email: "janet"
    })
    let my_book = await Book.create({ title: "Best Book Ever"})
    let my_book2 = await Book.create({title: "Another Awesome One"})

    await my_user.setBooks(my_book)
    await my_user.addBooks([my_book, my_book2])
    console.log(await my_user.getBooks())

    let resultUser = await User.findOne({
        where: {
            id: 24
        }
    })
    console.log(await resultUser.getBooks())
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
// Define db associations:  https://sequelize.org/master/manual/assocs.html

