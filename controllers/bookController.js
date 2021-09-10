const router = require("express").Router()

const { BookModel, UserModel } = require('../models')

const { sequelize } = require("../models/bookModel")

router.post("/create", async (req, res) => {
    try {
        let u = await UserModel.findOne({ where: { id: req.body.id } })

        if (u) {
            // Valid user... add the book
            // let newBook = await BookModel.create({
            //     title: req.body.title,
            //     author: req.body.author,
            //     userId: req.body.id
            // })

            let newBook = await BookModel.create({
                title: req.body.title,
                author: req.body.author,
                readStatus: 'In reading queue'
            })
            await u.addBook(newBook)

            res.status(201).json({
                message: "Book successfully added",
                book: newBook
            })
    
        } else {
            res.status(401).json ({
                message: "Can't add book -- user does not exist"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Failed to add book",
            message: error
        })
    }
})

// Get all books for a user
router.get("/:id", async (req, res) => {
    try {
        let allBooks = await BookModel.findAll({ 
            where: { userId: req.params.id } })

        res.status(201).json({ allBooks })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Failed to get books",
            message: error
        })
    }
})

router.put("/:id"), async (req, res) => {
    console.log('in PUT router for book')
    const { title, author } = req.body
    const query = {
        where: { id : req.params.id } 
    }
    const updBook = {
        title,
        author
    }
    console.log(`id is ${req.params.id}`)
    console.log(`query is ${query}`)
    console.log(`updBook is ${updBook}`)
    try {
        let upd = await BookModel.update(updBook, query)
        if (upd[0] === 1) {
            res.status(201).json({
                message: `Book Id ${req.params.id} updated`, updBook
            })
        } else {
            console.log(`upd not successful: ${upd}, ${updBook}, ${query}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Failed to update book",
            message: error
        })
    }
}

module.exports = router