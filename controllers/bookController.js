const express = require("express")
const router = express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { BookModel, UserModel } = require('../models')

const { sequelize } = require("../models/bookModel")

router.post("/create", validateJWT, async (req, res) => {
    try {
        // QUESTION:  Instead of including the userId in the body, should I be able to access it via req.user?

        let newBook = await BookModel.create({
            title: req.body.title,
            author: req.body.author,
            readStatus: 'In reading queue',
            userId: req.body.userId
        })

        res.status(201).json({
            message: "Book successfully added",
            book: newBook
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Failed to add book",
            message: error
        })
    }
})


router.get("/:userId", validateJWT, async (req, res) => {
    console.log(req.params.userId)
    try {
        const myBooks = await BookModel.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.status(200).json(myBooks)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

router.get("/bookId/:bookId", validateJWT, async (req, res) => {
    console.log(req.params.bookId)
    try {
        const myBook = await BookModel.findOne({
            where: {
                id: req.params.bookId
            }
        })
        res.status(200).json(myBook)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})


router.put("/:bookId", validateJWT, async (req, res) => {
    console.log(req.params.bookId)

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
            console.log(`upd not successful: ${upd}, ${updBook}, ${query}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Failed to update book",
            message: error
        })
    }
})



// QUESTION: use req.user???
// router.get("/", validateJWT, async (req, res) => {
//     const { uid } = req.user
//     console.log(uid)
//     try {
//         const myBooks = await BookModel.findAll({
//             where: {
//                 userId: uid
//             }
//         })
//         res.status(200).json(myBooks)
//     } catch (err) {
//         res.status(500).json({ error: err })
//     }
// })

module.exports = router