const express = require("express")
const router = express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { BookModel, UserModel } = require('../models')

const { sequelize } = require("../models/bookModel")
const User = require("../models/userModel")

// 
// Create a book
// 
router.post("/create", validateJWT, async (req, res) => {
    try {
        let u = await UserModel.findOne({ where: { id: req.user.id } })
        console.log(u)

        if (u) {
            let book = await u.createBook({
                title: req.body.title,
                author: req.body.author,
                readStatus: 'In reading queue',
            })
    
            res.status(201).json({
                message: "Book successfully added",
                book: book
            })
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }

    } catch (error) {
        console.log(`ERROR:  ${error}`)
        res.status(500).json({
            error: "Failed to add book",
            message: error
        })
    }
})

// 
// Get all the books for a user
// 
router.get("/", validateJWT, async (req, res) => {
    try {
        let u = await UserModel.findOne({ where: { id: req.user.id }})
        if (u) {
            const myBooks = await u.getBooks()
            res.status(200).json(myBooks)
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(`ERROR:  ${error}`)
        res.status(500).json({ error: error })
    }
})

//
// Get a book with book.id as the input parameter
//
router.get("/:bookId", validateJWT, async (req, res) => {
    try {
        const myBook = await BookModel.findOne({
            where: {
                id: req.params.bookId
            }
        })
        res.status(200).json(myBook)
    } catch (error) {
        console.log(`ERROR:  ${error}`)
        res.status(500).json({ error: error })
    }
})

// 
// Update a book with book.id as the input parameter
// 
router.put("/:bookId", validateJWT, async (req, res) => {
    const { title, author } = req.body
    const query = {
        where: { id: req.params.bookId }
    }
    const updBook = {
        title,
        author
    }

    try {
        let upd = await BookModel.update(updBook, query)
        if (upd[0] === 1) {
            res.status(201).json({
                message: `Book Id ${req.params.bookId} updated`, updBook
            })
        } else {
            console.log(`Update not successful: ${upd}, ${updBook}, ${query}`)
        }
    } catch (error) {
        console.log(`ERROR:  ${error}`)
        res.status(500).json({
            error: "Failed to update book",
            message: error
        })
    }
})

// 
// Delete a book with book.id as the input parameter
//
router.delete("/:id", validateJWT, async (req, res) => {
    const id = req.params.id
    const query = {
        where: { id: id }
    }

    try {
        let delBook = await BookModel.destroy(query)
        if (delBook) {
            res.status(201).json({
                message: `Book Id ${id} deleted`, delBook
            })
        } else {
            console.log(`Delete not successful: ${delBook}, ${query}`)
        }
    } catch (error) {
        console.log(`ERROR:  ${error}`)
        res.status(500).json({
            error: "Failed to delete book",
            message: error
        })
    }
})

module.exports = router