
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


