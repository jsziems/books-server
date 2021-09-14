

require('dotenv').config()

const express = require('express')
const db = require('./db')
const app = express()
const controllers = require('./controllers')

app.use(express.json())
app.use(require('./middleware/headers'))

app.use("/user", controllers.userController)
// app.use(require("./middleware/validate-jwt"))
app.use("/book", controllers.bookController)

; (async () => {
    try {
       await db.sync()
        // await db.sync({ force: true })
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
})();

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})


// ;(async () => {
//     // await sequelize.sync({force: true})
//     await sequelize.sync()

//     let my_user = await User.create({
//         email: "janet"
//     })
//     let my_book = await Book.create({ title: "Best Book Ever"})
//     let my_book2 = await Book.create({title: "Another Awesome One"})

//     await my_user.setBooks(my_book)
//     await my_user.addBooks([my_book, my_book2])
//     console.log(await my_user.getBooks())

//     let resultUser = await User.findOne({
//         where: {
//             id: 24
//         }
//     })
//     console.log(await resultUser.getBooks())
// })();

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
// Setup routing:  https://expressjs.com/en/guide/routing.html

