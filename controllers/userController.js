
const router = require("express").Router()
let validateJWT = require("../middleware/validate-jwt")

const { UserModel } = require('../models')

const { UniqueConstraintError } = require("sequelize/lib/errors")
const { sequelize } = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// 
// Get a user with user.id as the input parameter
// 
router.get("/:userId", async (req, res) => {
    try {
        const myUser = await UserModel.findOne({
            where: {
                id: req.params.userId
            }
        })
        res.status(200).json(myUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

//
// Get all users
// 
router.get("/", async (req, res) => {
    try {
        const allUsers = await UserModel.findAll()
        res.status(200).json(allUsers)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

// 
// Add a user to the system.  Email, password, and supporting fields are provided in the body,
// 
router.post("/signup", async (req, res) => {

    let { email, password, firstName, lastName, adminRole } = req.body

    try {
        const newUser = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            firstName,
            lastName,
            adminRole
        })

        let token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: "User successfully signed up",
            user: newUser,
            sessionToken: token,
            adminRole: newUser.adminRole
        })

    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            console.log(error)
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            console.log(error)
            res.status(500).json({
                error: "Failed to register user",
                message: error
            })
        }
    }
});

// 
// Login and generate a token.  Email and password are provided in the body.
// 
router.post("/login", async (req, res) => {

    let { email, password } = req.body

    try {
        const loginUser = await UserModel.findOne({
            where: { email: email }
        })

        if (loginUser) {
            let pwComparison = await bcrypt.compare(password, loginUser.password)
            if (pwComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in",
                    sessionToken: token,
                    adminRole: loginUser.adminRole
                })
            } else {
                res.status(401).json({
                    message: "Incorrect password"
                })
            }
        } else {
            res.status(404).json({
                message: "Email address not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
})

//
// Update a user with user.id as the input parameter
//
router.put("/:userId", validateJWT, async (req, res) => {
    const { email, firstName, lastName, adminRole } = req.body
    const query = {
        where: { id: req.params.userId }
    }
    const updUser = {
        email,
        firstName,
        lastName,
        adminRole
    }

    try {
        let upd = await UserModel.update(updUser, query)
        if (upd[0] === 1) {
            res.status(201).json({
                message: `User Id ${req.params.userId} updated`, updUser
            })
        } else {
            console.log(`Update not successful: ${upd}, ${updUser}, ${query}`)
        }
    } catch (error) {
        console.log(`ERROR:  ${error}`)
        res.status(500).json({
            error: "Failed to update user",
            message: error
        })
    }
})

// 
// Delete a user with user.id as the input parameter
// 
router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId
    const query = {
        where: {
            id: userId
        }
    }

    try {
        let userRemoved = await UserModel.destroy(query)
        if (userRemoved) {
            res.status(200).json({
                message: `User ${userId} has been removed`
            })
        } else {
            res.status(404).json({
                message: 'User not removed'
            })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router