
const router = require("express").Router()

const { UserModel } = require('../models')

const { UniqueConstraintError } = require("sequelize/lib/errors")
const { sequelize } = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

router.post("/signup", async (req, res) => {

    let { email, password, firstName, lastName } = req.body

    try {
        const newUser = await UserModel.create({
            email,
            password,
            firstName,
            lastName
        })

        let token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: "User successfully signed up",
            user: newUser,
            sessionToken: token
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

router.post("/login", async (req, res) => {

    let { email, password } = req.body

    try {
        const loginUser = await UserModel.findOne({
            where: { email: email }
        })

        if (loginUser) {
            if (loginUser.password === password) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24 })
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in",
                    sessionToken: token
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


module.exports = router