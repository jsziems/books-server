
require('dotenv').config()

const express = require('express')
const db = require('./db')
const app = express()
const controllers = require('./controllers')

app.use(express.json())
app.use(require('./middleware/headers'))

app.use("/user", controllers.userController)
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


//     REFERENCES
// Set up Sequelize:  https://sequelize.org/master/manual/getting-started.html
// Create an .env file: https://www.npmjs.com/package/dotenv
// Define the db model:  https://sequelize.org/master/manual/model-basics.html
// Define db associations:  https://sequelize.org/master/manual/assocs.html
// Setup routing:  https://expressjs.com/en/guide/routing.html

